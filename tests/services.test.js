/* ============================================
   TribuCalma ITIL 4 — Tests: Services
   Práctica ITIL: Quality Assurance & Testing
   ============================================ */

describe('TRIBUCALMA_CONFIG.services', () => {
    test('should have 4 services defined', () => {
        expect(TRIBUCALMA_CONFIG.services.length).toBe(4);
    });

    test('each service should have required fields', () => {
        TRIBUCALMA_CONFIG.services.forEach(service => {
            expect(service.id).toBeDefined();
            expect(service.name).toBeDefined();
            expect(service.icon).toBeDefined();
            expect(service.price).toBeDefined();
            expect(service.sla).toBeDefined();
            expect(service.sla.label).toBeDefined();
            expect(service.sla.value).toBeGreaterThan(90);
        });
    });

    test('service IDs should be unique', () => {
        const ids = TRIBUCALMA_CONFIG.services.map(s => s.id);
        expect(new Set(ids).size).toBe(ids.length);
    });
});

describe('TRIBUCALMA_CONFIG.slas', () => {
    test('should have response, requests, and changes SLAs', () => {
        expect(TRIBUCALMA_CONFIG.slas.response).toBeDefined();
        expect(TRIBUCALMA_CONFIG.slas.requests).toBeDefined();
        expect(TRIBUCALMA_CONFIG.slas.changes).toBeDefined();
    });

    test('compliance values should be between 0 and 100', () => {
        const allCompliance = [
            TRIBUCALMA_CONFIG.slas.response.compliance,
            TRIBUCALMA_CONFIG.slas.requests.compliance,
            TRIBUCALMA_CONFIG.slas.changes.compliance
        ];
        allCompliance.forEach(val => {
            expect(val).toBeGreaterThan(0);
            expect(val).toBeLessThanOrEqual(100);
        });
    });
});

describe('TRIBUCALMA_CONFIG.kpis', () => {
    test('should have CSAT, NPS, FCR, and MTTR', () => {
        expect(TRIBUCALMA_CONFIG.kpis.csat).toBeDefined();
        expect(TRIBUCALMA_CONFIG.kpis.nps).toBeDefined();
        expect(TRIBUCALMA_CONFIG.kpis.fcr).toBeDefined();
        expect(TRIBUCALMA_CONFIG.kpis.mttr).toBeDefined();
    });
});

describe('TRIBUCALMA_CONFIG.changeTypes', () => {
    test('should have 3 change types', () => {
        expect(TRIBUCALMA_CONFIG.changeTypes.length).toBe(3);
    });

    test('each change type should have rules', () => {
        TRIBUCALMA_CONFIG.changeTypes.forEach(ct => {
            expect(ct.rules.length).toBeGreaterThan(0);
        });
    });
});

describe('TRIBUCALMA_CONFIG.priorities', () => {
    test('should have 4 priority levels', () => {
        const levels = Object.keys(TRIBUCALMA_CONFIG.priorities);
        expect(levels.length).toBe(4);
        expect(levels).toContain('critica');
        expect(levels).toContain('alta');
        expect(levels).toContain('media');
        expect(levels).toContain('baja');
    });
});

