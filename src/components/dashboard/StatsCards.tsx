import { AlertTriangle, DollarSign, FileText, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StatsCardsProps {
  prazosVencendo: number;
  valorEmRisco: number;
  docsPendentes: number;
  aprovadosHoje: number;
}

export function StatsCards({ prazosVencendo, valorEmRisco, docsPendentes, aprovadosHoje }: StatsCardsProps) {
  const navigate = useNavigate();

  const cards = [
    {
      label: 'Prazos Vencendo',
      value: prazosVencendo.toString(),
      sub: 'Próximos 5 dias úteis',
      icon: AlertTriangle,
      iconBg: 'bg-destructive/10',
      iconColor: 'text-destructive',
      action: () => navigate('/documentos'),
    },
    {
      label: 'Valor em Risco',
      value: `R$ ${valorEmRisco.toLocaleString('pt-BR')}`,
      sub: 'Multas pendentes de defesa',
      icon: DollarSign,
      iconBg: 'bg-warning/10',
      iconColor: 'text-warning',
      action: () => navigate('/documentos'),
    },
    {
      label: 'Docs Pendentes',
      value: docsPendentes.toString(),
      sub: 'Aguardando ação',
      icon: FileText,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      action: () => navigate('/documentos'),
    },
    {
      label: 'Concluídos',
      value: aprovadosHoje.toString(),
      sub: 'Defesas finalizadas',
      icon: CheckCircle2,
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
      action: () => navigate('/documentos'),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <button
          key={card.label}
          onClick={card.action}
          className="flex items-start gap-4 p-5 rounded-lg border border-border bg-card text-left transition-colors hover:border-primary/30 hover:bg-accent/30"
        >
          <div className={`w-10 h-10 rounded-lg ${card.iconBg} flex items-center justify-center shrink-0`}>
            <card.icon className={`w-5 h-5 ${card.iconColor}`} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">{card.label}</p>
            <p className="text-2xl font-semibold text-foreground mt-0.5">{card.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
