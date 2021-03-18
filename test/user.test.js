let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe("User API", () => {
  /**
   * Test Register
   */
  describe("POST /api/user/register", () => {
    it("It should register a user", (done) => {
      chai
        .request(server)
        .post("/api/user/register")
        .send({
          name: "john",
          login: "john@doe.com",
          password: "helloworld",
        })
        .end((err, res) => {
          [200, 409].should.include(res.status);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  /**
   * Test Login
   */
  describe("POST /api/user/login", () => {
    it("It should login a user", (done) => {
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          login: "john@doe.com",
          password: "helloworld",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("token");
          done();
        });
    });
  });
});
