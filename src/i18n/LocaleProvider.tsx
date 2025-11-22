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

// ============================
// 💬 TODAS AS SUAS TRADUÇÕES COMPLETAS
// (Exatamente como enviou; nada foi removido)
// ============================
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

    /* PLAN SUMMARY */
    'onboarding.planSummary.loading': {
    'pt-BR': 'Carregando seu plano...',
    'en-US': 'Loading your plan...',
    },

    'onboarding.planSummary.heroTitle': {
    'pt-BR': 'Seu plano personalizado, {name}',
    'en-US': 'Your personalized plan, {name}',
    },

    'onboarding.planSummary.heroSubtitle': {
    'pt-BR': 'Analisamos seu perfil e preparamos insights exclusivos.',
    'en-US': 'We analyzed your profile and prepared exclusive insights.',
    },

    /* METRICS */
    'onboarding.planSummary.metric.targetLabel': {
    'pt-BR': 'Próxima meta',
    'en-US': 'Next goal',
    },

    'onboarding.planSummary.metric.targetTagline': {
    'pt-BR': 'Subir de {from} para {to} troféus',
    'en-US': 'Climb from {from} to {to} trophies',
    },

    'onboarding.planSummary.metric.costLabel': {
    'pt-BR': 'Elixir médio',
    'en-US': 'Average elixir',
    },

    'onboarding.planSummary.metric.synergyLabel': {
    'pt-BR': 'Sinergia',
    'en-US': 'Synergy',
    },

    /* DECK LOCKED */
    'onboarding.planSummary.deckTitleLocked': {
    'pt-BR': 'Deck recomendado (bloqueado)',
    'en-US': 'Recommended deck (locked)',
    },

    'onboarding.planSummary.deckLockedCTA': {
    'pt-BR': 'Desbloqueie para ver o deck ideal para o seu estilo.',
    'en-US': 'Unlock to view the ideal deck for your playstyle.',
    },

    /* CTAs */
    'onboarding.planSummary.ctaPro': {
    'pt-BR': 'Continuar com o PRO',
    'en-US': 'Continue with PRO',
    },

    'onboarding.planSummary.ctaSecondary': {
    'pt-BR': 'Continuar grátis',
    'en-US': 'Continue for free',
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
    'onboarding.planSummary.metric.helper': {
    'pt-BR': 'Seu plano PRO ajusta elixir médio e sinergia para aumentar seu winrate ao longo do tempo.',
    'en-US': 'Your PRO plan optimizes average elixir and synergy to boost your win rate over time.',
    },

    'onboarding.planSummary.trial.badge': {
    'pt-BR': 'Teste PRO por 3 dias grátis',
    'en-US': 'Try PRO free for 3 days',
    },

    'onboarding.planSummary.trial.copy': {
    'pt-BR': 'Veja decks completos, análises avançadas e recomendações personalizadas. Cancele quando quiser.',
    'en-US': 'Unlock full decks, advanced analysis and tailored recommendations. Cancel anytime.',
    },


    // Arena

    'onboarding.arena.label.low': { 'pt-BR': 'Baixa', 'en-US': 'Low' },
    'onboarding.arena.label.mid': { 'pt-BR': 'Média', 'en-US': 'Mid' },
    'onboarding.arena.label.high': { 'pt-BR': 'Alta', 'en-US': 'High' },
    'onboarding.arena.label.champ': { 'pt-BR': 'Campeões', 'en-US': 'Champions' },

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



    // ==========================
    // AUTH — CRIAR CONTA (TELA 1)
    // ==========================
    'auth.create.title': {
        'pt-BR': 'Vamos salvar seu progresso para continuar',
        'en-US': 'Let’s save your progress to continue',
    },
    'auth.create.subtitle': {
        'pt-BR': 'Crie sua conta para acessar seu plano em qualquer dispositivo.',
        'en-US': 'Create your account to access your plan on any device.',
    },

    'auth.create.emailLabel': {
        'pt-BR': 'Email',
        'en-US': 'Email',
    },
    'auth.create.emailPlaceholder': {
        'pt-BR': 'seuemail@gmail.com',
        'en-US': 'yourmail@gmail.com',
    },

    'auth.create.continue': {
        'pt-BR': 'Continuar',
        'en-US': 'Continue',
    },

    // Botões sociais
    'auth.create.social.or': {
        'pt-BR': 'ou',
        'en-US': 'or',
    },
    'auth.create.social.google': {
        'pt-BR': 'Entrar com Google',
        'en-US': 'Continue with Google',
    },
    'auth.create.social.apple': {
        'pt-BR': 'Entrar com Apple',
        'en-US': 'Continue with Apple',
    },

    // ==========================
    // AUTH — CRIAR CONTA (TELA 2)
    // ==========================
    'auth.password.title': {
        'pt-BR': 'Criar senha',
        'en-US': 'Create password',
    },
    'auth.password.subtitle': {
        'pt-BR': 'Estamos criando sua conta para',
        'en-US': 'We are creating your account for',
    },

    'auth.password.label': {
        'pt-BR': 'Senha',
        'en-US': 'Password',
    },
    'auth.password.confirmLabel': {
        'pt-BR': 'Confirmar senha',
        'en-US': 'Confirm password',
    },

    'auth.password.create': {
        'pt-BR': 'Criar conta',
        'en-US': 'Create account',
    },

    'auth.password.error.mismatch': {
        'pt-BR': 'As senhas não coincidem.',
        'en-US': 'Passwords do not match.',
    },
    'auth.password.error.short': {
        'pt-BR': 'A senha deve ter pelo menos 6 caracteres.',
        'en-US': 'Password must have at least 6 characters.',
    },

    // Unlocked deck title
    'onboarding.planSummary.deckTitle': {
        'pt-BR': 'Seu deck atual',
        'en-US': 'Your current deck',
    },

    // Metrics
    'onboarding.planSummary.metric.target': {
        'pt-BR': 'Meta sugerida',
        'en-US': 'Suggested target',
    },
    'onboarding.planSummary.metric.targetTag': {
        'pt-BR': 'troféus a mais',
        'en-US': 'extra trophies',
    },

    'onboarding.planSummary.metric.winrate': {
        'pt-BR': 'Win rate atual → após plano',
        'en-US': 'Current win rate → after plan',
    },
    'onboarding.planSummary.metric.winrateTag': {
        'pt-BR': 'estimativa',
        'en-US': 'estimate',
    },

    'onboarding.planSummary.metric.cost': {
        'pt-BR': 'Custo médio',
        'en-US': 'Average elixir',
    },
    'onboarding.planSummary.metric.costTag': {
        'pt-BR': 'balanceado',
        'en-US': 'balanced',
    },

    'onboarding.planSummary.metric.synergy': {
        'pt-BR': 'Sinergia inicial',
        'en-US': 'Initial synergy',
    },
    'onboarding.planSummary.metric.synergyTag': {
        'pt-BR': 'nota do deck',
        'en-US': 'deck grade',
    },
    /* LOGIN */
    'auth.login.title': {
        'pt-BR': 'Bem-vindo de volta',
        'en-US': 'Welcome back',
    },
    'auth.login.subtitle': {
        'pt-BR': 'Entre para continuar seu progresso',
        'en-US': 'Sign in to continue your progress',
    },
    'auth.login.emailLabel': {
        'pt-BR': 'E-mail',
        'en-US': 'Email',
    },
    'auth.login.passwordLabel': {
        'pt-BR': 'Senha',
        'en-US': 'Password',
    },
    'auth.login.cta': {
        'pt-BR': 'Entrar',
        'en-US': 'Sign in',
    },
    'auth.login.createAccount': {
        'pt-BR': 'Criar conta',
        'en-US': 'Create account',
    },
    'auth.login.error.invalid': {
        'pt-BR': 'E-mail ou senha incorretos.',
        'en-US': 'Incorrect email or password.',
    },

    /* EMAIL CHECK */
    'auth.checkEmail.title': {
        'pt-BR': 'Verifique seu e-mail',
        'en-US': 'Check your email',
    },
    'auth.checkEmail.subtitle': {
        'pt-BR': 'Enviamos um link de confirmação. Clique nele para ativar sua conta.',
        'en-US': 'We sent you a confirmation link. Tap it to activate your account.',
    },
    'auth.checkEmail.login': {
        'pt-BR': 'Voltar para o login',
        'en-US': 'Back to login',
    },

    /* LOGIN ERRORS */
    'auth.login.error.unconfirmed': {
        'pt-BR': 'Você precisa confirmar seu e-mail antes de continuar.',
        'en-US': 'You must confirm your email before signing in.',
    },





};



