/**
 * Angaben für Impressum und Datenschutz (§ 18 Abs. 1 MStV, Art. 13 DSGVO). Anschrift und E-Mail stehen bewusst nicht im
 * (öffentlichen) Repo: Der Build liest sie aus den Umgebungsvariablen LEGAL_ADDRESS (Zeilen mit „|“ oder Zeilenumbruch
 * getrennt) und LEGAL_EMAIL – in GitHub als Secrets hinterlegt – und schreibt sie nur verpackt in die Impressumsseite
 * (src/site/scramble.ts). Fehlen sie, steht dort ein Hinweis statt erfundener Daten.
 */
export const LEGAL_NAME = 'Daniel Schwarz';

export interface LegalContact {
  address: string;
  email: string;
}
