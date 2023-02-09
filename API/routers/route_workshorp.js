require("../../db_connect/db");
const router = require("express").Router();
const workShope = require("../models/Workshop");


router.get("/", async (req, res) => {
  const workShopeData = await workShope
    .find({})
    .sort({ createdAt: -1 })
    .limit(5);
  try {
    if (workShopeData) {
      return res.status(200).json({ data: workShopeData });
    }
    res.status(404).json({ data: "Not found users" });
    return;
  } catch (error) {
    res.status(500).json({ data: error });
    return;
  }
});

router.get("/workshope_count", async (req, res) => {
  var countWorkShops = workShope.find();
  countWorkShops.count(function (err, count) {
    if (err) res.status(500).json({ data: "error" });
    else res.status(200).json(data={ workshops: count });
  });
  
});

router.post("/post", async (req, res) => {
 
console.log(req.body);

  try {
    const obj = {
        name: req.body.name,
        participant: req.body.participant,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
      };

    console.log(obj);
    await new workShope(obj)
      .save()
      .then((success) => {
        return res.status(200).json({ data: success });
      })
      .catch((error) => {
        return res.status(400).json({ data: error });
      });
  } catch (error) {
    res.status(500).json({ data: error });
    return;
  }
});

module.exports = router;
