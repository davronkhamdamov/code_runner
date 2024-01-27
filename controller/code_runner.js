const { exec } = require("child_process");
const fs = require("fs");

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

function run_code(req, res) {
    const codeToRun = req.body.code;
    if (!codeToRun) {
        return res
            .status(400)
            .json({ error: "Code is required in the request body." });
    }
    fs.writeFile("./controller/code/test.py", codeToRun, async (error) => {
        if (error) throw new Error("Cannot write a file");
        try {
            const output = await runJavaScriptCode("./controller/code/test.py");
            res.send({ result: output });
            fs.writeFileSync("./controller/code/test.py", "");
        } catch (error) {
            res.status(500).send({ message: error });
        }
    });
}

module.exports = run_code;
