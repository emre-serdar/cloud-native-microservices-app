const request = require('supertest'); // Supertest is used to test HTTP requests
const app = require('../server'); // Import the app instance
const mongoose = require('mongoose'); // Mongoose is used for MongoDB interactions

// Describe the test suite for the Authentication API
describe('Authentication API', () => {

    // Run this after all tests to close the MongoDB connection
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Test case 1: Register a new user successfully
    it('should register a new user', async () => {
        const res = await request(app) // Make a POST request to the signup route
            .post('/api/auth/signup')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'testpassword'
            });
        expect(res.statusCode).toEqual(201); // Expect a 201 status code (Created)
        expect(res.body).toHaveProperty('message', 'User created successfully'); // Expect a success message
    });

    // Test case 2: Should not allow duplicate email registration
    it('should not allow duplicate email registration', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                username: 'testuser2',
                email: 'testuser@example.com', // Use the same email as the previous test
                password: 'testpassword2'
            });
        expect(res.statusCode).toEqual(400); // Expect a 400 status code (Bad Request)
        expect(res.body).toHaveProperty('message', 'User already exists'); // Expect an error message
    });

    // Test case 3: Log in an existing user
    it('should log in an existing user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com', // Use the existing user's email
                password: 'testpassword' // Correct password
            });
        expect(res.statusCode).toEqual(200); // Expect a 200 status code (OK)
        expect(res.body).toHaveProperty('token'); // Expect a token in the response
    });

    // Test case 4: Should not log in with wrong credentials
    it('should not log in with wrong credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com', // Correct email
                password: 'wrongpassword' // Incorrect password
            });
        expect(res.statusCode).toEqual(400); // Expect a 400 status code (Bad Request)
        expect(res.body).toHaveProperty('message', 'Invalid credentials'); // Expect an error message
    });

    // Test case 5: Access the protected route with a valid token
    it('should access the protected route with a valid token', async () => {
        // First, log in to get a token
        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'testpassword'
            });
        const token = loginRes.body.token;

        // Now, access the protected route with the token
        const protectedRes = await request(app)
            .get('/api/auth/protected')
            .set('Authorization', `Bearer ${token}`); // Set the Authorization header with the token
        expect(protectedRes.statusCode).toEqual(200); // Expect a 200 status code (OK)
        expect(protectedRes.body).toHaveProperty('message'); // Expect a message from the protected route
    });
});
