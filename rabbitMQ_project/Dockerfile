# Utiliser une image de base officielle de Node.js
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier le fichier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances
RUN npm install
RUN npm install -g ts-node typescript

# Copier tout le code source dans le répertoire de travail
COPY . .

# Construire le projet TypeScript
RUN npm run build

# Exposer le port sur lequel l'application va s'exécuter
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
