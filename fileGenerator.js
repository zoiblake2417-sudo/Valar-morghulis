const fs = require('fs').promises;
const path = require('path');

const generateFiles = async ({ project_name, files }) => {
  const projectRoot = path.resolve(__dirname, 'generated-apps', project_name);
  await fs.mkdir(projectRoot, { recursive: true });

  for (const file of files) {
    const filePath = path.join(projectRoot, file.path);
    const directory = path.dirname(filePath);
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(filePath, file.content, 'utf8');
  }

  return projectRoot;
};

module.exports = {
  generateFiles
};
