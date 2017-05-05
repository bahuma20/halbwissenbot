# Halbwissen Bot

Ein Chatbot für die Telegram-Gruppe "Gefährliches Halbwissen".

## Funktionen
- [x] Chia => SUPERFOOD (inkl. Bilder)
- [x] Automatische Begrüßung mit einer netten Beleidigung
- [x] Fragt nach einer Tätigkeit in der Automobilbranche
- [x] Teilt mit wenn eine runde Zahl / Schnapszahl der Anzahl der Mitglieder erreicht wurde
- [x] /ghwkarte Ort <- Um der #ghwkarte einen neuen Ort hinzuzufügen
- [ ] Antwortet auf Fragen an ihn mit "Halts Maul, ich schlafe..."
- [x] Schickt eine Nachricht wenn eine neue Folge raus ist
- [ ] Schickt einem User zur Begrüßung eine Direktnachricht mit infos über den Halbwissen Chat (Nicht möglich da ein Bot keine Konversation beginnen kann...)
- [ ] Sagt die Frauenquote (Das wird aber schwierig zu realisieren weil man von den Benutzern kein Geschlecht auslesen kann...)
- [ ] Schickt Tweets in die Gruppe


## Mithelfen
Jeder kann diesem Chatbot neue Beleidigungen oder Begrüßungen lernen.

Einfach hier auf Github die Datei 
[niceInsults.json](https://github.com/bahuma/halbwissenbot/edit/master/niceInsults.json)
bzw. [greetings.json](https://github.com/bahuma/halbwissenbot/edit/master/greetings.json)
bearbeiten.

## Environment Variables
- `TELEGRAM_BOT_TOKEN`
- `GOOGLE_MAPS_API_KEY`
- `MONGODB_CONNECT_STRING` (mongodb://user:password@host:port/name)
