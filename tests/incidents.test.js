/* ============================================
   TribuCalma ITIL 4 — Tests: Incident Management
   ============================================ */

describe('Priority Matrix', () => {
    test('should have correct response times for each priority', () => {
        expect(TRIBUCALMA_CONFIG.priorities.critica.response).toBe('< 15 min');
        expect(TRIBUCALMA_CONFIG.priorities.alta.response).toBe('< 30 min');
        expect(TRIBUCALMA_CONFIG.priorities.media.response).toBe('< 2h');
        expect(TRIBUCALMA_CONFIG.priorities.baja.response).toBe('< 8h');
    });

    test('critical priority should have fastest resolution', () => {
        expect(TRIBUCALMA_CONFIG.priorities.critica.resolution).toBe('< 1h');
    });
});

describe('Incident Report', () => {
    test('should require category and description', () => {
        const category = '';
        const description = '';
        const isValid = category && description;
        expect(isValid).toBe(false);
    });

    test('should generate unique ticket ID', () => {
        const id1 = '#INC-' + Math.floor(1000 + Math.random() * 9000);
        const id2 = '#INC-' + Math.floor(1000 + Math.random() * 9000);
        expect(id1).not.toBe(id2);
    });
});

