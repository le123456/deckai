// app/i18n/LocaleProvider.tsx
import * as Localization from 'expo-localization';
import React, { createContext, useContext, useMemo, useState } from 'react';

export type Locale = 'pt-BR' | 'en-US';

type TranslationEntry =
    | string
    | {
        'pt-BR'?: string;
        'en-US'?: string;
    };

type Translations = Record<string, TranslationEntry>;

const translations: Translations = {
    // Onboarding – Goal
    'onboarding.goal.title': {
        'pt-BR': 'Qual é seu objetivo no Clash?',
        'en-US': "What's your goal in Clash?",
    },
    'onboarding.goal.subtitle': {
        'pt-BR': 'Isso ajuda a Deck IA a montar um plano e decks alinhados com o que você quer.',
        'en-US': "This helps Deck IA create a plan and decks aligned with what you want.",
    },

    // Goal options
    'onboarding.goal.option.arena': {
        'pt-BR': 'Subir de arena rápido',
        'en-US': 'Climb arenas quickly',
    },
    'onboarding.goal.option.win_more': {
        'pt-BR': 'Ganhar mais partidas com meu deck',
        'en-US': 'Win more matches with my deck',
    },
    'onboarding.goal.option.find_deck': {
        'pt-BR': 'Encontrar um deck forte pra mim',
        'en-US': 'Find a strong deck for me',
    },
    'onboarding.goal.option.test_app': {
        'pt-BR': 'Só quero testar o app',
        'en-US': 'Just want to test the app',
    },

    // Onboarding – Playstyle
    'onboarding.playstyle.title': {
        'pt-BR': 'Como você joga hoje no Clash?',
        'en-US': 'How do you play Clash today?',
    },
    'onboarding.playstyle.subtitle': {
        'pt-BR': 'Vamos usar isso pra adaptar recomendações e dicas ao seu estilo de jogo.',
        'en-US': "We\'ll use this to adapt tips and recommendations to your playstyle.",
    },
    'onboarding.playstyle.opt.ladder': {
        'pt-BR': 'Arena solo (ladder normal)',
        'en-US': 'Solo ladder (normal)',
    },
    'onboarding.playstyle.opt.challenges': {
        'pt-BR': 'Desafios e torneios',
        'en-US': 'Challenges and tournaments',
    },
    'onboarding.playstyle.opt.clan': {
        'pt-BR': 'Guerras de clã',
        'en-US': 'Clan wars',
    },
    'onboarding.playstyle.opt.casual': {
        'pt-BR': 'Jogo por diversão de vez em quando',
        'en-US': 'I play casually now and then',
    },

    // Onboarding – Arena
    'onboarding.arena.title': {
        'pt-BR': 'Em qual Arena você está hoje?',
        'en-US': 'Which Arena are you in today?',
    },
    'onboarding.arena.subtitle': {
        'pt-BR': 'Vamos usar isso pra medir seu progresso com os decks da Deck IA.',
        'en-US': "We\'ll use this to track your progress with Deck IA decks.",
    },
    'onboarding.arena.opt.1': {
        'pt-BR': 'Abaixo da Arena 5',
        'en-US': 'Below Arena 5',
    },
    'onboarding.arena.opt.2': {
        'pt-BR': 'Arena 5–9',
        'en-US': 'Arena 5–9',
    },
    'onboarding.arena.opt.3': 'Arena 10–13',
    'onboarding.arena.opt.4': {
        'pt-BR': 'Arena 14+ (Campeões)',
        'en-US': 'Arena 14+ (Champions)',
    },

    // Botões comuns
    'common.continue': {
        'pt-BR': 'Continuar',
        'en-US': 'Continue',
    },

    // Exemplo para depois (tabs, perfil, etc.)
    'tabs.home': {
        'pt-BR': 'Início',
        'en-US': 'Home',
    },
    'tabs.decks': {
        'pt-BR': 'Decks',
        'en-US': 'Decks',
    },
    'tabs.coach': {
        'pt-BR': 'Coach',
        'en-US': 'Coach',
    },
    'tabs.profile': {
        'pt-BR': 'Perfil',
        'en-US': 'Profile',
    },

    //Index - Pagina Inicial
    'profile.language.pt': {
        'pt-BR': 'Português (Brasil)',
        'en-US': 'Portuguese (Brazil)',
    },
    'profile.language.en': {
        'pt-BR': 'Inglês (EUA)',
        'en-US': 'English (US)',
    },
    'welcome.title': {
        'pt-BR': 'Deck IA',
        'en-US': 'Deck IA',
    },
    'welcome.subtitle': {
        'pt-BR': 'Clash Royale deck builder & coach com IA.',
        'en-US': 'Clash Royale deck builder & AI coach.',
    },
    'welcome.cta': {
        'pt-BR': 'Começar Agora',
        'en-US': 'Get Started',
    },
    'welcome.loginLater': {
        'pt-BR': 'Já tenho conta • Entrar depois',
        'en-US': 'I already have an account • Log in later',
    },

    // Source 

    'onboarding.source.title': {
        'pt-BR': 'Como você conheceu a Deck IA?',
        'en-US': 'How did you discover Deck IA?',
    },
    'onboarding.source.subtitle': {
        'pt-BR': 'Isso ajuda a gente a entender onde jogadores como você nos encontram.',
        'en-US': 'This helps us understand where players like you find us.',
    },

    'onboarding.source.app_store': {
        'pt-BR': 'App Store',
        'en-US': 'App Store',
    },
    'onboarding.source.tiktok': {
        'pt-BR': 'TikTok',
        'en-US': 'TikTok',
    },
    'onboarding.source.youtube': {
        'pt-BR': 'YouTube',
        'en-US': 'YouTube',
    },
    'onboarding.source.tv': {
        'pt-BR': 'TV',
        'en-US': 'TV',
    },
    'onboarding.source.x': {
        'pt-BR': 'X (Twitter)',
        'en-US': 'X (Twitter)',
    },
    'onboarding.source.instagram': {
        'pt-BR': 'Instagram',
        'en-US': 'Instagram',
    },
    'onboarding.source.google': {
        'pt-BR': 'Google',
        'en-US': 'Google',
    },
    'onboarding.source.facebook': {
        'pt-BR': 'Facebook',
        'en-US': 'Facebook',
    },
    'onboarding.source.other': {
        'pt-BR': 'Outro',
        'en-US': 'Other',
    },

    // Proof

    'onboarding.proof.title': {
        'pt-BR': 'Deck IA gera muito mais resultado que jogar sozinho',
        'en-US': 'Deck IA gets you far better results than playing alone',
    },
    'onboarding.proof.subtitle': {
        'pt-BR': 'Compare a evolução de troféus usando decks aleatórios vs. um plano da Deck IA.',
        'en-US': 'Compare your trophy growth using random decks vs. a guided plan from Deck IA.',
    },
    'onboarding.proof.without': {
        'pt-BR': 'Sem\nDeck IA',
        'en-US': 'Without\nDeck IA',
    },
    'onboarding.proof.with': {
        'pt-BR': 'Com\nDeck IA',
        'en-US': 'With\nDeck IA',
    },
    'onboarding.proof.badgeWithout': {
        'pt-BR': '+80',
        'en-US': '+80',
    },
    'onboarding.proof.badgeWith': {
        'pt-BR': '3–4x',
        'en-US': '3–4x',
    },
    'onboarding.proof.footnote': {
        'pt-BR': 'A Deck IA deixa tudo mais fácil e te cobra pelos resultados.*',
        'en-US': 'Deck IA makes everything easier and charges you for the results you get.*',
    },

    // Plan Summary
    'plan.title': {
        'pt-BR': 'Seu plano de deck está pronto!',
        'en-US': 'Your deck plan is ready!',
    },
    'plan.subtitle': {
        'pt-BR': 'Usamos suas respostas pra montar um plano inicial. Você pode ajustar tudo depois dentro do app.',
        'en-US': 'We used your answers to create an initial plan. You can tweak everything later inside the app.',
    },
    'plan.cardTitle': {
        'pt-BR': 'Plano inicial Deck IA',
        'en-US': 'Deck IA starter plan',
    },
    'plan.badge': {
        'pt-BR': 'Baseado nas suas respostas',
        'en-US': 'Based on your answers',
    },
    'plan.cardSubtitle': {
        'pt-BR': 'Resumo rápido do seu plano',
        'en-US': 'Quick summary of your plan',
    },

    'plan.metric.goal.label': {
        'pt-BR': 'Objetivo',
        'en-US': 'Goal',
    },
    'plan.metric.goal.tag': {
        'pt-BR': 'Foco principal',
        'en-US': 'Main focus',
    },
    'plan.goal.later': {
        'pt-BR': 'Definir objetivo depois',
        'en-US': 'Set a goal later',
    },

    'plan.metric.style.label': {
        'pt-BR': 'Estilo',
        'en-US': 'Style',
    },
    'plan.style.default.value': {
        'pt-BR': 'Controle',
        'en-US': 'Control',
    },
    'plan.style.default.tag': {
        'pt-BR': 'Pressão segura',
        'en-US': 'Safe pressure',
    },
    'plan.style.ladder.value': {
        'pt-BR': 'Controle de ladder',
        'en-US': 'Ladder control',
    },
    'plan.style.ladder.tag': {
        'pt-BR': 'Foco em consistência',
        'en-US': 'Consistency focused',
    },
    'plan.style.challenges.value': {
        'pt-BR': 'Deck de desafios',
        'en-US': 'Challenge deck',
    },
    'plan.style.challenges.tag': {
        'pt-BR': 'Pensado pra modos especiais',
        'en-US': 'Built for special modes',
    },
    'plan.style.clan.value': {
        'pt-BR': 'Deck de guerra de clã',
        'en-US': 'Clan war deck',
    },
    'plan.style.clan.tag': {
        'pt-BR': 'Confiável em múltiplas partidas',
        'en-US': 'Reliable across multiple battles',
    },
    'plan.style.casual.value': {
        'pt-BR': 'Deck casual',
        'en-US': 'Casual deck',
    },
    'plan.style.casual.tag': {
        'pt-BR': 'Pra jogar sem pressão',
        'en-US': 'For low-pressure play',
    },

    'plan.metric.cost.label': {
        'pt-BR': 'Custo médio',
        'en-US': 'Average cost',
    },
    'plan.metric.cost.value': {
        'pt-BR': '3.1 elixir',
        'en-US': '3.1 elixir',
    },
    'plan.metric.cost.tag': {
        'pt-BR': 'Ciclo leve',
        'en-US': 'Light cycle',
    },

    'plan.metric.target.label': {
        'pt-BR': 'Meta (4 semanas)',
        'en-US': 'Goal (4 weeks)',
    },
    'plan.metric.target.value': {
        'pt-BR': '+300 troféus',
        'en-US': '+300 trophies',
    },
    'plan.metric.target.tag': {
        'pt-BR': 'Meta realista',
        'en-US': 'Realistic target',
    },

    'plan.score.label': {
        'pt-BR': 'Sinergia inicial do deck',
        'en-US': 'Initial deck synergy',
    },
    'plan.score.value': {
        'pt-BR': '7.6 / 10',
        'en-US': '7.6 / 10',
    },
    'plan.footer': {
        'pt-BR': 'Esse é um rascunho baseado nas suas respostas. Quando você conectar sua TAG, vamos recalibrar tudo pras suas cartas reais.',
        'en-US': 'This is a draft based on your answers. When you connect your TAG, we’ll recalibrate everything to your real cards.',
    },
    'plan.cta': {
        'pt-BR': 'Começar com esse plano',
        'en-US': 'Start with this plan',
    },

    // Arena

    'onboarding.arena.label.low':  { 'pt-BR': 'Baixa', 'en-US': 'Low' },
    'onboarding.arena.label.mid':  { 'pt-BR': 'Média', 'en-US': 'Mid' },
    'onboarding.arena.label.high': { 'pt-BR': 'Alta',  'en-US': 'High' },
    'onboarding.arena.label.champ':{ 'pt-BR': 'Campeões', 'en-US': 'Champions' },

    //tag

    'onboarding.tag.title': {
        'pt-BR': 'Qual é sua TAG do Clash?',
        'en-US': 'What is your Clash TAG?',
    },

    'onboarding.tag.subtitle': {
        'pt-BR': 'Vamos usar isso para puxar seu perfil oficial.',
        'en-US': 'We will use this to fetch your official profile.',
    },

    'onboarding.tag.hint': {
        'pt-BR': 'A TAG fica no seu perfil, logo abaixo do seu nome.',
        'en-US': 'Your TAG is on your profile, right below your name.',
    },

    'onboarding.tag.paste': {
        'pt-BR': 'Colar TAG',
        'en-US': 'Paste TAG',
    },

    'onboarding.tag.preview': {
        'pt-BR': 'Prévia da conta',
        'en-US': 'Account preview',
    },

    'onboarding.tag.invalid': {
        'pt-BR': 'TAG inválida',
        'en-US': 'Invalid TAG',
    },

    //tags

        // ============================
    // Onboarding – TAG Loading
    // ============================
    'onboarding.tagLoading.title': {
        'pt-BR': 'Buscando seu perfil...',
        'en-US': 'Fetching your profile...',
    },

    // ============================
    // Onboarding – TAG Error
    // ============================
    'onboarding.tagError.title': {
        'pt-BR': 'Não encontramos sua TAG',
        'en-US': 'We couldn’t find your TAG',
    },
    'onboarding.tagError.subtitle': {
        'pt-BR': 'Verifique se digitou a TAG corretamente. Ela fica abaixo do seu nome no Clash.',
        'en-US': 'Check if you typed it correctly. It’s under your name in Clash.',
    },
    'onboarding.tagError.not_found': {
        'pt-BR': 'TAG não encontrada.',
        'en-US': 'TAG not found.',
    },
    'onboarding.tagError.network': {
        'pt-BR': 'Falha de conexão. Tente novamente.',
        'en-US': 'Connection error. Please try again.',
    },
    'onboarding.tagError.tryAgain': {
        'pt-BR': 'Tentar novamente',
        'en-US': 'Try again',
    },

    // ============================
    // Onboarding – TAG Confirm
    // ============================
    'onboarding.tagConfirm.title': {
        'pt-BR': 'Encontramos você!',
        'en-US': 'We found you!',
    },
    'onboarding.tagConfirm.subtitle': {
        'pt-BR': 'Perfil conectado: {{tag}}',
        'en-US': 'Connected profile: {{tag}}',
    },
    'onboarding.tagConfirm.name': {
        'pt-BR': 'Nome',
        'en-US': 'Name',
    },
    'onboarding.tagConfirm.trophies': {
        'pt-BR': 'Troféus',
        'en-US': 'Trophies',
    },

    'onboarding.tagConfirm.statsTitle': {
    'pt-BR': 'Estatísticas principais',
    'en-US': 'Main statistics',
    },

    'onboarding.tagConfirm.statArena': {
    'pt-BR': 'Arena',
    'en-US': 'Arena',
    },

    'onboarding.tagConfirm.statTrophies': {
    'pt-BR': 'Troféus',
    'en-US': 'Trophies',
    },

    'onboarding.tagConfirm.statExp': {
    'pt-BR': 'Nível',
    'en-US': 'Level',
    },

    'onboarding.tagConfirm.currentDeck': {
    'pt-BR': 'Deck atual',
    'en-US': 'Current deck',
    },

    'onboarding.tagConfirm.yes': {
    'pt-BR': 'Sim, esse sou eu',
    'en-US': 'Yes, that’s me',
    },

    'onboarding.tagConfirm.no': {
    'pt-BR': 'Não é meu perfil',
    'en-US': 'Not my profile',
    },

    'onboarding.tagConfirm.noDeck': {
    'pt-BR': 'Não foi possível carregar o deck atual.',
    'en-US': 'Couldn’t load current deck.',
    },
    'onboarding.tag.confirmTitle': {
    'pt-BR': 'Este jogador é você?',
    'en-US': 'Is this your profile?',
    },
    'onboarding.tag.confirmSubtitle': {
    'pt-BR': 'Confirme se este perfil corresponde à sua TAG: {{tag}}',
    'en-US': 'Confirm if this profile matches your TAG: {{tag}}',
    },

    // ============================
    // Onboarding – TAG Confirm
    // ============================
    
    'onboarding.tag.confirmYes': {
    'pt-BR': 'Sim, esse sou eu',
    'en-US': 'Yes, this is me',
    },
    'onboarding.tag.confirmNotMe': {
    'pt-BR': 'Não é meu perfil',
    'en-US': 'This is not my profile',
    },
    'onboarding.tag.arenaLabel': {
    'pt-BR': 'Arena',
    'en-US': 'Arena',
    },
    'onboarding.tag.arenaUnknown': {
    'pt-BR': 'Desconhecida',
    'en-US': 'Unknown',
    },
    'onboarding.tag.stat.trophies': {
    'pt-BR': 'Troféus',
    'en-US': 'Trophies',
    },
    'onboarding.tag.stat.wins': {
    'pt-BR': 'Vitórias',
    'en-US': 'Wins',
    },
    'onboarding.tag.stat.level': {
    'pt-BR': 'Nível',
    'en-US': 'Level',
    },
    'onboarding.tag.stat.winrate': {
    'pt-BR': 'Winrate',
    'en-US': 'Winrate',
    },
    'onboarding.tag.currentDeckTitle': {
    'pt-BR': 'Deck atual',
    'en-US': 'Current deck',
    },



    // ============================
    // Onboarding – TAG fields
    // ============================
    'onboarding.tag.input.placeholder': {
        'pt-BR': 'Digite sua TAG…',
        'en-US': 'Enter your TAG…',
    },
    'onboarding.tag.input.error.short': {
        'pt-BR': 'Digite uma TAG válida.',
        'en-US': 'Enter a valid TAG.',
    },

    // ============================
    // Loading gerais
    // ============================
    'loading.default': {
        'pt-BR': 'Carregando...',
        'en-US': 'Loading...',
    },

        // ============================
    // Onboarding – Plan Generating
    // ============================
    'onboarding.planGenerating.title': {
        'pt-BR': 'Hora de gerar o seu plano personalizado',
        'en-US': 'Time to generate your custom plan',
    },
    'onboarding.planGenerating.subtitle': {
        'pt-BR': 'Vamos usar seu estilo, arena e deck atual pra montar algo só pra você.',
        'en-US': 'We’ll use your style, arena and current deck to craft something just for you.',
    },
    'onboarding.planGenerating.cta': {
        'pt-BR': 'Gerar meu plano',
        'en-US': 'Generate my plan',
    },

    // ============================
    // Onboarding – Plan Processing
    // ============================
    'onboarding.planProcessing.title': {
        'pt-BR': 'Estamos ajustando tudo pra você…',
        'en-US': 'We’re setting everything up for you…',
    },
    'onboarding.planProcessing.subtitle': {
        'pt-BR': 'Deck IA está analisando suas cartas e simulando partidas.',
        'en-US': 'Deck IA is analyzing your cards and simulating battles.',
    },
    'onboarding.planProcessing.percentLabel': {
        'pt-BR': 'Analisando seu perfil de jogador',
        'en-US': 'Analyzing your player profile',
    },
    'onboarding.planProcessing.item.style': {
        'pt-BR': 'Detectando seu estilo de jogo',
        'en-US': 'Detecting your playstyle',
    },
    'onboarding.planProcessing.item.deck': {
        'pt-BR': 'Lendo seu deck atual e cartas chave',
        'en-US': 'Reading your current deck and key cards',
    },
    'onboarding.planProcessing.item.cost': {
        'pt-BR': 'Calculando custo médio e ciclo',
        'en-US': 'Calculating average cost and cycle',
    },
    'onboarding.planProcessing.item.history': {
        'pt-BR': 'Revisando histórico de vitórias e derrotas',
        'en-US': 'Reviewing win / loss history',
    },
    'onboarding.planProcessing.item.synergy': {
        'pt-BR': 'Medindo sinergia entre as cartas',
        'en-US': 'Measuring card synergy',
    },
    'onboarding.planProcessing.item.matchups': {
        'pt-BR': 'Simulando matchups mais comuns',
        'en-US': 'Simulating common matchups',
    },
    'onboarding.planProcessing.item.prediction': {
        'pt-BR': 'Estimando sua evolução nas próximas semanas',
        'en-US': 'Estimating your progress for the next weeks',
    },

   // ============================
    // Onboarding – Plan Summary
    // ============================

    // 🧩 Headline principal
    'onboarding.planSummary.heroTitle': {
        'pt-BR': 'Seu plano está pronto, {{name}}!',
        'en-US': 'Your plan is ready, {{name}}!',
    },

    'onboarding.planSummary.heroSubtitle': {
        'pt-BR': 'Criamos uma estratégia personalizada usando seu perfil real dentro do Clash.',
        'en-US': 'We created a personalized strategy using your real Clash profile.',
    },

    // 🏆 Arena / Trophies
    'onboarding.planSummary.trophies': {
        'pt-BR': 'Troféus',
        'en-US': 'Trophies',
    },

    // 🎯 Meta principal
    'onboarding.planSummary.metric.targetLabel': {
        'pt-BR': 'Meta das próximas 4 semanas',
        'en-US': '4-week target',
    },

    'onboarding.planSummary.metric.targetTagline': {
        'pt-BR': 'De {{from}} → {{to}} troféus',
        'en-US': 'From {{from}} → {{to}} trophies',
    },

    // 📈 Winrate atual → após plano
    'onboarding.planSummary.metric.winrateLabel': {
        'pt-BR': 'Winrate atual',
        'en-US': 'Current winrate',
    },

    'onboarding.planSummary.metric.winrateTagline': {
        'pt-BR': 'Estimado após seguir o plano',
        'en-US': 'Estimated after following the plan',
    },

    // ⚖️ Custo médio do deck
    'onboarding.planSummary.metric.costLabel': {
        'pt-BR': 'Custo médio',
        'en-US': 'Average cost',
    },

    // 🔗 Sinergia inicial
    'onboarding.planSummary.metric.synergyLabel': {
        'pt-BR': 'Sinergia inicial',
        'en-US': 'Initial synergy',
    },

    // 🃏 Deck bloqueado
    'onboarding.planSummary.deckTitleLocked': {
        'pt-BR': 'Seu deck atual (bloqueado)',
        'en-US': 'Your current deck (locked)',
    },

    'onboarding.planSummary.deckLockedCTA': {
        'pt-BR': 'Complete o plano para desbloquear',
        'en-US': 'Complete the plan to unlock',
    },

    // CTA
    'onboarding.planSummary.ctaPrimary': {
        'pt-BR': 'Começar com esse plano',
        'en-US': 'Start with this plan',
    },

    'onboarding.planSummary.ctaSecondary': {
        'pt-BR': 'Ver detalhes antes',
        'en-US': 'See details first',
    },


};

type LocaleContextType = {
    locale: Locale;
    setLocale: (l: Locale) => void;
    t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

function detectInitialLocale(): Locale {
    const sys = Localization.getLocales?.()[0]?.languageTag ?? 'pt-BR';
    if (sys.startsWith('pt')) return 'pt-BR';
    return 'en-US';
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<Locale>(detectInitialLocale());

    const value = useMemo<LocaleContextType>(
        () => ({
            locale,
            setLocale,
            t: (key: string) => {
                const entry = translations[key];
                if (!entry) return key;

                if (typeof entry === 'string') return entry;

                return (
                    entry[locale] ??
                    entry['pt-BR'] ??
                    entry['en-US'] ??
                    key
                );
            },
        }),
        [locale]
    );

    return (
        <LocaleContext.Provider value={value}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    const ctx = useContext(LocaleContext);
    if (!ctx) throw new Error('useLocale precisa do LocaleProvider');
    return ctx;
}
