#!/usr/bin/env bash
set -euo pipefail
PATH=/usr/sbin:/usr/bin:/sbin:/bin
export PATH

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
api_unit_dest="${API_UNIT_DEST:-/etc/systemd/system/isthereconsensus-api.service}"
web_unit_dest="${WEB_UNIT_DEST:-/etc/systemd/system/isthereconsensus-web.service}"
integrity_unit_dest="${INTEGRITY_UNIT_DEST:-/etc/systemd/system/isthereconsensus-source-integrity.service}"
integrity_timer_dest="${INTEGRITY_TIMER_DEST:-/etc/systemd/system/isthereconsensus-source-integrity.timer}"
api_env_dest="${API_ENV_DEST:-/etc/isthereconsensus/api.env}"
web_env_dest="${WEB_ENV_DEST:-/etc/isthereconsensus/web.env}"
dry_run=false
force_env=false
enable_integrity_timer=false

usage() {
  cat <<'USAGE'
Install the direct Is There Consensus services. Application services stay stopped; the optional monitor timer starts only when requested.

Usage: install-services.sh [--dry-run] [--force-env] [--enable-integrity-timer]

  --dry-run                 Print commands without changing the host.
  --force-env               Replace both target env files with fail-closed examples.
  --enable-integrity-timer  Enable and start the daily bounded Crossref monitor.
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run) dry_run=true ;;
    --force-env) force_env=true ;;
    --enable-integrity-timer) enable_integrity_timer=true ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 2 ;;
  esac
  shift
done

run() {
  if [[ "$dry_run" == true ]]; then
    printf ' %q' "$@"
    printf '\n'
    return 0
  fi
  "$@"
}

if [[ "$dry_run" == false ]]; then
  if [[ ! -x /usr/bin/node || "$(/usr/bin/node --version)" != "v24.18.1" ]]; then
    echo "The systemd runtime requires Node 24.18.1 at /usr/bin/node." >&2
    exit 1
  fi
  if ! id isthereconsensus >/dev/null 2>&1; then
    echo "Create the unprivileged isthereconsensus service account before installing units." >&2
    exit 1
  fi
fi

run install -D -m 0644 "$script_dir/isthereconsensus-api.service" "$api_unit_dest"
run install -D -m 0644 "$script_dir/isthereconsensus-web.service" "$web_unit_dest"
run install -D -m 0644 "$script_dir/isthereconsensus-source-integrity.service" "$integrity_unit_dest"
run install -D -m 0644 "$script_dir/isthereconsensus-source-integrity.timer" "$integrity_timer_dest"
if [[ "$force_env" == true || ! -e "$api_env_dest" ]]; then
  run install -D -m 0600 "$script_dir/isthereconsensus-api.env.example" "$api_env_dest"
else
  echo "Keeping existing $api_env_dest."
fi
if [[ "$force_env" == true || ! -e "$web_env_dest" ]]; then
  run install -D -m 0600 "$script_dir/isthereconsensus-web.env.example" "$web_env_dest"
else
  echo "Keeping existing $web_env_dest."
fi
run systemctl daemon-reload
if [[ "$enable_integrity_timer" == true ]]; then
  run systemctl enable --now isthereconsensus-source-integrity.timer
fi
echo "Review both env files, install the Nginx virtual server, then prepare and promote a release."
