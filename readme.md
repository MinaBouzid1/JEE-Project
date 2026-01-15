# 🏠 Plateforme de Location Décentralisée avec Blockchain

> Une plateforme de location de logements moderne intégrant la technologie blockchain Ethereum pour des transactions sécurisées et transparentes.

[![Java](https://img.shields.io/badge/Java-17-red.svg)](https://openjdk.java.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Ethereum](https://img.shields.io/badge/Ethereum-Blockchain-purple.svg)](https://ethereum.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://www.mysql.com/)

---

## 📋 Table des Matières

- [Vue d'ensemble](#-vue-densemble)
- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [Équipe de Développement](#-équipe-de-développement)
- [Architecture & Backend Engineer - Responsabilités Détaillées](#-architecture--backend-engineer---responsabilités-détaillées)
- [Microservices](#-microservices)
- [Infrastructure](#-infrastructure)
- [Blockchain](#-blockchain)
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

### 🎨 Architecture & Backend Engineer
**Nom** : Bouzid Mina
---

## 🏆 Architecture & Backend Engineer - Responsabilités Détaillées

### 🎯 Architecture & Infrastructure

✅ **Conception de l'architecture microservices 5 couches**  
Conception et implémentation d'une architecture modulaire et évolutive basée sur les principes des microservices, permettant une scalabilité horizontale et une maintenabilité optimale.

✅ **Mise en place complète de l'infrastructure Spring Cloud** :

**Eureka Server (Port 8761)** - Service Discovery avec health checking
- Configuration du serveur de découverte de services
- Implémentation du health checking automatisé
- Gestion des instances de services et de leur disponibilité
- Load balancing côté client intégré

**Config Server (Port 8888)** - Configuration centralisée avec backend Git
- Création d'un repository Git pour la gestion des configurations
- Support multi-environnement (dev, staging, prod)
- Refresh dynamique des configurations sans redémarrage
- Chiffrement des propriétés sensibles

**API Gateway (Port 8080)** - Routage intelligent, sécurité JWT, rate limiting, CORS
- Configuration des routes dynamiques pour les microservices
- Implémentation de la sécurité JWT avec validation des tokens
- Rate limiting pour la protection contre les attaques DDoS
- Configuration CORS pour la sécurité des requêtes cross-origin
- Filtres personnalisés pour le logging et le monitoring

✅ **Configuration RabbitMQ pour la communication asynchrone**
- Configuration des exchanges, queues et bindings
- Implémentation de patterns publish/subscribe
- Gestion des dead letter queues pour les messages en échec
- Configuration de la persistance des messages
- Optimisation des performances pour le message broker

✅ **Conception complète de la base de données MySQL**
- Conception du schéma de données normalisé
- Définition des relations (One-to-Many, Many-to-Many, One-to-One)
- Optimisation des indexes pour les performances
- Configuration des contraintes d'intégrité référentielle
- Design des vues et stored procedures

✅ **Documentation technique exhaustive**
- Documentation de l'architecture globale
- Guides d'installation et de configuration
- Documentation API 
- Diagrammes d'activité

### 🔧 Développement des 9 Microservices

#### 1. User Service (Port 8081) ✅
**Authentification complète (JWT avec refresh tokens)**
- Implémentation du flow d'authentification JWT
- Gestion des tokens d'actualisation (refresh tokens)
- Blacklisting des tokens révoqués
- Expiration et rotation des tokens

**Système de vérification email (SMTP) et SMS (Twilio)**
- Intégration avec service SMTP 
- Génération de tokens de vérification uniques
- Logique de ré-émission de codes de vérification

**Gestion des profils et wallets Ethereum**
- Création et mise à jour des profils utilisateurs
- Association des adresses Ethereum aux utilisateurs
- Vérification de la propriété des wallets
- Historique des transactions utilisateur

**Blacklist JWT et audit logs**
- Système de blacklist pour les tokens révoqués
- Audit logs pour toutes les actions sensibles
- Conformité RGPD pour les données personnelles
- Rotation automatique des logs d'audit

**Support multi-langues (20 langues)**
- Table des langues supportées
- Association utilisateur-langue
- Traduction des emails et notifications
- Gestion des préférences linguistiques

**Spring Security avec BCrypt**
- Configuration de la sécurité Spring Boot 3
- Hashing des mots de passe avec BCrypt
- Rôles et permissions (USER, HOST, ADMIN)
- Protection contre les attaques par force brute

#### 2. Listing Service (Port 8082) ✅
**CRUD complet des propriétés immobilières**
- Opérations Create, Read, Update, Delete
- Validation des données d'entrée
- Gestion des relations propriété-utilisateur
- Versioning des modifications

**Système de disponibilités et calendrier**
- Interface de calendrier interactive
- Blocage/déblocage des dates
- Validation des chevauchements de réservations
- Synchronisation avec le booking service

**Tarification dynamique (weekend, semaine, mois)**
- Calcul des prix selon la saisonnalité
- Discounts pour séjours prolongés
- Frais de service et de nettoyage
- Historique des changements de prix

**Gestion des équipements (amenities)**
- Catalogue d'équipements prédéfinis
- Association propriété-équipements
- Recherche par équipements disponibles
- Images et descriptions des équipements

**Versioning des propriétés avec snapshots**
- Snapshots des modifications importantes
- Restauration de versions précédentes
- Historique complet des changements
- Audit des modifications

**Recherche et filtrage avancés**
- Recherche textuelle sur titre et description
- Filtrage par localisation, prix, équipements
- Tri par pertinence, prix, note
- Pagination et lazy loading

#### 3. Booking Service (Port 8083) ✅
**Système de demandes de réservation**
- Workflow de demande de réservation
- Notifications en temps réel aux propriétaires
- Expiration automatique des demandes non répondues
- Statistiques de conversion des demandes

**Validation des disponibilités en temps réel**
- Vérification de disponibilité atomique
- Locking des dates pendant la réservation
- Rollback en cas d'échec de transaction
- Cache de disponibilité pour performances

**Calcul automatique des prix (nuits, frais, taxes)**
- Calcul basé sur les dates et le prix par nuit
- Application des frais de service et de nettoyage
- Taxes locales et TVA
- Récapitulatif détaillé des coûts

**Machine à états pour les statuts**
- Gestion des transitions d'état (PENDING, CONFIRMED, CANCELLED, etc.)
- Validation des transitions autorisées
- Historique des changements d'état
- Actions automatiques selon l'état

**Historique complet des changements**
- Tracking de toutes les modifications de réservation
- Audit trail pour conformité
- Restauration en cas d'erreur
- Reporting des modifications

**Intégration blockchain pour les confirmations**
- Synchronisation avec les smart contracts
- Vérification des paiements on-chain
- Confirmation automatique après paiement
- Gestion des échecs de transaction blockchain

**Gestion des annulations**
- Politiques d'annulation configurables
- Calcul automatique des remboursements
- Notifications aux parties concernées
- Historique des annulations

#### 4. Payment Service (Port 8084) ✅
**Intégration Web3j avec Ethereum**
- Configuration du client Web3j
- Connexion aux nodes Ethereum (Infura/Alchemy)
- Gestion des connexions HTTP/WebSocket
- Fallback sur différents providers

**Gestion des transactions blockchain**
- Construction des transactions Ethereum
- Estimation des gas fees
- Envoi et suivi des transactions
- Confirmation des blocs

**Escrow de fonds décentralisé**
- Dépôt des fonds dans le smart contract
- Vérification des soldes en escrow
- Libération des fonds selon conditions
- Gestion des litiges

**Vérification des soldes ETH**
- Vérification des soldes utilisateur
- Validation des fonds suffisants
- Notifications de solde insuffisant
- Suggestions de recharge

**Suivi des gas fees**
- Monitoring des prix du gas
- Optimisation des frais de transaction
- Historique des gas fees payés
- Alertes de gas fees anormalement élevés

**Gestion des remboursements**
- Initiation des remboursements on-chain
- Suivi du statut des remboursements
- Notifications de remboursement complété
- Reporting des remboursements

**Confirmation de transactions on-chain**
- Écoute des événements blockchain
- Vérification des confirmations
- Synchronisation avec la base de données
- Gestion des forks et réorganisations

#### 5. Messaging Service (Port 8085) ✅
**Chat temps réel avec WebSocket/STOMP**
- Configuration du serveur WebSocket
- Implémentation du protocole STOMP
- Gestion des sessions utilisateur
- Reconnexion automatique

**Gestion des conversations multi-participants**
- Création de conversations (1-1)
- Ajout/retrait de participants
- Visibilité des conversations

**Statut de lecture et notifications**
- Tracking des messages lus/non lus
- Notifications push pour nouveaux messages
- Badges de compteur de messages
- Préférences de notification

**Archivage automatique des conversations**
- Politiques d'archivage configurables
- Compression des messages archivés
- Restauration des conversations archivées
- Purge automatique des anciennes données

**Intégration Socket.io**
- Alternative WebSocket avec Socket.io
- Fallback en polling long si nécessaire
- Compatibilité multi-navigateurs
- Support mobile natif

#### 6. Notification Service (Port 8086) ✅
**Envoi d'emails via SMTP (JavaMail)**
- Configuration des serveurs SMTP
- Templates HTML pour les emails
- Gestion des pièces jointes
- Tracking des ouvertures et clics

**File d'attente RabbitMQ pour async**
- Découplage de l'envoi des notifications
- Retry automatique en cas d'échec
- Priorisation des notifications urgentes
- Monitoring de la file d'attente

#### 7. Review Service (Port 8087) ✅
**Système complet d'avis et notations**
- Publication d'avis après séjour
- Modération des avis avant publication
- Réponses des propriétaires aux avis
- Signalement d'avis inappropriés

**Calcul des moyennes de notes**
- Moyenne globale par propriété
- Moyenne par catégorie (propreté, communication, etc.)
- Tendances des notes dans le temps
- Comparaison avec la moyenne locale

**Modération de contenu**
- Filtrage automatique de contenu inapproprié
- Revues manuelles des avis signalés
- Politiques de contenu configurables
- Conformité aux régulations locales

**Gestion de la visibilité des avis**
- Contrôle de la visibilité par les utilisateurs
- Masquage d'avis offensants
- Highlight des avis les plus utiles
- Filtrage par note, date, langue

#### 8. Media Service (Port 8088) ✅
**Upload de photos avec Multipart**
- Upload de fichiers multipart
- Validation des types de fichiers
- Limites de taille configurables
- Progress bar pour l'upload

**Compression et redimensionnement d'images**
- Compression JPEG/PNG optimisée
- Redimensionnement automatique
- Génération de thumbnails
- Conservation des métadonnées EXIF

**Intégration AWS S3 pour le stockage**
- Configuration des buckets S3
- Gestion des permissions IAM
- Transfert optimisé des fichiers
- Politiques de rétention et d'archivage

**Génération de thumbnails**
- Thumbnails de différentes tailles
- Cache des thumbnails générés
- Format WebP pour performances
- Lazy loading optimisé

**Hash de photos pour déduplication**
- Calcul de hash MD5/SHA des images
- Détection des doublons
- Réutilisation des images existantes
- Optimisation du stockage

**Gestion de l'ordre d'affichage**
- Drag & drop pour réorganiser les photos
- Photo principale sélectionnable
- Rotation automatique selon orientation
- Masquage de photos de mauvaise qualité

#### 9. Blockchain Service (Port 8089) ✅
**Interface complète avec smart contracts**
- Génération des wrappers Java à partir des ABI
- Appel des fonctions du smart contract
- Lecture des variables d'état
- Gestion des erreurs et exceptions

**Décodage des events blockchain**
- Écoute des événements en temps réel
- Décodage des données d'événement
- Mapping vers objets Java
- Persistance dans la base de données

**Création de réservations on-chain**
- Appel de la fonction createBooking
- Validation des paramètres
- Gestion des erreurs de transaction
- Confirmation de la création

**Check-in / Check-out automatisés**
- Trigger automatique aux dates prévues
- Vérification des conditions préalables
- Exécution des transactions on-chain
- Synchronisation avec le booking service

**Libération des fonds escrow**
- Vérification des conditions de libération
- Appel de la fonction releaseFunds
- Distribution des fonds aux parties
- Gestion des litiges en cours

**Synchronisation backend ↔ blockchain**
- Reconciliation régulière des données
- Détection et correction des divergences
- Audit de la cohérence des données
- Reporting de la santé de la synchronisation

### 🛠️ Technologies Maîtrisées

**Backend** :
- Spring Boot 3.x, Spring Cloud (Gateway, Config, Eureka)
- Spring Security, Spring Data JPA, Spring WebSocket
- MySQL 8.0, Hibernate, Redis
- RabbitMQ, STOMP Protocol
- Web3j, Ethereum Integration
- JavaMail, Twilio SDK
- AWS S3 SDK, ImageMagick
- Docker, Docker Compose

**Architecture** :
- Microservices Design Patterns
- Event-Driven Architecture
- CQRS, Saga Pattern
- API Gateway Pattern
- Service Discovery
- Circuit Breaker
- Distributed Tracing

**Sécurité** :
- JWT Authentication & Authorization
- BCrypt Password Hashing
- Role-Based Access Control (RBAC)
- Rate Limiting & DDoS Protection
- Input Validation & Sanitization

**📊 Statistiques de Contribution** :
- Lignes de code : ~40,000+ (backend)
- Endpoints API : 100+
- Tests unitaires : 200+
- Tables DB : 37


---

### ⛓ Blockchain Developer
**Nom** : Ikrame [À compléter]
**Rôle** : Développeur Blockchain & Smart Contracts

**Responsabilités** :
- 🔲 Développement du smart contract **RentalPlatform.sol**
- 🔲 Implémentation du système d'escrow décentralisé
- 🔲 Développement du **Blockchain Service** (Port 8089)
- 🔲 Intégration Web3j avec le backend
- 🔲 Tests Hardhat des smart contracts
- 🔲 Configuration Infura/Alchemy
- 🔲 Déploiement sur Sepolia et Mainnet
- 🔲 Monitoring des transactions blockchain

**Technologies** :
- Solidity, Hardhat, Web3j
- Ethereum, Infura/Alchemy
- OpenZeppelin, ReentrancyGuard

---

### ⚛️ Frontend Developer
**Nom** : [À compléter]
**Rôle** : Développeur Frontend


---

### 🧪 cloud Engineer
**Nom** : [À compléter]
**Rôle** : 


---

### 🚀 DevOps Engineer
**Nom** : [À compléter]
**Rôle** : DevOps & Infrastructure


---

## 📊 Métriques du Projet

- **Microservices** : 9
- **Tables de base de données** : 37
- **Smart Contracts** : 1 
- **Lignes de code estimées** : 50,000+
- **Tests unitaires** : 200+
- **Endpoints API** : 100+

---

## 🔐 Sécurité

- Authentification JWT avec refresh tokens
- Encryption des mots de passe (BCrypt)
- HTTPS/TLS pour toutes les communications
- Rate limiting et protection DDoS
- Smart contracts audités
- Clés privées stockées de manière sécurisée (HSM/KMS)
- CORS configuré strictement
- Input validation et sanitization

---

---

## 🙏 Remerciements

Merci à toute l'équipe de développement pour leur contribution exceptionnelle à ce projet innovant .

---

**Dernière mise à jour** : Janvier 2026  
**Version** : 1.0.0  
**Statut** : En développement actif 🚧
