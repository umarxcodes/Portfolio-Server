const mongoSanitize = {
  sanitize(obj) {
    if (!obj || typeof obj !== "object") {
      return obj;
    }
    if (Array.isArray(obj)) {
      obj.forEach((item) => this.sanitize(item));
      return;
    }
    for (const key of Object.keys(obj)) {
      if (key.startsWith("$") || key.includes(".")) {
        delete obj[key];
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        this.sanitize(obj[key]);
      }
    }
  },

  middleware(req, res, next) {
    this.sanitize(req.body);
    this.sanitize(req.query);
    this.sanitize(req.params);
    next();
  },
};

export default mongoSanitize;
