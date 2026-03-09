import { useState, useCallback } from 'react';
import { Upload, Cloud, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface UploadZoneProps {
  onUpload: (doc: { assunto: string }) => void;
}

export function UploadZone({ onUpload }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const newFiles = files.map(f => ({ name: f.name, size: `${(f.size / 1024 / 1024).toFixed(1)} MB` }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
      toast.success(`${files.length} arquivo(s) adicionado(s)`);
    }
  }, []);

  const handleFileSelect = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.docx,.doc,.eml,.msg';
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (files.length > 0) {
        const newFiles = files.map(f => ({ name: f.name, size: `${(f.size / 1024 / 1024).toFixed(1)} MB` }));
        setUploadedFiles(prev => [...prev, ...newFiles]);
        toast.success(`${files.length} arquivo(s) selecionado(s)`);
      }
    };
    input.click();
  }, []);

  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const processUpload = useCallback(() => {
    if (uploadedFiles.length === 0) {
      toast.error('Selecione pelo menos um arquivo');
      return;
    }
    onUpload({ assunto: `Upload: ${uploadedFiles.map(f => f.name).join(', ')}` });
    setUploadedFiles([]);
  }, [uploadedFiles, onUpload]);

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative rounded-lg border-2 border-dashed p-12 text-center transition-all cursor-pointer
          ${isDragging
            ? 'border-primary bg-accent/50 scale-[1.01]'
            : 'border-border bg-muted/30 hover:border-primary/40 hover:bg-accent/20'
          }
        `}
        onClick={handleFileSelect}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              FAÇA UPLOAD DO OFÍCIO E DO EMAIL
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Arraste e solte seus arquivos aqui ou clique para procurar
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Aceita PDF, DOCX, DOC, EML, MSG — Máximo 25MB por arquivo
            </p>
          </div>
          <div className="flex gap-3 mt-2" onClick={(e) => e.stopPropagation()}>
            <Button onClick={handleFileSelect} className="gap-2">
              <Upload className="w-4 h-4" />
              Selecionar Arquivos
            </Button>
            <Button variant="outline" onClick={() => toast.info('Integração com nuvem em breve')} className="gap-2">
              <Cloud className="w-4 h-4" />
              Importar da Nuvem
            </Button>
          </div>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">{uploadedFiles.length} arquivo(s) selecionado(s)</p>
            <Button size="sm" onClick={processUpload} className="gap-2">
              <FileText className="w-4 h-4" />
              Iniciar Fluxo
            </Button>
          </div>
          {uploadedFiles.map((file, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-md border border-border bg-card">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.size}</p>
                </div>
              </div>
              <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
