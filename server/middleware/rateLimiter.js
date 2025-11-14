const rateLimit = require('express-rate-limit');

/**
 * Rate limiter général pour toutes les routes API
 * 100 requêtes par 15 minutes
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite de 100 requêtes par fenêtre
  message: {
    success: false,
    error: 'Trop de requêtes',
    message: 'Trop de requêtes depuis cette adresse IP, veuillez réessayer dans 15 minutes',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Retourne les headers RateLimit-*
  legacyHeaders: false, // Désactive les headers X-RateLimit-*
  // Fonction pour générer une clé unique par IP
  keyGenerator: (req) => {
    return req.ip || req.connection.remoteAddress;
  },
  // Handler personnalisé quand la limite est atteinte
  handler: (req, res) => {
    console.warn(`⚠️ Rate limit atteint pour IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      error: 'Trop de requêtes',
      message: 'Vous avez dépassé la limite de requêtes autorisées. Veuillez réessayer plus tard.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000 / 60) + ' minutes'
    });
  }
});

/**
 * Rate limiter strict pour la création de commandes
 * 10 commandes par heure par utilisateur/IP
 */
const orderCreationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 10, // Maximum 10 commandes par heure
  message: {
    success: false,
    error: 'Limite de création de commandes atteinte',
    message: 'Vous avez créé trop de commandes récemment. Veuillez réessayer dans une heure.',
    retryAfter: '1 heure'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Si authentifié, utiliser l'userId, sinon l'IP
    return req.body?.userId || req.ip;
  },
  handler: (req, res) => {
    console.warn(`⚠️ Limite création commandes atteinte pour: ${req.body?.userId || req.ip}`);
    res.status(429).json({
      success: false,
      error: 'Trop de commandes créées',
      message: 'Vous avez atteint la limite de création de commandes. Veuillez patienter avant de créer une nouvelle commande.',
      retryAfter: '1 heure'
    });
  },
  // Ne compter que les requêtes réussies
  skipSuccessfulRequests: false,
  skipFailedRequests: true
});

/**
 * Rate limiter pour les mises à jour de statut (admin)
 * 50 requêtes par 10 minutes
 */
const statusUpdateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50,
  message: {
    success: false,
    error: 'Trop de mises à jour',
    message: 'Limite de mises à jour de statut atteinte, veuillez réessayer dans 10 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.auth?.userId || req.ip;
  }
});

/**
 * Rate limiter pour les requêtes de statistiques admin
 * 30 requêtes par 5 minutes
 */
const adminStatsLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 30,
  message: {
    success: false,
    error: 'Trop de requêtes de statistiques',
    message: 'Veuillez patienter avant de consulter à nouveau les statistiques'
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Rate limiter pour les récupérations de commandes utilisateur
 * 20 requêtes par 5 minutes
 */
const userOrdersLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20,
  message: {
    success: false,
    error: 'Trop de consultations',
    message: 'Veuillez patienter avant de consulter à nouveau vos commandes'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  generalLimiter,
  orderCreationLimiter,
  statusUpdateLimiter,
  adminStatsLimiter,
  userOrdersLimiter
};