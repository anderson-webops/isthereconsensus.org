#!/usr/bin/env python3
"""Reconstruct the reviewed maintained Unimport distribution from its verified base."""
from __future__ import annotations

import argparse
import base64
import gzip
import hashlib
import io
import json
from pathlib import Path
import tarfile

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / 'vendor/unimport-upstream/unimport-7.0.1.tgz'
VERSION = '7.0.2+webops.1'
BASE_INTEGRITY = 'sha512-HcHDoFaz6xiViJNRGWEGYleYl7KVxU8XVHSPJnkuozaQrCUVrA8aRv/vd+e8XP28y26n3L2VRAudCuF5+ek59w=='
FIX = '525ea7c5b6c39a2d1d6835f2b5ed7c4702b588a3'
RELEASE = 'bbd07768ddb4919205bcb5a3cbc06c3a2791981a'
MAIN = 'dist/shared/unimport.Xs9j9wHK.mjs'
BEFORE = b'''    if (i.declarationType === "enum" || i.declarationType === "const enum" || i.declarationType === "class")
      return true;
    if (!RE_DTS_EXT.test(i.from))
      return true;'''
AFTER = b'''    if (!RE_DTS_EXT.test(i.from))
      return true;
    if (i.declarationType === "enum" || i.declarationType === "const enum" || i.declarationType === "class")
      return !exports.some((e) => e.as === i.as && e.name === i.name && e.type && e.declarationType === i.declarationType && !RE_DTS_EXT.test(e.from));'''


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def replace_once(data: bytes, before: bytes, after: bytes) -> bytes:
    if data.count(before) != 1:
        raise ValueError('Reviewed original patch context changed')
    return data.replace(before, after, 1)


def expected_payload() -> dict[str, bytes]:
    archive = BASE.read_bytes()
    actual = 'sha512-' + base64.b64encode(hashlib.sha512(archive).digest()).decode()
    if actual != BASE_INTEGRITY:
        raise ValueError('Original publisher archive integrity changed')
    original: dict[str, bytes] = {}
    with tarfile.open(fileobj=io.BytesIO(archive), mode='r:gz') as source:
        for member in source.getmembers():
            if not member.isfile() or not member.name.startswith('package/'):
                raise ValueError('Unexpected original archive member')
            name = member.name.removeprefix('package/')
            if name.startswith('/') or '..' in Path(name).parts or name in original:
                raise ValueError('Unsafe or repeated original member')
            handle = source.extractfile(member)
            assert handle is not None
            original[name] = handle.read()
    if len(original) != 16:
        raise ValueError('Original publisher inventory changed')
    result = dict(original)
    result[MAIN] = replace_once(result[MAIN], BEFORE, AFTER)
    result[MAIN] = replace_once(result[MAIN], b'const version = "7.0.1";', f'const version = "{VERSION}";'.encode())
    acorn = 'dist/chunks/detect-acorn.mjs'
    result[acorn] = replace_once(result[acorn], b'async function detectImportsAcorn(code, ctx, options) {', b'async function detectImportsAcorn(code, ctx, options, id) {')
    metadata = json.loads(result['package.json'])
    if metadata['name'] != 'unimport' or metadata['version'] != '7.0.1':
        raise ValueError('Unexpected original package identity')
    metadata['version'] = VERSION
    metadata['webopsDistribution'] = {
        'identity': 'maintained-local-distribution',
        'base': 'unimport@7.0.1',
        'baseIntegrity': BASE_INTEGRITY,
        'upstreamFix': FIX,
        'upstreamRelease': RELEASE,
    }
    result['package.json'] = (json.dumps(metadata, indent=2, ensure_ascii=False) + '\n').encode()
    changes = {name: {'originalSha256': digest(original[name]), 'maintainedSha256': digest(value)} for name, value in result.items() if value != original[name]}
    inventory = {
        'schemaVersion': 1,
        'name': 'unimport',
        'version': VERSION,
        'distribution': 'maintained-local-distribution',
        'base': {
            'name': 'unimport', 'version': '7.0.1',
            'tarball': 'https://registry.npmjs.org/unimport/-/unimport-7.0.1.tgz',
            'integrity': BASE_INTEGRITY,
            'publisherAttestation': 'https://registry.npmjs.org/-/npm/v1/attestations/unimport@7.0.1',
            'sourceCommit': 'fdf98b5aef3c2f6d5a6519d5dbb69631347b62fb',
        },
        'officialFix': {'commit': FIX, 'url': f'https://github.com/unjs/unimport/commit/{FIX}'},
        'officialRelease': {'commit': RELEASE, 'signedTagObject': '636f6dd4afa0c74469195f21d29c144ed1697efd'},
        'originalFiles': {name: digest(value) for name, value in sorted(original.items())},
        'changedFiles': changes,
        'maintainedFiles': {name: digest(value) for name, value in sorted(result.items())},
    }
    result['UPSTREAM.json'] = (json.dumps(inventory, indent=2) + '\n').encode()
    result['UPSTREAM.md'] = f'''# Maintained Unimport distribution

`{VERSION}` is a locally maintained distribution of Unimport, derived from the
publisher-attested `unimport@7.0.1` archive and the authenticated upstream fix
`{FIX}`. It retains the original license, entrypoints, types and dependencies.

The upstream fix deduplicates declarations from `.d.ts` files when an equivalent
class or enum declaration is present in a non-declaration file. It preserves
classes and enums declared only by the declaration file. The additional unused
`id` parameter matches the upstream 7.0.2 compiled Acorn entrypoint.

The package and exported version identify this maintained distribution. Build
metadata keeps the original Nuxt `^7.0.2` API floor satisfied. Unchanged upstream
files remain byte-identical; `UPSTREAM.json` records the complete original and
maintained inventories. The original chunk path is retained for compatibility.

Publisher provenance authenticates the original 7.0.1 archive. The local patch,
packaging source and verified exact-source application build identify the maintained output.
The npm attestation for the upstream 7.0.2 archive remains unavailable; this
package makes no claim that such an attestation was obtained or repaired.

Replace this distribution when a reviewed, API-compatible upstream release has
verifiable publisher provenance and passes the same consumer regressions.
'''.encode()
    return result


