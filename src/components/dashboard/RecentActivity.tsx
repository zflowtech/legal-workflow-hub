import { ZFlowDocument } from '@/data/mockData';
import { Clock } from 'lucide-react';

interface RecentActivityProps {
  documents: ZFlowDocument[];
}

export function RecentActivity({ documents }: RecentActivityProps) {
  const allActivities = documents
    .flatMap(doc =>
      doc.atividades.map(a => ({
        ...a,
        docId: doc.id,
        docAssunto: doc.assunto,
        docNumero: doc.numeroOficio,
      }))
    )
    .sort((a, b) => b.data.localeCompare(a.data))
    .slice(0, 8);

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <Clock className="w-4 h-4 text-primary" />
        Atividade Recente
      </h3>
      <div className="space-y-3">
        {allActivities.map((activity, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{activity.acao}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {activity.docNumero} — {activity.usuario} — {activity.data}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
