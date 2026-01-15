# 📅 Booking Service

## 🎯 Vue d'ensemble
Service de gestion des réservations pour la plateforme de location décentralisée. Gère le cycle de vie complet des réservations, de la demande initiale à la confirmation finale.

**Port :** 8083  
**Statut :** 🟢 Production

## ✨ Fonctionnalités Principales

### 📋 Gestion des Réservations
- **Workflow complet** : Demande → Confirmation → Paiement → Séjour → Avis
- **Validation en temps réel** des disponibilités
- **Calcul automatique** des prix (nuits, frais, taxes)
- **Machine à états** pour le suivi des statuts

### 🔄 Synchronisation
- **Intégration blockchain** pour les confirmations
- **Synchronisation** avec le Listing Service
- **Communication** avec le Payment Service
- **Notifications** en temps réel

### 📊 Gestion Avancée
- **Historique complet** des modifications
- **Politiques d'annulation** configurables
- **Statistiques** de conversion
- **Reporting** pour propriétaires et locataires

## 🏗 Architecture Technique

### Stack
- **Framework :** Spring Boot 3.x
- **Langage :** Java 17
- **Base de données :** MySQL 8.0
- **Cache :** Redis (performances)
- **Message Broker :** RabbitMQ
- **Sécurité :** JWT + Spring Security


🔄 Flux de réservation
text
1. Création Demande → POST /bookings
   ↓
2. Vérification disponibilité (Listing Service)
   ↓
3. Calcul prix (PropertyVersion + Pricing)
   ↓
4. Création réservation PENDING
   ↓
5. Paiement blockchain (Payment Service)
   ↓
6. Confirmation → PATCH /bookings/{id}/confirm
   ↓
7. Notification (Notification Service)
   ↓
8. Check-in/Check-out


### Politiques Configurables
- Délai de réponse propriétaire
- Politiques d'annulation (flexible/moderée/stricte)
- Frais de service
- Taxes locales

## 🔐 Sécurité

### Mesures Implémentées
- **Authentification JWT** obligatoire
- **Vérification des permissions** (locataire vs propriétaire)
- **Validation des données** côté serveur
- **Rate limiting** par utilisateur
- **Audit trail** complet

### Rôles et Permissions
- **LOCATAIRE** : Créer/annuler ses réservations
- **PROPRIÉTAIRE** : Accepter/refuser/annuler ses réservations

## 📊 Monitoring

### Métriques Clés
- Taux de conversion des demandes
- Temps moyen de réponse
- Taux d'annulation
- Revenus générés
- Satisfaction clients

### Logs
- Audit de toutes les actions
- Tracking des changements de statut
- Erreurs de transaction blockchain
- Performances des requêtes


### Test api
GET par ID ✅
http
GET http://localhost:8083/bookings/{id}
Exemple : GET http://localhost:8083/bookings/1

2. GET mes réservations ✅
   http
   GET http://localhost:8083/bookings/user/me
   (Requiert authentification)

3. GET par propriété ✅
   http
   GET http://localhost:8083/bookings/property/{propertyId}
   Exemple : GET http://localhost:8083/bookings/property/1

4. HEALTH CHECK ✅
   http
   GET http://localhost:8083/bookings/health
5. ### ✅ EXISTE - Annulation (vous avez cancel, pas refund)
PATCH http://localhost:8083/bookings/1/cancel?reason=test

### ✅ EXISTE - Libération escrow
PATCH http://localhost:8083/bookings/1/release-escrow?txHash=abc123

### ✅ EXISTE - Confirmation
PATCH http://localhost:8083/bookings/1/confirm?blockchainTxHash=xyz789

### ✅ EXISTE - Check-in
PATCH http://localhost:8083/bookings/1/check-in

### ✅ EXISTE - Check-out
PATCH http://localhost:8083/bookings/1/check-out

## 🔗 Intégrations

### Services Internes
- **User Service** (8081) - Informations utilisateurs
- **Listing Service** (8082) - Disponibilités et prix
- **Payment Service** (8084) - Transactions blockchain
- **Notification Service** (8086) - Emails et notifications



## 🛠 Développement

### Commandes Utiles
```bash
# Lancer en développement
./mvnw spring-boot:run

# Build du JAR
./mvnw clean package

# Lancer avec Docker
docker-compose up booking-service
```

### Structure du Projet
```
booking-service/
├── src/main/java/
│   └── com/rentaldapp/booking/
│       ├── controller/    # Contrôleurs REST
│       ├── service/       # Logique métier
│       ├── repository/    # Accès aux données
│       ├── model/         # Entités JPA
│       └── config/        # Configurations
├── src/main/resources/
│   ├── application.yml    # Configuration
....
```



### Monitoring
- **Logs :** Fichiers journaux et ELK Stack
- **Métriques :** Prometheus + Grafana
- **Alertes :** Slack/Email sur erreurs critiques




