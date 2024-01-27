const { exec } = require("child_process");
const path = require("path");
const outputPath = path.join(__dirname, "../controller/outputs");
const fs = require("fs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeC = (filePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    return new Promise((resolve, reject) => {
        exec(
            `gcc ${filePath} -o ${outPath} && ${outputPath}/${jobId}.out`,
            (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject({ stderr });
                resolve(stdout);
            }
        );
    });
};

module.exports = { executeC };
