const core = require('@actions/core');
const { main } = require('./replace_yaml_value_and_commit');

(() => {
  try {
    const yamlFilePath = core.getInput('yaml-file-path');
    const targetKey = core.getInput('target-key');
    const needPush = core.getInput('need-push');
    const targetValue = core.getInput('target-value');
    main(yamlFilePath, targetKey, targetValue, needPush);
  } catch (error) {
    core.setFailed(error.message);
  }
})();

