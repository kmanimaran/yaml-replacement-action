# YAML Replacement action

This action replace specific value in YAML file. Forked and modified from iisyos/yaml-replacement-action

## Inputs

### `yaml-file-path`

**Required** The path to your YAML file that needs the replacement.

### `target-key`

**Required** The key of the value that needs to be replaced in the YAML file.

### `target-value`

**Required** The value for the key that needs to be replaced in the YAML file.

### `need-push`

If you need to push these changes, set `true`, default `false`

**Notice**
You need to supply your Personal Access Token (PAT) which allows repository access to the checkout action. For example:

```yml
      - name: Checkout repository
        uses: actions/checkout@v2
        with:
          fetch-depth: 0 
          token: ${{ secrets.MY_PERSONAL_ACCESS_TOKEN }}
```

## Example usage

```yaml
uses: kmanimaran/yaml-replacement-action@v1
with:
  yaml-file-path: 'setting.yaml'
  target-key: 'step.revision'
  target-value: 'value'
  need-push: true
```

In the above example, the setting.yaml file should be in the following format:

```yaml
step:
  revision: '202301011200' # <- replace
```
