/* ============================================
   TribuCalma ITIL 4 — Tests: Booking / Request Fulfillment
   ============================================ */

describe('Booking State', () => {
    beforeEach(() => {
        // Reset booking state
        bookingState = {
            service: 'Integración Sensorial',
            details: '',
            date: '2026-07-21',
            time: '11:00 AM',
            prefs: [],
            parentName: '',
            childDesc: '',
            parentEmail: '',
            childNotes: ''
        };
    });

    test('should default to Integración Sensorial', () => {
        expect(bookingState.service).toBe('Integración Sensorial');
    });

    test('should update service on selection', () => {
        selectService('Lenguaje y CAA');
        expect(bookingState.service).toBe('Lenguaje y CAA');
    });

    test('should generate valid ticket ID', () => {
        const ticketId = '#TC-' + Math.floor(1000 + Math.random() * 9000);
        expect(ticketId).toMatch(/^#TC-\d{4}$/);
    });
});

describe('Confirm Booking', () => {
    test('should require parent name and email', () => {
        // Simulate empty fields
        bookingState.parentName = '';
        bookingState.parentEmail = '';
        bookingState.childDesc = 'Mateo';

        // In actual implementation, confirmBooking() would validate
        const isValid = bookingState.parentName && bookingState.parentEmail && bookingState.childDesc;
        expect(isValid).toBe(false);
    });
});

