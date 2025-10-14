/*Este servicio (`mock-db-service`) actúa como un microservicio simulado de base de datos.
Forma parte de un entorno de práctica diseñado para aplicar conceptos de arquitectura distribuida,
comunicación entre servicios (Axios, REST) y modelado de escenarios reales en entornos backend modernos.
Su propósito es servir como base de experimentación para comprender la interacción interservicio y la
infraestructura modular de un sistema orientado a microservicios.*/

// Simulación de un microservicio de db, debe estar y ser independiente (otro proyecto)

// ¿Por qué una conexión a una segunda db en un proyecto, para que se usa?
// La principal (produccion) postgresql es para los datos principales para users, posts, likes, etc.
// La segunda (el microservicio al que nos conectamos con axios)
// para ej. metricas, logs, estadisticas, analiticas de uso, historial de busquedas, etc.
// O para ej. experimentacion o migracion de tecnologia, de motor de db, probar funcionalidades.
// O si cada microservicio tiene su propia db, como la cache, chat, auth, post, etc.

// en este caso la idea de simular una base de datos alterna, diferente a la de uso de produccion,
// se aplicaria para pruebas de migracion o experimentacion con otro tipo de base de datos
const express = require('express')

const router = require('./network')

const HOST = process.env.HOST ?? 'localhost'
const PORT = process.env.PORT ?? 4001

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.disable('x-powered-by')

//ROUTES
app.use('/', router)

app.listen(PORT, () => {
  console.log(`Service of Mock DB Client listen on http://${HOST}:${PORT}`)
})
