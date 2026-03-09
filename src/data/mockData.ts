export type DocumentStatus = 'recebido' | 'em_analise' | 'aguardando_assinatura' | 'concluido' | 'recusado';

export interface DocFlowDocument {
  id: string;
  numeroOficio: string;
  numeroSEI: string;
  assunto: string;
  resumo: string;
  remetente: string;
  orgaoRemetente: string;
  destinatario: string;
  cargoDestinatario: string;
  empresaDestinataria: string;
  dataEmissao: string;
  dataRecebimento: string;
  prazoResposta: number; // dias úteis
  prazoFatal: string; // data limite
  diasRestantes: number;
  valorMulta: number | null;
  valorEmRisco: number;
  status: DocumentStatus;
  responsavel: string;
  responsavelAvatar: string;
  tipoArquivo: 'pdf' | 'docx' | 'email';
  contratoRef: string;
  clausulaRef: string;
  anexos: { nome: string; tipo: string; tamanho: string }[];
  atividades: { data: string; acao: string; usuario: string }[];
}

export interface TeamMember {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  avatar: string;
  status: 'active' | 'inactive';
  permissoes: {
    viewContracts: boolean;
    uploadEvidence: boolean;
    signDocuments: boolean;
    editTemplates: boolean;
  };
}

export interface Template {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  ultimaEdicao: string;
  criadoPor: string;
}

export const PIPELINE_COLUMNS: { id: DocumentStatus; label: string; color: string }[] = [
  { id: 'recebido', label: 'Recebido', color: 'hsl(var(--muted-foreground))' },
  { id: 'em_analise', label: 'Em Análise', color: 'hsl(var(--warning))' },
  { id: 'aguardando_assinatura', label: 'Aguardando Assinatura', color: 'hsl(var(--primary))' },
  { id: 'concluido', label: 'Concluído', color: 'hsl(var(--success))' },
  { id: 'recusado', label: 'Recusado', color: 'hsl(var(--destructive))' },
];

