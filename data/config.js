/* ============================================
   TribuCalma ITIL 4 — Data Configuration
   ============================================ */

const TRIBUCALMA_CONFIG = {
    // Service Catalog
    services: [
        {
            id: 'sensory',
            name: 'Integración Sensorial',
            icon: 'fa-hand-sparkles',
            color: 'emerald',
            description: 'Regulación táctil, vestibular y propioceptiva en sala de baja estimulación.',
            sla: { label: '98%', color: 'emerald', value: 98 },
            details: '45 min sesión · 15 min transición',
            kpi: 'Tiempo de respuesta: 2h · Satisfacción: 98%',
            price: '$45/sesión · Paquete 5: $200'
        },
        {
            id: 'speech',
            name: 'Lenguaje y CAA',
            icon: 'fa-comments',
            color: 'indigo',
            description: 'Comunicación verbal y aumentativa con pictogramas y tecnología asistiva.',
            sla: { label: '97%', color: 'indigo', value: 97 },
            details: '45 min sesión · Material incluido',
            kpi: 'Evaluación inicial: 48h · Progreso: bimestral',
            price: '$50/sesión · Paquete 5: $225'
        },
        {
            id: 'occupational',
            name: 'Terapia Ocupacional',
            icon: 'fa-puzzle-piece',
            color: 'amber',
            description: 'Motricidad fina, autonomía diaria, alimentación y escritura.',
            sla: { label: '96%', color: 'amber', value: 96 },
            details: '45 min sesión · Material sensorial incluido',
            kpi: 'Evaluación funcional: 72h · Reporte mensual',
            price: '$48/sesión · Paquete 5: $215'
        },
        {
            id: 'behavioral',
            name: 'Apoyo Socio-Emocional',
            icon: 'fa-shield-heart',
            color: 'rose',
            description: 'Regulación emocional, habilidades sociales y manejo de crisis.',
            sla: { label: '99%', color: 'rose', value: 99 },
            details: '50 min sesión · Plan de crisis personalizado',
            kpi: 'Contención en crisis: 15 min · Seguimiento semanal',
            price: '$55/sesión · Paquete 5: $250'
        }
    ],

    // SLAs
    slas: {
        response: {
            'Consultas generales': '< 2h hábiles',
            'Incidentes críticos': '15 min',
            'Solicitudes de cita': '< 1h hábil',
            compliance: 98.7
        },
        requests: {
            'Confirmación de cita': '30 min',
            'Recordatorio pre-cita': '24h antes',
            'Historia social digital': '48h antes',
            compliance: 99.2
        },
        changes: {
            'Reprogramación (Cambio Normal)': '24h aviso',
            'Cancelación (Cambio Emergencia)': '2h aviso',
            'Cambio de terapeuta': '48h aviso',
            compliance: 97.5
        }
    },

    // CSI - KPIs
    kpis: {
        csat: { label: 'Satisfacción General (CSAT)', value: 96, color: 'emerald' },
        nps: { label: 'Net Promoter Score (NPS)', value: 72, color: 'indigo' },
        fcr: { label: 'Tasa de Resolución 1er Contacto (FCR)', value: 88, color: 'amber' },
        mttr: { label: 'Tiempo Promedio de Resolución (MTTR)', value: '1.2h', color: 'rose', percent: 92 }
    },

    // Change types
    changeTypes: [
        {
            type: 'Estándar',
            icon: '✅',
            bg: 'green',
            desc: 'Pre-aprobado, bajo riesgo, procedimiento conocido.',
            rules: [
                'Reprogramar con > 48h aviso',
                'Sin costo adicional',
                'Confirmación automática'
            ]
        },
        {
            type: 'Normal',
            icon: '🔄',
            bg: 'amber',
            desc: 'Requiere evaluación por nuestro CAB.',
            rules: [
                'Reprogramar con < 48h aviso',
                'Cargo del 15% de la sesión',
                'Evaluación manual'
            ]
        },
        {
            type: 'Emergencia',
            icon: '🚨',
            bg: 'rose',
            desc: 'Situaciones imprevistas o de fuerza mayor.',
            rules: [
                'Enfermedad o emergencia real',
                'Sin cargo (con justificación)',
                'Prioridad de re-agendamiento'
            ]
        }
    ],

    // Priority matrix for incidents
    priorities: {
        critica: { label: 'Crítica', response: '< 15 min', resolution: '< 1h', color: 'red' },
        alta: { label: 'Alta', response: '< 30 min', resolution: '< 4h', color: 'orange' },
        media: { label: 'Media', response: '< 2h', resolution: '< 24h', color: 'yellow' },
        baja: { label: 'Baja', response: '< 8h', resolution: '< 48h', color: 'green' }
    },

    // Default OpenRouter key — Reemplázala con tu key de https://openrouter.ai/keys
    defaultOpenRouterKey: ''
};

