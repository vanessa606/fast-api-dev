const request = require('supertest')
const app = require('../src/app')
const { calculateValue } = require('../src/logic')

describe('Suite de Pruebas de Calidad de Software', () => {
  describe('Pruebas Unitarias - Lógica de Inventario', () => {
    test('Debe calcular correctamente el valor total (10 * 5 = 50)', () => {
      const result = calculateValue(10, 5)
      expect(result).toBe(50)
    })

    test('Debe retornar 0 si se ingresan valores negativos', () => {
      const result = calculateValue(-10, 5)
      expect(result).toBe(0)
    })

    // ✅ EXTRA 1
    test('Debe retornar 0 si el stock es negativo', () => {
      const result = calculateValue(10, -5)
      expect(result).toBe(0)
    })

    // ✅ EXTRA 2
    test('Debe calcular correctamente con precio en cero', () => {
      const result = calculateValue(0, 10)
      expect(result).toBe(0)
    })
  })

  describe('Pruebas de Integración - API Endpoints', () => {
    test('GET /health - Debe responder con status 200 y JSON correcto', async () => {
      const response = await request(app).get('/health')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('status', 'OK')
    })

    test('GET /items - Debe validar la estructura del inventario', async () => {
      const response = await request(app).get('/items')
      expect(response.statusCode).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body[0]).toHaveProperty('id')
      expect(response.body[0]).toHaveProperty('stock')
    })

    // ✅ EXTRA 3
    test('GET /items no debe estar vacío', async () => {
      const response = await request(app).get('/items')
      expect(response.body.length).toBeGreaterThan(0)
    })

    // ✅ EXTRA 4
    test('Ruta inexistente debe responder 404', async () => {
      const response = await request(app).get('/no-existe')
      expect(response.statusCode).toBe(404)
    })
  })
})
