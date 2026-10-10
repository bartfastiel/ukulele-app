/**
 * Umzug auf eine neue Adresse: Jede alte Seite wird zu einer kleinen Weiterleitung auf dieselbe Seite unter der neuen
 * Adresse. Was im Browser gespeichert ist (Sterne, Übungstage, Einstellungen, eigene Lieder), hängt an der alten
 * Adresse und käme sonst nicht mit; es reist hinter dem „#“ mit – das erreicht nie einen Server – und die neue Seite
 * übernimmt es (`takeMoved` in src/store.ts). Ein „#“, das schon in der Adresse steht (geteiltes Lied), geht vor.
 */

/** Schlüssel im Speicher, die mitziehen: neuer Fortschritt je Instrument, alter gemeinsamer, eigene Lieder. */
export function movedKeys(instrument: string): { progress: string[]; own: string[] } {
  return {
    progress: ['saiten:' + instrument + ':v1', 'ukulele-club:v1'],
    own: ['saiten:eigene-lieder', 'ukulele-club:eigene-lieder'],
  };
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function movedPage(target: string, instrument: string): string {
  const keys = movedKeys(instrument);
  // bewusst ES5 ohne Bundle: läuft sofort und auch auf alten iPads
  const script =
    '(function(){var u=' + JSON.stringify(target) + ',k=' + JSON.stringify(keys) + ';' +
    'if(location.hash.length>1){location.replace(u+location.hash);return}' +
    'function g(l){for(var i=0;i<l.length;i++){var v=localStorage.getItem(l[i]);if(v)return v}return null}' +
    'var c="";try{var p=g(k.progress),o=g(k.own);' +
    'if(p||o)c="#umzug="+encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify({p:p,o:o})))))}catch(e){}' +
    'location.replace(u+c)})()';
  return (
    '<!doctype html>\n<html lang="de">\n<head>\n<meta charset="utf-8">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '<title>Umgezogen · Moved · Déménagé</title>\n' +
    `<link rel="canonical" href="${esc(target)}">\n` +
    `<script>${script}</script>\n` +
    // nur ohne Skript: ein sofortiges Refresh könnte sonst die Weiterleitung mit den Daten überholen
    `<noscript><meta http-equiv="refresh" content="0;url=${esc(target)}"></noscript>\n` +
    '</head>\n<body>\n' +
    `<p><a href="${esc(target)}">Weiter · Continue · Continuer</a></p>\n` +
    '</body>\n</html>\n'
  );
}
