# Guide de Déploiement - Marrakech Tours

## 🚀 Options de Déploiement

### Option 1: Netlify (Recommandé)
```bash
# 1. Build du projet
npm run build

# 2. Déployer sur Netlify
# - Connecter le repo GitHub
# - Build command: npm run build
# - Publish directory: out
```

### Option 2: Vercel
```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Déployer
vercel --prod
```

### Option 3: GitHub Pages
```bash
# 1. Modifier next.config.ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

# 2. Build et déployer
npm run build
```

## 📋 Checklist Pré-Déploiement

- [x] Site fonctionnel en local
- [x] Design responsive testé
- [x] Formulaires de réservation opérationnels
- [x] Navigation entre pages
- [x] Support bilingue FR/AR
- [x] SEO optimisé
- [ ] Tests sur différents navigateurs
- [ ] Optimisation des images
- [ ] Configuration domaine personnalisé

## 🎯 Utilisation Marketing

### Pour Devoam Portfolio:
1. **URL démo**: `https://marrakech-tours-demo.netlify.app`
2. **Description**: "Site démo d'agence de tourisme marocaine - Développé par Devoam"
3. **Technologies**: Next.js, TypeScript, Tailwind CSS
4. **Fonctionnalités**: Réservation, Multilingue, Responsive

### Pitch Client:
> "Voici un exemple concret de notre expertise dans le secteur touristique. 
> Ce site démo montre notre capacité à créer des expériences utilisateur 
> authentiques et professionnelles pour le marché marocain."

## 📞 Contact & Support
- **Développé par**: Devoam - Agence de développement web
- **Support**: Disponible pour personnalisation et développement similaire
- **Délai de réalisation**: 2-3 jours pour un site similaire
