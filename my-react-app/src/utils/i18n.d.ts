export type Language = "ar" | "en";

export interface LangPair {
  ar?: string;
  en?: string;
}

export function pickLang(value: LangPair | string | null | undefined, language: Language): string;
