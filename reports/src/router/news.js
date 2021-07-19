const express = require("express");
const News = require("../models/news");
const router = new express.Router();
const auth = require("../midleware/auth");
router.get("/getAllNews", auth, async (req, res) => {
  try {
    // const news = await News.findOne({});
    await req.reporter.populate("newsrel").execPopulate();
    res.send(req.reporter.newsrel);
  } catch (e) {
    res.send("error" + e);
  }
});
router.post("/addNews", auth, async (req, res) => {
  const bodyPostman = new News({ ...req.body, reborter: req.reporter._id });
  try {
    await bodyPostman.save();
    res.send(bodyPostman);
  } catch (e) {
    res.send(e);
  }
});
router.get("/getOneNews/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const getnewsbyId = await News.findOne({ _id, reborter: req.reporter._id });
  if (getnewsbyId) res.send(getnewsbyId);
  else res.send("cant find your news by id");
});
router.delete("/deleteNews/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const deleteNewsByid = await News.findOneAndDelete({
    _id,
    reborter: req.reporter._id,
  });
  if (deleteNewsByid) res.send(deleteNewsByid);
  else res.send("canot delete your news by id");
});
router.patch("/editeNews/:id", auth, async (req, res) => {
  const keyofNewsPostman = Object.keys(req.body);
  const allowEditeKey = ["title", "description"];
  const isvaild = keyofNewsPostman.every((el) => allowEditeKey.includes(el));
  if (!isvaild) return res.send("canot update");

  const _id = req.params.id;
  try {
    const editeNews = await News.findOne({ _id, reborter: req.reporter._id });
    keyofNewsPostman.forEach((key) => (editeNews[key] = req.body[key]));
    await editeNews.save();
    res.send(editeNews);
  } catch (e) {
    res.send("no news can edite");
  }
});
module.exports = router;
