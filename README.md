# YAML Replacement action

This action replace specific value in YAML file.

## Motivation & Description

When you want to update a file cached in the browser, you change the URL of the file, like this:

```js
<script src="production.min.js?ver=1"></script>
```
to
```js
<script src="production.min.js?ver=2"></script>
```

The version number at the end of the URL is often managed in a YAML file. So, when you deploy your application, you need to update the version number from `1` to `2`. 


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
uses: iisyos/yaml-replacement-action@v1
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
