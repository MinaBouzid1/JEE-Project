// src/environments/environment.ts

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api', // url de api gateway

  // URLs des microservices (via API Gateway)
  services: {
    user: '/users',
    listing: '/listings',
    booking: '/bookings',
    payment: '/payments',
    messaging: '',
    notification: '/notifications',
    review: '/reviews',
    media: '/media',
    blockchain: '/blockchain',

  },

  // Configuration Blockchain
  blockchain: {
    chainId: '0x539', // 1337 en hexadécimal (Ganache local)
    chainName: 'Localhost 8545', // nom du réseau , sert seulement à identifier le réseau => Le nom n’a aucun impact technique
    rpcUrl: 'http://localhost:8w545'
  },

  // Configuration Socket.io
  socketUrl: 'http://localhost:8085', // Messaging Service

  // Configuration Upload
  maxFileSize: 5 * 1024 * 1024, // 5 MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],

  // Autres configs
  tokenKey: 'authToken', // le token jwt
  userKey: 'current_user',
  wsUrl: 'ws://localhost:8080/api/ws/messages',
};
