const request = require("supertest");
const app = require("../src/app");

jest.mock("morgan", () => jest.fn(() => (req, res, next) => next()));

describe("not found route test", () => {
    
    afterAll(() => {
        jest.clearAllMocks();
    });
    
    it("should return 404 status code", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(404);
    });
});
