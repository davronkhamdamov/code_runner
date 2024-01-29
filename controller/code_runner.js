const { generateFile } = require("../lib/generateFile");
const { executeC, executePy } = require("../lib/execute");
const Job = require("../models/job");

async function Status(req, res) {
  const jobId = req.query.id;

  if (!jobId) {
    return res
      .status(400)
      .send({ success: false, error: "Missing id query param" });
  }
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).send({ error: false, error: "Invalid job id" });
    }
    res.send({ success: true, job });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, error: JSON.stringify(error) });
  }
}

async function Run_code(req, res) {
  const { language = "c", code } = req.body;
  if (!code) {
    return res.status(400).json({
      success: false,
      error: "Code is required in the request body.",
    });
  }
  let job;
  try {
    const filePath = generateFile(language, code);
    job = await new Job({ language, filePath }).save();

    res.status(201).send({ success: true, jobId: job["_id"] });

    let output;
    job["startedAt"] = new Date();
    if (language === "c") output = await executeC(filePath);
    else if (language === "py") output = await executePy(filePath);

    job["complatedAt"] = new Date();
    job["status"] = "success";
    job["output"] = output;

    await job.save();

    console.log(job);
  } catch (error) {
    job["complatedAt"] = new Date();
    job["status"] = "error";
    job["output"] = JSON.stringify(error);
    await job.save();
  }
}

module.exports = { Run_code, Status };
