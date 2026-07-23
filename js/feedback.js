/* ============================================
   TribuCalma ITIL 4 — CSI (Mejora Continua)
   Práctica ITIL: Continual Improvement
   ============================================ */

let currentRating = 0;

function initFeedback() {
    renderCSIDashboard();
}

function setRating(rating) {
    currentRating = rating;
    const hidden = document.getElementById('feedback-rating');
    if (hidden) hidden.value = rating;

    document.querySelectorAll('#star-rating .star').forEach((star, i) => {
        star.textContent = i < rating ? '★' : '☆';
        star.className = 'cursor-pointer star hover:scale-110 transition-transform ' +
            (i < rating ? 'text-amber-500' : 'text-slate-300');
    });
}

function submitFeedback() {
    const rating = document.getElementById('feedback-rating')?.value;
    const text = document.getElementById('feedback-text')?.value?.trim();

    if (!rating || rating === '0') {
        alert('Selecciona una calificación.');
        return;
    }

    const feedbackId = 'FB-' + Math.floor(100 + Math.random() * 900);

    if (typeof renderBubble === 'function') {
        renderBubble(`📝 Feedback recibido (ID: ${feedbackId}) - Calificación: ${rating}/5`, 'wilson');
    }

    alert(`¡Gracias por tu feedback! ID: ${feedbackId}`);
    
    const textarea = document.getElementById('feedback-text');
    if (textarea) textarea.value = '';
    setRating(0);
}

function renderCSIDashboard() {
    const container = document.getElementById('csi-dashboard');
    if (!container) return;

    container.innerHTML = Object.entries(TRIBUCALMA_CONFIG.kpis).map(([key, kpi]) => {
        const value = kpi.value;
        const percent = kpi.percent || value;
        return `
            <div>
                <div class="flex justify-between text-xs mb-1">
                    <span class="text-slate-500">${kpi.label}</span>
                    <span class="font-bold text-${kpi.color}-600">${value}${typeof value === 'number' ? '%' : ''}</span>
                </div>
                <div class="sla-meter">
                    <div class="sla-meter-fill bg-${kpi.color}-500" style="width:${percent}%"></div>
                </div>
            </div>
        `;
    }).join('');
}

