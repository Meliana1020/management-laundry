const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const cekTokenAuth = req.headers.authorization;

  if (!cekTokenAuth) {
    return res.status(401).json({ message: 'Mohon masukkan token.' });
  }

  const token = cekTokenAuth.split(' ')[1];

  try {
    const cekToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = cekToken;

    const path = req.baseUrl || '';
    
    // console.log('CEKKK ROLEEE:', cekToken.role);
    // console.log('BASEEE URLLL:', path);

    if (path.includes('/api/admin') && cekToken.role !== 'admin') {
      return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang bisa mengakses.' });
    }

    if (path.includes('/api/customer') && cekToken.role !== 'customer') {
      return res.status(403).json({ message: 'Akses ditolak. Hanya customer yang bisa mengakses.' });
    }

    next();
  } catch (err) {
    console.log('ERROR:', err.message);
    return res.status(401).json({ message: 'Token tidak valid.' });
  }
}

module.exports = authMiddleware;