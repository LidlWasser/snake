# Snake als App aufs Handy

## 1. Diese Dateien hochladen

```
index.html
music.ogg
manifest.json
sw.js
icons/            (ganzer Ordner mit den 3 PNGs)
```

Nicht hochladen: `.claude/` und diese Anleitung (schadet aber auch nicht).

## 2. Online stellen mit GitHub Pages (kostenlos)

1. Auf https://github.com ein Konto anlegen (falls noch keins da ist).
2. Oben rechts **+** → **New repository**
   - Name: `snake`
   - **Public** auswählen (Pages ist im kostenlosen Konto nur für öffentliche Repos verfügbar)
   - **Create repository**
3. Auf der neuen Seite: **uploading an existing file** anklicken.
4. Die Dateien und den Ordner `icons` ins Browserfenster ziehen → unten **Commit changes**.
5. Im Repository: **Settings** → links **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main**, Ordner **/ (root)** → **Save**
6. Nach 1–2 Minuten steht oben auf der Pages-Seite die Adresse, z. B.
   `https://DEIN-NAME.github.io/snake/`

Hinweis: Wer die Adresse kennt, kann das Spiel spielen, und der Code ist öffentlich einsehbar.
Spielstände bleiben trotzdem nur auf dem jeweiligen Gerät.

## 3. Auf dem Handy installieren

Adresse auf dem Handy öffnen, dann:

- **Android (Chrome):** Menü **⋮** → **App installieren** bzw. **Zum Startbildschirm hinzufügen**
- **iPhone (Safari, nicht Chrome):** **Teilen-Symbol** → **Zum Home-Bildschirm**

Danach startet Snake über das Icon im Vollbild und funktioniert auch offline.

## 4. Spielstand vom PC mitnehmen (optional)

1. Am PC im Spiel: **Zahnrad** → **Exportieren** → Datei wird gespeichert.
2. Datei aufs Handy schicken (z. B. per Mail an dich selbst oder Cloud-Speicher).
3. In der Handy-App: **Zahnrad** → **Importieren** → Datei auswählen.

## 5. Später etwas am Spiel ändern

1. Geänderte Dateien in GitHub wieder hochladen (**Add file** → **Upload files**).
2. **Wichtig:** in `sw.js` ganz oben die Version hochzählen, z. B. `snake-v1` → `snake-v2`.
   Sonst behalten Handys die alte Version im Offline-Speicher.
3. Die App auf dem Handy einmal mit Internet öffnen, schließen und neu öffnen.
