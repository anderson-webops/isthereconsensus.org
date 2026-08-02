#!/usr/bin/env bash
set -euo pipefail
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
export PATH

release_root="${RELEASE_ROOT:-/srv/isthereconsensus.org/releases}"
current_link="${CURRENT_LINK:-/srv/isthereconsensus.org/current}"
api_service="${API_SERVICE:-isthereconsensus-api.service}"
web_service="${WEB_SERVICE:-isthereconsensus-web.service}"
api_ready_url="${API_READY_URL:-http://127.0.0.1:3011/readyz}"
web_ready_url="${WEB_READY_URL:-http://127.0.0.1:3000/readyz}"
site_health_url="${SITE_HEALTH_URL:-https://isthereconsensus.org/deployment.json}"
site_resolve="${SITE_RESOLVE:-isthereconsensus.org:443:127.0.0.1}"

if [[ $# -ne 1 ]]; then
  echo "Usage: promote-release.sh /srv/isthereconsensus.org/releases/<prepared-release>" >&2
  exit 2
fi
if [[ ${EUID:-$(id -u)} -ne 0 ]]; then
  echo "Run promotion with root privileges." >&2
  exit 1
fi

release_root_real="$(realpath -e -- "$release_root")"
candidate="$(realpath -e -- "$1")"
case "$candidate/" in
  "$release_root_real/"*) ;;
  *) echo "Candidate must resolve beneath $release_root_real: $candidate" >&2; exit 1 ;;
esac

for required_file in back-end/dist/server.js front-end/.output/server/index.mjs front-end/.output/public/deployment.json .isthereconsensus-release-prepared.json; do
  if [[ ! -f "$candidate/$required_file" ]]; then
    echo "Prepared release is missing $required_file." >&2
    exit 1
  fi
done
if ! cmp -s "$candidate/front-end/.output/public/deployment.json" "$candidate/.isthereconsensus-release-prepared.json"; then
  echo "Prepared release metadata does not match the public deployment identity." >&2
  exit 1
fi
if [[ -e "$current_link" && ! -L "$current_link" ]]; then
  echo "Refusing to replace non-symlink deployment path: $current_link" >&2
  exit 1
fi

previous_target="$(readlink -f -- "$current_link" 2>/dev/null || true)"
next_link="${current_link}.next.$$"
response_file="$(mktemp)"
cleanup() {
  if [[ -L "$next_link" ]]; then unlink -- "$next_link"; fi
  rm -f -- "$response_file"
}
trap cleanup EXIT

activate_target() {
  local target="$1"
  ln -s -- "$target" "$next_link"
  mv -Tf -- "$next_link" "$current_link"
}

wait_for_target() {
  local target="$1"
  local attempt
  for attempt in {1..30}; do
    if curl --fail --silent --show-error --max-time 5 "$api_ready_url" >/dev/null \
      && curl --fail --silent --show-error --max-time 5 "$web_ready_url" >/dev/null \
      && curl --fail --silent --show-error --max-time 5 --resolve "$site_resolve" "$site_health_url" --output "$response_file" \
      && cmp -s "$target/front-end/.output/public/deployment.json" "$response_file"; then
      return 0
    fi
    sleep 1
  done
  return 1
}

restart_services() {
  systemctl restart "$api_service"
  systemctl restart "$web_service"
}

activate_target "$candidate"
if nginx -t && restart_services && systemctl reload nginx && wait_for_target "$candidate"; then
  echo "Promoted $candidate and verified both services plus exact public source identity."
  exit 0
fi

echo "Candidate health failed; restoring the previous release." >&2
if [[ -n "$previous_target" ]]; then
  activate_target "$previous_target"
  restart_services
  nginx -t && systemctl reload nginx
  if ! wait_for_target "$previous_target"; then
    echo "The previous release was restored but did not pass readiness and identity checks." >&2
  fi
else
  unlink -- "$current_link"
  systemctl stop "$web_service" "$api_service"
  nginx -t && systemctl reload nginx
fi
exit 1