export const mockDocuments: DocFlowDocument[] = [
  {
    id: 'doc-001',
    numeroOficio: 'Ofício nº 34/2026/SP-Regula',
    numeroSEI: 'SEI 151779067',
    assunto: 'Atraso na coleta domiciliar — Setor IP18',
    resumo: 'Notificação de irregularidade referente a atraso na coleta de circuito ou setor acima da tolerância de duas horas. Fiscalização realizada em 24/02/2026 no setor IP18 (Ipiranga). Resíduos da Rua José Geraldo Vieira deveriam ser retirados às 08:05 e da Rua Prof. João Ramos da Costa às 08:15. Fiscalização compareceu às 10:25 e constatou atraso superior a 2h.',
    remetente: 'Luiz Felipe Lopes Soares',
    orgaoRemetente: 'SP-Regula — Assessoria de Coleta Domiciliar e Seletiva',
    destinatario: 'Ervino Nitz Filho',
    cargoDestinatario: 'Diretor Presidente',
    empresaDestinataria: 'Ecourbis Ambiental S.A.',
    dataEmissao: '2026-02-26',
    dataRecebimento: '2026-02-27',
    prazoResposta: 10,
    prazoFatal: '2026-03-13',
    diasRestantes: 4,
    valorMulta: 47500,
    valorEmRisco: 47500,
    status: 'aguardando_assinatura',
    responsavel: 'Dr. Ana Beatriz Costa',
    responsavelAvatar: 'AB',
    tipoArquivo: 'pdf',
    contratoRef: 'Contrato de Concessão 026/SSO/04',
    clausulaRef: 'Cláusula 19.5.III "J" — Resolução nº 108/AMLURB/2017',
    anexos: [
      { nome: 'Ofício_nº_34_2026_SP-Regula.pdf', tipo: 'pdf', tamanho: '2.4 MB' },
      { nome: 'Boletim_Vistoria_IP18.pdf', tipo: 'pdf', tamanho: '1.8 MB' },
      { nome: 'Relatório_Fiscalização_CODOM.pdf', tipo: 'pdf', tamanho: '3.2 MB' },
      { nome: 'Fotografias_Fiscalização.zip', tipo: 'zip', tamanho: '12.1 MB' },
    ],
    atividades: [
      { data: '2026-02-27 09:15', acao: 'Documento recebido e registrado no sistema', usuario: 'Márcia Oliveira' },
      { data: '2026-02-27 10:30', acao: 'Encaminhado para análise jurídica', usuario: 'Márcia Oliveira' },
      { data: '2026-02-28 14:00', acao: 'Análise jurídica iniciada — identificada multa de R$ 47.500', usuario: 'Dr. Ana Beatriz Costa' },
      { data: '2026-03-03 11:00', acao: 'Solicitado logs GPS do setor IP18 ao Supervisor de Operações', usuario: 'Dr. Ana Beatriz Costa' },
      { data: '2026-03-05 16:45', acao: 'Defesa técnica redigida — aguardando aprovação da Diretoria', usuario: 'Dr. Ana Beatriz Costa' },
    ],
  },
  {
    id: 'doc-002',
    numeroOficio: 'Ofício nº 28/2026/AMLURB',
    numeroSEI: 'SEI 151456823',
    assunto: 'Irregularidade em varrição mecânica — Agrupamento NO',
    resumo: 'Notificação referente a falha na execução de varrição mecânica no Agrupamento Noroeste. Área não varrida conforme cronograma contratual na Av. Engenheiro Caetano Álvares.',
    remetente: 'Carla Mendonça Ribeiro',
    orgaoRemetente: 'AMLURB — Departamento de Limpeza Urbana',
    destinatario: 'Ervino Nitz Filho',
    cargoDestinatario: 'Diretor Presidente',
    empresaDestinataria: 'Ecourbis Ambiental S.A.',
    dataEmissao: '2026-02-20',
    dataRecebimento: '2026-02-21',
    prazoResposta: 15,
    prazoFatal: '2026-03-14',
    diasRestantes: 5,
    valorMulta: 32000,
    valorEmRisco: 32000,
    status: 'em_analise',
    responsavel: 'Dr. Ricardo Mendes',
    responsavelAvatar: 'RM',
    tipoArquivo: 'pdf',
    contratoRef: 'Contrato de Concessão 026/SSO/04',
    clausulaRef: 'Cláusula 19.5.III "F" — Resolução nº 108/AMLURB/2017',
    anexos: [
      { nome: 'Ofício_nº_28_2026_AMLURB.pdf', tipo: 'pdf', tamanho: '1.5 MB' },
      { nome: 'Boletim_Vistoria_NO.pdf', tipo: 'pdf', tamanho: '980 KB' },
    ],
    atividades: [
      { data: '2026-02-21 08:30', acao: 'Documento recebido via protocolo', usuario: 'Márcia Oliveira' },
      { data: '2026-02-22 09:00', acao: 'Encaminhado para área jurídica', usuario: 'Márcia Oliveira' },
      { data: '2026-02-24 14:30', acao: 'Análise em andamento — solicitado relatório da varrição mecânica', usuario: 'Dr. Ricardo Mendes' },
    ],
  },
  {
    id: 'doc-003',
    numeroOficio: 'Notificação nº 12/2026/CETESB',
    numeroSEI: 'SEI 151890234',
    assunto: 'Renovação de licença ambiental — Aterro CTL',
    resumo: 'Comunicado preventivo sobre necessidade de renovação da Licença de Operação do Centro de Tratamento e Logística (CTL). Prazo de 30 dias para apresentação de documentação atualizada.',
    remetente: 'Eng. Paulo Roberto Silva',
    orgaoRemetente: 'CETESB — Companhia Ambiental do Estado de São Paulo',
    destinatario: 'Ervino Nitz Filho',
    cargoDestinatario: 'Diretor Presidente',
    empresaDestinataria: 'Ecourbis Ambiental S.A.',
    dataEmissao: '2026-02-15',
    dataRecebimento: '2026-02-17',
    prazoResposta: 30,
    prazoFatal: '2026-03-31',
    diasRestantes: 22,
    valorMulta: null,
    valorEmRisco: 0,
    status: 'em_analise',
    responsavel: 'Eng. Fernanda Lima',
    responsavelAvatar: 'FL',
    tipoArquivo: 'pdf',
    contratoRef: 'Licença Operação CETESB nº 45002187',
    clausulaRef: 'Art. 18 da Resolução CONAMA 237/97',
    anexos: [
      { nome: 'Notificação_12_CETESB.pdf', tipo: 'pdf', tamanho: '890 KB' },
    ],
    atividades: [
      { data: '2026-02-17 10:00', acao: 'Documento recebido e classificado como preventivo', usuario: 'Márcia Oliveira' },
      { data: '2026-02-19 11:00', acao: 'Encaminhado para equipe de meio ambiente', usuario: 'Márcia Oliveira' },
    ],
  },
  {
    id: 'doc-004',
    numeroOficio: 'Ofício nº 19/2026/SP-Regula',
    numeroSEI: 'SEI 151234567',
    assunto: 'Coleta não realizada — Setor SM22',
    resumo: 'Auto de infração por não realização de coleta domiciliar no setor SM22 (São Mateus) no dia 10/02/2026. Moradores registraram reclamação via SAC 156.',
    remetente: 'Maria Raquel B. Meireles',
    orgaoRemetente: 'SP-Regula — Gerência de Fiscalização (GFISP)',
    destinatario: 'Ervino Nitz Filho',
    cargoDestinatario: 'Diretor Presidente',
    empresaDestinataria: 'Ecourbis Ambiental S.A.',
    dataEmissao: '2026-02-10',
    dataRecebimento: '2026-02-11',
    prazoResposta: 10,
    prazoFatal: '2026-02-25',
    diasRestantes: -12,
    valorMulta: 48000,
    valorEmRisco: 48000,
    status: 'concluido',
    responsavel: 'Dr. Ana Beatriz Costa',
    responsavelAvatar: 'AB',
    tipoArquivo: 'pdf',
    contratoRef: 'Contrato de Concessão 026/SSO/04',
    clausulaRef: 'Cláusula 19.5.III "A" — Resolução nº 108/AMLURB/2017',
    anexos: [
      { nome: 'Ofício_19_SP-Regula.pdf', tipo: 'pdf', tamanho: '1.2 MB' },
      { nome: 'Defesa_Tecnica_SM22.pdf', tipo: 'pdf', tamanho: '4.5 MB' },
    ],
    atividades: [
      { data: '2026-02-11 08:00', acao: 'Documento recebido', usuario: 'Márcia Oliveira' },
      { data: '2026-02-13 10:00', acao: 'Análise jurídica concluída', usuario: 'Dr. Ana Beatriz Costa' },
      { data: '2026-02-20 15:00', acao: 'Defesa técnica aprovada pela Diretoria', usuario: 'Ervino Nitz Filho' },
      { data: '2026-02-24 09:30', acao: 'Defesa protocolada no SEI', usuario: 'Márcia Oliveira' },
    ],
  },
  {
    id: 'doc-005',
    numeroOficio: 'Ofício nº 41/2026/AMLURB',
    numeroSEI: 'SEI 151998765',
    assunto: 'Revisão contratual — Cláusula de reajuste 2026',
    resumo: 'Solicitação de manifestação da concessionária sobre proposta de revisão das cláusulas de reajuste do Contrato 026/SSO/04 para o exercício 2026.',
    remetente: 'Dr. Fernando Araújo',
    orgaoRemetente: 'AMLURB — Gabinete',
    destinatario: 'Ervino Nitz Filho',
    cargoDestinatario: 'Diretor Presidente',
    empresaDestinataria: 'Ecourbis Ambiental S.A.',
    dataEmissao: '2026-03-01',
    dataRecebimento: '2026-03-03',
    prazoResposta: 20,
    prazoFatal: '2026-03-31',
    diasRestantes: 22,
    valorMulta: null,
    valorEmRisco: 0,
    status: 'recebido',
    responsavel: 'Não atribuído',
    responsavelAvatar: '??',
    tipoArquivo: 'docx',
    contratoRef: 'Contrato de Concessão 026/SSO/04',
    clausulaRef: 'Cláusula 14 — Reajuste e Revisão',
    anexos: [
      { nome: 'Ofício_41_AMLURB.docx', tipo: 'docx', tamanho: '756 KB' },
    ],
    atividades: [
      { data: '2026-03-03 14:00', acao: 'Documento recebido — aguardando triagem', usuario: 'Márcia Oliveira' },
    ],
  },
  {
    id: 'doc-006',
    numeroOficio: 'Ofício nº 22/2026/SP-Regula',
    numeroSEI: 'SEI 151567890',
    assunto: 'Equipamento danificado — Contêiner Rua Maurice Denis',
    resumo: 'Notificação sobre contêineres danificados encontrados na Rua Maurice Denis durante fiscalização. Necessidade de substituição imediata.',
    remetente: 'Maria Raquel B. Meireles',
    orgaoRemetente: 'SP-Regula — Gerência de Fiscalização (GFISP)',
    destinatario: 'Ervino Nitz Filho',
    cargoDestinatario: 'Diretor Presidente',
    empresaDestinataria: 'Ecourbis Ambiental S.A.',
    dataEmissao: '2026-02-18',
    dataRecebimento: '2026-02-19',
    prazoResposta: 5,
    prazoFatal: '2026-02-26',
    diasRestantes: -11,
    valorMulta: 15000,
    valorEmRisco: 15000,
    status: 'recusado',
    responsavel: 'Dr. Ricardo Mendes',
    responsavelAvatar: 'RM',
    tipoArquivo: 'pdf',
    contratoRef: 'Contrato de Concessão 026/SSO/04',
    clausulaRef: 'Cláusula 19.5.III "M"',
    anexos: [
      { nome: 'Ofício_22_SP-Regula.pdf', tipo: 'pdf', tamanho: '1.1 MB' },
    ],
    atividades: [
      { data: '2026-02-19 09:00', acao: 'Documento recebido', usuario: 'Márcia Oliveira' },
      { data: '2026-02-21 14:00', acao: 'Defesa técnica enviada', usuario: 'Dr. Ricardo Mendes' },
      { data: '2026-02-28 11:00', acao: 'Defesa recusada pelo órgão — multa mantida', usuario: 'SP-Regula' },
    ],
  },
  {
    id: 'doc-007',
    numeroOficio: 'Ofício nº 37/2026/SP-Regula',
    numeroSEI: 'SEI 151881234',
    assunto: 'Atraso na coleta seletiva — Setor BT09',
    resumo: 'Irregularidade na coleta seletiva do setor BT09 (Butantã). Atraso superior a 3 horas registrado pela fiscalização.',
    remetente: 'Luiz Felipe Lopes Soares',
    orgaoRemetente: 'SP-Regula — Assessoria de Coleta Domiciliar e Seletiva',
    destinatario: 'Ervino Nitz Filho',
    cargoDestinatario: 'Diretor Presidente',
    empresaDestinataria: 'Ecourbis Ambiental S.A.',
    dataEmissao: '2026-03-05',
    dataRecebimento: '2026-03-06',
    prazoResposta: 10,
    prazoFatal: '2026-03-20',
    diasRestantes: 11,
    valorMulta: 38000,
    valorEmRisco: 38000,
    status: 'recebido',
    responsavel: 'Não atribuído',
    responsavelAvatar: '??',
    tipoArquivo: 'pdf',
    contratoRef: 'Contrato de Concessão 026/SSO/04',
    clausulaRef: 'Cláusula 19.5.III "J" — Resolução nº 108/AMLURB/2017',
    anexos: [
      { nome: 'Ofício_37_SP-Regula.pdf', tipo: 'pdf', tamanho: '2.0 MB' },
      { nome: 'Boletim_Vistoria_BT09.pdf', tipo: 'pdf', tamanho: '1.3 MB' },
    ],
    atividades: [
      { data: '2026-03-06 10:00', acao: 'Documento recebido — aguardando triagem', usuario: 'Márcia Oliveira' },
    ],
  },
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'team-001',
    nome: 'Anna Cristina Souza',
    cargo: 'Superintendente',
    email: 'anna.souza@ecourbis.com.br',
    avatar: 'AS',
    status: 'active',
    permissoes: { viewContracts: true, uploadEvidence: false, signDocuments: true, editTemplates: true },
  },
  {
    id: 'team-002',
    nome: 'Dr. Ana Beatriz Costa',
    cargo: 'Coordenadora Jurídica',
    email: 'ana.costa@ecourbis.com.br',
    avatar: 'AB',
    status: 'active',
    permissoes: { viewContracts: true, uploadEvidence: true, signDocuments: true, editTemplates: true },
  },
  {
    id: 'team-003',
    nome: 'Dr. Ricardo Mendes',
    cargo: 'Analista Jurídico',
    email: 'ricardo.mendes@ecourbis.com.br',
    avatar: 'RM',
    status: 'active',
    permissoes: { viewContracts: true, uploadEvidence: true, signDocuments: false, editTemplates: true },
  },
  {
    id: 'team-004',
    nome: 'Márcia Oliveira',
    cargo: 'Assistente Administrativo',
    email: 'marcia.oliveira@ecourbis.com.br',
    avatar: 'MO',
    status: 'active',
    permissoes: { viewContracts: true, uploadEvidence: true, signDocuments: false, editTemplates: false },
  },
  {
    id: 'team-005',
    nome: 'Eng. Fernanda Lima',
    cargo: 'Analista Ambiental',
    email: 'fernanda.lima@ecourbis.com.br',
    avatar: 'FL',
    status: 'active',
    permissoes: { viewContracts: true, uploadEvidence: true, signDocuments: false, editTemplates: false },
  },
  {
    id: 'team-006',
    nome: 'Carlos Eduardo Santos',
    cargo: 'Estagiário Jurídico',
    email: 'carlos.santos@ecourbis.com.br',
    avatar: 'CS',
    status: 'active',
    permissoes: { viewContracts: true, uploadEvidence: false, signDocuments: false, editTemplates: false },
  },
];

