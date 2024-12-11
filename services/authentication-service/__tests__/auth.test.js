const request = require('supertest'); // Supertest is used to test HTTP requests
const app = 'http://0.0.0.0:5000'; // API base URL for the Docker container

/**
 * Test suite for Authentication API in Docker.
 * This suite validates the functionality of the containerized auth-service.
 */
describe('Authentication API in Docker', () => {
    /**
     * Test case: Register a new user successfully.
     * This test ensures that the signup API endpoint is working as expected.
     */
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/signup') // Endpoint for user registration
            .send({
                username: 'testuser', // Sample username
                email: 'testuser@example.com', // Sample email
                password: 'testpassword', // Sample password
            });
        
        // Assertions to verify API behavior
        expect(res.statusCode).toEqual(201); // Expect a 201 (Created) status
        expect(res.body).toHaveProperty('message', 'User created successfully'); // Success message in response
    });

    /**
     * Test case: Prevent duplicate email registration.
     * This test ensures that the system does not allow users to register with the same email twice.
     */
    it('should not allow duplicate email registration', async () => {
        // First registration attempt
        await request(app)
            .post('/api/auth/signup')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'testpassword',
            });

        // Duplicate registration attempt
        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                username: 'testuser2',
                email: 'testuser@example.com', // Same email as the first user
                password: 'testpassword2',
            });

        // Assertions
        expect(res.statusCode).toEqual(400); // Expect a 400 (Bad Request) status
        expect(res.body).toHaveProperty('message', 'User already exists'); // Error message in response
    });

    /**
     * Test case: Log in an existing user.
     * This test ensures that the login API endpoint is working correctly.
     */
    it('should log in an existing user', async () => {
        // Register a new user
        await request(app)
            .post('/api/auth/signup')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'testpassword',
            });

        // Login with the registered user's credentials
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'testpassword',
            });

        // Assertions
        expect(res.statusCode).toEqual(200); // Expect a 200 (OK) status
        expect(res.body).toHaveProperty('token'); // JWT token should be present in the response

        // Save the token globally for use in other tests
        global.token = res.body.token;
        console.log('Token after login: ', global.token); // Log the token for debugging purposes
    });

    /**
     * Test case: Prevent login with incorrect credentials.
     * This test ensures that the login API rejects invalid login attempts.
     */
    it('should not log in with wrong credentials', async () => {
        // Attempt login with incorrect password
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com', // Correct email
                password: 'wrongpassword', // Incorrect password
            });

        // Assertions
        expect(res.statusCode).toEqual(400); // Expect a 400 (Bad Request) status
        expect(res.body).toHaveProperty('message', 'Invalid credentials'); // Error message in response
    });

    /**
     * Test case: Access the protected route with a valid token.
     * This test ensures that protected routes can only be accessed with a valid JWT token.
     */
    it('should access the protected route with a valid token', async () => {
        // Ensure the token was retrieved during the login test
        expect(global.token).toBeDefined();

        // Access the protected route using the token
        const protectedRes = await request(app)
            .get('/api/auth/protected') // Protected route endpoint
            .set('Authorization', `Bearer ${global.token}`); // Set Authorization header with the token

        console.log('Protected Route Response: ', protectedRes.body); // Log the protected route response

        // Assertions
        expect(protectedRes.statusCode).toEqual(200); // Expect a 200 (OK) status
        expect(protectedRes.body).toHaveProperty('message'); // Check for a success message in the response
    });
});
