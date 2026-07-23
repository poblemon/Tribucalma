// Vercel Serverless Function — Proxy para Wilson Chat (OpenRouter)
// La API Key se lee desde variable de entorno (Settings → Environment Variables)

module.exports = async (req, res) => {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Responder a preflight OPTIONS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Solo aceptamos POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    if (!message || !message.trim()) {
        return res.status(400).json({ error: 'Message is required' });
    }

    // Intentar con API_KEY o OPENROUTER_KEY
    const apiKey = process.env.API_KEY || process.env.OPENROUTER_KEY || '';

    if (!apiKey) {
        return res.status(500).json({
            error: 'API_KEY no configurada',
            hint: 'Ve a Vercel Dashboard → Settings → Environment Variables → agrega API_KEY'
        });
    }

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://tribucalma.vercel.app',
                'X-Title': 'TribuCalma - Wilson'
            },
            body: JSON.stringify({
                model: 'openai/gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: `Eres WILSON, Service Desk Agent de TribuCalma. TribuCalma es un centro de terapia para niños neurodivergentes que aplica ITIL 4 para ITSM. Servicios disponibles: 1) Integración Sensorial ($45, SLA 98%), 2) Lenguaje y CAA ($50, SLA 97%), 3) Terapia Ocupacional ($48, SLA 96%), 4) Apoyo Socio-Emocional ($55, SLA 99%). SLAs: Consultas <2h, Incidentes críticos 15min, Solicitudes <1h. Cambios: Estándar (>48h sin costo), Normal (<48h 15%), Emergencia (sin cargo). Incidentes: Crítica <15min, Alta <30min, Media <2h, Baja <8h. CSI: CSAT 96%, NPS 72, FCR 88%, MTTR 1.2h. Sé empático y cálido. Responde SIEMPRE en español.`
                    },
                    { role: 'user', content: message }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenRouter error:', response.status, errorText);
            return res.status(502).json({
                error: 'OpenRouter respondió con error',
                status: response.status,
                details: errorText.substring(0, 500)
            });
        }

        const data = await response.json();
        const aiText = data.choices?.[0]?.message?.content;

        if (!aiText) {
            return res.status(502).json({ error: 'Respuesta vacía de OpenRouter' });
        }

        return res.status(200).json({ response: aiText });

    } catch (error) {
        console.error('Proxy Error:', error.message);
        return res.status(500).json({
            error: 'Error interno del servidor',
            details: error.message
        });
    }
};

