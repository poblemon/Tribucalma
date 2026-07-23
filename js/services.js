/* ============================================
   TribuCalma ITIL 4 — Service Catalog (Catálogo de Servicios)
   Práctica ITIL: Service Catalog Management + SLM
   ============================================ */

function renderServiceCards() {
    const container = document.getElementById('services-grid');
    if (!container) return;

    container.innerHTML = TRIBUCALMA_CONFIG.services.map(s => `
        <div onclick="toggleServiceDetail('${s.id}')" 
             class="cursor-pointer group bg-[#FAF6F0] border border-indigo-50 rounded-2xl p-6 hover:border-emerald-500/50 hover:shadow-lg transition-all relative overflow-hidden"
             id="card-${s.id}">
            <span class="absolute top-0 right-0 itil-badge text-[9px] px-2 py-0.5 rounded-bl-xl text-indigo-700 font-bold">
                SLA ${s.sla.label}
            </span>
            <div class="h-12 w-12 rounded-xl bg-${s.color}-100 text-${s.color}-700 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
                <i class="fa-solid ${s.icon}"></i>
            </div>
            <h3 class="text-lg font-bold text-indigo-950 mb-2">${s.name}</h3>
            <p class="text-xs text-slate-500 line-clamp-3">${s.description}</p>
            <div class="mt-3">
                <div class="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Cumplimiento SLA</span>
                    <span class="font-bold text-${s.color}-600">${s.sla.label}</span>
                </div>
                <div class="sla-meter">
                    <div class="sla-meter-fill bg-${s.color}-500" style="width:${s.sla.value}%"></div>
                </div>
            </div>
            <div class="mt-3 flex items-center gap-1.5 text-xs text-${s.color}-600 font-bold group-hover:translate-x-1 transition-transform">
                <span>Ver servicio + SLA</span> <i class="fa-solid fa-chevron-right text-[10px]"></i>
            </div>
            <div id="detail-${s.id}" class="hidden mt-4 pt-4 border-t border-indigo-100/50 text-xs text-slate-600 space-y-2">
                <p><strong>SLA:</strong> ${s.details}</p>
                <p><strong>KPI:</strong> ${s.kpi}</p>
                <p><strong>Costo:</strong> ${s.price}</p>
            </div>
        </div>
    `).join('');
}

function toggleServiceDetail(id) {
    const detail = document.getElementById('detail-' + id);
    const card = document.getElementById('card-' + id);
    if (detail && card) {
        detail.classList.toggle('hidden');
        card.classList.toggle('border-emerald-500');
        card.classList.toggle('shadow-md');
    }
}

function renderSLAs() {
    // Render response SLAs
    const slaResponse = document.getElementById('sla-response');
    if (slaResponse) {
        const s = TRIBUCALMA_CONFIG.slas.response;
        slaResponse.innerHTML = Object.entries(s)
            .filter(([k]) => k !== 'compliance')
            .map(([k, v]) => `
                <div class="flex justify-between items-center">
                    <span class="text-slate-500">${k}</span>
                    <span class="font-bold text-indigo-950">${v}</span>
                </div>
            `).join('') +
            `<div class="mt-3 pt-3 border-t border-indigo-50">
                <div class="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Cumplimiento general</span>
                    <span class="font-bold text-emerald-600">${s.compliance}%</span>
                </div>
                <div class="sla-meter">
                    <div class="sla-meter-fill bg-emerald-500" style="width:${s.compliance}%"></div>
                </div>
            </div>`;
    }

    // Render request SLAs
    const slaRequests = document.getElementById('sla-requests');
    if (slaRequests) {
        const s = TRIBUCALMA_CONFIG.slas.requests;
        slaRequests.innerHTML = Object.entries(s)
            .filter(([k]) => k !== 'compliance')
            .map(([k, v]) => `
                <div class="flex justify-between items-center">
                    <span class="text-slate-500">${k}</span>
                    <span class="font-bold text-indigo-950">${v}</span>
                </div>
            `).join('') +
            `<div class="mt-3 pt-3 border-t border-indigo-50">
                <div class="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Cumplimiento</span>
                    <span class="font-bold text-indigo-600">${s.compliance}%</span>
                </div>
                <div class="sla-meter">
                    <div class="sla-meter-fill bg-indigo-500" style="width:${s.compliance}%"></div>
                </div>
            </div>`;
    }

    // Render change SLAs
    const slaChanges = document.getElementById('sla-changes');
    if (slaChanges) {
        const s = TRIBUCALMA_CONFIG.slas.changes;
        slaChanges.innerHTML = Object.entries(s)
            .filter(([k]) => k !== 'compliance')
            .map(([k, v]) => `
                <div class="flex justify-between items-center">
                    <span class="text-slate-500">${k}</span>
                    <span class="font-bold text-indigo-950">${v}</span>
                </div>
            `).join('') +
            `<div class="mt-3 pt-3 border-t border-indigo-50">
                <div class="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Cumplimiento</span>
                    <span class="font-bold text-amber-600">${s.compliance}%</span>
                </div>
                <div class="sla-meter">
                    <div class="sla-meter-fill bg-amber-500" style="width:${s.compliance}%"></div>
                </div>
            </div>`;
    }
}

