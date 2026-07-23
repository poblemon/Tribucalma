/* ============================================
   TribuCalma ITIL 4 — Main Entry Point
   Inicializa todos los módulos y utilidades
   ============================================ */

// Accessibility State
let activeContrast = false;
let activeTextSize = false;
let soundActive = false;
let audioCtx = null;
let oscNode = null;
let gainNode = null;

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Render dynamic content
    if (typeof renderServiceCards === 'function') renderServiceCards();
    if (typeof renderSLAs === 'function') renderSLAs();
    if (typeof renderChangeTypes === 'function') renderChangeTypes();
    if (typeof initBooking === 'function') initBooking();
    if (typeof initIncidentForm === 'function') initIncidentForm();
    if (typeof initFeedback === 'function') initFeedback();
    if (typeof updateApiKeyStatus === 'function') updateApiKeyStatus();

    // Generate ticket ID preview
    const preview = document.getElementById('ticket-id-preview');
    if (preview) {
        preview.textContent = '#TC-' + Math.floor(1000 + Math.random() * 9000);
    }
});

// Accessibility Toggles
function toggleAccessibility(mode) {
    if (mode === 'contrast') {
        activeContrast = !activeContrast;
        document.body.classList.toggle('high-contrast', activeContrast);
    } else if (mode === 'text-size') {
        activeTextSize = !activeTextSize;
        document.body.classList.toggle('large-text', activeTextSize);
    }
}

// Sensory Hum Player (White Noise / Ruido Blanco)
function playSensoryHum() {
    const btn = document.getElementById('sound-btn');
    if (!btn) return;

    if (!soundActive) {
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            oscNode = audioCtx.createOscillator();
            gainNode = audioCtx.createGain();
            oscNode.type = 'triangle';
            oscNode.frequency.setValueAtTime(110, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
            oscNode.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscNode.start();
            soundActive = true;
            btn.className = 'px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 transition-all font-medium flex items-center gap-1 text-white';
            btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Sonando Calma';
        } catch (e) {
            console.error('Audio error:', e);
        }
    } else {
        if (oscNode) {
            oscNode.stop();
            oscNode.disconnect();
        }
        soundActive = false;
        btn.className = 'px-2.5 py-1 rounded bg-indigo-800 hover:bg-indigo-700 transition-all font-medium flex items-center gap-1';
        btn.innerHTML = '<i class="fa-solid fa-volume-low"></i> Ruido Blanco';
    }
}

