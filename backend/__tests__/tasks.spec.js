require("dotenv").config();

const request = require("supertest");
const app = require("../src/app");
const db = require("../src/models");

jest.mock("morgan", () => jest.fn(() => (req, res, next) => next()));

describe('GET /api/v1/tasks', () => {

    let testDB = db;
    const dummy = { task: "dummy task", done: false }
    const mockResult = {
        ...dummy,
        id: 1,
        createdAt: null,
        updatedAt: null
    }
    
    beforeAll(async () => {
        await testDB.sequelize.sync({ force: true, match: /_test$/ });
        const res = await testDB.tasks.create(dummy);
        const createdDate = new Date(res.dataValues.createdAt);
        const updatedDate = new Date(res.dataValues.updatedAt);
        createdDate.setMilliseconds(0);
        updatedDate.setMilliseconds(0);
        mockResult.createdAt = createdDate.toISOString();
        mockResult.updatedAt = updatedDate.toISOString();
    })
    
    it('should return status 200 with expected body, when given appropriate request', async () => {
        
        const res = await request(app).get('/api/v1/tasks');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body[0]).toMatchObject(mockResult);

    });
    
    afterAll(async () => {
        await testDB.sequelize.close();
    })
});
