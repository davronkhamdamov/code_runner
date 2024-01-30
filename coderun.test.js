const assert = require("assert");
const request = require("supertest");
const app = require("./main");

describe("code runing test", () => {
  it("c code run", async (done) => {
    const dataC = {
      code: `
        #include <stdio.h>
        int main() {
            printf("Hello, World!\n");
            return 0;
        }`,
    };
    const JobId = await request(app)
      .post("/code/run")
      .send(dataC)
      .expect(201)
      .expect("Content-Type", /json/);

    const result = await request(app)
      .get("/code/status?id=" + JobId.body.jobId)
      .expect(200)
      .expect("Content-type", /json/);

    console.log(result.job.status, "pending");

    assert.deepStrictEqual(
      result.job && result.job.status,
      "Something went wrong"
    );
    done();
  });
  it("Python code run", (done) => {
    const dataPython = {
      code: `print("Hello")`,
    };
    request(app)
      .post("/code/run")
      .send(dataPython)
      .expect(201)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        const uuidRegex = /^[0-9a-fA-F]{24}$/;
        const isValidUUID = uuidRegex.test(res.body.jobId);
        assert.deepStrictEqual(
          isValidUUID,
          true,
          "Response does not contain a valid UUID"
        );
        done();
      });
  });
});
