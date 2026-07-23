// TribuCalma Backend — Wilson Chat API (Express + OpenRouter)
// Desplegar en Render como Web Service

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de salud (health check)
app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'TribuCalma Wilson API', version: '1.0.0' });
});

// Ruta del chat
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message || !message.trim()) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.OPENROUTER_KEY;

    if (!apiKey) {
        return res.status(500).json({
            error: 'API Key no configurada',
            hint: 'Crea una variable de entorno OPENROUTER_KEY en Render Dashboard'
        });
    }

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://tribucalma.onrender.com',
                'X-Title': 'TribuCalma - Wilson'
            },
            body: JSON.stringify({
                model: 'openai/gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: `Eres WILSON, Service Desk Agent de TribuCalma. TribuCalma es un centro de terapia para niños neurodivergentes que aplica ITIL 4 para ITSM.

SERVICIOS DISPONIBLES:
1) Integración Sensorial ($45/sesión, SLA 98%)
2) Lenguaje y CAA ($50/sesión, SLA 97%)
3) Terapia Ocupacional ($48/sesión, SLA 96%)
4) Apoyo Socio-Emocional ($55/sesión, SLA 99%)

SLAs:
- Consultas generales: < 2h hábiles
- Incidentes críticos: 15 min
- Solicitudes de cita: < 1h hábil
- Recordatorio pre-cita: 24h antes
- Historia social digital: 48h antes

TIPOS DE CAMBIO (Reprogramación):
- Estándar: > 48h aviso, sin costo
- Normal: < 48h aviso, cargo 15%
- Emergencia: con justificación, sin cargo

INCIDENTES (Prioridades):
- Crítica: respuesta < 15min, resolución < 1h
- Alta: respuesta < 30min, resolución < 4h
- Media: respuesta < 2h, resolución < 24h
- Baja: respuesta < 8h, resolución < 48h

CSI (Mejora Continua):
- CSAT: 96% | NPS: 72 | FCR: 88% | MTTR: 1.2h

Sé EMPÁTICO, CÁLIDO y PROFESIONAL. Responde SIEMPRE en español.`
                    },
                    { role: 'user', content: message }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenRouter error:', response.status, errorText);
            return res.status(502).json({
                error: 'Error en OpenRouter',
                status: response.status
            });
        }

        const data = await response.json();
        const aiText = data.choices?.[0]?.message?.content;

        if (!aiText) {
            return res.status(502).json({ error: 'Respuesta vacía de OpenRouter' });
        }

        res.json({ response: aiText });

    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ TribuCalma API running on port ${PORT}`);
});

