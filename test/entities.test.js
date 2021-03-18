let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

// Assertion Style
chai.should();

chai.use(chaiHttp);

let user = {
  login: "john@doe.com",
  password: "helloworld",
};
let token = "";
let productCategoryId = "";
let productId = "";

describe("Product Category API", () => {
  /**
   * Get the JWT Token for api calls
   */
  before(async () => {
    const axios = require("axios");
    await axios
      .post(
        "http://localhost:" + process.env.APP_PORT + "/api/user/login",
        user
      )
      .then((res) => {
        token = res.data.token;
      })
      .catch((error) => {
        console.error(error);
      });
  });

  /**
   * Test the POST route
   */
  describe("POST /api/product/categories", () => {
    it("It should create a product category", (done) => {
      chai
        .request(server)
        .post("/api/product/categories")
        .send({
          name: `Electronics${Math.random()}`,
        })
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          productCategoryId = res.body.id;
          done();
        });
    });
  });

  /**
   * Test the GET route
   */
  describe("GET /api/product/categories", () => {
    it("It should get all product categories", (done) => {
      chai
        .request(server)
        .get("/api/product/categories")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  /**
   * Test the GET by id route
   */
  describe("GET /api/product/categories/:id", () => {
    it("It should get a product category by id", (done) => {
      chai
        .request(server)
        .get(`/api/product/categories/${productCategoryId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /**
   * Test the PUT route
   */
  describe("PUT /api/product/categories/:id", () => {
    it("It should update a product category by id", (done) => {
      chai
        .request(server)
        .put(`/api/product/categories/${productCategoryId}`)
        .send({
          name: `Updated Electronics${Math.random()}`,
        })
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /**
   * Test the DELETE route
   */
  describe("DELETE /api/product/categories/:id", () => {
    it("It should delete a product category by id", (done) => {
      chai
        .request(server)
        .delete(`/api/product/categories/${productCategoryId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});

describe("Product API", () => {
  /**
   * Test the POST route
   */
  describe("POST /api/products", () => {
    it("It should create a product", (done) => {
      chai
        .request(server)
        .post("/api/products")
        .send({
          product_category_id: productCategoryId,
          name: `Product${Math.random()}`,
          description: `Description${Math.random()}`,
          price_per_unit: Math.random(),
          quantity_in_stock: Math.random() / 1,
        })
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          productId = res.body.id;
          done();
        });
    });
  });

  /**
   * Test the GET route
   */
  describe("GET /api/products", () => {
    it("It should get all products", (done) => {
      chai
        .request(server)
        .get("/api/products")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  /**
   * Test the GET by id route
   */
  describe("GET /api/products/:id", () => {
    it("It should get a product by id", (done) => {
      chai
        .request(server)
        .get(`/api/products/${productId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /**
   * Test the PUT route
   */
  describe("PUT /api/products/:id", () => {
    it("It should update a product by id", (done) => {
      chai
        .request(server)
        .put(`/api/products/${productId}`)
        .send({
          product_category_id: productCategoryId,
          name: `Updated Product${Math.random()}`,
          description: `Updated Description${Math.random()}`,
          price_per_unit: Math.random(),
          quantity_in_stock: Math.random() / 1,
        })
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /**
   * Test the DELETE route
   */
  describe("DELETE /api/products/:id", () => {
    it("It should delete a product by id", (done) => {
      chai
        .request(server)
        .delete(`/api/products/${productId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
