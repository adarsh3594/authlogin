const Block = require("../models/block");
const express = require("express");
const mongoose = require("mongoose");
let router = express.Router();

let mongouri = `mongodb://localhost:27017/crud-mongo`;
mongoose.connect(mongouri);

router.get("/", (req, res) => {
   res.json({ msg: "Everything is Fine" });
});



router.post("/blocks", (req, res) => {
   console.log(req.body);
   if (!req.body[0].blockId) {
      return res.json({ msg: "Bad Request Format" });
   }
   Block.deleteMany({}, err => {
      if (err) console.error(err);
   });
   Block.insertMany(req.body, (err, docs) => {
      res.send(docs);
   });
});

router.get("/blocks", (req, res) => {
   Block.find((err, block) => {
      if (err) res.send(err);

      res.send(block);
   });
});

module.exports = router;