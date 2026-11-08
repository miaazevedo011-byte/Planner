export const APP_VERSION = '2.4.0';

export interface AppRelease {
  version: string;
  releaseDate: string;
  title: string;
  badge?: string;
  highlights: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export const LATEST_RELEASE: AppRelease = {
  version: '2.4.0',
  releaseDate: 'Versão Atual • 2026',
  title: 'Caderno de Receitas com IA & Estimativa de Custos 🍳',
  badge: 'Grande Atualização!',
  highlights: [
    {
      icon: '🍳',
      title: 'Caderno de Receitas ao Lado do Orçamento',
      description: 'Pesquise qualquer prato com ingredientes acessíveis, modo de preparo prático e custo em R$ calculado por ingrediente.'
    },
    {
      icon: '🛒',
      title: 'Envio Direto para Lista de Compras',
      description: 'Adicione os ingredientes faltantes da sua receita diretamente na Lista de Compras do mês com 1 clique.'
    },
    {
      icon: '📝',
      title: 'Post-it de Anotações com Salvamento Automático',
      description: 'Guarde seus toques especiais de família, tempo de forno e observações pessoais em cada receita.'
    },
    {
      icon: '🎨',
      title: 'Adesivos Washi Tape & Mudar o Tempo do App',
      description: 'Cole selos decorativos pelo caderno e ajuste o clima e estilo de papel (pontilhado, pautado ou liso).'
    },
    {
      icon: '🐷',
      title: 'Dicas do Porquinho & Anos 2026 a 2032',
      description: 'Sugestões financeiras inteligentes com base no seu saldo real e suporte para planejamento a longo prazo.'
    }
  ]
};

export const PAST_RELEASES: AppRelease[] = [
  {
    version: '2.3.0',
    releaseDate: 'Outubro de 2026',
    title: 'Adesivos Decorativos & Pop-up Superior',
    highlights: [
      {
        icon: '🏷️',
        title: 'Sistema de Adesivos',
        description: 'Washi tapes, carimbos e selos reposicionáveis no calendário e bloco de notas.'
      },
      {
        icon: '📅',
        title: 'Anos Seguintes',
        description: 'Seletor de anos abrangendo de 2026 até 2032.'
      }
    ]
  }
];
