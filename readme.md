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
  - [Blockchain Developer](#-blockchain-developer)
  - [Frontend Developer](#-frontend-developer)
  - [Cloud Engineer](#-cloud-engineer)
  - [DevOps Engineer](#-devops-engineer)
- [Backend Architecture](#-backend-architecture)
- [Frontend Architecture](#-frontend-architecture)
- [Blockchain Implementation](#-blockchain-implementation)
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

### ⛓ Blockchain Developer
**Nom** : Ikrame [À compléter]  
**Rôle** : Développeur Blockchain & Smart Contracts  
**Responsabilités** :
- Développement du smart contract RentalPlatform.sol
- Implémentation du système d'escrow décentralisé
- Intégration Web3j avec le backend
- Tests et déploiement des smart contracts
- Monitoring des transactions blockchain

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
### Documentation Technique
Pour une documentation technique complète (architecture détaillée, services, store NgRx, composants), consultez :
📖 **[README-DETAILED.md](./README-DETAILED.md)**
 
---
  

## ⛓ Blockchain Implementation

### Smart Contract Development

#### **RentalPlatform.sol** - Contrat Principal
- **Système d'Escrow Décentralisé** : Sécurisation des fonds pendant la durée du séjour
- **Gestion des Réservations** : Enregistrement on-chain des bookings
- **Libération des Fonds** : Mécanisme automatisé post-check-out
- **Règlement des Litiges** : Fonctionnalité de médiation intégrée

#### Caractéristiques Techniques
- **Solidity 0.8.x** : Version sécurisée avec vérifications automatiques
- **OpenZeppelin** : Importation de contrats audités et sécurisés
- **ReentrancyGuard** : Protection contre les attaques de réentrance
- **Gas Optimization** : Minimisation des coûts de transaction
- **Events Logging** : Événements détaillés pour le suivi off-chain

### Architecture d'Intégration

#### **Backend Integration (Web3j)**
- **Client Web3j** : Connexion aux nodes Ethereum via Infura/Alchemy
- **Contract Wrappers** : Génération automatique à partir des ABI
- **Transaction Management** : Construction, signature et envoi des transactions
- **Event Listening** : Surveillance des événements blockchain en temps réel

#### **Frontend Integration (Web3.js)**
- **Wallet Connection** : Intégration MetaMask et WalletConnect
- **Contract Interaction** : Appel des fonctions du smart contract
- **Balance Checking** : Vérification des soldes ETH en temps réel
- **Transaction Confirmation** : UI pour confirmation des transactions

### Workflow des Transactions

1. **Initiation de Réservation** : Dépôt des fonds en escrow
2. **Confirmation de Séjour** : Check-in enregistré on-chain
3. **Libération des Fonds** : Transfert automatique après check-out
4. **Remboursements** : Processus de remboursement sécurisé

### Sécurité Blockchain
- **Audit des Smart Contracts** : Revue de code et tests formels
- **Testnets** : Déploiement initial sur Sepolia/Ropsten
- **Monitoring** : Surveillance des transactions suspectes
- **Backup & Recovery** : Stratégies de récupération des fonds

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

## 🚀 Installation

[Instructions d'installation détaillées à ajouter]

---

## 📄 Licence

[Informations de licence à ajouter]

---

## 🙏 Remerciements

Merci à toute l'équipe de développement pour leur contribution exceptionnelle à ce projet innovant.

---

**Dernière mise à jour** : Janvier 2026  
**Version** : 1.0.0  
