import argparse
import base64
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tarfile


ROOT = Path(__file__).resolve().parent.parent
COMPILER = "vendor/unimport-7.0.3-webops.2.tgz"
MATCHER = "vendor/picomatch-4.0.7-webops.1.tgz"


def integrity(filename):
    return "sha512-" + base64.b64encode(hashlib.sha512(filename.read_bytes()).digest()).decode()


def check_entry(entry, filename, version):
    expected = ("file:" + filename, version, integrity(ROOT / filename))
    actual = tuple(entry.get(key) for key in ("resolved", "version", "integrity"))
    if actual != expected:
        raise ValueError(f"Locked {version} must match the reviewed local archive")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--locked-only", action="store_true")
    arguments = parser.parse_args()
    subprocess.run(
        [sys.executable, "-I", "-B", str(ROOT / "scripts/check-unimport-archive.py")],
        cwd=ROOT, check=True,
    )
    packages = json.loads((ROOT / "package-lock.json").read_text())["packages"]
    check_entry(packages["node_modules/unimport"], COMPILER, "7.0.3+webops.2")
    check_entry(packages["node_modules/picomatch"], MATCHER, "4.0.7-webops.1")
    consumers = []
    for placement, entry in packages.items():
        if placement != "node_modules/unimport" and not placement.endswith("/node_modules/unimport"):
            continue
        if entry.get("version", "").startswith("6."):
            continue
        check_entry(entry, COMPILER, "7.0.3+webops.2")
        directory = ROOT / placement
        if not directory.is_relative_to(ROOT) or ".." in Path(placement).parts:
            raise ValueError("Compiler installation must remain within the checkout")
        consumers.append(directory)
    if not arguments.locked_only:
        with tarfile.open(ROOT / COMPILER, mode="r:gz") as archive:
            files = {member.name.removeprefix("package/"): archive.extractfile(member).read()
                     for member in archive}
        for directory in consumers:
            if directory.resolve() != directory:
                raise ValueError("Compiler installation must not traverse a symlink")
            for name, expected in files.items():
                filename = directory / name
                if filename.resolve() != filename or filename.read_bytes() != expected:
                    raise ValueError(f"Installed compiler content differs: {name}")
    print(f"Verified {'locked' if arguments.locked_only else 'locked and installed'} compiler: "
          f"{len(consumers)} consumers")


if __name__ == "__main__":
    main()
