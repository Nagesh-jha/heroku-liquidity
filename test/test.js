const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server.js");
const should = chai.should();
chai.use(chaiHttp);

//global var
const email = "unit-test@gmail.com"
const email_id = Math.floor(Math.random() * 10000 + 1);
const invalidEmail = "unit-testgmail.com";
var _id = "";
var _did = "";


describe("Login authorized authentication!", () => {
  it("Should validate authorized login email and password", done => {
    let req = {
      email: "liquidity@gmail.com",
      password: "Admin"
    };
    chai
      .request(server)
      .post("/api/login")
      .send(req)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(0);
        res.body.should.have.property("message");
        res.body.message.should.be.a("string");
        res.body.should.have.property("data");
        res.body.data.should.be.a("array");
        done();
      });
  });
});

describe("Login unauthorized authentication!", () => {
  it("Should validate Unauthorized login email and password", done => {
    let req = {
      email: "liquidity1@gmail.com",
      password: "Admin"
    };
    chai
      .request(server)
      .post("/api/login")
      .send(req)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(-1);
        res.body.should.have.property("message");
        res.body.message.should.be.a("string");
        res.body.should.have.property("data");
        res.body.data.should.be.a("array");
        done();
      });
  });
});

describe("Create user", () => {
  it("Should create user", done => {
    let req = {
      firstName: "unitTest",
      lastName: "automation",
      email: "unitTest"+email_id+"@gmail.com",
      mobileNum: 8431326741,
      department: "testing"
    };

    chai
      .request(server)
      .post("/api/createUser")
      .send(req)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(0);
        res.body.should.have.property("message");
        res.body.message.should.be.a("string");
        res.body.should.have.property("data");
        res.body.data.should.be.a("object");
        done();
      });
  });
});
describe("Create user", () => {
  it("Should not create dublicate user", done => {
    let req = {
      firstName: "unit-test",
      lastName: "automation",
      email: "unitTest" + email_id + "@gmail.com",
      mobileNum: 8431326741,
      department: "testing"
    };

    chai
      .request(server)
      .post("/api/createUser")
      .send(req)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(-1);
        res.body.should.have.property("message");
        res.body.message.should.be.a("string");
        done();
      });
  });
});
describe("Create user", () => {
  it("Should not create user with invalid email format", done => {
    let req = {
      firstName: "unitTest",
      lastName: "automation",
      email: invalidEmail,
      mobileNum: 8431326741,
      department: "testing"
    };

    chai
      .request(server)
      .post("/api/createUser")
      .send(req)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object")
        res.body.should.have.property("success").eq(-1);
        res.body.should.have.property("message");
        res.body.message.should.be.a("string");
        done();
      });
  });
});
describe("Get all user list", () => {
  it("Should get all user list", done => {
    let req = {};
    chai
      .request(server)
      .get("/api/getUserList")
      .send(req)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(0);
        res.body.should.have.property("message");
        res.body.message.should.be.a("string");
        res.body.should.have.property("data");
        res.body.data.should.be.a("array");
        _id = res.body.data[0]._id;
        _did = res.body.data[1]._id;
        done();
      });
  });
});

describe("Update user", () => {
  it("Should update user", done => {
    let req = {
      _id: _id,
      firstName: "updatedUser",
      lastName: "automationUpdated",
      email: "nagesh"+(email_id+10)+"@gmail.com",
      mobileNum: 8431326741,
      department: "testingUpdated"
    };
    chai
      .request(server)
      .patch("/api/updateUserInfo")
      .send(req)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(0);
        res.body.should.have.property("message");
        res.body.message.should.be.a("string");
         res.body.should.have.property("data");
         res.body.data.should.be.a("object");
        done();
      });
  });
});

describe("Delete user user", () => {
  it("Should update user", done => {
    chai
      .request(server)
      .delete("/api/deleteUser?_id=" + _did)
      //.send(req)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(0);
        res.body.should.have.property("message");
        res.body.message.should.be.a("string");
        res.body.should.have.property("data");
        res.body.data.should.be.a("object");
        done();
      });
  });
});

describe("Get all department list", () => {
  it("Should get all department list", done => {
    let req = {};
    chai
      .request(server)
      .get("/api/getDepartmentList")
      .send(req)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(0);
        res.body.should.have.property("message");
        res.body.message.should.be.a("string");
        res.body.should.have.property("data");
        res.body.data.should.be.a("array");
        done();
      });
  });
});

describe("Create department", () => {
  it("Should create new department", done => {
    let req = {
         department: "finance"+email_id
    };

    chai
      .request(server)
      .post("/api/createNewDepartment")
      .send(req)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(0);
        res.body.should.have.property("message");
        res.body.message.should.be.a("string");
        res.body.should.have.property("data");
        res.body.data.should.be.a("object");
        done();
      });
  });
});

describe("Create department", () => {
  it("Should not create dublicate deparment", done => {
    let req = {
      department: "finance"
    };

    chai
      .request(server)
      .post("/api/createUser")
      .send(req)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(-1);
        res.body.should.have.property("message");
        res.body.message.should.be.a("string");
        done();
      });
  });
});