#!/usr/bin/env python3
"""Verify the complete authenticated source bridge used by the local distribution."""
from __future__ import annotations

import argparse
import base64
import hashlib
import json
import os
from pathlib import Path
import subprocess

if not __debug__:
    raise RuntimeError('Source verification requires Python assertions')

BASE = 'fdf98b5aef3c2f6d5a6519d5dbb69631347b62fb'
RELEASE = 'bbd07768ddb4919205bcb5a3cbc06c3a2791981a'
TAG = '636f6dd4afa0c74469195f21d29c144ed1697efd'
FINGERPRINT = '83DFB8EACB2CCD9ACE75B47CFB8599EBAB9E40B9'
CHANGED = {
    'package.json': ('38d03904e4c17412afd4b5f19b4ea2742a6c5423', '7aca4ad93579426e92eee14881f70ea719f5dad2'),
    'src/detect-acorn.ts': ('27172619f8ba0b4662bf3eca89d889d6b4ec1bbc', '5061cb366c3b9e978b4ededa46dbd112cb1b7eb1'),
    'src/node/scan-dirs.ts': ('3188a1e7ff2607ce803605985d1f8c6622300439', '8b1d27aeb55cd5384decee4ce14031b36a5486f2'),
    'test/scan-dirs.test.ts': ('7fb1860fce3a36ba9767b0243d19a88b370603ff', '84af2ea7c6a4a3ca751522632c7fa77e49bfed09'),
}


def oid(kind: str, raw: bytes) -> str:
    return hashlib.sha1(kind.encode() + b' ' + str(len(raw)).encode() + b'\0' + raw).hexdigest()


def verify_signature(signature: bytes, payload: bytes, keyring: Path) -> None:
    pipes: list[int] = []
    try:
        for data in (signature, payload):
            reader, writer = os.pipe()
            os.write(writer, data)
            os.close(writer)
            pipes.append(reader)
        result = subprocess.run(
            ['gpgv', '--keyring', str(keyring.resolve()), '--status-fd', '1',
             f'/dev/fd/{pipes[0]}', f'/dev/fd/{pipes[1]}'],
            pass_fds=pipes, capture_output=True, text=True, check=False, timeout=15,
        )
        if result.returncode or f'[GNUPG:] VALIDSIG {FINGERPRINT} ' not in result.stdout:
            raise ValueError('Publisher signature failed: ' + result.stderr[-2000:])
    finally:
        for reader in pipes:
            os.close(reader)


def signed_commit(raw: bytes, keyring: Path) -> str:
    header, message = raw.split(b'\n\n', 1)
    lines = header.split(b'\n')
    start = next(index for index, line in enumerate(lines) if line.startswith(b'gpgsig '))
    end = start + 1
    while end < len(lines) and lines[end].startswith(b' '):
        end += 1
    signature = b'\n'.join([lines[start][7:], *(line[1:] for line in lines[start + 1:end])]) + b'\n'
    payload = b'\n'.join(lines[:start] + lines[end:]) + b'\n\n' + message
    verify_signature(signature, payload, keyring)
    return next(line[5:].decode() for line in lines if line.startswith(b'tree '))


def source_files(tree: str, objects: dict[str, tuple[str, bytes]]) -> dict[str, tuple[str, str]]:
    files: dict[str, tuple[str, str]] = {}

    def walk(sha: str, prefix: str = '') -> None:
        kind, raw = objects[sha]
        if kind != 'tree':
            raise ValueError('Expected an authenticated tree')
        offset = 0
        seen: set[str] = set()
        while offset < len(raw):
            stop = raw.index(b'\0', offset)
            mode, name_bytes = raw[offset:stop].split(b' ', 1)
            name = name_bytes.decode()
            if name in seen or name in ('', '.', '..') or '/' in name:
                raise ValueError('Invalid or duplicated Git tree entry')
            seen.add(name)
            child = raw[stop + 1:stop + 21].hex()
            if len(child) != 40:
                raise ValueError('Truncated Git tree entry')
            offset = stop + 21
            path = prefix + name
            if mode == b'40000':
                walk(child, path + '/')
            else:
                if mode not in (b'100644', b'100755', b'120000', b'160000'):
                    raise ValueError('Unexpected Git entry mode')
                files[path] = (mode.decode(), child)

    walk(tree)
    return files


def verify(proof_path: Path, keyring: Path) -> dict:
    proof = json.loads(proof_path.read_text())
    assert proof['schemaVersion'] == 1
    assert proof['completeSourceTrees'] is True
    assert proof['baseCommit'] == BASE and proof['releaseCommit'] == RELEASE
    assert proof['releaseTag'] == TAG and proof['publisherSigningFingerprint'] == FINGERPRINT
    objects: dict[str, tuple[str, bytes]] = {}
    for sha, entry in proof['objects'].items():
        assert entry['type'] in ('commit', 'tag', 'tree', 'blob')
        raw = base64.b64decode(entry['data'], validate=True)
        assert oid(entry['type'], raw) == sha, 'Git object hash mismatch'
        objects[sha] = (entry['type'], raw)
    assert objects[TAG][0] == 'tag'
    payload, signature = objects[TAG][1].split(b'-----BEGIN PGP SIGNATURE-----', 1)
    verify_signature(b'-----BEGIN PGP SIGNATURE-----' + signature, payload, keyring)
    assert payload.startswith(f'object {RELEASE}\ntype commit\ntag v7.0.2\n'.encode())
    assert objects[BASE][0] == objects[RELEASE][0] == 'commit'
    base = source_files(signed_commit(objects[BASE][1], keyring), objects)
    release = source_files(signed_commit(objects[RELEASE][1], keyring), objects)
    assert set(base) == set(release), 'Added or removed upstream paths require review'
    changed = {name: (base[name][1], release[name][1]) for name in base if base[name] != release[name]}
    assert changed == CHANGED, 'Upstream source delta differs from the reviewed changes'
    for before, after in changed.values():
        assert objects[before][0] == objects[after][0] == 'blob'
    return {
        'sourceProof': 'verified', 'baseCommit': BASE, 'releaseCommit': RELEASE,
        'releaseTagObject': TAG, 'publisherSigningFingerprint': FINGERPRINT,
        'objectsVerified': len(objects), 'sourceFilesPerTree': len(base),
        'changedSourcePaths': sorted(changed),
    }


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--proof', type=Path, default=Path(__file__).resolve().parent.parent / 'vendor/unimport-provenance/source-proof-complete.json')
    parser.add_argument('--keyring', type=Path, default=Path(__file__).resolve().parent.parent / 'vendor/unimport-provenance/publisher-keyring.gpg')
    args = parser.parse_args()
    print(json.dumps(verify(args.proof, args.keyring)))
