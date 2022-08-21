# Semantic Version Parser Action

This action parses a semantic version string and returns parts of the version as outputs.

## Inputs

### `version`

The version string to parse.

### `defaultVersion`

The version string to parse when the version is invalid.

## Outputs

### `success`

true if the version was successfully parsed, otherwise false

### `major`

The major part of the version number.

### `minor`

The minor part of the version number.

### `patch`

The patch part of the version number.

### `version`

Returns the major, minor and patch parts of the version number as a string.

### `prerelease`

The prerelease part of the version number.

### `build`

The build part of the version number.

## Example usage

```yaml
uses: jerhon/semantic-version-parser-action@v1
id: version
with:
    version: "v999.888.700"
```

Use the folowing outputs

```
steps.justVersion.outputs.major
steps.justVersion.outputs.minor
steps.justVersion.outputs.patch

steps.justVersion.outputs.version
steps.justVersion.outputs.prerelease
steps.justVersion.outputs.build
```
