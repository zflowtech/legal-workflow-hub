import { AppLayout } from '@/components/layout/AppLayout';
import { AIPortal } from '@/components/dashboard/AIPortal';

const Index = () => {
  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <AIPortal />
      </div>
    </AppLayout>
  );
};

export default Index;
