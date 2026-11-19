# Portfolio — Razakim Savadogo

Site portfolio statique (HTML / CSS / JavaScript, zéro dépendance, zéro build) déployable tel quel sur Netlify.

## Structure

```
portfolio/
├── index.html                  # page unique (toutes les sections)
├── assets/
│   ├── css/style.css           # design system (thème sombre + clair)
│   ├── js/main.js              # interactions (thème, nav, carrousel, animations)
│   ├── img/favicon.svg
│   └── cv/CV-Razakim-Savadogo.pdf   # CV téléchargeable (boutons « Télécharger mon CV »)
├── netlify.toml                # config Netlify (publish + headers de sécurité)
└── README.md
```

## Personnalisation

- **Photos** : remplace les 4 blocs `Photo 1..4` dans la section « À propos » (`index.html`) par
  `<img src="assets/img/photo-1.jpg" alt="...">` (et idem pour 2, 3, 4), puis dépose les images dans `assets/img/`.
- **CV** : remplace `assets/cv/CV-Razakim-Savadogo.pdf` par ton CV final (même nom de fichier, ou mets à jour les deux liens `download` dans `index.html`).
- **Certificats** : les 26 cartes du carrousel sont générées par `assets/js/main.js` (constante `CERT_COUNT`). Remplace le texte « à compléter » par le vrai intitulé de chaque certificat, ou branche-les sur tes fichiers PDF.
- **Dashboards Power BI** : remplace les 3 cartes `Dashboard Power BI 01..03` par des captures d'écran (images dans `assets/img/`).
- **Liens** : vérifie l'URL LinkedIn dans la section Contact (`index.html`) et les liens de projets (Revote, EMSP Docs, My Sao).
- **Contact** : email, téléphone et GitHub dans la section Contact + pied de page.

## Déploiement sur Netlify

1. Pousse ce dossier dans un dépôt GitHub.
2. Sur Netlify : **Add new site → Import an existing project** → choisis le dépôt.
3. Build command : *(vide)* — Publish directory : `.` (déjà géré par `netlify.toml`).
4. Déploie : le site est servi tel quel, aucun build requis.

## Développement local

Ouvre `index.html` directement dans un navigateur, ou lance un serveur statique :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```
