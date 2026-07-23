/* ============================================
   TribuCalma ITIL 4 — Change Management
   Práctica ITIL: Change Management
   ============================================ */

function renderChangeTypes() {
    const container = document.getElementById('change-types-grid');
    if (!container) return;

    const bgColors = { 'Estándar': 'green', 'Normal': 'amber', 'Emergencia': 'rose' };
    const borderColors = { 'Estándar': 'green-100', 'Normal': 'amber-100', 'Emergencia': 'rose-100' };

    container.innerHTML = TRIBUCALMA_CONFIG.changeTypes.map(c => `
        <div class="bg-${bgColors[c.type]}-50 rounded-2xl p-6 border border-${borderColors[c.type]}">
            <span class="text-3xl mb-3 block">${c.icon}</span>
            <h4 class="font-bold text-indigo-950 mb-2">Cambio ${c.type}</h4>
            <p class="text-xs text-slate-500 mb-3">${c.desc}</p>
            <ul class="text-xs text-slate-600 space-y-1.5">
                ${c.rules.map(r => `<li class="flex items-center gap-2">• ${r}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

