const request = require("supertest");
//const app = require('express')();
const app = require("../../server");
const agent = request.agent(app);
const { faker } = require('@faker-js/faker');
const db = require("../models");
const Registro = db.registros;

const testData = {  	
	"email": faker.internet.email(), 
	"rut": faker.datatype.number({ max: 99999999 })+"-k", 
	"numero": "56"+faker.datatype.number({ max: 999999999 }), 
	"tipo_cliente": faker.helpers.arrayElement(['cliente', "no cliente"]), 
	"bloqueo_llamadas": faker.helpers.arrayElement([0, 1]), 
	"bloqueo_sms": faker.helpers.arrayElement([0, 1]), 
	"bloqueo_whatsapp": faker.helpers.arrayElement([0, 1]), 
	"bloqueo_email": faker.helpers.arrayElement([0, 1]), 
	"bloqueo_app": faker.helpers.arrayElement([0, 1]), 
	"periodo_bloqueo": "1 año"
}

let userId = 0;

describe("Save registro", function () {
  it("should save registro", function (done) {
    console.log('a guardar', testData);
    agent
      .post("/api/registros")
      .set("Origin", "https://www.entel.cl")
      .send(testData)
      .expect(200)
      .expect(function (res) {
        if (!res.body.hasOwnProperty("id"))
          throw new Error("Expected created registro 'id'!");
      })
      .end((err, res) => {
        if (err) return done(err);
        userId = res.body.id;
        console.log('testData:',testData);
        done();
      });
  });
  
  after(function (done) {
    if (userId > 0) {
      Registro.destroy({
        where: { id: userId }
      }).then(done());
      
    } else {
      done();
    }
  });
  
});
