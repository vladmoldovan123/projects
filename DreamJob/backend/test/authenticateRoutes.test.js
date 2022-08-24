const request = require('supertest');
const app = require('../index');
const databaseManager = require("../database/database");
const userController = require("../controllers/userController");
const constants = require("../utils/constants");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");


beforeAll(() => {
    return new Promise(resolve => {
        let business ={
            email:"vlad.moldovan889m@gmail.com",
            password: "test123",
            name:"GEBS",
            countryCode: "RO",
            registrationCode: "123456",
            address: "Str. Eliade 4",
            city: "Cluj-Napoca",
            country: "Romania",
            avatar: "www.google.ro",
            role: "business"
        }

        userController.registerUser(business)
            .then(resultBusiness=>{
                databaseManager.findDocumentByQuery({_id: resultBusiness.upsertedId},constants.userCollection)
                    .then(r=>{
                        userController.verifyUser(r.confirmationCode)
                            .then(ok=>{
                                resolve();
                            })
                    })
            })
            .catch(err=>{
                console.log("Err: ",err);
            })


    });
});

// afterAll(()=>{
//     return new Promise(resolve => {
//         databaseManager.dropDatabase()
//             .then(()=>{
//                 resolve();
//             })
//     });
// })


describe("Authenticate endpoint",()=>{

    it("login",async ()=>{

        const user ={
            email:"vlad.moldovan889m@gmail.com",
            password: "test123",
        }

        const res = await request(app)
            .post('/authenticate')
            .send(user)
            .set("Content-Type","application/json")
            .set('Accept', 'application/json')
        expect(res.statusCode).toBe(201);
    })



});