require("dotenv").config();

const request = require("supertest");
const app = require("../src/app");
const db = require("../src/models");

jest.mock("morgan", () => jest.fn(() => (req, res, next) => next()));

describe("tasks route tests", () => {

    const testDB = db;
    
    beforeEach(async () => {
        await testDB.sequelize.sync({ force: true, match: /_test$/ });
    });
    
    afterAll(async () => {
        await testDB.sequelize.drop();
        await testDB.sequelize.close();
    });
    
    describe("GET /api/v1/tasks", () => {

        const mockData = { task: "mock task", done: false };
        const mockResult = {
            ...mockData,
            id: 1,
            createdAt: null,
            updatedAt: null
        };
    
        beforeEach(async () => {
            const res = await testDB.tasks.create(mockData);
            mockResult.createdAt = res.dataValues.createdAt.toISOString();
            mockResult.updatedAt = res.dataValues.updatedAt.toISOString();
        });
        
        it("should return all tasks", async () => {
            
            const res = await request(app).get("/api/v1/tasks");
            expect(res.statusCode).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body[0]).toMatchObject(mockResult);
        });
    });
});
