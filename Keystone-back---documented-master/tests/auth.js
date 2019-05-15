let chai = require("chai"),
  chaiHttp = require("chai-http"),
  chaiPromised = require("chai-as-promised");

chai.use(chaiHttp);
chai.use(chaiPromised);
chai.should();

console.log(process.env.PORT)
console.log(`attempting the request to http://localhost:${process.env.PORT}`)
let mainRoute = `http://localhost:8082`;
let authRoute = "/login";

/**
* Validates the user
* @param {object} user
* @returns status(200), status(400), status(403), status(404)
*/

describe("AUTH TEST", () => {
  let validUser;
  let errorsParams;
  let errorEmail;
  let errorPassword;

  describe("Authentication testing", () => {
    function loginUser(request) {
      return chai
        .request(mainRoute)
        .post(authRoute)
        .send(request);
    }

    before(() => {
      return new Promise((resolve, reject) => {
        try {
          // seeds
          validUser = {
            email: "eg@email.com",
            password: "secret"
          };

          errorsParams = {
            emasil: "eg@email.com",
            password: "secret"
          };

          errorEmail = {
            email: "esg@email.com",
            password: "secret"
          };

          errorPassword = {
            email: "eg@email.com",
            password: "secreta"
          };

          resolve(validUser);
        } catch (err) {
          reject(err);
        }
      });
    });

    describe(`LOGIN ${mainRoute}${authRoute}`, () => {
      it("should login the validUser test constant", () => {
        return loginUser(validUser).then(res => {
          validUser = res.body;
          console.log(res.status);
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.include({
            token: validUser.token
          });
        });
      });
    });

    describe(`LOGIN ${mainRoute}${authRoute}`, () => {
      it("should throw 400 because bad params", () => {
        return loginUser(errorsParams).then(res => {
          console.log(res.status);
          console.log(res.body);
          res.should.have.status(400);
        });
      });
    });

    describe(`LOGIN ${mainRoute}${authRoute}`, () => {
      it("should throw 404 because email doesnt exist", () => {
        return loginUser(errorEmail).then(res => {
          console.log(res.status);
          console.log(res.body);
          res.should.have.status(404);
        });
      });
    });

    describe(`LOGIN ${mainRoute}${authRoute}`, () => {
      it("should throw 403 because wrong password", () => {
        return loginUser(errorPassword).then(res => {
          console.log(res.status);
          console.log(res.body);
          res.should.have.status(403);
        });
      });
    });
  });
});
