const Character = require("./model.js");
const db = require("../db-config.js");

beforeAll(async function() {
    await db.migrate.rollback();
    await db.migrate.latest();
})
beforeEach(async function() {
    await db.seed.run();
})
const yoshi = { name: "Yoshi" };

describe("getAll", function() {
    test("[1] resolves all the characters in the table", async function() {
        const result = await Character.getAll();
        expect(result).toHaveLength(5);
        expect(result[0]).toMatchObject({ name: "Mario" });
        expect(result[1]).toMatchObject({ name: "Luigi" });
        expect(result[2]).toMatchObject({ name: "Peach" });
        expect(result[3]).toMatchObject({ name: "Toad" });
        expect(result[4]).toMatchObject({ name: "Bowser" });
    })
    test("[2] all the characters have a 'name' property", async function() {
        const result = await Character.getAll();
        for (let i in result) {
            expect(result[i]).toHaveProperty("name");
        }
    })
})
describe("getById", function() {
    test("[3] resolves the character specified by id", async function() {
        const result = await Character.getById(1);
        expect(result).toMatchObject({ name: "Mario" });
    })
})
describe("add", function() {
    test("[4] resolves a newly created character", async function() {
        const result = await Character.add(yoshi);
        expect(result).toMatchObject(yoshi);
    })
    test("[5] adds the new character to the database", async function() {
        await Character.add(yoshi);
        const result = await db('characters');
        expect(result).toHaveLength(6);
    })
    test("[6] resolves all of the characters in the database", async function () {
        const result = await Character.getAll();
        expect(result).toHaveLength(5);
    })    
})