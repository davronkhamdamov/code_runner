const { exec } = require("child_process");
const fs = require("fs");
const { generateFile } = require("../lib/generateFile");
const { executeC, executePy } = require("../lib/execute");


async function run_code(req, res) {
    const { language = "c", code } = req.body;
    if (!code) {
        return res.status(400).json({
            success: false,
            error: "Code is required in the request body.",
        });
    }
    try {
        const filePath = generateFile(language, code);
        let output;
        if (language === "c") {
            output = await executeC(filePath);
        } else if (language === "py") {
            output = await executePy(filePath)
        }
        res.send({ output });
    } catch (error) {
        res.status(500).send(error);
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
