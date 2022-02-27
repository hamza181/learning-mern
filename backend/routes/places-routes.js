const express = require("express");

// use router because in this file we have routes
const router = express.Router();

router.get("/", (req, res, next) => {
  // res.send is used to send html
  // res.send('Hello from the backend!');

  res.json({
    message: "Hello from the backend!",
  });
});

module.exports = router;