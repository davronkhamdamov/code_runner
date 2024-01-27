const { exec } = require("child_process");
const fs = require("fs");
const { generateFile } = require("../lib/generateFile");
const { executeC } = require("../lib/execute");

function runJavaScriptCode(file_path) {
    try {
        return new Promise((resolve, reject) => {
            exec("python " + file_path, (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject(stderr);
                resolve(stdout);
            });
        });
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        return { error: error.message };
    }
}

async function run_code(req, res) {
    const { format = "c", code } = req.body;
    if (!code) {
        return res.status(400).json({
            success: false,
            error: "Code is required in the request body.",
        });
    }
    try {
        const filePath = generateFile(format, code);
        const output = await executeC(filePath);
        res.send({ output });
    } catch (error) {
        res.status(500).json(error);
    }
    // fs.writeFile("./controller/code/test.py", codeToRun, async (error) => {
    //     if (error) throw new Error("Cannot write a file");
    //     try {
    //         const output = await runJavaScriptCode("./controller/code/test.py");
    //         res.send({ result: output });
    //         fs.writeFileSync("./controller/code/test.py", "");
    //     } catch (error) {
    //         res.status(500).send({ message: error });
    //     }
    // });
}

module.exports = run_code;
