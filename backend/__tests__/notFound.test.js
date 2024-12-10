const request = require("supertest");
const app = require("../src/app");
const endHandler = require("../src/middlewares/endHandler");

jest.mock("morgan", () => jest.fn(() => (req, res, next) => next()));

describe("not found route test", () => {
    
    afterAll(() => {
        jest.clearAllMocks();
    });
    
    it("should return 404 status code", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(404);
    });

    it("should have been called 'next' function when no 'err' value passed", async () => {

        const err = null;
        const req = jest.fn();
        const res = { status: jest.fn(() => {return { json: jest.fn() }}) };
        const next = jest.fn();

        endHandler.error(err, req, res, next);
        expect(next).toHaveBeenCalled();
    });
});
