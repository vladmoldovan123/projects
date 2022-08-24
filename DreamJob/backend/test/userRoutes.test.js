const request = require('supertest');
const app = require('../index');
const databaseManager = require("../database/database");


beforeAll(() => {
    return new Promise(resolve => {
        databaseManager.dropDatabase()
            .then(()=>{
                resolve();
            })
    });
});

afterAll(()=>{
    return new Promise(resolve => {
        databaseManager.dropDatabase()
            .then(()=>{
                resolve();
            })
    });
})


describe("SIGNUP endpoint",()=>{

    it("register user",async ()=>{

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


        const res = await request(app)
            .post('/user')
            .send(user)
            .set("Content-Type","application/json")
            .set('Accept', 'application/json')
        expect(res.statusCode).toBe(201);
    })

    it("register business",async ()=>{

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


        const res = await request(app)
            .post('/user/business')
            .send(business)
            .set("Content-Type","application/json")
            .set('Accept', 'application/json')
        expect(res.statusCode).toBe(201);
    })

});