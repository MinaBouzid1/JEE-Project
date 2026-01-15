# 🏠 Plateforme de Location Décentralisée avec Blockchain

> Une plateforme de location de logements moderne intégrant la technologie blockchain Ethereum pour des transactions sécurisées et transparentes.

[![Java](https://img.shields.io/badge/Java-17-red.svg)](https://openjdk.java.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![Ethereum](https://img.shields.io/badge/Ethereum-Blockchain-purple.svg)](https://ethereum.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://www.mysql.com/)

---

## 📋 Table des Matières

- [Vue d'ensemble](#-vue-densemble)
- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [Équipe de Développement](#-équipe-de-développement)
  - [Backend Engineer](#-backend-engineer)
  - [Blockchain and AI Enginner](#-blockchain-developer)
  - [Frontend Developer](#-frontend-developer)
  - [Cloud Engineer](#-cloud-engineer)
  - [DevOps Engineer](#-devops-engineer)
- [Backend Architecture](#-backend-architecture)
- [Frontend Architecture](#-frontend-architecture)
- [Blockchain And AI Implementation](#-blockchainandai-implementation)
- [Cloud & DevOps](#-cloud--devops)
- [Infrastructure](#-infrastructure)
- [Installation](#-installation)
- [Licence](#-licence)

---

## 🎯 Vue d'ensemble

Cette plateforme révolutionne le marché de la location immobilière en combinant :
- **Interface moderne** : React avec Material-UI
- **Architecture microservices** : Évolutivité et maintenabilité
- **Blockchain Ethereum** : Paiements sécurisés via smart contracts
- **Communication temps réel** : Chat intégré
- **Géolocalisation** : Cartographie interactive des propriétés

### Fonctionnalités Principales

✅ Inscription et authentification sécurisée (JWT)  
✅ Gestion complète des annonces immobilières  
✅ Système de réservation avec calcul automatique des prix  
✅ Paiements en cryptomonnaie (ETH) via MetaMask  
✅ Escrow décentralisé pour la protection des transactions  
✅ Chat temps réel propriétaire-locataire  
✅ Système d'avis et de notations  
✅ Notifications par email

---

## 🏗 Architecture

### Architecture en 5 Couches

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND LAYER                          │
│Angular 18.2+ TypeScript+ NgRx 18.0 + Material-UI + Web3.js  │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                   API GATEWAY LAYER                         │
│     Spring Cloud Gateway (Port 8080)                        │
│   Routage | Sécurité JWT | Rate Limiting | Load Balancing  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  MICROSERVICES LAYER                        │
│  User (8081) | Listing (8082) | Booking (8083)             │
│  Payment (8084) | Messaging (8085) | Notification (8086)   │
│  Review (8087) | Media (8088) | Blockchain (8089)          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│               SERVICES INFRASTRUCTURE                       │
│  Eureka (8761) | Config Server (8888) | RabbitMQ (5672)    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     DATA LAYER                              │
│           MySQL 8.0 (3306) | AWS S3 Storage                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  BLOCKCHAIN LAYER                           │
│     Ethereum Network (Sepolia) | Infura                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠 Technologies

### Backend
- **Framework** : Spring Boot 3.x
- **Langage** : Java 17
- **Build Tool** : Maven
- **Base de données** : MySQL 8.0
- **Message Broker** : RabbitMQ
- **Cache** : Redis (optionnel)
- **Service Discovery** : Netflix Eureka
- **Configuration** : Spring Cloud Config
- **API Gateway** : Spring Cloud Gateway
- **Blockchain** : Web3j (Java Ethereum Client)

### Frontend
- **Framework** : Angular 18.2 avec TypeScript
- **State Management** : NgRx 18.0
- **UI Library** : Angular Material 18.2
- **Blockchain** : Web3.js / Ethers.js
- **Maps** : ngx-leaflet 18.0
- **Real-time** : Socket.io-client 4.8
- **HTTP Client** : Axios 1.13
  
### Blockchain
- **Network** : Ethereum (Sepolia Testnet / Mainnet)
- **Smart Contracts** : Solidity 0.8.x
- **Development** : Hardhat
- **Node Provider** : Infura / Alchemy
- **Wallet** : MetaMask

### DevOps
- **Containerization** : Docker
- **Orchestration** : Docker Compose / Kubernetes
- **CI/CD** : GitHub Actions / Jenkins
- **Monitoring** : Prometheus + Grafana
- **Logging** : ELK Stack (Elasticsearch, Logstash, Kibana)

---

## 👥 Équipe de Développement

### 🎨 Backend Engineer
**Nom** : Bouzid Mina  
**Rôle** : Architecture & Développement Backend  
**Responsabilités** :
- Conception de l'architecture microservices
- Développement des 9 microservices backend
- Configuration Spring Cloud (Eureka, Gateway, Config)
- Base de données MySQL et intégrations
- Sécurité et authentification JWT

---

### ⛓ Blockchain And AI  Engineer
**Nom** : Ikrame Houzane 

**Rôle** : Blockchain & AI Engineer

**Responsabilités** :
- Conception et développement du contrat principal  
- Déploiement sur le testnet Sepolia  
- Développement de 4 modèles de Machine Learning  
- Création d'un microservice REST performant (FastAPI)  
- Préparation de l'intégration avec le backend

---

### ⚛️ Frontend Developer
**Nom** : Allali Fatima-ezzahra 
**Rôle** : Développeur Frontend  
**Responsabilités** :
- Développement de l'interface Angular avec TypeScript
- Intégration Web3.js et MetaMask
- Développement des composants Material-UI
- Cartographie avec React-Leaflet
- Gestion d'état avec NgRx (Store, Effects, Selectors)


---

### ☁️ Cloud Engineer
**Nom** : [À compléter]  
**Rôle** : Architecte Cloud & Infrastructure  
**Responsabilités** :
- Architecture cloud et déploiement AWS
- Configuration des services cloud (S3, RDS, etc.)
- Optimisation des performances et coûts
- Sécurité cloud et conformité
- Plan de reprise d'activité

---

### 🚀 DevOps Engineer
**Nom** : [À compléter]  
**Rôle** : DevOps & Infrastructure  
**Responsabilités** :
- Containerisation avec Docker
- Orchestration avec Kubernetes
- CI/CD pipelines
- Monitoring et logging
- Automatisation de l'infrastructure

---



## 🔧 Backend Architecture

### Conception de l'Architecture Microservices
Conception et implémentation d'une architecture modulaire et évolutive basée sur les principes des microservices, permettant une scalabilité horizontale et une maintenabilité optimale.

### Infrastructure Spring Cloud Complète
- **Eureka Server (Port 8761)** : Service Discovery avec health checking
- **Config Server (Port 8888)** : Configuration centralisée avec backend Git
- **API Gateway (Port 8080)** : Routage intelligent, sécurité JWT, rate limiting, CORS
- **RabbitMQ** : Communication asynchrone avec gestion des files d'attente
- **Base de données MySQL** : Schéma normalisé avec 37 tables optimisées

### Les 9 Microservices Backend

#### 1. User Service (Port 8081)
- Authentification JWT avec refresh tokens
- Vérification email/SMS
- Gestion des profils et wallets Ethereum
- Support multi-langues (20 langues)
- Spring Security avec BCrypt

#### 2. Listing Service (Port 8082)
- CRUD complet des propriétés
- Système de disponibilités et calendrier
- Tarification dynamique
- Recherche et filtrage avancés
- Versioning des propriétés

#### 3. Booking Service (Port 8083)
- Système de demandes de réservation
- Validation des disponibilités temps réel
- Calcul automatique des prix
- Machine à états pour les statuts
- Intégration blockchain

#### 4. Payment Service (Port 8084)
- Intégration Web3j avec Ethereum
- Gestion des transactions blockchain
- Escrow de fonds décentralisé
- Suivi des gas fees
- Gestion des remboursements

#### 5. Messaging Service (Port 8085)
- Chat temps réel avec WebSocket/STOMP
- Gestion des conversations
- Statut de lecture et notifications
- Archivage automatique

#### 6. Notification Service (Port 8086)
- Envoi d'emails via SMTP
- File d'attente RabbitMQ pour async
- Templates HTML personnalisés

#### 7. Review Service (Port 8087)
- Système complet d'avis et notations
- Calcul des moyennes de notes
- Modération de contenu
- Gestion de la visibilité

#### 8. Media Service (Port 8088)
- Upload de photos avec Multipart
- Compression et redimensionnement
- Intégration AWS S3
- Génération de thumbnails
- Gestion de l'ordre d'affichage

#### 9. Blockchain Service (Port 8089)
- Interface avec smart contracts
- Décodage des events blockchain
- Création de réservations on-chain
- Synchronisation backend ↔ blockchain


---




# Frontend Architecture
![Angular](https://img.shields.io/badge/Angular-18.2-DD0031?style=flat&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat&logo=typescript)
![NgRx](https://img.shields.io/badge/NgRx-18.0-BA2BD2?style=flat&logo=ngrx)
![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-3C3C3D?style=flat&logo=ethereum)
![Material](https://img.shields.io/badge/Material_UI-18.2-0081CB?style=flat&logo=material-ui)

---

## 📋 Table des matières

- [🎯 Fonctionnalités](#-fonctionnalités)
- [🛠️ Stack Technique](#️-stack-technique)
- [🏗️ Architecture](#️-architecture)
- [📁 Structure du Projet](#-structure-du-projet)
- [📸 Aperçu](#-aperçu)

---

## 🎯 Fonctionnalités

### 🔐 Authentification Web3
- ✅ Connexion/Inscription avec **MetaMask**
- ✅ Signature de message pour authentification
- ✅ Gestion des wallets Ethereum
- ✅ Vérification d'email

### 🏡 Gestion des Propriétés
- ✅ Recherche avancée avec filtres (lieu, prix, équipements, type)
- ✅ Autocomplete intelligent de localisation
- ✅ Vue détaillée avec galerie photos
- ✅ Carte interactive (Leaflet)
- ✅ Système d'avis et notes
- ✅ Suggestion de prix par IA

### 🏠 Espace Propriétaire (Host)
- ✅ Tableau de bord avec statistiques
- ✅ Création de propriété (wizard multi-étapes)
- ✅ Gestion du calendrier de disponibilité
- ✅ Édition modulaire des informations
- ✅ Gestion des réservations reçues
- ✅ Upload de photos (S3)

### 📅 Réservations
- ✅ Réservation instantanée ou sur demande
- ✅ Calcul automatique des prix (nuits, frais, réductions)
- ✅ Paiement en **ETH** via MetaMask
- ✅ Système d'escrow blockchain
- ✅ Check-in / Check-out
- ✅ Historique des réservations (à venir, passées, annulées)
- ✅ Annulation avec remboursement

### 💬 Messagerie Temps Réel
- ✅ Chat WebSocket entre hôte et locataire
- ✅ Indicateurs de présence (en ligne/hors ligne)
- ✅ Compteur de messages non lus
- ✅ Statut de lecture des messages
- ✅ Conversations liées aux réservations

### 🔔 Notifications
- ✅ Notifications en temps réel
- ✅ Badge avec compteur de non-lus
- ✅ Marquer comme lu
- ✅ Historique complet

### ⭐ Système d'Avis
- ✅ Notation par critères (propreté, emplacement, communication...)
- ✅ Commentaires détaillés
- ✅ Statistiques globales par propriété
- ✅ Modification/Suppression d'avis

### 👤 Profil Utilisateur
- ✅ Informations personnelles
- ✅ Gestion des langues parlées
- ✅ Photo de profil
- ✅ Historique des avis
- ✅ Mode hôte / invité

---

## 🛠️ Stack Technique

### Frontend Core
- **Framework** : Angular 18.2
- **Language** : TypeScript 5.5
- **State Management** : NgRx 18.0 (Store, Effects, Selectors)
- **UI Library** : Angular Material 18.2
- **Styling** : SCSS

### Blockchain & Web3
- **Library** : Ethers.js 6.13
- **Network** : Sepolia Testnet
- **Wallet** : MetaMask

### Cartographie
- **Maps** : ngx-leaflet 18.0 + Leaflet 1.9
- **Geocoding** : Google Maps API

### Communication
- **HTTP Client** : Axios 1.13
- **Real-time** : Socket.io-client 4.8
- **WebSocket** : Native WebSocket API

### Backend Integration
- **API Gateway** : Spring Cloud Gateway (port 8080)

---

## 🏗️ Architecture

```
Frontend (Angular 18)
├── Core Layer
│   ├── Services (API, Auth, Web3, WebSocket...)
│   ├── Guards (auth, noAuth)
│   ├── Models (TypeScript interfaces)
│   └── Pipes (EthPrice)
│
├── State Management (NgRx)
│   ├── Auth Store
│   ├── Booking Store
│   ├── Listings Store
│   ├── Messaging Store
│   ├── Notifications Store
│   └── Payment Store
│
├── Features (Smart Components)
│   ├── Home
│   ├── Auth (Login, Register)
│   ├── Listings (Search, Filters)
│   ├── Property Detail
│   ├── Booking Management
│   ├── Host Dashboard
│   ├── Messages
│   └── Profile
│
└── Shared (Presentational Components)
    ├── Navbar
    ├── Footer
    ├── Search Bar
    ├── Property Card
    ├── Notification Bell
    └── Reviews
```

### Communication avec le Backend

```
Angular App
    ↓
API Gateway (http://localhost:8080/api)
    ↓
Microservices (8081-8089)
    ↓
Bases de données (PostgreSQL, MongoDB)
    ↓
Blockchain (Sepolia Testnet)
```

---

## 📁 Structure du Projet

```
src/
├── app/
│   ├── core/                          # Services, Guards, Models
│   │   ├── guards/                    # auth.guard, noAuth.guard
│   │   ├── models/                    # 19 modèles TypeScript
│   │   ├── pipes/                     # eth-price.pipe
│   │   └── services/                  # 15+ services
│   │       ├── api.service.ts
│   │       ├── auth.service.ts
│   │       ├── booking.service.ts
│   │       ├── property.service.ts
│   │       ├── payment.service.ts
│   │       ├── web3.service.ts
│   │       ├── websocket.service.ts
│   │       └── ...
│   │
│   ├── features/                      # Composants métier
│   │   ├── home/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── listing/
│   │   │   ├── listings.component.ts
│   │   │   ├── filters-modal/
│   │   │   └── property-card/
│   │   ├── property-detail/
│   │   │   ├── property-detail.component.ts
│   │   │   ├── booking-card/
│   │   │   └── payment-modal/
│   │   ├── my-bookings/
│   │   │   ├── my-bookings.component.ts
│   │   │   ├── booking-card/
│   │   │   ├── booking-detail-dialog/
│   │   │   └── review-form/
│   │   ├── host/
│   │   │   ├── host-layout/
│   │   │   ├── host-properties/
│   │   │   ├── property-wizard/
│   │   │   ├── host-property-detail/
│   │   │   └── host-bookings/
│   │   ├── messages/
│   │   │   ├── chat-view/
│   │   │   ├── conversations-list/
│   │   │   └── message-badge/
│   │   └── profile/
│   │       ├── profile.component.ts
│   │       ├── profile-info/
│   │       ├── profile-languages/
│   │       └── profile-reviews/
│   │
│   ├── shared/                        # Composants réutilisables
│   │   └── components/
│   │       ├── navbar/
│   │       ├── footer/
│   │       ├── search-bar/
│   │       ├── notification-bell/
│   │       ├── about/
│   │       ├── contact/
│   │       ├── faq/
│   │       ├── trust-safety/
│   │       ├── how-it-works/
│   │       └── become-host/
│   │
│   ├── store/                         # NgRx State Management
│   │   ├── auth/
│   │   │   ├── auth.actions.ts
│   │   │   ├── auth.effects.ts
│   │   │   ├── auth.reducer.ts
│   │   │   └── auth.selectors.ts
│   │   ├── booking/
│   │   ├── listings/
│   │   ├── messaging/
│   │   ├── notifications/
│   │   └── payment/
│   │
│   ├── app.routes.ts                  # Configuration du routing
│   ├── app.component.ts
│   └── app.config.ts
│
├── environments/
│   ├── environment.ts                 # Config développement
│   └── environment.prod.ts            # Config production
│
├── styles.scss                        # Styles globaux
└── index.html
```

---


## 📸 Aperçu

### Page d'Accueil
- Hero section avec search bar
- Destinations populaires
- Propriétés mises en avant
- Section "Pourquoi nous choisir"
- Footer informatif

### Recherche et Filtres
- Barre de recherche intelligente
- Filtres avancés (prix, type, équipements, règles)
- Cartes de propriétés avec photos
- Pagination et tri

### Détail de Propriété
- Galerie photos
- Informations complètes
- Carte de localisation
- Calendrier de disponibilité
- Section réservation
- Avis clients

### Paiement
- Modal de paiement step-by-step
- Vérification du solde ETH
- Intégration MetaMask
- Confirmation blockchain
- Tracking de transaction

### Espace Hôte
- Dashboard avec statistiques
- Gestion des propriétés
- Calendrier de réservations
- Messagerie avec clients
- Édition complète des annonces

### Messagerie
- Liste des conversations
- Chat en temps réel
- Indicateurs de présence
- Notifications de nouveaux messages

---
##### Documentation Technique
Pour une documentation technique complète (architecture détaillée, services, store NgRx, composants), consultez :
📖 **[README-DETAILED.md](./README-DETAILED.md)**
 
---

## Blockchain And AI Implementation
**Technologies principales** : Solidity, Hardhat, Ethers.js, Python, FastAPI, Machine Learning  
**Réseau** : Ethereum Sepolia Testnet
## Mon périmètre de responsabilité

1. **Blockchain (Smart Contracts)**  
   - Conception et développement du contrat principal  
   - Déploiement sur le testnet Sepolia  
   - Tests 

2. **Intelligence Artificielle**  
   - Développement de 4 modèles de Machine Learning  
   - Création d'un microservice REST performant (FastAPI)  
   - Préparation de l'intégration avec le backend
   
## 🔗 Partie 1 – Blockchain
## 📋 Vue d'ensemble

Le module `rental-dapp-blockchain` contient l'implémentation d'un **smart contract Ethereum** pour gérer les réservations de propriétés immobilières de manière **décentralisée et transparente**.

### 🎯 Objectifs principaux

- Créer et gérer des réservations avec paiements en escrow (séquestre)
- Implémenter une politique de remboursement flexible
- Gérer les frais de plateforme (5% prélevés à la réservation)
- Permettre aux locataires de noter les propriétés (ratings immuables)
- Protéger les propriétaires et locataires via des smart contracts
- Intégrer la blockchain avec le backend
### Technologies utilisées

| Technologie     | Version     | Utilisation                         
|-----------------|-------------|-------------------------------------
| Solidity        | 0.8.20      | Langage smart contract              |
| Hardhat         | 2.26.3      | Framework de développement & tests  |
| Ethers.js       | 6.15.0      | Interaction avec la blockchain      |
| OpenZeppelin    | Latest      | Bibliothèques sécurisées            |
| Node.js         | 22.14.0     | Runtime JavaScript
---

## 🏗️ Architecture

### Structure du projet

```
rental-dapp-blockchain/
├── contracts/
│   └── RentalPlatform.sol          # Smart contract principal
├── scripts/
│   ├── deployment/
│   │   ├── deploy.js               # Script de déploiement
│   │   └── deployment-info.json    # Infos du contrat déployé
│   └── interactions/
│       ├── testRental.js           # Tests d'intégration
│       ├── superTestRental.js      # Tests avancés
│       └── stressTestRental.js     # Tests de charge
├── test/
│   └── unit/
│       └── RentalPlatform.test.js  # Tests unitaires
├── blockchain-integration/         # SDK pour intégration
│   ├── services/
│   │   ├── contractService.js      # Interactions avec contrat
│   │   ├── eventListener.js        # Écoute des événements
│   │   └── syncService.js          # Synchronisation BDD
│   ├── config/
│   │   └── blockchain.config.js    # Configuration
│   └── abi/
│       └── RentalPlatform.json     # ABI du contrat
├── hardhat.config.js               # Configuration Hardhat
├── package.json                    # Dépendances
└── README.md                       # Documentation technique
```
---

## 🔗 Smart Contract - RentalPlatform.sol

### Caractéristiques principales

#### 1. **Gestion des réservations** 📅

Le contrat implémente un système complet de réservation avec états:

```javascript
enum BookingStatus {
    PENDING,      // En attente
    CONFIRMED,    // Confirmée et payée (argent en escrow)
    CHECKED_IN,   // Locataire arrivé (séjour en cours)
    CHECKED_OUT,  // Locataire parti (en attente de libération)
    COMPLETED,    // Terminée (paiements libérés)
    CANCELLED     // Annulée
}
```

**Cycle de vie d'une réservation:**
1. **Création** → Locataire crée réservation + paie en ETH
2. **Confirmation** → Argent en escrow dans le contrat
3. **Check-in** → Locataire arrive
4. **Check-out** → Locataire part
5. **Libération** → Admin libère les fonds au propriétaire
6. **Completion** → Réservation terminée
7. **Optional: Rating** → Locataire note la propriété

#### 2. **Paiements en escrow** 💰

```javascript
// Frais de plateforme: 5%
platformFee = rentalAmount * 5 / 100
totalAmount = rentalAmount + platformFee

// Les frais vont IMMÉDIATEMENT au wallet plateforme
// Le rentalAmount reste BLOQUÉ jusqu'au check-out complet
```

**Sécurité:**
- Les fonds ne peuvent être libérés qu'après le check-out
- Les frais ne sont PAS remboursables en cas d'annulation
- Utilise le pattern "Pull" pour les retraits (plus sûr)

#### 3. **Politique de remboursement** 📋

En cas d'annulation AVANT check-in:

| Délai avant check-in | Remboursement |
|---|---|
| > 7 jours | 100% remboursement |
| 3-7 jours | 50% remboursement |
| < 3 jours | 0% remboursement |

**Important:** Les frais de plateforme (5%) ne sont JAMAIS remboursables.

#### 4. **Prévention du double-booking** 🔒

```javascript
function isPropertyAvailable(
    uint256 _propertyId,
    uint256 _startDate,
    uint256 _endDate
) public view returns (bool)
```

Vérification automatique pour éviter que 2 réservations se chevauchent:
- Parcourt toutes les réservations du logement
- Ignore les réservations annulées ou complétées
- Détecte les chevauchements de dates
- Rejette si conflit détecté

#### 5. **Système de notation** ⭐

```javascript
// Une note par réservation (après COMPLETED)
// Notes stockées sur blockchain = immuables
// Notes: 1 à 5 étoiles

struct Rating {
    address tenant;      // Qui a noté
    uint256 propertyId;  // Propriété notée
    uint8 stars;         // Note 1-5
    uint256 timestamp;   // Quand
}

// Optimisation: O(1) pour obtenir la moyenne
function getAverageRating(uint256 _propertyId)
    returns uint256 (moyenne * 100)
```

**Avantage:** Les notes sont immuables sur la blockchain → impossible de tricher.

#### 6. **Sécurité multi-couches** 🛡️

**Protections implémentées:**

| Protection | Détail |
|---|---|
| **ReentrancyGuard** | Évite les attaques de réentrance sur les retraits |
| **Ownable** | Contrôle d'accès admin (onlyOwner) |
| **Modifiers** | Vérification des conditions avant exécution |
| **Checks-Effects-Interactions** | Modifie l'état AVANT les transferts (sécurité) |
| **Pull Pattern** | Propriétaires retirent eux-mêmes (pas de push direct) |
| **Input Validation** | Validation stricte de tous les paramètres |

---

## 📡 Fonctions principales du contrat

### Fonctions client (Locataires)

#### `createBooking(propertyId, startDate, endDate, rentalAmount)` payable
Crée une réservation avec paiement:
- Vérifie disponibilité logement
- Calcule frais (5%)
- Transfère ETH
- Retourne bookingId

#### `checkIn(bookingId)`
Marque l'arrivée du locataire:
- Seulement le locataire
- Après startDate
- Change statut: CONFIRMED → CHECKED_IN

#### `checkOut(bookingId)`
Marque le départ du locataire:
- Seulement le locataire
- Change statut: CHECKED_IN → CHECKED_OUT

#### `cancelBooking(bookingId)`
Annule une réservation (avant check-in):
- Seulement avant startDate
- Applique politique de remboursement
- Frais plateforme non remboursables

#### `addRating(bookingId, stars)`
Ajoute une note après séjour:
- Seulement après COMPLETED
- Stars: 1-5
- Stocké immuablement sur blockchain

### Fonctions propriétaire

#### `withdraw()`
Retire ses fonds en attente:
- Pattern Pull (plus sûr)
- Propriétaire reçoit rentalAmount après check-out complet
- Protection contre réentrance

### Fonctions admin (onlyOwner)

#### `setPropertyOwner(propertyId, ownerAddress)`
Enregistre le propriétaire d'un logement:
- **OBLIGATOIRE** avant réservation
- Permet la libération des fonds après check-out

#### `releaseFunds(bookingId)`
Libère les fonds au propriétaire après check-out:
- Seulement admin
- Crédite pendingWithdrawals du propriétaire
- Statut: CHECKED_OUT → COMPLETED

#### `setPlatformFee(newFeePercentage)`
Change les frais de plateforme:
- Max 10%
- N'affecte que les nouvelles réservations
- Émet événement de transparence

#### `setPlatformWallet(newAddress)`
Change l'adresse du wallet plateforme:
- Utile en cas de migration ou sécurité

### Fonctions de lecture (View - Gratuites)

```javascript
getBooking(bookingId)              // Détails complet réservation
getTenantBookings(tenantAddr)      // Historique locataire
getPropertyBookings(propertyId)    // Historique propriété
getPropertyRatings(propertyId)     // Toutes les notes
getPropertyOwner(propertyId)       // Propriétaire du logement
getPendingWithdrawal(address)      // Montant en attente retraits
getAverageRating(propertyId)       // Moyenne notes (optimisée O(1))
isPropertyAvailable(...)           // Vérifie disponibilité dates
```

---

## 🔔 Événements blockchain

Le contrat émet des événements pour la synchronisation:

| Événement | Détail |
|---|---|
| **BookingCreated** | Nouvelle réservation créée |
| **BookingConfirmed** | Paiement confirmé |
| **CheckInCompleted** | Locataire arrivé |
| **CheckOutCompleted** | Locataire parti |
| **BookingCompleted** | Réservation terminée |
| **BookingCancelled** | Réservation annulée (+ montant remboursé) |
| **PaymentReleased** | Fonds crédités propriétaire |
| **RatingAdded** | Note ajoutée |
| **PlatformFeeUpdated** | Frais modifiés (transparence) |
| **PlatformWalletChanged** | Wallet plateforme changé |
| **PropertyOwnerSet** | Propriétaire enregistré |

**Utilisation:** Le backend écoute ces événements pour synchroniser la base de données.

---

## 🛠️ Installation & Configuration

### Prérequis

- Node.js 18+ 
- npm ou yarn
- Compte MetaMask ou clef privée Ethereum
- RPC URL (Infura, Alchemy, etc.)

### Installation

```bash
cd rental-dapp-blockchain

# Installer les dépendances
npm install
```

### Configuration (.env)

```bash
cp .env.example .env
```

Éditer `.env`:

```env
# Réseau Ethereum (Sepolia testnet)
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=votre_clef_privee_admin
CONTRACT_ADDRESS=0x... # Après déploiement

# Vérification contrats (Etherscan)
ETHERSCAN_API_KEY=votre_cle_etherscan
```

---

## 🚀 Déploiement

### Déployer le contrat

```bash
# Sur testnet Sepolia
npx hardhat run scripts/deployment/deploy.js --network sepolia

# Sur réseau local (Hardhat)
npx hardhat run scripts/deployment/deploy.js --network hardhat
```

Le script génère `deployment-info.json`:

```json
{
  "contractAddress": "0x...",
  "deployerAddress": "0x...",
  "platformWallet": "0x...",
  "deploymentTx": "0x...",
  "deploymentBlock": 12345678,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Enregistrer un logement

Avant qu'un logement puisse recevoir des réservations:

```bash
# Admin enregistre propriétaire du logement (propertyId = 1)
npx hardhat run scripts/interactions/registerProperty.js --network sepolia

# Ou via blockchain-integration:
const contractService = require('./blockchain-integration/services/contractService');
await contractService.setPropertyOwner(propertyId, ownerAddress);
```

---

## 🧪 Tests

### Tests unitaires (Hardhat)

```bash
# Lancer tous les tests
npx hardhat test

# Avec détails
npx hardhat test --verbose

# Test spécifique
npx hardhat test test/unit/RentalPlatform.test.js
```

### Tests d'intégration

```bash
# Test complet du flux réservation
npx hardhat run scripts/interactions/testRental.js --network sepolia

# Tests avancés
npx hardhat run scripts/interactions/superTestRental.js --network sepolia

# Tests de charge (stress test)
npx hardhat run scripts/interactions/stressTestRental.js --network sepolia
```

---

## 🔌 Intégration avec le backend

Pour l'intégration avec le backend, on a fait tout un microservice: blockchain-service. 
##### Fichiers Livrés au Backend

✅ Adresse du contrat déployé

✅ ABI (Application Binary Interface)

✅ Documentation des fonctions

✅ Scripts d'interaction

#### Services disponibles

##### 1. **contractService.js** - Interactions avec contrat

```javascript
const contractService = require('./services/contractService');

// Créer réservation
const bookingId = await contractService.createBooking({
    propertyId: 1,
    startDate: Math.floor(Date.now() / 1000) + 86400,  // Demain
    endDate: Math.floor(Date.now() / 1000) + 172800,   // Dans 2 jours
    rentalAmount: ethers.parseEther('0.5')              // 0.5 ETH
});

// Vérifier disponibilité
const available = await contractService.isPropertyAvailable(
    1, 
    startDate, 
    endDate
);

// Obtenir détails réservation
const booking = await contractService.getBooking(1);

// Check-in
await contractService.checkIn(1);

// Check-out
await contractService.checkOut(1);

// Admin: libérer fonds
await contractService.releaseFunds(1);

// Retirer ses fonds (propriétaire)
await contractService.withdraw();

// Ajouter rating
await contractService.addRating(1, 5);

// Admin: enregistrer propriétaire logement
await contractService.setPropertyOwner(1, ownerAddress);
```

##### 2. **eventListener.js** - Écoute événements blockchain

```javascript
const eventListener = require('./services/eventListener');

// Écouter événements
eventListener.listenToBookingEvents((event) => {
    console.log('Event reçu:', event);
    
    // Synchroniser BDD MySQL
    // Exemple: INSERT booking ou UPDATE statut
});

// Ou événements spécifiques
eventListener.onBookingCreated((bookingId, tenant, propertyId) => {
    // Créer booking en BDD
});

eventListener.onCheckInCompleted((bookingId) => {
    // Mettre à jour statut en BDD
});

eventListener.onPaymentReleased((bookingId, owner, amount) => {
    // Créditer propriétaire en BDD
});
```

##### 3. **syncService.js** - Synchronisation bidirectionnelle

```javascript
const syncService = require('./services/syncService');

// Synchroniser l'état blockchain ↔ BDD
await syncService.syncBookingStatus(bookingId);

// Obtenir état complet (blockchain + BDD)
const bookingState = await syncService.getFullBookingState(bookingId);
```

---

## 📊 Flux de données

### Création de réservation

```
Frontend (React)
    ↓ [créer réservation + montant ETH]
Backend (Java/Spring)
    ↓ [valider données]
Blockchain (Smart Contract)
    ├→ Vérifier disponibilité
    ├→ Calculer frais (5%)
    ├→ Créer Booking en état CONFIRMED
    ├→ Transférer frais au wallet plateforme
    ├→ Émettre event BookingCreated
    └→ Retourner bookingId
Backend
    ├→ Écouter event BookingCreated
    ├→ Insérer booking en BDD MySQL
    ├→ Notifier propriétaire par email
    └→ Retourner confirmation au frontend
```

### Libération de fonds (après check-out)

```
Admin Dashboard
    ↓ [cliquer "Libérer fonds"]
Backend (Admin API)
    ↓ [appeler releaseFunds(bookingId)]
Blockchain
    ├→ Vérifier statut = CHECKED_OUT
    ├→ Récupérer adresse propriétaire
    ├→ Créditer pendingWithdrawals[owner] += rentalAmount
    ├→ Changer statut → COMPLETED
    ├→ Émettre event PaymentReleased
    └→ Retourner tx hash
Backend
    ├→ Écouter event PaymentReleased
    ├→ Mettre à jour BDD (status = COMPLETED)
    ├→ Notifier propriétaire du crédit
    └→ Logging audit trail
```
---
## 🔗 Partie 2 – AI Service

Microservice d'intelligence artificielle FastAPI avec 4 modèles ML optimisés pour la plateforme de location immobilière décentralisée.

---
## 📋 Vue d'ensemble

Le **AI Service** est un microservice Python/FastAPI qui fournit **4 fonctionnalités d'IA** pour optimiser la plateforme de location:

| Fonctionnalité | Algorithme | Optimisation | Cas d'usage |
|---|---|---|---|
| **💰 Price Prediction** | GradientBoosting | GridSearchCV (108 combinaisons) | Suggérer prix optimal en ETH |
| **⚠️ Risk Scoring** | RandomForest | GridSearchCV (216 combinaisons) | Évaluer risque locataire (0-100) |
| **🏠 Recommendations** | Collaborative Filtering | Cosine Similarity | Recommander propriétés personnalisées |
| **📈 Market Trend** | KMeans Clustering | Time-series analysis | Prédire tendances marché par quartier |


### Remarque 
Ces modèles nécessitent des volumes de données importants, structurés et exploitables pour l’entraînement, C’est pour cette raison qu’on a choisi de travailler sur des données synthétiques.

### 🏆 Points forts

- **Blockchain-native** : Prix directement en ETH + EUR
- **Production-ready** : CORS configuré, health checks, validation Pydantic
- **Hyperoptimisé** : GridSearchCV sur tous les modèles
- **Auto-documenté** : Swagger UI générée automatiquement
- **Ultra-rapide** : Prédictions < 50ms
- **Scalable** : Architecture microservices

## 🏗️ Architecture

### Flux de données

```
┌──────────────────────────────────────────────────────────┐
│               FRONTEND (Angular, React)                  │
│               Port: 4200                                 │
└─────────────────────┬────────────────────────────────────┘
                      │ HTTP/JSON (REST)
                      ↓
┌──────────────────────────────────────────────────────────┐
│              BACKEND (Java/Spring Boot)                  │
│              Port: 8080                                  │
│  (booking-service, listing-service, user-service)        │
└─────────────────────┬────────────────────────────────────┘
                      │ HTTP/JSON (REST)
                      ↓
┌──────────────────────────────────────────────────────────┐
│            AI SERVICE (FastAPI + scikit-learn)           │
│            Port: 8090                                    │
│                                                          │
│  ┌──────────────┬──────────────┬──────────────────────┐  │
│  │ Price        │ Risk         │ Recommend / Trend    │  │
│  │ Prediction   │ Scoring      │                      │  │
│  └──────────────┴──────────────┴──────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │  ML Models (4 × .pkl)    │ Datasets (3 × CSV)   │     │
│  └──────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```
### Structure du projet

```
ai-service/
├── app/
│   ├── main.py                    # Point d'entrée FastAPI
│   ├── config.py                  # Configuration
│   ├── routers/                   # Endpoints API
│   │   ├── price.py              # POST /price/predict
│   │   ├── scoring.py            # POST /scoring/predict
│   │   ├── recommend.py          # POST /recommend/predict
│   │   └── trend.py              # GET /trend/trends
│   ├── schemas/                   # Validation Pydantic
│   │   ├── price.py              # Modèles Price
│   │   ├── risk.py               # Modèles Risk
│   │   ├── recommendation.py     # Modèles Recommendation
│   │   └── trend.py              # Modèles Trend
│   ├── services/                  # Logique ML
│   │   ├── price_model.py        # Entraînement + prédiction
│   │   ├── scoring_model.py      # Entraînement + scoring
│   │   ├── recommend_model.py    # Collaborative Filtering
│   │   └── trend_model.py        # KMeans clustering
│   └── utils/
│       ├── data_loader.py        # Chargement données
│       └── logger.py             # Logging
├── datasets/
│   ├── generate_datasets.py       # Génération données réalistes
│   ├── raw/
│   │   ├── property_price.csv    # 300 propriétés
│   │   ├── tenant_risk.csv       # 1000 locataires
│   │   └── recommendation.csv    # 5000 interactions
│   └── processed/                # Données prétraitées
├── models/                        # Modèles ML entraînés
│   ├── price_prediction_model.pkl
│   ├── risk_scoring_model.pkl
│   ├── recommendation_model.pkl
│   └── trend_model.pkl
├── notebooks/
│   └── ai_service_analysis.ipynb # Analyse exploratoire
├── tests/                         # Tests unitaires
├── Dockerfile                     # Containerisation
├── requirements.txt               # Dépendances Python
└── README.md                      # Documentation
```

---
## 🤖 Modèles ML en détail

### 1️⃣ Price Prediction - Prédiction de prix

**Objectif:** Prédire le prix optimal par nuit d'une propriété en ETH

#### Algorithme: GradientBoosting

```python
GradientBoostingRegressor(
    n_estimators=200,
    learning_rate=0.1,
    max_depth=5,
    min_samples_split=5,
    min_samples_leaf=2
)
```

#### Performance

| Métrique | Valeur |
|---|---|
| **MAE (Mean Absolute Error)** | 0.0106 ETH (~37€) |
| **R² Score** | 97.4% |
| **Erreur moyenne** | ±3.5% du prix prédit |
| **Temps prédiction** | 15ms |

#### Features utilisées

| Feature | Importance | Détail |
|---|---|---|
| **surface** | 74.5% | Surface en m² (20-250) |
| **rooms** | 3.2% | Nombre de chambres (1-10) |
| **amenities_count** | 1.8% | Équipements (0-20) |
| **avg_rating** | 15.1% | Note moyenne (1-5★) |
| **occupancy_rate** | 7.6% | Taux occupation (0-1) |

#### Optimisation: GridSearchCV

Le modèle a été optimisé avec GridSearchCV testant **108 combinaisons** d'hyperparamètres:

```python
PARAM_GRID = {
    'n_estimators': [50, 100, 200],       # 3 valeurs
    'learning_rate': [0.05, 0.1, 0.2],   # 3 valeurs
    'max_depth': [3, 5, 7],               # 3 valeurs
    'min_samples_split': [2, 5],          # 2 valeurs
    'min_samples_leaf': [1, 2]            # 2 valeurs
}
# Total: 3×3×3×2×2 = 108 combinaisons
```

#### Exemple d'utilisation

```python
# Entrée
{
    "surface": 85,
    "rooms": 3,
    "amenities_count": 8,
    "avg_rating": 4.4,
    "occupancy_rate": 0.72
}

# Sortie
{
    "predicted_price_eth": 0.2006,
    "confidence_range_eth": {
        "min": 0.1805,
        "max": 0.2207
    },
    "predicted_price_eur": 702,
    "confidence_range_eur": {
        "min": 631,
        "max": 772
    },
    "eth_eur_rate": 3500.0,
    "recommendation": "Prix haut de gamme - Propriété d'exception"
}
```

---

### 2️⃣ Risk Scoring - Évaluation risque locataire

**Objectif:** Évaluer le risque d'un locataire (score 0-100)

#### Algorithme: RandomForest

```python
RandomForestRegressor(
    n_estimators=200,
    max_depth=15,
    min_samples_split=10,
    min_samples_leaf=2,
    max_features='sqrt'
)
```

#### Performance

| Métrique | Valeur |
|---|---|
| **MAE** | 2.47 points |
| **R² Score** | 98.5% |
| **Erreur moyenne** | ±2.5% |
| **Temps prédiction** | 20ms |

#### Features utilisées

| Feature | Importance | Détail |
|---|---|---|
| **income** | 1.8% | Revenu annuel (EUR) |
| **debt_ratio** | 6.9% | Ratio dette (0-1) |
| **total_bookings** | 5.0% | Nb réservations |
| **cancellations** | 49.2% | Nb annulations |
| **late_cancellations** | 30.2% | Annulations tardives |
| **avg_rating** | 7.0% | Note moyenne tenant |

#### Interprétation du score

```javascript
if (risk_score < 30) {
    level = "LOW"         // ✅ Approuver réservation
    action = "APPROVE"
}
else if (risk_score < 70) {
    level = "MEDIUM"      // ⚠️  Vérification supplémentaire
    action = "VERIFY"
}
else {
    level = "HIGH"        // ❌ Rejeter/Demander dépôt
    action = "REJECT"
}
```

#### Optimisation: GridSearchCV

**216 combinaisons** d'hyperparamètres testées:

```python
PARAM_GRID = {
    'n_estimators': [50, 100, 200],        # 3 valeurs
    'max_depth': [5, 10, 15, None],        # 4 valeurs
    'min_samples_split': [2, 5, 10],       # 3 valeurs
    'min_samples_leaf': [1, 2, 4],         # 3 valeurs
    'max_features': ['sqrt', 'log2']       # 2 valeurs
}
# Total: 3×4×3×3×2 = 216 combinaisons
```

#### Exemple d'utilisation

```python
# Entrée
{
    "income": 45000,
    "debt_ratio": 0.25,
    "total_bookings": 12,
    "cancellations": 1,
    "late_cancellations": 0,
    "avg_rating": 4.7
}

# Sortie
{
    "risk_score": 18,
    "risk_level": "LOW"
}
```

---

### 3️⃣ Recommendations - Recommandations personnalisées

**Objectif:** Recommander des propriétés basées sur les préférences

#### Algorithme: Collaborative Filtering

**Matrice utilisateur-propriété:**
- 991 locataires
- 300 propriétés
- 5000 interactions (historique réservations)

**Calcul similarité: Cosine Similarity**

```python
# Similarité cosine entre deux propriétés
sim(A, B) = cos(θ) = (A · B) / (||A|| × ||B||)
```

**Pourquoi Cosine?**
- Plus rapide que Pearson
- Meilleure performance (MAE: 0.42 vs 0.55)
- Robuste aux sparsité (beaucoup de 0)

#### Types de recommandations

| Type | Basé sur | Cas d'usage |
|---|---|---|
| **User-based** | Historique tenant | Recommander propriétés similaires à celles déjà réservées |
| **Item-based** | Similarité propriétés | Afficher propriétés similaires dans les résultats |
| **Popular** | Fréquence réservations | Afficher les propriétés "trending" |

#### Exemple d'utilisation

```python
# Recommandations pour un tenant
# GET /recommend/predict?tenant_id=5&top_n=5

{
    "recommendation_type": "user-based",
    "tenant_id": 5,
    "recommendations": [
        {
            "property_id": 42,
            "similarity_score": 0.87,
            "avg_price_eth": 0.18,
            "avg_rating": 4.6,
            "location": "Downtown"
        },
        ...
    ]
}
```

---

### 4️⃣ Market Trend - Tendances du marché

**Objectif:** Prédire tendances prix par quartier

#### Algorithme: KMeans Clustering

**Analyse time-series des prix** par quartier:

```python
KMeans(
    n_clusters=2,      # STABLE vs RISING
    n_init=10,
    random_state=42
)
```

#### Clusters identifiés

| Cluster | Nb propriétés | Prix moyen | Tendance | Détail |
|---|---|---|---|---|
| **STABLE** | 236 | 0.1895 ETH (~663€) | → | Prix stables, faible volatilité |
| **RISING** | 64 | 0.3087 ETH (~1081€) | ↗ | Croissance rapide, haute demande |

#### Quartiers analysés

```
Downtown, Uptown, Midtown, Bay Area, Tech Hub,
Residential, Harbor, North, South, Airport
```

#### Exemple d'utilisation

```python
# GET /trend/trends

{
    "overall_market": {
        "average_price_eth": 0.2156,
        "trend": "STABLE",
        "confidence": 0.92,
        "forecast_3m_eth": 0.2187,  # Prédiction 3 mois
        "forecast_6m_eth": 0.2203   # Prédiction 6 mois
    },
    "neighborhoods": [
        {
            "name": "Downtown",
            "current_price_eth": 0.25,
            "trend": "RISING",
            "confidence": 0.85,
            "properties_count": 45
        },
        ...
    ]
}
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:8090
```

### Documentation interactive
- **Swagger UI**: http://localhost:8090/docs
- **ReDoc**: http://localhost:8090/redoc

---

## 💰 Endpoints Price Prediction

### `POST /price/predict`

Prédire le prix optimal d'une propriété

**Request:**
```bash
curl -X POST "http://localhost:8090/price/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "surface": 85,
    "rooms": 3,
    "amenities_count": 8,
    "avg_rating": 4.4,
    "occupancy_rate": 0.72
  }'
```

**Response (200 OK):**
```json
{
  "predicted_price_eth": 0.2006,
  "confidence_range_eth": {
    "min": 0.1805,
    "max": 0.2207
  },
  "predicted_price_eur": 702,
  "confidence_range_eur": {
    "min": 631,
    "max": 772
  },
  "eth_eur_rate": 3500.0,
  "recommendation": "Prix haut de gamme - Propriété d'exception"
}
```

**Validation:**
- `surface` : 20-250 m² (required)
- `rooms` : 1-10 (required)
- `amenities_count` : 0-20 (required)
- `avg_rating` : 1.0-5.0 (required)
- `occupancy_rate` : 0.0-1.0 (required)

---

## ⚠️ Endpoints Risk Scoring

### `POST /scoring/predict`

Évaluer le risque d'un locataire

**Request:**
```bash
curl -X POST "http://localhost:8090/scoring/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "income": 45000,
    "debt_ratio": 0.25,
    "total_bookings": 12,
    "cancellations": 1,
    "late_cancellations": 0,
    "avg_rating": 4.7
  }'
```

**Response (200 OK):**
```json
{
  "risk_score": 18,
  "risk_level": "LOW"
}
```

**Utilisation recommandée:**
```
risk_score < 30   → APPROVE (approuver automatiquement)
30 ≤ score < 70   → VERIFY (vérification manuelle)
score ≥ 70        → REJECT (rejeter/demander dépôt)
```

---

## 🏠 Endpoints Recommendations

### `POST /recommend/predict`

Obtenir des recommandations de propriétés

**Request (User-based):**
```bash
curl -X POST "http://localhost:8090/recommend/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "tenant_id": 5,
    "top_n": 5
  }'
```

**Request (Item-based):**
```bash
curl -X POST "http://localhost:8090/recommend/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "property_id": 42,
    "top_n": 5
  }'
```

**Response (200 OK):**
```json
{
  "recommendation_type": "user-based",
  "recommendations": [
    {
      "property_id": 42,
      "similarity_score": 0.87,
      "avg_price_eth": 0.18,
      "avg_rating": 4.6,
      "location": "Downtown"
    },
    ...
  ]
}
```

---

## 📈 Endpoints Market Trend

### `GET /trend/trends`

Obtenir tendances de tous les quartiers

**Request:**
```bash
curl -X GET "http://localhost:8090/trend/trends"
```

**Response (200 OK):**
```json
{
  "overall_market": {
    "average_price_eth": 0.2156,
    "trend": "STABLE",
    "confidence": 0.92,
    "forecast_3m_eth": 0.2187,
    "forecast_6m_eth": 0.2203
  },
  "neighborhoods": [
    {
      "name": "Downtown",
      "current_price_eth": 0.25,
      "trend": "RISING",
      "confidence": 0.85,
      "properties_count": 45
    },
    ...
  ]
}
```

### `GET /trend/neighborhood/{neighborhood_name}`

Obtenir tendance d'un quartier spécifique

**Request:**
```bash
curl -X GET "http://localhost:8090/trend/neighborhood/Downtown"
```

**Response (200 OK):**
```json
{
  "neighborhood": "Downtown",
  "current_price_eth": 0.25,
  "price_history_eth": [0.23, 0.24, 0.25],
  "trend": "RISING",
  "forecast_3m": 0.26,
  "forecast_6m": 0.27,
  "volatility": 0.08
}
```

---

## 🛠️ Installation & Configuration

### Prérequis

- Python 3.10+
- pip ou conda
- 2GB RAM (minimum)

### Installation locale

```bash
# 1. Cloner ou accéder au dossier
cd ai-service

# 2. Créer un environnement virtuel (optionnel mais recommandé)
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

# 3. Installer les dépendances
pip install -r requirements.txt

# 4. Générer les datasets
python datasets/generate_datasets.py

# 5. Entraîner les modèles
python app/services/price_model.py
python app/services/scoring_model.py
python app/services/recommend_model.py
python app/services/trend_model.py

# 6. Lancer le serveur
python -m uvicorn app.main:app --host 0.0.0.0 --port 8090 --reload
```

### Vérifier que tout fonctionne

```bash
# Health check
curl http://localhost:8090/health

# Swagger UI
open http://localhost:8090/docs

# Test Price Prediction
curl -X POST "http://localhost:8090/price/predict" \
  -H "Content-Type: application/json" \
  -d '{"surface": 85, "rooms": 3, "amenities_count": 8, "avg_rating": 4.4, "occupancy_rate": 0.72}'
```

---


## 📊 Datasets

### 1. Property Price Dataset

Utilisé pour le modèle **Price Prediction**

```csv
property_id,surface,rooms,amenities_count,avg_rating,occupancy_rate,price_per_night_eth,price_per_night_eur
1,65,2,5,4.2,0.65,0.1429,500
2,120,4,12,4.7,0.82,0.3143,1100
...
```

**Statistiques:**
- 300 propriétés
- Surface: 20-250 m²
- Prix: 0.05-0.50 ETH

### 2. Tenant Risk Dataset

Utilisé pour le modèle **Risk Scoring**

```csv
tenant_id,income,debt_ratio,total_bookings,cancellations,late_cancellations,avg_rating,risk_score
1,35000,0.15,5,0,0,4.8,10
2,28000,0.45,3,2,1,3.2,65
...
```

**Statistiques:**
- 1000 locataires
- Income: 20k-150k EUR
- Risk Score: 5-95

### 3. Recommendation Dataset

Utilisé pour le modèle **Collaborative Filtering**

```csv
tenant_id,property_id,rating,stay_duration,booking_date
1,42,5,3,2024-01-15
2,15,4,2,2024-01-20
...
```

**Statistiques:**
- 5000 interactions (réservations)
- Rating: 1-5 étoiles
- Matrice: 991×300

---

## 🧠 Entraînement des modèles

### Entraîner un seul modèle

```bash
# Price Prediction
python app/services/price_model.py

# Risk Scoring
python app/services/scoring_model.py

# Recommendations
python app/services/recommend_model.py

# Market Trend
python app/services/trend_model.py
```

### Entraîner avec GridSearchCV 

```python
# Dans le fichier price_model.py
USE_GRIDSEARCH = True  # Activer hyperparameter tuning

# Puis lancer:
python app/services/price_model.py
```

### Temps d'entraînement

| Modèle | Mode rapide | GridSearchCV |
|---|---|---|
| **Price** | ~5 sec | ~45 sec |
| **Scoring** | ~8 sec | ~120 sec |
| **Recommend** | ~2 sec | N/A |
| **Trend** | ~1 sec | N/A |

---

### Notebook d'analyse

```bash
# Lancer Jupyter
jupyter notebook notebooks/ai_service_analysis.ipynb
```

---

## ⚡ Performance & Optimisations

### Temps de réponse

| Endpoint | Temps min | Temps max | Moyenne |
|---|---|---|---|
| `/price/predict` | 10ms | 50ms | 18ms |
| `/scoring/predict` | 12ms | 55ms | 20ms |
| `/recommend/predict` | 8ms | 40ms | 15ms |
| `/trend/trends` | 5ms | 30ms | 12ms |

### Optimisations appliquées

- ✅ **In-memory caching** : Les modèles chargent une seule fois au démarrage
- ✅ **Vectorization** : NumPy pour calculs rapides
- ✅ **Batch predictions** : Support des prédictions multiples
- ✅ **Async I/O** : Requests non-bloquantes
- ✅ **Model compression** : Serialization efficace en pickle

---

## 🔐 Sécurité

### CORS Configuration

```python
# main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "https://rental-platform.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Input Validation

```python
# schemas/price.py
class PricePredictionRequest(BaseModel):
    surface: float = Field(..., gt=20, lt=250, description="m²")
    rooms: int = Field(..., ge=1, le=10)
    amenities_count: int = Field(..., ge=0, le=20)
    avg_rating: float = Field(..., ge=1.0, le=5.0)
    occupancy_rate: float = Field(..., ge=0.0, le=1.0)
    
    class Config:
        json_schema_extra = {
            "example": {
                "surface": 85,
                "rooms": 3,
                "amenities_count": 8,
                "avg_rating": 4.4,
                "occupancy_rate": 0.72
            }
        }
```

---

## ☁️ Cloud & DevOps

### Infrastructure Cloud

#### **AWS Services Integration**
- **Amazon S3** : Stockage des médias et fichiers utilisateurs
- **Amazon RDS** : Base de données MySQL managée
- **Amazon EC2** : Hébergement des microservices
- **Amazon EKS** : Orchestration Kubernetes (optionnel)
- **Amazon CloudFront** : CDN pour les assets statiques

#### **Configuration Cloud**
- **VPC Architecture** : Isolation réseau et sous-réseaux
- **Security Groups** : Règles de sécurité granulaires
- **IAM Roles & Policies** : Gestion des permissions
- **Auto Scaling Groups** : Adaptation automatique à la charge
- **Load Balancers** : Distribution de charge entre instances

### Pipeline DevOps

#### **CI/CD Pipeline**
- **GitHub Actions / Jenkins** : Automatisation des déploiements
- **Multi-stage Builds** : Séparation build/test/deploy
- **Environment Promotion** : Dev → Staging → Production
- **Rollback Strategies** : Plans de retour arrière automatisés

#### **Containerization**
- **Docker** : Containerisation de chaque microservice
- **Docker Compose** : Environnement de développement local
- **Docker Images** : Images optimisées et sécurisées
- **Multi-stage Dockerfiles** : Réduction de la taille des images

#### **Orchestration Kubernetes**
- **Kubernetes Clusters** : Gestion des containers en production
- **Helm Charts** : Déploiement et configuration
- **Service Meshes** : Communication inter-services (Istio/Linkerd)
- **Ingress Controllers** : Routage du trafic entrant

### Monitoring & Observability

#### **Metrics Collection**
- **Prometheus** : Collecte des métriques systèmes
- **Grafana** : Tableaux de bord et visualisation
- **Custom Metrics** : Métriques métier spécifiques
- **Alerting Rules** : Notifications basées sur les seuils

#### **Logging Centralisé**
- **ELK Stack** : Elasticsearch, Logstash, Kibana
- **Log Aggregation** : Centralisation des logs de tous les services
- **Log Retention Policies** : Politiques de conservation des logs
- **Log Analysis** : Détection d'anomalies et debugging

#### **Tracing Distribué**
- **Jaeger / Zipkin** : Tracing des requêtes distribuées
- **Performance Insights** : Identification des goulots d'étranglement
- **Dependency Mapping** : Visualisation des dépendances entre services

### Sécurité DevOps

#### **Security Scanning**
- **Container Scanning** : Analyse des vulnérabilités Docker
- **Dependency Scanning** : Détection des vulnérabilités dans les dépendances
- **SAST** : Analyse statique de sécurité du code
- **DAST** : Tests de sécurité dynamiques

#### **Secrets Management**
- **Hashicorp Vault / AWS Secrets Manager** : Gestion sécurisée des secrets
- **Secret Rotation** : Rotation automatique des credentials
- **Encryption at Rest** : Chiffrement des données stockées
- **Encryption in Transit** : TLS/SSL pour toutes les communications

#### **Compliance & Auditing**
- **Infrastructure as Code** : Terraform pour la reproductibilité
- **Audit Trails** : Traçabilité de toutes les modifications
- **Compliance Checks** : Vérifications automatiques de conformité
- **Backup & DR** : Stratégies de sauvegarde et reprise d'activité

---

## 📊 Infrastructure

### Services Support
- **Service Discovery** : Eureka Server (8761)
- **Configuration Centralisée** : Config Server (8888)
- **Message Broker** : RabbitMQ (5672)
- **Cache** : Redis (6379)
- **Base de données** : MySQL 8.0 (3306)
- **Stockage fichiers** : AWS S3

### Monitoring Stack
- **Prometheus** : Métriques
- **Grafana** : Visualisation
- **ELK Stack** : Logging
- **Jaeger** : Distributed tracing

### Sécurité
- **Authentification** : JWT avec refresh tokens
- **Encryption** : BCrypt pour les mots de passe
- **Communication** : HTTPS/TLS obligatoire
- **Protection** : Rate limiting et WAF

---

## 🙏 Remerciements

Merci à toute l'équipe de développement pour leur contribution exceptionnelle à ce projet innovant.

---

**Version** : 1.0.0  
