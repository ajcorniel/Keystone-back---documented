let chai = require("chai"),
  chaiHttp = require("chai-http"),
  chaiPromised = require("chai-as-promised");

chai.use(chaiHttp);
chai.use(chaiPromised);
chai.should();

console.log(`attempting the request to http://localhost:${process.env.PORT}`);
let mainRoute = `http://localhost:8082`;
let usersRoute = "/user";
let entitiesRoute = "/entities/users";

/**
* Gives the posibility to create, see, update and delete users
* @params email, password, firstname, lastname
*/

describe("USERS CRUD TEST", () => {
  let validUser;
  let errorsValidUser;

  describe("POST USER", () => {
    function postUser(request) {
      return chai
        .request(mainRoute)
        .post(usersRoute)
        .send(request);
    }

    before(() => {
      return new Promise((resolve, reject) => {
        // seeds
        validUser = {
          email: "tessst@email.com",
          password: "215151123",
          firstname: "eduardo",
          lastname: "gonzalez"
        };

        errorsValidUser = {
          email: "tesst@email.com",
          password: "215151123",
          firstname: "eduardo",
          lastname: "gonzalez"
        };

        resolve(validUser);
        if (err) reject(err);
      });
    });

    describe(`POST ${mainRoute}${usersRoute}`, () => {
      it("should create the validUser test constant", () => {
        return postUser(validUser).then(res => {
          validUser = res.body;
          console.log(res.status);
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.include({
            email: validUser.email,
            firstname: validUser.firstname,
            lastname: validUser.lastname
          });
        });
      });
    });

    describe(`POST ${mainRoute}${usersRoute}`, () => {
      it("should throw 500 because email exist", () => {
        return postUser(errorsValidUser).then(res => {
          console.log(res.status);
          console.log(res.body);
          res.should.have.status(500);
        });
      });
    });

    describe(`POST ${mainRoute}${usersRoute}`, () => {
      it("should throw 400 because bad params", () => {
        return postUser({ error: true }).then(res => {
          console.log(res.status);
          console.log(res.body);
          res.should.have.status(400);
        });
      });
    });
  });

  describe("GET USER", () => {
    function getUser(request) {
      return chai
        .request(mainRoute)
        .get(usersRoute + `/${request}`)
        .send();
    }

    describe(`GET ${mainRoute}${usersRoute}`, () => {
      it("should get the validUser test constant", () => {
        return getUser(validUser.id).then(res => {
          console.log(res.status);
          console.log(res.body);
          res.body.should.deep.equal(validUser);
          res.should.have.status(200);
          res.body.should.have.property("id");
          res.body.should.be.an("object");
        });
      });
    });

    describe(`GET ${mainRoute}${usersRoute}`, () => {
      it("should throw 404 because id doesnt exist", () => {
        return getUser(15252).then(res => {
          console.log(res.status);
          console.log(res.body);
          res.should.have.status(404);
        });
      });
    });

    describe(`GET ${mainRoute}${usersRoute}`, () => {
      it("should throw 400 because bad params", () => {
        return getUser({ error: true }).then(res => {
          console.log(res.status);
          console.log(res.body);
          res.should.have.status(400);
        });
      });
    });
  });

  describe("DELETE USER", () => {
    function deleteUser(request) {
      return chai
        .request(mainRoute)
        .delete(usersRoute + `/${request}`)
        .send();
    }

    describe(`DELETE ${mainRoute}${usersRoute}`, () => {
      it("should delete the validUser test constant", () => {
        return deleteUser(validUser.id).then(res => {
          console.log(res.status);
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.have.property("message");
          res.body.should.be.an("object");
        });
      });
    });

    describe(`DELETE ${mainRoute}${usersRoute}`, () => {
      it("should throw 404 because id doesnt exist", () => {
        return deleteUser(15252).then(res => {
          console.log(res.status);
          console.log(res.body);
          res.should.have.status(404);
        });
      });
    });

    describe(`DELETE ${mainRoute}${usersRoute}`, () => {
      it("should throw 400 because bad params", () => {
        return deleteUser({ error: true }).then(res => {
          console.log(res.status);
          console.log(res.body);
          res.should.have.status(400);
        });
      });
    });

    describe(`DELETE ${mainRoute}${usersRoute}`, () => {
      it("should throw 403 because cant delete superuser", () => {
        return deleteUser(1).then(res => {
          console.log(res.status);
          console.log(res.body);
          res.should.have.status(403);
        });
      });
    });
  });

  describe("GET ALL USERS", () => {
    function getAll() {
      return chai
        .request(mainRoute)
        .get(entitiesRoute)
        .send();
    }

    describe(`GET ALL ${mainRoute}${entitiesRoute}`, () => {
      it("should get all the users", () => {
        return getAll().then(res => {
          console.log(res.status);
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.an("array");
        });
      });
    });
  });
});
