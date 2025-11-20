// app/onboarding/OnboardingProvider.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

export type ClashGoal =
  | 'arena'
  | 'win_more'
  | 'find_deck'
  | 'test_app';

export type OnboardingAnswers = {
  goal?: ClashGoal;
  source?: string;
  playMode?: string;
  arenaRange?: string;
  tag?: string;
  player?: any;   //  👈 ADICIONADO
};

type Ctx = {
  answers: OnboardingAnswers;
  setAnswer: <K extends keyof OnboardingAnswers>(
    key: K,
    value: OnboardingAnswers[K]
  ) => void;
  reset: () => void;
};

const OnboardingContext = createContext<Ctx | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<OnboardingAnswers>({});

  function setAnswer<K extends keyof OnboardingAnswers>(
    key: K,
    value: OnboardingAnswers[K]
  ) {
    setAnswers(prev => ({ ...prev, [key]: value }));
  }

  function reset() {
    setAnswers({});
  }

  return (
    <OnboardingContext.Provider value={{ answers, setAnswer, reset }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding precisa do OnboardingProvider');
  return ctx;
}
