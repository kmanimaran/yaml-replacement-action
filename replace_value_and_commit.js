const fs = require('fs');
const yaml = require('js-yaml');
const git = require('simple-git');

const main = async (folders, targetKey, targetValue, needPush) => {

    console.log("Folder list");
    console.log(folders);

    folders.forEach( (element) => {
     console.log(element);
    });

    const yamlFilePath = "secrets/Chart.yaml";
    const gitRepo = git();

    folders.forEach( (element) => {

        yamlFilePath = element + "Chart.yaml";
        const text = await fs.promises.readFile(yamlFilePath, 'utf8').catch((error) => {
            throw new Error(`Error reading YAML file: ${error.message}`);
        });
        let yamlContent = yaml.load(text);
    
        let result;
        try {
            console.log("Replacing with value: " + targetValue + " for " + yamlFilePath);
            result = replaceYamlContents(yamlContent, targetKey, targetValue);
        } catch (error) {
            throw new Error(`Error replacing YAML value: ${error.message}`);
        }
        let updatedYaml = yaml.dump(yamlContent);
        console.log("Updated YAML");
        console.log(updatedYaml);
        await fs.promises.writeFile(yamlFilePath, updatedYaml, 'utf8').catch((error) => {
            throw new Error(`Error writing updated YAML file: ${error.message}`);
        });
        await gitRepo.add(yamlFilePath).catch((error) => {
            throw new Error(`Error adding file to git: ${error.message}`);
        });
    });

    console.log('YAML value replacement successfully.');
    if (needPush === 'false') {
        return;
    }
    
    await gitRepo.addConfig('user.name', 'github-actions[bot]');
    await gitRepo.addConfig('user.email', 'github-actions[bot]@users.noreply.github.com');
    await gitRepo.addConfig('push.autoSetupRemote', true);

    await gitRepo.commit(`Replace YAML ${result.old} to ${result.new} [ci skip]`).catch((error) => {
        throw new Error(`Error committing changes: ${error.message}`);
    });
    await gitRepo.push().catch((error) => {
        throw new Error(`Error pushing changes: ${error.message}`);
    });
}

const replaceYamlContents = (obj, key, targetValue) => {
    const keys = key.split('.');
    const lastKey = keys.pop();

    let current = obj;
    for (const key of keys) {
        if (!current.hasOwnProperty(key)) {
            throw new Error(`Key "${keyPath}" not found in YAML file.`);
        }
        current = current[key];
    }
    if (!current.hasOwnProperty(lastKey)) {
        throw new Error(`Key "${lastKey}" not found in YAML file.`);
    }
    console.log(`Replaced from ${current[lastKey]} to ${targetValue}`);
    current[lastKey] = targetValue;
    return {
        old: current[lastKey],
        new: targetValue
    };
}

module.exports = { main };
