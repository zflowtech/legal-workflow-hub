import { useState, useCallback } from 'react';
import { DocFlowDocument } from '@/data/mockData';
import { ArrowLeft, FileText, Download, Clock, DollarSign, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentDetailProps {
  document: DocFlowDocument;
  onBack: () => void;
  onApprove: (docId: string) => void;
  onReject: (docId: string) => void;
}

type ApprovalState = 'idle' | 'confirming' | 'processing' | 'done';

export function DocumentDetail({ document: doc, onBack, onApprove, onReject }: DocumentDetailProps) {
  const [approvalState, setApprovalState] = useState<ApprovalState>('idle');

  const handleApprove = useCallback(() => {
    if (approvalState === 'idle') {
      setApprovalState('confirming');
      return;
    }
    if (approvalState === 'confirming') {
      setApprovalState('processing');
      setTimeout(() => {
        onApprove(doc.id);
        setApprovalState('done');
      }, 2000);
    }
  }, [approvalState, doc.id, onApprove]);

  const handleReject = useCallback(() => {
    onReject(doc.id);
    onBack();
  }, [doc.id, onReject, onBack]);

  const isUrgent = doc.diasRestantes >= 0 && doc.diasRestantes <= 5;
  const isOverdue = doc.diasRestantes < 0;

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center gap-3 bg-card shrink-0">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground">{doc.numeroOficio}</p>
          <h2 className="text-base font-semibold text-foreground truncate">{doc.assunto}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
        {/* Status banner */}
        {(isUrgent || isOverdue) && (
          <div className={`flex items-center gap-3 p-3 rounded-lg ${isOverdue ? 'bg-destructive/10' : 'bg-warning/10'}`}>
            <AlertTriangle className={`w-5 h-5 ${isOverdue ? 'text-destructive' : 'text-warning'}`} />
            <div>
              <p className={`text-sm font-semibold ${isOverdue ? 'text-destructive' : 'text-warning'}`}>
                {isOverdue ? 'PRAZO VENCIDO' : 'PRAZO URGENTE'}
              </p>
              <p className="text-xs text-muted-foreground">
                {isOverdue
                  ? `${Math.abs(doc.diasRestantes)} dias úteis de atraso`
                  : `${doc.diasRestantes} dias úteis restantes — vence em ${new Date(doc.prazoFatal).toLocaleDateString('pt-BR')}`
                }
              </p>
            </div>
          </div>
        )}

        {/* Metadata grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoRow label="Nº SEI" value={doc.numeroSEI} />
          <InfoRow label="Órgão Remetente" value={doc.orgaoRemetente} />
          <InfoRow label="Remetente" value={doc.remetente} />
          <InfoRow label="Destinatário" value={`${doc.destinatario} — ${doc.cargoDestinatario}`} />
          <InfoRow label="Data de Emissão" value={new Date(doc.dataEmissao).toLocaleDateString('pt-BR')} />
          <InfoRow label="Recebido em" value={new Date(doc.dataRecebimento).toLocaleDateString('pt-BR')} />
          <InfoRow label="Prazo de Resposta" value={`${doc.prazoResposta} dias úteis`} />
          <InfoRow
            label="Prazo Fatal"
            value={new Date(doc.prazoFatal).toLocaleDateString('pt-BR')}
            urgent={isUrgent || isOverdue}
          />
          <InfoRow label="Contrato de Referência" value={doc.contratoRef} />
          <InfoRow label="Cláusula" value={doc.clausulaRef} />
          {doc.valorMulta && (
            <InfoRow
              label="Multa Prevista"
              value={`R$ ${doc.valorMulta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              urgent
            />
          )}
          <InfoRow label="Responsável" value={doc.responsavel} />
        </div>

        {/* Resumo */}
        <div className="rounded-lg border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">Resumo</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{doc.resumo}</p>
        </div>

        {/* Anexos */}
        <div className="rounded-lg border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Anexos ({doc.anexos.length})</h3>
          <div className="space-y-2">
            {doc.anexos.map((anexo, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{anexo.nome}</p>
                    <p className="text-xs text-muted-foreground">{anexo.tamanho}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-primary">
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Baixar</span>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-lg border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Histórico
          </h3>
          <div className="space-y-3">
            {doc.atividades.map((atividade, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                  {i < doc.atividades.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <div className="pb-3">
                  <p className="text-sm text-foreground">{atividade.acao}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{atividade.usuario} — {atividade.data}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer buttons — always visible, especially on mobile */}
      {doc.status !== 'concluido' && doc.status !== 'recusado' && (
        <div className="p-4 border-t border-border bg-card shrink-0 safe-area-bottom">
          <div className="flex gap-3">
            {approvalState === 'done' ? (
              <div className="flex-1 flex items-center justify-center gap-2 h-12 rounded-lg bg-success text-success-foreground font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                Aprovado
              </div>
            ) : (
              <>
                <Button
                  onClick={handleApprove}
                  disabled={approvalState === 'processing'}
                  className={`flex-1 h-12 text-base font-semibold transition-all ${
                    approvalState === 'processing' ? 'animate-pulse' : ''
                  }`}
                >
                  {approvalState === 'idle' && 'Aprovar'}
                  {approvalState === 'confirming' && 'Confirmar Aprovação'}
                  {approvalState === 'processing' && 'Registrando Aprovação...'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReject}
                  disabled={approvalState === 'processing'}
                  className="flex-1 h-12 text-base font-semibold"
                >
                  Rejeitar
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value, urgent }: { label: string; value: string; urgent?: boolean }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
      <p className={`text-sm mt-0.5 ${urgent ? 'text-destructive font-semibold' : 'text-foreground'}`}>{value}</p>
    </div>
  );
}
