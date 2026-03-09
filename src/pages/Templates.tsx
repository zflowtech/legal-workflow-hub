import { AppLayout } from '@/components/layout/AppLayout';
import { TemplatesList } from '@/components/templates/TemplatesList';

const Templates = () => {
  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-5 max-w-7xl">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Modelos</h1>
          <p className="text-sm text-muted-foreground mt-1">Templates de documentos para agilizar suas defesas técnicas</p>
        </div>

        <TemplatesList />
      </div>
    </AppLayout>
  );
};

export default Templates;
