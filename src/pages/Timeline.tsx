import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Calendar, CheckCircle2, Trophy, Rocket, Briefcase, FileCheck } from 'lucide-react';

const milestones = [
    {
        year: '2004',
        title: 'Fundação da EcoUrbis Ambiental',
        description: 'Início das operações de gestão de resíduos em SP.',
        icon: Rocket,
        category: 'Institucional',
        color: 'bg-primary'
    },
    {
        year: '2010',
        title: 'Certificações SGI',
        description: 'Implementação do Sistema de Gestão Integrado com foco em Riscos Jurídicos.',
        icon: FileCheck,
        category: 'Gestão',
        color: 'bg-green-500'
    },
    {
        year: '2015',
        title: 'Programa de Compliance',
        description: 'Lançamento do programa robusto de Integridade e Canal de Denúncia.',
        icon: CheckCircle2,
        category: 'Legal',
        color: 'bg-blue-500'
    },
    {
        year: '2020',
        title: 'Digitalização Jurídica',
        description: 'Migração completa para workflow digital e automação de contratos.',
        icon: Briefcase,
        category: 'Tecnologia',
        color: 'bg-purple-500'
    },
    {
        year: '2024',
        title: 'Ecossistema Z-Legal',
        description: 'Injeção de inteligência artificial em parceria com a ZFlow Tech.',
        icon: Trophy,
        category: 'Melhoria',
        color: 'bg-yellow-500'
    },
    {
        year: '2026',
        title: 'Portal SP Regula',
        description: 'Automação total da conformidade regulatória para contratos públicos.',
        icon: Rocket,
        category: 'Futuro',
        color: 'bg-red-500'
    }
];

const TimelinePage = () => {
    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto py-12 px-6">
                <header className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Linha do Tempo Institucional</h2>
                    <p className="text-muted-foreground mt-2">Trajetória de ganhos, projetos e execução do Jurídico EcoUrbis.</p>
                </header>

                <div className="relative border-l border-white/10 ml-4 md:ml-8 pl-8 space-y-12">
                    {milestones.map((item, index) => (
                        <div key={index} className="relative animate-in slide-in-from-left duration-700" style={{ animationDelay: `${index * 150}ms` }}>
                            {/* Dot Icon */}
                            <div className={`absolute -left-[53px] w-10 h-10 rounded-full flex items-center justify-center border-4 border-background shadow-xl ${item.color}`}>
                                <item.icon className="w-5 h-5 text-white" />
                            </div>

                            {/* Content Card */}
                            <div className="bg-[#0F0F0F]/50 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-primary/50 hover:bg-[#0F0F0F]/80 transition-all hover:translate-x-2">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-primary tracking-widest">{item.year}</span>
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-muted-foreground uppercase">
                                        {item.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                                <p className="mt-2 text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default TimelinePage;