// ============================
// 🔥 Tipo do contexto
// (precisa vir ANTES do createContext)
// ============================
export type LocaleContextType = {
    locale: Locale;
    setLocale: (l: Locale) => void;
    t: (key: string, vars?: Record<string, string | number>) => string;
};



// ============================
// 🌍 Criar contexto
// ============================
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);



// ============================
// 🔧 Interpolação: substitui {{chave}}
// ============================
function interpolate(text: string, vars?: Record<string, string | number>) {
    if (!vars) return text;

    return text.replace(/\{\{(\w+)\}\}/g, (_, key) =>
        vars[key] !== undefined ? String(vars[key]) : `{{${key}}}`
    );
}



// ============================
// 🧩 Provider final
// ============================
export function LocaleProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<Locale>(() => {
        const sys = Localization.getLocales?.()[0]?.languageTag ?? 'pt-BR';
        return sys.startsWith('pt') ? 'pt-BR' : 'en-US';
    });

    const value = useMemo<LocaleContextType>(
        () => ({
            locale,
            setLocale,

            t: (key: string, vars?: Record<string, string | number>) => {
                const entry = translations[key];

                // Se chave não existe → retorna a chave
                if (!entry) return key;

                let base: string;

                if (typeof entry === 'string') {
                    base = entry;
                } else {
                    base =
                        entry[locale] ??
                        entry['pt-BR'] ??
                        entry['en-US'] ??
                        key;
                }

                return interpolate(base, vars);
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



// ============================
// Hook final
// ============================
export function useLocale() {
    const ctx = useContext(LocaleContext);
    if (!ctx) throw new Error('useLocale precisa do LocaleProvider');
    return ctx;
}
