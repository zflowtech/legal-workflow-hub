import { useState, useCallback } from 'react';
import { ZFlowDocument, DocumentStatus, PIPELINE_COLUMNS } from '@/data/mockData';
import { DocumentCard } from './DocumentCard';

interface DocumentPipelineProps {
  documents: ZFlowDocument[];
  onMoveDocument: (docId: string, newStatus: DocumentStatus) => void;
  onUpdateField: (docId: string, field: keyof ZFlowDocument, value: string) => void;
  onSelectDocument: (docId: string) => void;
}

export function DocumentPipeline({ documents, onMoveDocument, onUpdateField, onSelectDocument }: DocumentPipelineProps) {
  const [dragOverColumn, setDragOverColumn] = useState<DocumentStatus | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent, columnId: DocumentStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverColumn(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, columnId: DocumentStatus) => {
    e.preventDefault();
    const docId = e.dataTransfer.getData('text/plain');
    if (docId) {
      onMoveDocument(docId, columnId);
    }
    setDragOverColumn(null);
  }, [onMoveDocument]);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 min-h-[500px]">
      {PIPELINE_COLUMNS.map((column) => {
        const columnDocs = documents.filter(d => d.status === column.id);
        const isOver = dragOverColumn === column.id;

        return (
          <div
            key={column.id}
            className={`flex-shrink-0 w-72 rounded-lg border transition-colors ${
              isOver ? 'border-primary bg-accent/30' : 'border-border bg-muted/20'
            }`}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="p-3 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: column.color }} />
                  <span className="text-sm font-semibold text-foreground">{column.label}</span>
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {columnDocs.length}
                </span>
              </div>
            </div>
            <div className="p-2 space-y-2 min-h-[200px]">
              {columnDocs.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  onUpdateField={onUpdateField}
                  onClick={() => onSelectDocument(doc.id)}
                />
              ))}
              {columnDocs.length === 0 && (
                <div className="flex items-center justify-center h-24 text-xs text-muted-foreground border border-dashed border-border rounded-md">
                  Arraste documentos aqui
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
