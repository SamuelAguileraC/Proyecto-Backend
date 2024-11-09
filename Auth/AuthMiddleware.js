const jwt = require('jsonwebtoken');
const { Token } = require('../config');

function generateToken(req, res, next) {
  const { id, permissions } = req.userData; 
  if (!id || !permissions) {
    return res.status(400).json({ error: "Faltan datos del usuario para generar el token" });
  }
  const payload = {
    id,
    permissions,
  };
  try {
    const token = jwt.sign(payload, Token, { expiresIn: "1h" });
    req.token = token; 
    next(); 
  } catch (error) {
    res.status(500).json({ error: "Error al generar el token" });
  }
}

function checkPermissions(requiredPermission) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, Token);
      req.userData = decoded;

      if (decoded.permissions.includes(requiredPermission) || decoded.id === req.params.userId) {
        return next();
      }

      return res.status(403).json({ error: "Permiso denegado" });
    } catch (error) {
      res.status(401).json({ error: "Token inválido o expirado" });
    }
  };
}


module.exports = { generateToken, checkPermissions };

