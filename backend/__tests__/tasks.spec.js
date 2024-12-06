require('dotenv').config();

const request = require('supertest');
const app = require('../src/app');
const models = require('../src/models');

jest.mock('morgan', () => jest.fn(() => (req, res, next) => next()));

describe('tasks routes test', () => {
    
    describe('GET /api/v1/tasks', () => {
        
        const mockData = [{ id: 1, task: "a task", done: false, createdAt: "2024-01-01T00:00", updatedAt: "2024-01-01T00:00" }]
        const mockDB = jest.spyOn(models.tasks, 'findAll');
        mockDB.mockImplementationOnce(() => Promise.resolve(mockData));
        
        it('should return status 200 with expected body, when given appropriate request', async () => {
            
            const res = await request(app).get('/api/v1/tasks');
            expect(res.statusCode).toBe(200);
            expect(res.body).toStrictEqual(mockData);
        });
    });
});
