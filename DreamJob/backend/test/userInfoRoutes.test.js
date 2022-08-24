const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const request = require("supertest");
const app = require("../index");
const userController = require("../controllers/userController");
const databaseManager = require("../database/database");
const constants = require("../utils/constants");


let userId="";

beforeAll(() => {
    return new Promise(resolve => {
        let user ={
            email:"vlad_moldovan123@yahoo.com",
            password: "test123",
            firstName: "Vlad",
            lastName: "Moldovan",
            county: "Cluj-Napoca",
            city: "Dej",
            birthDate: 1999991412,
            gender: "Male",
            phone: "0749515129",
            avatar: "wwww.goooogl.ro",
            favorites: [],
            role: "client"
        }

        userController.registerUser(user)
            .then(resultUser=>{
                userId=resultUser.upsertedId;
                databaseManager.findDocumentByQuery({_id: resultUser.upsertedId},constants.userCollection)
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

describe("User-Info endpoint",()=>{

    it("get user-info",async ()=>{

        let authJwt = jwt.sign({ userId: userId }, config.tokenSecret, { expiresIn: config.tokenExpiration });

        const res = await request(app)
            .get('/user-info')
            .set("Authorization", authJwt)
            .set("Content-Type","application/json")
        expect(res.statusCode).toBe(200);
    })


});