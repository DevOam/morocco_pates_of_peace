# Configuration Email pour Morocco Plant Peace

## 📧 Configuration complète du système d'email

J'ai configuré un système d'envoi d'emails complet pour votre formulaire de contact. Voici ce qui a été mis en place et ce que vous devez faire :

## ✅ Ce qui est déjà configuré

### 1. API Route (`/src/app/api/contact/route.ts`)
- Endpoint API pour traiter les soumissions du formulaire
- Validation des données
- Envoi d'emails avec Nodemailer
- Gestion d'erreurs complète

### 2. Formulaire de contact (`ContactForm.tsx`)
- Connecté à l'API
- Gestion des erreurs multilingue
- Interface utilisateur responsive

### 3. Dependencies (`package.json`)
- `nodemailer`: pour l'envoi d'emails
- `@types/nodemailer`: types TypeScript

## 🔧 Configuration requise

### Étape 1: Installer les dépendances
```bash
npm install
```

### Étape 2: Configurer les variables d'environnement
1. Copiez `.env.example` vers `.env.local`:
```bash
cp .env.example .env.local
```

2. Modifiez `.env.local` avec vos vraies valeurs:
```env
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe-application-gmail
CONTACT_EMAIL=contact@moroccoplantpeace.com
```

### Étape 3: Configuration Gmail (recommandé)

#### Option A: Gmail avec mot de passe d'application
1. Activez la vérification en 2 étapes sur votre compte Gmail
2. Générez un mot de passe d'application:
   - Allez dans votre compte Google
   - Sécurité → Vérification en 2 étapes → Mots de passe des applications
   - Sélectionnez "Autre" et nommez-le "Morocco Plant Peace"
   - Utilisez ce mot de passe dans `EMAIL_PASS`

#### Option B: Autres services email
Modifiez la configuration dans `/src/app/api/contact/route.ts`:
```typescript
// Pour Outlook/Hotmail
service: 'hotmail'

// Pour Yahoo
service: 'yahoo'

// Configuration SMTP personnalisée
host: 'smtp.votre-domaine.com',
port: 587,
secure: false,
```

## 📨 Fonctionnalités incluses

### Email à l'équipe Morocco Plant Peace
- Formatage HTML professionnel
- Toutes les informations du formulaire
- Détails du voyage si fournis
- Horodatage automatique

### Email de confirmation automatique au client
- Design aux couleurs Morocco Plant Peace
- Récapitulatif de la demande
- Temps de réponse garanti (2h)
- Liens vers vos réseaux sociaux
- Informations de contact

## 🎨 Personnalisation

### Modifier l'email de destination
Dans `/src/app/api/contact/route.ts`, ligne 21:
```typescript
to: 'votre-nouveau-email@domaine.com',
```

### Personnaliser les templates d'email
Les templates HTML sont dans le même fichier, vous pouvez:
- Modifier les couleurs
- Ajouter votre logo
- Changer le contenu
- Ajouter des liens

### Ajouter des champs au formulaire
1. Modifiez l'interface `FormData` dans `ContactForm.tsx`
2. Ajoutez les champs dans le formulaire
3. Mettez à jour les templates d'email

## 🚀 Test et déploiement

### Test en local
1. Lancez le serveur: `npm run dev`
2. Remplissez le formulaire de contact
3. Vérifiez la réception des emails

### Déploiement
1. Ajoutez les variables d'environnement sur votre plateforme (Vercel, Netlify, etc.)
2. Déployez normalement

## 🔒 Sécurité

- Variables d'environnement protégées
- Validation côté serveur
- Gestion d'erreurs sécurisée
- Pas d'exposition des credentials

## 📞 Support

Si vous avez des questions sur la configuration:
1. Vérifiez que toutes les variables d'environnement sont correctes
2. Testez d'abord avec Gmail (plus simple)
3. Consultez les logs de la console pour les erreurs

Le système est maintenant prêt à recevoir et traiter tous les messages de vos clients !
