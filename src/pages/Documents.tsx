import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { DocumentPipeline } from '@/components/documents/DocumentPipeline';
import { useDocuments } from '@/hooks/useDocuments';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Documents = () => {
  const { documents, stats, moveDocument, updateDocumentField } = useDocuments();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('all');

  const filteredDocuments = filter === 'all' ? documents : documents.filter(d => d.status === filter);

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-5">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Seu Fluxo de Documentos</h1>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span className="text-muted-foreground">Concluídos: <strong className="text-foreground">{stats.concluidos}</strong></span>
              <span className="text-muted-foreground">Pendentes: <strong className="text-foreground">{stats.pendentes}</strong></span>
              <span className="text-muted-foreground">Recusados: <strong className="text-foreground">{stats.recusados}</strong></span>
            </div>
          </div>
        </div>

        {/* Quick filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'recebido', label: 'Recebido' },
            { id: 'em_analise', label: 'Em Análise' },
            { id: 'aguardando_assinatura', label: 'Aguardando Assinatura' },
            { id: 'concluido', label: 'Concluído' },
            { id: 'recusado', label: 'Recusado' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === f.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Aguardando Aprovação section */}
        {documents.filter(d => d.status === 'aguardando_assinatura').length > 0 && (
          <div className="rounded-lg border border-primary/20 bg-accent/20 p-4">
            <h3 className="text-sm font-semibold text-primary mb-3">Aguardando sua Aprovação</h3>
            <div className="space-y-2">
              {documents.filter(d => d.status === 'aguardando_assinatura').map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => navigate(`/documentos/${doc.id}`)}
                  className="flex items-center justify-between p-3 rounded-md bg-card border border-border hover:border-primary/30 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">PDF</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{doc.assunto}</p>
                      <p className="text-xs text-muted-foreground">{doc.remetente} — {new Date(doc.dataEmissao).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-primary border-primary/30 bg-primary/5">
                    Aguardando Assinatura
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pipeline Kanban */}
        <DocumentPipeline
          documents={filteredDocuments}
          onMoveDocument={moveDocument}
          onUpdateField={updateDocumentField}
          onSelectDocument={(id) => navigate(`/documentos/${id}`)}
        />
      </div>
    </AppLayout>
  );
};

export default Documents;
