# redocly-updater

Installation:
### npm i -D redocly-updater

Usage:
Add a binary into your package.json scripts, e.g.:

{
  ...
  scripts: {
    ...
    "update-packages": "update-redocly"
  }
}

After, run the commant like this:

### npm run update-packages -- --p {your package name} --v {new version}
