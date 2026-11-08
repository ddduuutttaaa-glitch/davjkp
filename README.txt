DAV Student Directory - with photo studio, installable on phones

FILES (upload ALL of them to the same folder on your HTTPS host):
  index.html, sw.js, manifest.webmanifest, icon-192.png, icon-512.png

HOSTING (Firebase Hosting, same project dav-students):
  npm install -g firebase-tools
  firebase login
  firebase init hosting      (public folder = the folder holding these files; single-page app: No)
  firebase deploy
If you host somewhere else (Netlify, GitHub Pages...), add that domain in Firebase Console >
Authentication > Settings > Authorized domains, or staff sign-in will fail.

INSTALL ON A PHONE: open the link in Chrome > menu > Install app (iPhone Safari: Share > Add to Home Screen).

PHOTOS: Edit or add a student > "Take or choose photo". The first time on each phone it downloads a ~10 MB
AI model (needs internet once), then it is saved. If the model cannot load, a basic background
replacement is used instead.
