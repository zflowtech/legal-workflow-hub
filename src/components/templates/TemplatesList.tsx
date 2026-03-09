import { mockTemplates } from '@/data/mockData';
import { FileText, Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function TemplatesList() {
  const categorias = [...new Set(mockTemplates.map(t => t.categoria))];

  return (
    <div className="space-y-6">
      {categorias.map((cat) => (
        <div key={cat}>
          <h3 className="text-sm font-semibold text-foreground mb-3">{cat}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTemplates.filter(t => t.categoria === cat).map((template) => (
              <div key={template.id} className="rounded-lg border border-border bg-card p-4 hover:border-primary/30 transition-colors group">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-snug">{template.nome}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{template.descricao}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(template.ultimaEdicao).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {template.criadoPor.split(' ').slice(-1)[0]}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3 gap-2 group-hover:border-primary group-hover:text-primary transition-colors"
                  onClick={() => toast.success(`Modelo "${template.nome}" aplicado — novo documento criado no pipeline`)}
                >
                  Usar Modelo
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
