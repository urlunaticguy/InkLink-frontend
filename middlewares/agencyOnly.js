export function agencyOnly(req, res, next) {
  // Assuming the user object is stored in req.user
  const role = req.headers.role;
  if (role && role === "agency") {
    // User has the required role, proceed to the next middleware/route handler
    next();
  } else {
    // User does not have the required role, send an error response
    res.status(403).json({
      status: 403,
      message: "Forbidden",
      data: null
    });
  }
}
