const request = require('supertest');
const app = require('../index');
const databaseManager = require("../database/database");
const userController = require("../controllers/userController");
const constants = require("../utils/constants");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");


let businessId="";
let jobId="";

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
                businessId=resultBusiness.upsertedId;
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


describe("Jobs endpoint",()=>{

    it("add job",async ()=>{

        const job ={
            jobTitle: "Junior Developer",
            location: "Cluj-Napoca",
            careerLevel: "Entry Level (<2 ani)",
            jobType: "Full-Time",
            studyLevel: "Absolvent",
            domain: "Telecomunicatii",
            description: "Acesta este un job",
            date:199999992133
        }

        let authJwt = jwt.sign({ userId: businessId }, config.tokenSecret, { expiresIn: config.tokenExpiration });

        const res = await request(app)
            .post('/jobs')
            .send(job)
            .set("Authorization", authJwt)
            .set("Content-Type","application/json")
            .set('Accept', 'application/json')
        expect(res.statusCode).toBe(201);
    })

    it("get job",async ()=>{

        let authJwt = jwt.sign({ userId: businessId }, config.tokenSecret, { expiresIn: config.tokenExpiration });

        const res = await request(app)
            .get('/jobs?id='+jobId)
            .set("Authorization", authJwt)
            .set("Content-Type","application/json")
        expect(res.statusCode).toBe(200);
    })

    it("get all jobs",async ()=>{

        let authJwt = jwt.sign({ userId: businessId }, config.tokenSecret, { expiresIn: config.tokenExpiration });

        const res = await request(app)
            .get('/jobs/all')
            .set("Authorization", authJwt)
            .set("Content-Type","application/json")
        expect(res.statusCode).toBe(200);
    })

    it("get my jobs",async ()=>{

        let authJwt = jwt.sign({ userId: businessId }, config.tokenSecret, { expiresIn: config.tokenExpiration });

        const res = await request(app)
            .get('/jobs/my-jobs')
            .set("Authorization", authJwt)
            .set("Content-Type","application/json")
        expect(res.statusCode).toBe(200);
    })

});