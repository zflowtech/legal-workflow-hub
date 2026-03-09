import { useState, useRef, useEffect, useCallback } from 'react';
import { DocFlowDocument } from '@/data/mockData';
import { FileText, FileIcon, AlertTriangle, DollarSign } from 'lucide-react';

interface DocumentCardProps {
  document: DocFlowDocument;
  onUpdateField: (docId: string, field: keyof DocFlowDocument, value: string) => void;
  onClick: () => void;
}

export function DocumentCard({ document: doc, onUpdateField, onClick }: DocumentCardProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const isUrgent = doc.diasRestantes >= 0 && doc.diasRestantes <= 3;
  const isOverdue = doc.diasRestantes < 0;

  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingField]);

  const startEdit = useCallback((e: React.MouseEvent, field: string, value: string) => {
    e.stopPropagation();
    setEditingField(field);
    setEditValue(value);
  }, []);

  const saveEdit = useCallback(() => {
    if (editingField && editValue.trim()) {
      onUpdateField(doc.id, editingField as keyof DocFlowDocument, editValue.trim());
    }
    setEditingField(null);
  }, [editingField, editValue, doc.id, onUpdateField]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') setEditingField(null);
  }, [saveEdit]);

  const handleDragStart = useCallback((e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', doc.id);
    e.dataTransfer.effectAllowed = 'move';
  }, [doc.id]);

  const TypeIcon = doc.tipoArquivo === 'pdf' ? FileText : FileIcon;

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
      className="p-3 rounded-md border border-border bg-card cursor-grab hover:border-primary/30 active:cursor-grabbing transition-colors group"
    >
      <div className="flex items-start gap-2 mb-2">
        <TypeIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          {editingField === 'assunto' ? (
            <input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={handleKeyDown}
              onClick={(e) => e.stopPropagation()}
              className="text-sm font-medium text-foreground w-full bg-accent border border-primary rounded px-1 py-0.5 outline-none"
            />
          ) : (
            <p
              className="text-sm font-medium text-foreground leading-snug cursor-text hover:bg-accent/50 rounded px-1 -mx-1 transition-colors"
              onClick={(e) => startEdit(e, 'assunto', doc.assunto)}
              title="Clique para editar"
            >
              {doc.assunto}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-0.5">{doc.numeroOficio}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          {(isUrgent || isOverdue) && (
            <AlertTriangle className={`w-3 h-3 ${isOverdue ? 'text-destructive' : 'text-warning'}`} />
          )}
          <span className={`font-medium ${isOverdue ? 'text-destructive' : isUrgent ? 'text-warning' : 'text-muted-foreground'}`}>
            {isOverdue ? `${Math.abs(doc.diasRestantes)}d atrasado` : `${doc.diasRestantes}d`}
          </span>
        </div>
        {doc.valorMulta && (
          <div className="flex items-center gap-0.5 text-muted-foreground">
            <DollarSign className="w-3 h-3" />
            <span>{(doc.valorMulta / 1000).toFixed(0)}k</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
        {editingField === 'responsavel' ? (
          <input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-foreground w-full bg-accent border border-primary rounded px-1 py-0.5 outline-none"
          />
        ) : (
          <span
            className="text-xs text-muted-foreground cursor-text hover:bg-accent/50 rounded px-1 -mx-1 transition-colors"
            onClick={(e) => startEdit(e, 'responsavel', doc.responsavel)}
            title="Clique para editar responsável"
          >
            {doc.responsavel}
          </span>
        )}
        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary shrink-0">
          {doc.responsavelAvatar}
        </div>
      </div>
    </div>
  );
}
