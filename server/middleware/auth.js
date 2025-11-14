const { clerkClient } = require('@clerk/clerk-sdk-node');

/**
 * Middleware pour vérifier l'authentification via Clerk
 * Extrait et valide le token JWT depuis le header Authorization
 */
const requireAuth = async (req, res, next) => {
  try {
    // Extraire le token du header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Token d\'authentification manquant',
        message: 'Veuillez vous connecter pour accéder à cette ressource'
      });
    }

    // Récupérer le token
    const token = authHeader.split(' ')[1];

    // Vérifier le token avec Clerk
    const sessionToken = await clerkClient.verifyToken(token);
    
    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        error: 'Token invalide ou expiré',
        message: 'Votre session a expiré, veuillez vous reconnecter'
      });
    }

    // Récupérer les informations de l'utilisateur
    const user = await clerkClient.users.getUser(sessionToken.sub);

    // Attacher les infos utilisateur à la requête
    req.auth = {
      userId: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      role: user.publicMetadata?.role || 'user',
      user: user
    };

    console.log(`✅ Utilisateur authentifié: ${req.auth.email} (${req.auth.role})`);
    next();
  } catch (error) {
    console.error('❌ Erreur authentification:', error.message);
    
    return res.status(401).json({
      success: false,
      error: 'Authentification échouée',
      message: 'Token invalide ou session expirée'
    });
  }
};

/**
 * Middleware pour vérifier le rôle administrateur
 * DOIT être utilisé APRÈS requireAuth
 */
const requireAdmin = (req, res, next) => {
  // Vérifier que l'authentification a été faite
  if (!req.auth) {
    return res.status(401).json({
      success: false,
      error: 'Authentification requise',
      message: 'Veuillez vous connecter d\'abord'
    });
  }

  // Vérifier le rôle
  if (req.auth.role !== 'admin') {
    console.warn(`⚠️ Accès admin refusé pour: ${req.auth.email}`);
    
    return res.status(403).json({
      success: false,
      error: 'Accès refusé',
      message: 'Droits administrateur requis pour accéder à cette ressource'
    });
  }

  console.log(`🔑 Accès admin autorisé: ${req.auth.email}`);
  next();
};

/**
 * Middleware optionnel pour récupérer l'utilisateur si authentifié
 * N'échoue pas si pas de token (pour routes publiques mais avec données personnalisées)
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Pas de token, mais on continue
    }

    const token = authHeader.split(' ')[1];
    const sessionToken = await clerkClient.verifyToken(token);
    
    if (sessionToken) {
      const user = await clerkClient.users.getUser(sessionToken.sub);
      req.auth = {
        userId: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        role: user.publicMetadata?.role || 'user',
        user: user
      };
    }
    
    next();
  } catch (error) {
    // En cas d'erreur, on continue sans auth
    next();
  }
};

module.exports = {
  requireAuth,
  requireAdmin,
  optionalAuth
};