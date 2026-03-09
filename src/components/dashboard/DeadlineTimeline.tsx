import { ZFlowDocument } from '@/data/mockData';
import { AlertTriangle, Clock } from 'lucide-react';

interface DeadlineTimelineProps {
  documents: ZFlowDocument[];
}

export function DeadlineTimeline({ documents }: DeadlineTimelineProps) {
  const activeDocuments = documents
    .filter(d => d.status !== 'concluido' && d.status !== 'recusado')
    .sort((a, b) => a.diasRestantes - b.diasRestantes);

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <Clock className="w-4 h-4 text-primary" />
        Prazos Próximos
      </h3>
      <div className="space-y-3">
        {activeDocuments.map((doc) => {
          const isUrgent = doc.diasRestantes <= 5;
          const isOverdue = doc.diasRestantes < 0;
          return (
            <div key={doc.id} className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {isUrgent && <AlertTriangle className={`w-3.5 h-3.5 shrink-0 ${isOverdue ? 'text-destructive' : 'text-warning'}`} />}
                  <p className="text-sm font-medium text-foreground truncate">{doc.assunto}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{doc.numeroOficio}</p>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-sm font-semibold ${isOverdue ? 'text-destructive' : isUrgent ? 'text-warning' : 'text-foreground'}`}>
                  {isOverdue ? `${Math.abs(doc.diasRestantes)}d atrasado` : `${doc.diasRestantes}d restantes`}
                </span>
                <p className="text-xs text-muted-foreground">{new Date(doc.prazoFatal).toLocaleDateString('pt-BR')}</p>
              </div>
              <div className="w-24 h-2 rounded-full bg-muted overflow-hidden shrink-0 hidden sm:block">
                <div
                  className={`h-full rounded-full transition-all ${isOverdue ? 'bg-destructive' : isUrgent ? 'bg-warning' : 'bg-primary'}`}
                  style={{ width: `${Math.max(5, Math.min(100, isOverdue ? 100 : (1 - doc.diasRestantes / 30) * 100))}%` }}
                />
              </div>
            </div>
          );
        })}
        {activeDocuments.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">Nenhum prazo pendente</p>
        )}
      </div>
    </div>
  );
}
