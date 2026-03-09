import { useState, useCallback } from 'react';
import { DocFlowDocument, DocumentStatus, TeamMember, mockDocuments, mockTeamMembers } from '@/data/mockData';
import { toast } from 'sonner';

export function useDocuments() {
  const [documents, setDocuments] = useState<DocFlowDocument[]>(mockDocuments);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);

  const moveDocument = useCallback((docId: string, newStatus: DocumentStatus) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === docId
          ? {
              ...doc,
              status: newStatus,
              atividades: [
                ...doc.atividades,
                {
                  data: new Date().toISOString().slice(0, 16).replace('T', ' '),
                  acao: `Status alterado para "${newStatus.replace('_', ' ')}"`,
                  usuario: 'Você',
                },
              ],
            }
          : doc
      )
    );
    toast.success(`Documento movido para "${newStatus.replace('_', ' ')}"`);
  }, []);

  const updateDocumentField = useCallback((docId: string, field: keyof DocFlowDocument, value: string) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === docId ? { ...doc, [field]: value } : doc
      )
    );
    toast.success('Campo atualizado');
  }, []);

  const approveDocument = useCallback((docId: string) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === docId
          ? {
              ...doc,
              status: 'concluido' as DocumentStatus,
              atividades: [
                ...doc.atividades,
                {
                  data: new Date().toISOString().slice(0, 16).replace('T', ' '),
                  acao: 'Documento aprovado pela Diretoria',
                  usuario: 'Você',
                },
              ],
            }
          : doc
      )
    );
  }, []);

  const rejectDocument = useCallback((docId: string) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === docId
          ? {
              ...doc,
              status: 'recusado' as DocumentStatus,
              atividades: [
                ...doc.atividades,
                {
                  data: new Date().toISOString().slice(0, 16).replace('T', ' '),
                  acao: 'Documento recusado — devolvido para revisão',
                  usuario: 'Você',
                },
              ],
            }
          : doc
      )
    );
  }, []);

  const addDocument = useCallback((doc: Partial<DocFlowDocument>) => {
    const newDoc: DocFlowDocument = {
      id: `doc-${Date.now()}`,
      numeroOficio: doc.numeroOficio || 'Novo Ofício',
      numeroSEI: doc.numeroSEI || '',
      assunto: doc.assunto || 'Documento importado',
      resumo: doc.resumo || '',
      remetente: doc.remetente || '',
      orgaoRemetente: doc.orgaoRemetente || '',
      destinatario: 'Ervino Nitz Filho',
      cargoDestinatario: 'Diretor Presidente',
      empresaDestinataria: 'Ecourbis Ambiental S.A.',
      dataEmissao: new Date().toISOString().slice(0, 10),
      dataRecebimento: new Date().toISOString().slice(0, 10),
      prazoResposta: 10,
      prazoFatal: '',
      diasRestantes: 10,
      valorMulta: null,
      valorEmRisco: 0,
      status: 'recebido',
      responsavel: 'Não atribuído',
      responsavelAvatar: '??',
      tipoArquivo: 'pdf',
      contratoRef: '',
      clausulaRef: '',
      anexos: [],
      atividades: [
        {
          data: new Date().toISOString().slice(0, 16).replace('T', ' '),
          acao: 'Documento importado via upload',
          usuario: 'Você',
        },
      ],
    };
    setDocuments(prev => [newDoc, ...prev]);
    toast.success('Documento adicionado ao pipeline');
  }, []);

  const togglePermission = useCallback((memberId: string, permission: keyof TeamMember['permissoes']) => {
    setTeamMembers(prev =>
      prev.map(m =>
        m.id === memberId
          ? { ...m, permissoes: { ...m.permissoes, [permission]: !m.permissoes[permission] } }
          : m
      )
    );
    toast.success('Permissão atualizada');
  }, []);

  const updateMemberField = useCallback((memberId: string, field: keyof TeamMember, value: string) => {
    setTeamMembers(prev =>
      prev.map(m =>
        m.id === memberId ? { ...m, [field]: value } : m
      )
    );
  }, []);

  const addTeamMember = useCallback((member: Partial<TeamMember>) => {
    const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      nome: member.nome || '',
      cargo: member.cargo || '',
      email: member.email || '',
      avatar: (member.nome || 'NN').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      status: 'active',
      permissoes: { viewContracts: true, uploadEvidence: false, signDocuments: false, editTemplates: false },
    };
    setTeamMembers(prev => [...prev, newMember]);
    toast.success('Membro adicionado à equipe');
  }, []);

  const removeMember = useCallback((memberId: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== memberId));
    toast.success('Membro removido');
  }, []);

  // Stats
  const stats = {
    prazosVencendo: documents.filter(d => d.diasRestantes >= 0 && d.diasRestantes <= 5 && d.status !== 'concluido' && d.status !== 'recusado').length,
    valorEmRisco: documents.filter(d => d.status !== 'concluido' && d.status !== 'recusado').reduce((sum, d) => sum + d.valorEmRisco, 0),
    docsPendentes: documents.filter(d => d.status !== 'concluido' && d.status !== 'recusado').length,
    aprovadosHoje: documents.filter(d => d.status === 'concluido').length,
    totalDocumentos: documents.length,
    concluidos: documents.filter(d => d.status === 'concluido').length,
    pendentes: documents.filter(d => !['concluido', 'recusado'].includes(d.status)).length,
    recusados: documents.filter(d => d.status === 'recusado').length,
  };

  return {
    documents,
    teamMembers,
    stats,
    moveDocument,
    updateDocumentField,
    approveDocument,
    rejectDocument,
    addDocument,
    togglePermission,
    updateMemberField,
    addTeamMember,
    removeMember,
  };
}
