/* ============================================
   TribuCalma ITIL 4 — Incident Management
   Práctica ITIL: Incident Management
   ============================================ */

function initIncidentForm() {
    updatePriorityVisual();
}

function updatePriorityVisual() {
    const priority = document.getElementById('incident-priority')?.value;
    const visual = document.getElementById('priority-visual');
    const label = document.getElementById('priority-label');
    const sla = document.getElementById('priority-sla');

    if (!visual || !label || !sla || !priority) return;

    const p = TRIBUCALMA_CONFIG.priorities[priority] || TRIBUCALMA_CONFIG.priorities.media;
    const colorMap = { critica: 'red', alta: 'orange', media: 'yellow', baja: 'green' };

    visual.className = `priority-${priority} bg-${colorMap[priority]}-50 rounded-xl p-3 text-xs flex items-center gap-2`;
    label.textContent = p.label;
    sla.textContent = p.response;
}

function reportIncident() {
    const category = document.getElementById('incident-category')?.value;
    const priority = document.getElementById('incident-priority')?.value;
    const desc = document.getElementById('incident-desc')?.value?.trim();

    if (!category || !desc) {
        alert('Completa la categoría y descripción del incidente.');
        return;
    }

    const p = TRIBUCALMA_CONFIG.priorities[priority] || TRIBUCALMA_CONFIG.priorities.media;
    const ticketId = '#INC-' + Math.floor(1000 + Math.random() * 9000);

    // Notify via Wilson
    if (typeof renderBubble === 'function') {
        renderBubble(`🚨 Incidente reportado. Ticket: ${ticketId} - Prioridad: ${p.label} - Tiempo respuesta: ${p.response}`, 'wilson');
    }

    alert(`Incidente reportado exitosamente.\nTicket: ${ticketId}\nPrioridad: ${p.label}\nTiempo de respuesta SLA: ${p.response}`);

    // Reset form
    document.getElementById('incident-category').value = '';
    document.getElementById('incident-priority').value = 'media';
    document.getElementById('incident-desc').value = '';
    document.getElementById('incident-ticket').value = '';
    updatePriorityVisual();
}

