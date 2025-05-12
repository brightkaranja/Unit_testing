const { login } = require('./login');

describe('Login Function', () => {
  it('should resolve with a token on successful login', async () => {
    const result = await login('user', 'password');
    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
  });

  it('should reject with an error message on invalid credentials', async () => {
    try {
      await login('wrong_user', 'wrong_password');
    } catch (error) {
      expect(error.success).toBe(false);
      expect(error.message).toBe('Invalid credentials');
    }
  })
});