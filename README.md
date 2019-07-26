# Halbwissen Bot

Ein Chatbot für die [Telegram-Gruppe](https://t.me/halbwissencast) und den [Discord Channel](https://discord.gg/rtddE32) des Podcasts "Gefährliches Halbwissen".

## Funktionen
- [x] Chia => SUPERFOOD [(inkl. Bilder) <-- Geht gerade nicht]
- [x] Automatische Begrüßung mit einer netten Beleidigung
- [ ] Fragt nach einer Tätigkeit in der Automobilbranche
- [x] Teilt mit wenn eine runde Zahl / Schnapszahl der Anzahl der Mitglieder erreicht wurde
- [x] /ghwkarte Ort <- Um der #ghwkarte einen neuen Ort hinzuzufügen
- [x] Antwortet auf Fragen an ihn mit "Halts Maul, ich schlafe..." oder ähnlichem
- [x] Schickt eine Nachricht wenn eine neue Folge vom "Gefährliches Halbwissen" Podcast raus ist
- [x] Macht irgendwas bei /expelliarmus
- [x] Schickt eine Random Nachricht am Montag um 10 Uhr
- [ ] Schickt einem User zur Begrüßung eine Direktnachricht mit infos über den Halbwissen Chat (Nicht möglich da ein Bot keine Konversation beginnen kann...)
- [ ] Sagt die Frauenquote (Das wird aber schwierig zu realisieren weil man von den Benutzern kein Geschlecht auslesen kann...)
- [ ] Twitter Integration
- [ ] Facebook Integration
- [ ] Benachrichtigt über Live Streams auf dem Youtube Kanal
- [ ] Neueste Folgen im Subreddit posten
- [x] /tirade


## Mithelfen
Jeder kann diesem Chatbot neue Beleidigungen oder Begrüßungen lernen.

Einfach hier auf Github eine dieser Dateien bearbeiten:
- [niceInsults.json](https://github.com/bahuma/halbwissenbot/edit/master/texts/niceInsults.json)
- [greetings.json](https://github.com/bahuma/halbwissenbot/edit/master/texts/greetings.json)
- [answers.json](https://github.com/bahuma/halbwissenbot/edit/master/texts/answers.json)
- [expelliarmus.json](https://github.com/bahuma/halbwissenbot/edit/master/texts/expelliarmus.json)
- [randomMessages.json](https://github.com/bahuma/halbwissenbot/edit/master/texts/randomMessages.json)


## Environment Variables
- `TELEGRAM_BOT_TOKEN` (Vom @botfather)
- `TELEGRAM_BOT_USERNAME` (Wird für commands benötigt)
- `DISCORD_BOT_TOKEN` (Gibts im Developer Bereich)
- `DISCORD_CLIENT_ID` (Gibts im Developer Bereich)
- `GOOGLE_MAPS_API_KEY` Dazu ein Projekt in der Google Developer Console anlegen und die Geocoding API aktivieren)
- `OCR_SPACE_API_KEY` (Wird benötigt für Chia in Bildern)
- `MONGODB_CONNECT_STRING` (mongodb://user:password@host:port/name)
- `NTBA_FIX_319` (Temporary fix to prevent some lib errors. Should be gone when telegram-bot-api ist in v1)
- `REDDIT_CLIENT_ID`
- `REDDIT_CLIENT_SECRET`
- `REDDIT_USERNAME`
- `REDDIT_PASSWORD`