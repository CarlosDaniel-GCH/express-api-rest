import express from 'express'
import jobs from './jobs.json' with { type: 'json' }
import { DEFAULTS } from './config.js'

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()

app.use(express.json())

app.use((req, res, next) => {
    const timeString = new Date().toLocaleTimeString()
    console.log(`[${timeString}] ${req.method} ${req.url}`)
    next()
})

app.get('/', (req, res) => {
    return res.send({ message: 'Hola Mundo' })
})

app.get('/health', (req, res) => {
    return res.json({
        status: 'ok',
        uptime: process.uptime(),
    })
})



// Ruta Opcional - /acd o /abcd
app.get('/a{b}cd', (req, res) => {
    return res.send('Ruta opcional')
})

// Ruta Comodin
app.get('/bb*bb', (req, res) => {
    return res.send('Ruta comodin')
})

app.get('/file/*filename', (req, res) => {
    return res.send('/file*')
})

app.get('/file/:path', (req, res) => {
    const { path } = req.params
    return res.send(`Ruta de archivo: ${path}`)
})

app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`)
})