require("dotenv").config();

const request = require("supertest");
const app = require("../src/app");
const db = require("../src/models");

jest.mock("morgan", () => jest.fn(() => (req, res, next) => next()));

describe("tasks route tests", () => {

    const testDB = db;
    
    afterAll(async () => {
        jest.clearAllMocks();
        await testDB.sequelize.close();
    });
    
    describe("GET /api/v1/tasks", () => {

        const mockData = { task: "mock task", done: false };
        const mockResult = {
            ...mockData,
            id: null,
            createdAt: null,
            updatedAt: null
        };
    
        beforeEach(async () => {
            await testDB.sequelize.sync({ force: true, match: /_test$/ });
            const res = await testDB.tasks.create(mockData);
            mockResult.id = res.dataValues.id;
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
    
    describe("POST /api/v1/tasks", () => {

        const mockBody = { task: "mock task" };
        const mockResult = {
            ...mockBody,
            id: 1,
            done: false
        };
        
        it("should create a new task", async () => {

            await testDB.sequelize.sync({ force: true, match: /_test$/ });

            const res = await request(app).post("/api/v1/tasks").send(mockBody);
            expect(res.statusCode).toBe(201);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body).toMatchObject(mockResult);
            expect(res.body.createdAt).toBeDefined();
        });

        it("should return error of body", async () => {
            const res = await request(app).post("/api/v1/tasks").send({ task: "" });
            expect(res.statusCode).toBe(400);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.error).toBe("the task cannot be empty");
        });
        
        it("should return error of data", async () => {
            const res = await request(app).post("/api/v1/tasks").send(mockBody);
            expect(res.statusCode).toBe(400);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.error).toBe("the task already exists");
        });
    });

    describe("DELETE /api/v1/tasks/:id", () => {
        
        const mockData = { task: "mock task", done: false };
        let mockID = null;
        
        beforeEach(async () => {
            await testDB.sequelize.sync({ force: true, match: /_test$/ });
            const res = await testDB.tasks.create(mockData);
            mockID = res.dataValues.id;
        });
        
        it("should delete existing task", async () => {
            const res = await request(app).delete(`/api/v1/tasks/${mockID}`);
            expect(res.statusCode).toBe(204);
            expect(JSON.stringify(res.body)).toBe("{}")
        });

        it("should return error of data", async () => {
            const res = await request(app).delete(`/api/v1/tasks/${mockID + 1}`);
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe("no task exists")
        });

        it("should return error of parameter", async () => {
            const res = await request(app).delete("/api/v1/tasks/any");
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe("parameter accept integer only")
        });
    });

    describe("PATCH /api/v1/tasks/:id", () => {
        
        const mockData = { task: "mock task", done: false };
        const mockBody = { done: true };
        let mockID = null;
        const mockResult = {
            task: mockData.task,
            done: mockBody.done,
            id: null
        };
        
        beforeEach(async () => {
            await testDB.sequelize.sync({ force: true, match: /_test$/ });
            const res = await testDB.tasks.create(mockData);
            mockID = res.dataValues.id;
            mockResult.id = res.dataValues.id;
        });
        
        it("should update existing task", async () => {
            const res = await request(app).patch(`/api/v1/tasks/${mockID}`).send(mockBody);
            expect(res.statusCode).toBe(200);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body).toMatchObject(mockResult);
        });
        
        it("should return error of request", async () => {
            const res = await request(app).patch(`/api/v1/tasks/${mockID}`).send({ done: "" });
            expect(res.statusCode).toBe(400);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.error).toBe("accept boolean only");
        });
        it("should return error of data", async () => {
            const res = await request(app).patch(`/api/v1/tasks/${mockID + 1}`).send(mockBody);
            expect(res.statusCode).toBe(400);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.error).toBe("no task exists");
        });
    });
});
