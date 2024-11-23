const request = require('supertest');
const app = require('./server');  // Suponiendo que tu servidor está en el archivo 'server.js'

describe('API REST Tests', () => {
  
  let token;  // Variable para almacenar el token de usuario después del login

  // Test de registro
  it('should register a user successfully', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  // Test de login
  it('should login the user successfully', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Login successful');
    token = res.body.token;  // Guardar el token para las siguientes pruebas
  });

  // Test de obtener perfil (requiere autenticación)
  it('should get the user profile successfully', async () => {
    const res = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.username).toBe('testuser');
  });

  // Test de crear publicación (requiere autenticación)
  it('should create a post successfully', async () => {
    const res = await request(app)
      .post('/api/posts/createPost')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Post',
        description: 'This is a new post',
        price: 100,
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Post created successfully');
  });

});
