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
│   React 18 + TypeScript + Redux + Material-UI + Web3.js    │
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
- **Framework** : React 18 avec TypeScript
- **State Management** : Redux Toolkit
- **UI Library** : Material-UI (MUI)
- **Blockchain** : Web3.js / Ethers.js
- **Maps** : React-Leaflet
- **Real-time** : Socket.io-client
- **HTTP Client** : Axios

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
**Nom** : [À compléter]  
**Rôle** : Développeur Frontend  
**Responsabilités** :
- Développement de l'interface React avec TypeScript
- Intégration Web3.js et MetaMask
- Développement des composants Material-UI
- Gestion d'état avec Redux Toolkit
- Cartographie avec React-Leaflet

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

## 🎨 Frontend Architecture

### Stack Technologique
- **React 18** avec TypeScript pour une typage statique robuste
- **Redux Toolkit** pour la gestion d'état globale
- **Material-UI (MUI)** pour le design system
- **React Router** pour la navigation
- **Axios** pour les requêtes HTTP
- **Socket.io-client** pour la communication temps réel

### Intégration Blockchain Frontend
- **Web3.js / Ethers.js** pour l'interaction avec Ethereum
- **MetaMask Integration** pour la gestion des wallets
- **Smart Contract Interaction** via ABI
- **Transaction Status Tracking** en temps réel

### Composants Principaux
- **Dashboard Utilisateur** : Vue d'ensemble des réservations et messages
- **Marketplace des Propriétés** : Recherche, filtrage et visualisation
- **Interface de Réservation** : Processus de booking étape par étape
- **Chat en Temps Réel** : Communication propriétaire-locataire
- **Portefeuille Crypto** : Gestion des paiements Ethereum
- **Système d'Avis** : Publication et consultation des reviews

### Optimisations Performances
- **Lazy Loading** des composants et routes
- **Memoization** avec React.memo et useMemo
- **Code Splitting** automatique
- **Image Optimization** avec lazy loading
- **State Management** optimisé avec Redux Toolkit

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
**Statut** : En développement actif 🚧
