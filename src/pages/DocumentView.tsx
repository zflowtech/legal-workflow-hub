import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { DocumentDetail } from '@/components/documents/DocumentDetail';
import { useDocuments } from '@/hooks/useDocuments';
import { useIsMobile } from '@/hooks/use-mobile';

const DocumentView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { documents, approveDocument, rejectDocument } = useDocuments();
  const isMobile = useIsMobile();

  const document = documents.find(d => d.id === id);

  if (!document) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-lg font-medium text-foreground">Documento não encontrado</p>
            <button onClick={() => navigate('/documentos')} className="text-sm text-primary hover:underline mt-2">
              Voltar aos documentos
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Mobile: full screen without sidebar
  if (isMobile) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <DocumentDetail
          document={document}
          onBack={() => navigate('/documentos')}
          onApprove={approveDocument}
          onReject={rejectDocument}
        />
      </div>
    );
  }

  return (
    <AppLayout>
      <DocumentDetail
        document={document}
        onBack={() => navigate('/documentos')}
        onApprove={approveDocument}
        onReject={rejectDocument}
      />
    </AppLayout>
  );
};

export default DocumentView;
