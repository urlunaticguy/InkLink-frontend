import jwt from 'jsonwebtoken';

export function agencyOnly(req, res, next) {
//   const token = req.headers.authorization;

//   if (token) {
    try {
      const decoded = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key

      if (decoded.role === 'agency') {
        // User has the required role, proceed to the next middleware/route handler
        next();
      } else {
        // User does not have the required role, send an error response
        res.status(403).json({
          status: 403,
          message: 'Forbidden',
        });
      }
    } catch (error) {
      // Token verification failed
      res.status(401).json({
        status: 401,
        message: 'Unauthorized',
      });
    }
//   } else {
//     // No token provided
//     res.status(401).json({
//       status: 401,
//       message: 'Unauthorized',
//     });
//   }
}
