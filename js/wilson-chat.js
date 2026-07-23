/* ============================================
   TribuCalma ITIL 4 — Service Desk (Wilson Chat)
   Práctica ITIL: Service Desk
   ============================================ */

// Obtén tu API Key gratuita en https://openrouter.ai/keys
const DEFAULT_KEY = ''; // ← Reemplaza con tu API Key de OpenRouter o configúrala en la UI

function getActiveKey() {
    return localStorage.getItem('tribucalma_openrouter_key') || DEFAULT_KEY;
}

function toggleWilsonChat() {
    const panel = document.getElementById('wilson-chat-panel');
    if (panel) panel.classList.toggle('hidden');
    updateApiKeyStatus();
}

function handleChatEnter(event) {
    if (event.key === 'Enter') sendChatMessage();
}

function quickAction(type) {
    const messages = {
        servicios: 'Quiero conocer los servicios disponibles con sus SLAs',
        cita: 'Quiero agendar una cita (solicitud de servicio)',
        incidente: 'Quiero reportar un incidente',
        cambio: 'Necesito reprogramar mi cita (cambio)',
        sla: 'Muéstrame los SLAs vigentes'
    };
    const input = document.getElementById('user-chat-input');
    if (input) {
        input.value = messages[type] || '';
        sendChatMessage();
    }
}

