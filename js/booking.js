/* ============================================
   TribuCalma ITIL 4 — Request Fulfillment (Solicitudes)
   Práctica ITIL: Service Request Management
   ============================================ */

let bookingState = {
    service: 'Integración Sensorial',
    details: '',
    date: new Date().toISOString().split('T')[0],
    time: '11:00 AM',
    prefs: [],
    parentName: '',
    childDesc: '',
    parentEmail: '',
    childNotes: ''
};

function initBooking() {
    const preview = document.getElementById('ticket-id-preview');
    if (preview) {
        preview.textContent = '#TC-' + Math.floor(1000 + Math.random() * 9000);
    }
    // Set default date
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
}

function selectService(name) {
    bookingState.service = name;
    document.querySelectorAll('.service-option').forEach(el => {
        el.classList.remove('selected');
        const badge = el.querySelector('.badge-sel');
        if (badge) badge.classList.add('hidden');
    });
    const mapping = { 'Integración Sensorial': 'sensory', 'Lenguaje y CAA': 'speech', 'Terapia Ocupacional': 'occupational' };
    const prefix = mapping[name] || 'sensory';
    const card = document.getElementById('srv-opt-' + prefix);
    if (card) {
        card.classList.add('selected');
        const badge = card.querySelector('.badge-sel');
        if (badge) badge.classList.remove('hidden');
    }
}

function goToStep(step) {
    [1, 2, 3].forEach(i => {
        const el = document.getElementById('booking-step-' + i);
        const tab = document.getElementById('step-tab-' + i);
        if (el) el.classList.add('hidden');
        if (tab) {
            tab.className = i === step
                ? 'border-b-2 border-emerald-500 pb-2 text-emerald-600 font-bold text-xs sm:text-sm'
                : 'border-b-2 border-transparent pb-2 text-slate-400 font-bold text-xs sm:text-sm';
        }
    });

    if (step === 2) {
        bookingState.date = document.getElementById('booking-date')?.value || bookingState.date;
        bookingState.time = document.getElementById('booking-time')?.value || bookingState.time;
    }

    if (step === 3) {
        updateBookingSummary();
    }

    const nextStep = document.getElementById('booking-step-' + step);
    if (nextStep) nextStep.classList.remove('hidden');
}

function updateBookingSummary() {
    const prefs = [];
    const light = document.getElementById('pref-light');
    const sound = document.getElementById('pref-sound');
    if (light?.checked) prefs.push('Luces bajas');
    if (sound?.checked) prefs.push('Sin música');
    bookingState.prefs = prefs;

    const sumSrv = document.getElementById('sum-srv');
    const sumTime = document.getElementById('sum-time');
    const sumChild = document.getElementById('sum-child');
    const sumPref = document.getElementById('sum-pref');

    if (sumSrv) sumSrv.textContent = bookingState.service;
    if (sumTime) sumTime.textContent = bookingState.date + ', ' + bookingState.time;
    if (sumChild) sumChild.textContent = document.getElementById('child-desc')?.value?.trim() || 'No especificado';
    if (sumPref) sumPref.textContent = prefs.length > 0 ? prefs.join(' y ') : 'Ninguno';
}

function confirmBooking() {
    const parentName = document.getElementById('parent-name')?.value?.trim();
    const parentEmail = document.getElementById('parent-email')?.value?.trim();
    const childDesc = document.getElementById('child-desc')?.value?.trim();

    if (!parentName || !parentEmail || !childDesc) {
        alert('Completa todos los datos del solicitante.');
        return;
    }

    bookingState.parentName = parentName;
    bookingState.parentEmail = parentEmail;
    bookingState.childDesc = childDesc;
    bookingState.childNotes = document.getElementById('child-notes')?.value?.trim() || '';

    const ticketId = '#TC-' + Math.floor(1000 + Math.random() * 9000);

    // Show success
    document.getElementById('booking-step-3')?.classList.add('hidden');
    const success = document.getElementById('booking-success');
    if (success) {
        document.getElementById('succ-code').textContent = ticketId;
        document.getElementById('succ-parent').textContent = bookingState.parentName;
        document.getElementById('succ-child').textContent = bookingState.childDesc;
        document.getElementById('succ-time').textContent = bookingState.date + ' a las ' + bookingState.time;
        success.classList.remove('hidden');
    }

    // Notify Wilson
    if (typeof renderBubble === 'function') {
        renderBubble('✅ Solicitud registrada. Ticket: ' + ticketId + ' - Servicio: ' + bookingState.service, 'wilson');
    }
}

function resetBooking() {
    const success = document.getElementById('booking-success');
    if (success) success.classList.add('hidden');

    ['parent-name', 'parent-email', 'child-desc', 'child-notes'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    const light = document.getElementById('pref-light');
    const sound = document.getElementById('pref-sound');
    if (light) light.checked = false;
    if (sound) sound.checked = false;

    goToStep(1);
}

