// app/onboarding/OnboardingProvider.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

/* ---------------------- TIPOS ---------------------- */

export type ClashGoal =
  | "arena"
  | "win_more"
  | "find_deck"
  | "test_app";

export interface OnboardingAnswers {
  goal?: ClashGoal;
  source?: string;
  playMode?: string;
  arenaRange?: string;
  tag?: string;          // ✔ importante no fluxo
  player?: any;          // ✔ objeto completo retornado da API
}

/* ---------------------- CONTEXTO ---------------------- */

type OnboardingContextType = {
  answers: OnboardingAnswers;
  setAnswer: <K extends keyof OnboardingAnswers>(
    key: K,
    value: OnboardingAnswers[K]
  ) => void;
  reset: () => void;
};

const OnboardingContext = createContext<
  OnboardingContextType | undefined
>(undefined);

/* ---------------------- PROVIDER ---------------------- */

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<OnboardingAnswers>({});

  function setAnswer<K extends keyof OnboardingAnswers>(
    key: K,
    value: OnboardingAnswers[K]
  ) {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
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

/* ---------------------- HOOK ---------------------- */

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx)
    throw new Error(
      "useOnboarding precisa estar dentro de <OnboardingProvider>"
    );
  return ctx;
}
