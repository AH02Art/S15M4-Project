const db = require("./db-config.js");
const request = require("supertest");
const server = require("./server.js");

beforeAll(async function() {
    await db.migrate.rollback();
    await db.migrate.latest();
})
beforeEach(async function() {
    await db.seed.run();
})

const yoshi = { name: "Yoshi" };

describe("[GET] /characters", function() {
    test(`[1]: responds with a "200 Ok" status`, async function() {
        const response = await request(server).get("/characters");
        expect(response.status).toBe(200);
    })
    test(`[2]: responds with the characters`, async function() {
        const response = await request(server).get("/characters"); 
        expect(response.body).toHaveLength(5);
    })
})
describe("[GET] /characters/:id", function() {
    test(`[3]: responds with a character by specified id`, async function() {
        const response = await request(server).get("/characters/1");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toMatchObject({ name: "Mario" });
    })
})
describe("[POST] /characters", function() {
    test(`[4] responds with a "201 Ok" status`, async function() {
        const response = await request(server).post("/characters").send(yoshi);
        expect(response.status).toBe(201);
    })
    test(`[5] a new character gets added to the database`, async function() {
        await request(server).post("/characters").send(yoshi);
        expect(await db('characters')).toHaveLength(6);
    })
    test(`[6] responds with the new character`, async function() {
        const response = await request(server).post("/characters").send(yoshi);
        expect(response.body).toMatchObject(yoshi);
    })
})