const core = require('@actions/core');
const { main } = require('./replace_value_and_commit');

(() => {
  try {
    const folders = core.getInput('folders');
    const targetKey = core.getInput('target-key');
    const needPush = core.getInput('need-push');
    const targetValue = core.getInput('target-value');
    main(folders, targetKey, targetValue, needPush);
  } catch (error) {
    core.setFailed(error.message);
  }
})();