export const mockTemplates: Template[] = [
  {
    id: 'tpl-001',
    nome: 'Defesa Técnica — Atraso na Coleta',
    descricao: 'Modelo padrão de defesa para notificações de atraso na coleta domiciliar acima de 2 horas.',
    categoria: 'Defesa Técnica',
    ultimaEdicao: '2026-02-15',
    criadoPor: 'Dr. Ana Beatriz Costa',
  },
  {
    id: 'tpl-002',
    nome: 'Defesa Técnica — Varrição',
    descricao: 'Modelo para defesa em caso de irregularidade na varrição mecânica ou manual.',
    categoria: 'Defesa Técnica',
    ultimaEdicao: '2026-01-20',
    criadoPor: 'Dr. Ricardo Mendes',
  },
  {
    id: 'tpl-003',
    nome: 'Resposta a Ofício — Padrão',
    descricao: 'Modelo genérico de resposta a ofícios de órgãos reguladores.',
    categoria: 'Resposta',
    ultimaEdicao: '2026-02-01',
    criadoPor: 'Dr. Ana Beatriz Costa',
  },
  {
    id: 'tpl-004',
    nome: 'Manifestação — Revisão Contratual',
    descricao: 'Template para manifestação sobre propostas de revisão de cláusulas contratuais.',
    categoria: 'Manifestação',
    ultimaEdicao: '2025-12-10',
    criadoPor: 'Dr. Ana Beatriz Costa',
  },
  {
    id: 'tpl-005',
    nome: 'Renovação de Licença Ambiental',
    descricao: 'Documentação-base para processos de renovação de licenças ambientais junto à CETESB.',
    categoria: 'Licenciamento',
    ultimaEdicao: '2025-11-28',
    criadoPor: 'Eng. Fernanda Lima',
  },
];
