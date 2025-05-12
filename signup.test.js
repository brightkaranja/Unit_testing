const signup = require('./signup');

global.fetch = jest.fn();

describe('signup', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should successfully signup a user', async () => {
    
    const mockResponseData = { message: 'User created successfully', userId: 123 };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponseData),
    });
    const result = await signup('test@example.com', 'password123');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
    });
    expect(result).toEqual(mockResponseData);
  });

  it('should handle signup failure', async () => {
  
    const mockErrorResponseData = { message: 'Email already exists' };
    fetch.mockResolvedValue({
      ok: false,
      status: 400,
      json: () => Promise.resolve(mockErrorResponseData),
    });

 
    try {
      await signup('test@example.com', 'password123');
    } catch (error) {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(error.message).toBe('Email already exists');
    }
  });

    it('should handle network errors', async () => {

    fetch.mockRejectedValue(new Error('Network error'));
    try {
      await signup('test@example.com', 'password123');
    } catch (error) {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(error.message).toBe('Network error');
    }
  })
});