def archive_bytes(payload: dict[str, bytes]) -> bytes:
    raw = io.BytesIO()
    with tarfile.open(fileobj=raw, mode='w', format=tarfile.USTAR_FORMAT) as target:
        for name, data in sorted(payload.items()):
            member = tarfile.TarInfo('package/' + name)
            member.mode = 0o644
            member.size = len(data)
            member.mtime = 0
            member.uid = member.gid = 0
            member.uname = member.gname = ''
            target.addfile(member, io.BytesIO(data))
    output = io.BytesIO()
    with gzip.GzipFile(filename='', mode='wb', compresslevel=9, fileobj=output, mtime=0) as compressed:
        compressed.write(raw.getvalue())
    return output.getvalue()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true')
    parser.add_argument('--destination', type=Path, default=ROOT / 'vendor/unimport')
    parser.add_argument('--archive', type=Path, default=ROOT / f'vendor/unimport-{VERSION}.tgz')
    args = parser.parse_args()
    payload = expected_payload()
    packed = archive_bytes(payload)
    if args.check:
        actual = {str(entry.relative_to(args.destination)): entry.read_bytes() for entry in args.destination.rglob('*') if entry.is_file()}
        if any(entry.is_symlink() for entry in args.destination.rglob('*')) or actual != payload:
            raise ValueError('Maintained source payload differs from reviewed reconstruction')
        if args.archive.read_bytes() != packed:
            raise ValueError('Maintained archive differs from deterministic reconstruction')
    else:
        if args.destination.exists() and any(args.destination.iterdir()):
            raise ValueError('Output directory must be new or empty')
        args.destination.mkdir(parents=True, exist_ok=True)
        for name, data in payload.items():
            path = args.destination / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data)
            path.chmod(0o644)
        args.archive.write_bytes(packed)
        args.archive.chmod(0o644)
    print(json.dumps({'version': VERSION, 'files': len(payload), 'archiveSha256': digest(packed), 'archiveIntegrity': 'sha512-' + base64.b64encode(hashlib.sha512(packed).digest()).decode(), 'checked': args.check}))


if __name__ == '__main__':
    main()
