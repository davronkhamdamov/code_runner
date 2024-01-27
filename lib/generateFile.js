const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const dirCodes = path.join(__dirname, "../controller/code");

if (fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}
const generateFile = (format, code) => {
    const jobId = uuid();
    const fileName = `${jobId}.${format}`;
    const filePath = path.join(dirCodes, fileName);
    fs.writeFileSync(filePath, code);
    return filePath;
};

module.exports = { generateFile };
