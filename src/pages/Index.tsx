import { AppLayout } from '@/components/layout/AppLayout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { UploadZone } from '@/components/dashboard/UploadZone';
import { DeadlineTimeline } from '@/components/dashboard/DeadlineTimeline';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { useDocuments } from '@/hooks/useDocuments';

const Index = () => {
  const { stats, documents, addDocument } = useDocuments();

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Início</h1>
          <p className="text-sm text-muted-foreground mt-1">Visão geral do departamento jurídico</p>
        </div>

        <StatsCards
          prazosVencendo={stats.prazosVencendo}
          valorEmRisco={stats.valorEmRisco}
          docsPendentes={stats.docsPendentes}
          aprovadosHoje={stats.aprovadosHoje}
        />

        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Iniciar Novo Fluxo</h2>
          <UploadZone onUpload={addDocument} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DeadlineTimeline documents={documents} />
          <RecentActivity documents={documents} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
