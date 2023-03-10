require("../../db_connect/db");
const router = require("express").Router();
const survey_route = require("../models/Survey");



router.get("/", async (req, res) => {
  const surveyData = await survey_route
    .find({})
    .sort({ createdAt: -1 })
    .limit(5);
  try {
    if (surveyData) {
      return res.status(200).json({ data: surveyData });
    }
    res.status(404).json({ data: "Not found users" });
    return;
  } catch (error) {
    res.status(500).json({ data: error });
    return;
  }
});

router.get("/members", async (req, res) => {
  var query = survey_route.find();
  query.count(function (err, count) {
    if (err) res.status(500).json({ data: "error" });
    else res.status(200).json({ data: count });
  });
});
router.get("/filter", async (req, res) => {
  rate_id= req.body.rate;
  
  const surveyData = await survey_route
  .find({rate:rate_id})
  .sort({ createdAt: -1 })
  .limit(5);
try {
  if (surveyData) {
    return res.status(200).json({ data: surveyData });
  }
  res.status(404).json({ data: "Not found users" });
  return;
} catch (error) {
  res.status(500).json({ data: error });
  return;
}
});

const countRates = async () => {
  const rates = [1, 2, 3, 4];
  const counts = [];
  const rateNames = {
    1: "excellent",
    2: "very_good",
    3: "good",
    4: "bad",
  };

  for (const rate of rates) {
    const count = await survey_route.countDocuments({ rate });
    counts.push({ rate: rateNames[rate], count });
    // counts.push({ rate, count });
  }

  return counts;
};

router.get("/filter_count", async (req, res) => {
  try {
    const counts = await countRates();
    res.status(200).json(counts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error counting surveys" });
  }
  

 
  
});


router.post("/post", async (req, res) => {
  //   const data = await req.body;
  //   console.log(data);
  //   return res.status(200).json({ data: await req.body });

  try {
    const obj = {
      name: req.body.name,
      phone: req.body.phone,
      rate: req.body.rate,
      comment: req.body.comment,
    };
    await new survey_route(obj)
      .save()
      .then((success) => {
        return res.status(200).json({ data: success });
      })
      .catch((err) => {
        return res.status(200).json({ data: err });
      });
  } catch (error) {
    res.status(500).json({ data: error });
    return;
  }
});

module.exports = router;
