#!/usr/bin/env python3
"""Snapshot the API Evangelist provider profile from the profile store into profile/.

The profile (apis.yml) and the artifacts it references live in the private profile store,
s3://api-evangelist-profiles/providers/api-evangelist/ — they left GitHub on 2026-10-26. The portal
builds in GitHub Actions, which has no AWS credentials, so the profile is snapshotted here and
committed; scripts/mirror-apis-yml.mjs publishes the snapshot on every build.

Only what apis.yml references is copied — the store also holds blogs and working files that were
never part of the published profile.

    python3 scripts/sync-profile.py          # refresh profile/ from the store, then commit it

Run it whenever the profile changes. scripts/check-live.py in apievangelist-aws reports when the
published copy and the store disagree.
"""
import pathlib, re, shutil, sys
import boto3

BUCKET = 'api-evangelist-profiles'
PREFIX = 'providers/api-evangelist/'
ENV = pathlib.Path('/Users/kinlane/Github/.env')
OUT = pathlib.Path(__file__).resolve().parent.parent / 'profile'

env = dict(l.split('=', 1) for l in ENV.read_text().splitlines() if '=' in l and not l.startswith('#'))
s3 = boto3.client('s3', region_name='us-east-1',
                  aws_access_key_id=env['AWS_KEY'].strip(), aws_secret_access_key=env['AWS_SECRET'].strip())

def get(key):
    return s3.get_object(Bucket=BUCKET, Key=PREFIX + key)['Body'].read()

profile = get('apis.yml')
text = profile.decode()
if not text.startswith('aid: api-evangelist'):
    sys.exit('the store returned something that is not the api-evangelist profile')

# Relative references (url: / $ref:) are artifacts that travel with the profile.
refs = sorted({u for u in re.findall(r'(?:url|\$ref):\s*[\'"]?([^\s\'"#]+)', text)
               if not re.match(r'^[a-z]+:', u) and not u.startswith('/')})

if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir()
(OUT / 'apis.yml').write_bytes(profile)
missing = []
for ref in refs:
    rel = ref.lstrip('./')
    try:
        body = get(rel)
    except s3.exceptions.NoSuchKey:
        missing.append(rel)
        continue
    dest = OUT / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(body)

print(f'profile/: apis.yml + {len(refs) - len(missing)} referenced artifacts')
if missing:
    print(f'MISSING from the store ({len(missing)}): {", ".join(missing)}')
    sys.exit(1)
