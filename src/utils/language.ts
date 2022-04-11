const languageKey = "language";

export function getLanguage() {
  return localStorage.getItem(languageKey);
}

export function setLanguage(language: string) {
  return localStorage.setItem(languageKey, language);
}
