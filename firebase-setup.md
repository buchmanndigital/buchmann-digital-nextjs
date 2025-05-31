# Firebase Setup für Tippgeber-System

## 1. Firebase Projekt Setup

### Authentication aktivieren
1. Gehen Sie zur Firebase Console: https://console.firebase.google.com/project/affiliate-975d9
2. Navigieren Sie zu "Authentication" → "Sign-in method"
3. Aktivieren Sie "Email/Password" als Anmeldeanbieter

### Admin-Benutzer erstellen
1. Gehen Sie zu "Authentication" → "Users" 
2. Klicken Sie auf "Add user"
3. Tragen Sie Ihre E-Mail-Adresse und ein Passwort ein
4. Notieren Sie sich die generierte User ID (UID)

## 2. Firestore Database Setup

### Database erstellen
1. Navigieren Sie zu "Firestore Database"
2. Klicken Sie auf "Create database"
3. Wählen Sie "Start in test mode" (wir deployen später die Security Rules)
4. Wählen Sie eine Region (z.B. europe-west3 für Deutschland)

### Admin-Benutzer konfigurieren
1. Gehen Sie zu "Firestore Database" → "Data"
2. Erstellen Sie eine neue Collection namens `users`
3. Erstellen Sie ein neues Dokument mit der User ID (UID) aus Schritt 1 als Dokument-ID
4. Fügen Sie die folgenden Felder hinzu:
   - `isAdmin`: boolean → `true`
   - `email`: string → Ihre E-Mail-Adresse (optional, für bessere Übersicht)

### Security Rules deployen
1. Öffnen Sie ein Terminal in Ihrem Projektverzeichnis
2. Installieren Sie Firebase CLI falls noch nicht installiert:
   ```bash
   npm install -g firebase-tools
   ```
3. Loggen Sie sich ein:
   ```bash
   firebase login
   ```
4. Initialisieren Sie Firebase (falls noch nicht gemacht):
   ```bash
   firebase init firestore
   ```
   - Wählen Sie Ihr Projekt: `affiliate-975d9`
   - Verwenden Sie die bestehende `firestore.rules` Datei
   - Verwenden Sie die bestehende `firestore.indexes.json` oder erstellen Sie eine neue
5. Deployen Sie die Rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

## 3. Weitere Admin-Benutzer hinzufügen

Um weitere Admin-Benutzer hinzuzufügen:

1. **Option A: Über Firebase Console**
   - Erstellen Sie einen neuen Benutzer in "Authentication" → "Users"
   - Notieren Sie sich die User ID
   - Erstellen Sie ein neues Dokument in der `users` Collection
   - Dokument-ID = User ID, Feld: `isAdmin: true`

2. **Option B: Über die Anwendung**
   - Lassen Sie den neuen Admin sich zunächst normal registrieren
   - Gehen Sie zur Firebase Console → Firestore → `users` Collection
   - Suchen Sie das Dokument mit der User ID des neuen Benutzers
   - Setzen Sie das Feld `isAdmin` auf `true`

## 4. Testen

1. Gehen Sie zu Ihrer Website: `/tippgeber`
2. Loggen Sie sich mit Ihren Admin-Anmeldedaten ein
3. Sie sollten das Admin-Panel sehen können
4. Testen Sie das Erstellen einer neuen Empfehlung
5. Überprüfen Sie, ob die Empfehlung im Admin-Panel angezeigt wird

## Security Rules Erklärung

Die neue Security Rules funktioniert folgendermaßen:

```javascript
// Benutzer können nur ihre eigenen Daten in der users Collection lesen/schreiben
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}

// Empfehlungen können von jedem erstellt, aber nur von Admins gelesen werden
match /referrals/{referralId} {
  allow create: if true;
  allow read: if request.auth != null 
    && exists(/databases/$(database)/documents/users/$(request.auth.uid))
    && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
}
```

## Vorteile der neuen Lösung

1. **Flexibilität**: Admin-Status kann einfach über Firebase Console geändert werden
2. **Skalierbarkeit**: Beliebig viele Admins möglich
3. **Sicherheit**: Admin-Status wird in der Datenbank gespeichert, nicht im Client-Code
4. **Einfache Verwaltung**: Keine Code-Änderungen nötig, um Admins hinzuzufügen/zu entfernen

## Troubleshooting

- **"Permission denied" Fehler**: Überprüfen Sie, ob die Security Rules korrekt deployed wurden
- **Admin-Panel wird nicht angezeigt**: Überprüfen Sie, ob das `isAdmin` Feld auf `true` gesetzt ist
- **Empfehlungen können nicht geladen werden**: Überprüfen Sie die Browser-Konsole auf Fehlermeldungen 