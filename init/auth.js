// auth.js

// Normal login check
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please log in first!");
  res.redirect("/login");
}

// Force re-login (works for both anonymous and logged-in users)
function forceLogin(req, res, next) {
  // If just came from login, allow access
  if (req.session.justLoggedIn) {
    delete req.session.justLoggedIn;
    return next();
  }

  // Otherwise require login again
  if (req.isAuthenticated()) {
    req.logout(err => {
      if (err) return next(err);
      req.flash("error", "Please log in again to add a post.");
      req.session.returnTo = req.originalUrl;
      return res.redirect("/login");
    });
  } else {
    req.flash("error", "Please log in first!");
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
  }
}

module.exports = { isLoggedIn, forceLogin };



