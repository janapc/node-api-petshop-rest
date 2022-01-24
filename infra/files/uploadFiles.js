const fs = require('fs');
const path = require('path');

module.exports = (pathName, fileName, callback) => {
  const typeValids = ['jpg', 'png', 'jpeg'];
  const typeFile = path.extname(pathName);
  const typeIsValid = typeValids.indexOf(typeFile.substring(1)) !== -1;

  if (typeIsValid) {
    const newPath = `./assets/images/${fileName}${typeFile}`;

    fs.createReadStream(pathName)
      .pipe(fs.createWriteStream(newPath))
      .on('finish', () => callback(false, newPath));
  } else callback('Type invalid');
};