async function sendChatMessage() {
    const input = document.getElementById('user-chat-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    renderBubble(text, 'user');

    const placeholderId = renderTypingPlaceholder();

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getActiveKey(),
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://tribucalma.app',
                'X-Title': 'TribuCalma - Wilson'
            },
            body: JSON.stringify({
                model: 'openai/gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: `Eres WILSON, Service Desk Agent de TribuCalma. 
                        TribuCalma es un centro de terapia para niños neurodivergentes que aplica ITIL 4 para ITSM. 
                        Servicios: 1) Integración Sensorial ($45, SLA 98%), 2) Lenguaje y CAA ($50, SLA 97%), 
                        3) Terapia Ocupacional ($48, SLA 96%), 4) Apoyo Socio-Emocional ($55, SLA 99%). 
                        SLAs: Consultas <2h, Incidentes críticos 15min, Solicitudes <1h, Recordatorio 24h, Historia social 48h. 
                        Cambios: Estándar (>48h sin costo), Normal (<48h 15%), Emergencia (sin cargo). 
                        Incidentes: Crítica <15min, Alta <30min, Media <2h, Baja <8h. 
                        CSI: CSAT 96%, NPS 72, FCR 88%, MTTR 1.2h. 
                        Sé EMPÁTICO y CÁLIDO. Responde SIEMPRE en español.`
                    },
                    { role: 'user', content: text }
                ]
            })
        });

        if (!response.ok) throw new Error('API Error ' + response.status);

        const data = await response.json();
        const aiText = data.choices?.[0]?.message?.content;

        removePlaceholder(placeholderId);

        if (aiText && aiText.trim()) {
            renderBubble(aiText.trim(), 'wilson');
            return;
        }
        throw new Error('Empty response');
    } catch (e) {
        console.error('Wilson Chat Error:', e);
        removePlaceholder(placeholderId);
        renderBubble(
            'Disculpa, tengo problemas de conexión. Pregúntame sobre servicios, SLAs, agenda, incidentes o cambios.',
            'wilson'
        );
    }
}

function renderBubble(text, sender) {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    const wrapper = document.createElement('div');

    if (sender === 'user') {
        wrapper.className = 'flex justify-end gap-2.5 max-w-[85%] ml-auto';
        wrapper.innerHTML = `<div class="bg-indigo-900 text-white p-3 rounded-2xl rounded-tr-none shadow-sm font-light"><p>${text}</p></div>`;
    } else {
        wrapper.className = 'flex gap-2.5 items-start max-w-[85%]';
        const formatted = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        wrapper.innerHTML = `
            <div class="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-[10px]">
                <i class="fa-solid fa-headset"></i>
            </div>
            <div class="bg-white border border-indigo-50 p-3 rounded-2xl rounded-tl-none shadow-sm">
                <p class="text-slate-600 font-light">${formatted}</p>
            </div>
        `;
    }

    container.appendChild(wrapper);
    container.scrollTop = container.scrollHeight;
}

function renderTypingPlaceholder() {
    const container = document.getElementById('chat-messages-container');
    if (!container) return '';

    const id = 'typing-' + Date.now();
    const wrapper = document.createElement('div');
    wrapper.id = id;
    wrapper.className = 'flex gap-2.5 items-start max-w-[85%]';
    wrapper.innerHTML = `
        <div class="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-[10px]">
            <i class="fa-solid fa-headset"></i>
        </div>
        <div class="bg-white border border-indigo-50 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
            <span class="h-2 w-2 rounded-full bg-slate-400 animate-bounce"></span>
            <span class="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style="animation-delay:0.2s"></span>
            <span class="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style="animation-delay:0.4s"></span>
        </div>
    `;
    container.appendChild(wrapper);
    container.scrollTop = container.scrollHeight;
    return id;
}

function removePlaceholder(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

// API Key Management
function toggleApiKeyModal() {
    const modal = document.getElementById('api-key-modal');
    if (modal) {
        modal.classList.toggle('hidden');
        const saved = getActiveKey();
        const input = document.getElementById('api-key-input');
        if (input && saved !== DEFAULT_KEY) input.value = saved;
    }
    updateApiKeyStatus();
}

function saveApiKey() {
    const key = document.getElementById('api-key-input')?.value?.trim();
    if (!key || key.length < 5) {
        alert('Ingresa una API Key válida.');
        return;
    }
    localStorage.setItem('tribucalma_openrouter_key', key);
    document.getElementById('api-key-modal')?.classList.add('hidden');
    updateApiKeyStatus();
    alert('API Key guardada exitosamente.');
}

function clearApiKey() {
    if (!confirm('¿Borrar API Key?')) return;
    localStorage.removeItem('tribucalma_openrouter_key');
    const input = document.getElementById('api-key-input');
    if (input) input.value = '';
    document.getElementById('api-key-modal')?.classList.add('hidden');
    updateApiKeyStatus();
}

function updateApiKeyStatus() {
    const key = getActiveKey();
    const statusEl = document.getElementById('api-key-status');
    const btn = document.getElementById('api-key-status-btn');

    if (!statusEl && !btn) return;

    if (key && key.length > 5) {
        const masked = key.substring(0, 6) + '...' + key.substring(key.length - 4);
        if (statusEl) {
            statusEl.innerHTML = `Key configurada: <code class="font-mono bg-indigo-50 px-1 rounded">${masked}</code>`;
        }
        if (btn) {
            btn.innerHTML = `<i class="fa-solid fa-key text-emerald-300"></i> ${masked}`;
            btn.className = 'text-[9px] bg-emerald-800 hover:bg-emerald-700 text-emerald-200 px-2 py-1 rounded-full transition-colors flex items-center gap-1';
        }
    } else {
        if (statusEl) {
            statusEl.innerHTML = 'Default activa. <a href="#" onclick="toggleApiKeyModal();return false;" class="text-emerald-600 hover:underline font-bold">Cambiar key</a>';
        }
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-key"></i> Key';
            btn.className = 'text-[9px] bg-indigo-800 hover:bg-indigo-700 text-indigo-200 px-2 py-1 rounded-full transition-colors flex items-center gap-1';
        }
    }
}

// Initialize chat with welcome message
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('chat-messages-container');
    if (container && container.children.length === 0) {
        renderBubble(
            'Hola! Soy <strong>Wilson</strong>, tu Service Desk con IA. 🚀<br><br>' +
            'Puedo ayudarte con: Catálogo de Servicios, SLAs, Solicitudes, Incidentes, Cambios, Mejora Continua y más.<br><br>' +
            '¿En qué puedo servirte hoy?',
            'wilson'
        );
    }
});

