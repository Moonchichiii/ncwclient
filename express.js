app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", 
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5173 https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' http://localhost:8000 https://api.nordiccodeworks.com; frame-ancestors 'self'; upgrade-insecure-requests;");
    next();
  });
  