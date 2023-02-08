require("../../db_connect/db");
const router = require("express").Router();
const survey_route = require("../models/Survey");

// router.get('/', async (req,res)=>{
//     let survey = await survey_route.find({}).sort({createdAt:-1}).limit(5)

//     // let income_count = await Transactions.aggregate([
//     //     {
//     //         $match:{
//     //             type: "1"
//     //         }
//     //     },
//     //     {
//     //         $group:{
//     //             _id:null,
//     //             income: {$sum: '$amount'}
//     //         }
//     //     }
//     // ])

//     // let expense_count = await Transactions.aggregate([
//     //     {
//     //         $match:{
//     //             type: '2'
//     //         }
//     //     },

//     //     {
//     //         $group:{
//     //             _id: 1,
//     //             expense: {$sum: '$amount'}
//     //         }
//     //     }
//     // ])

//     // console.log('income_count', income_count)
//     // console.log('expense_count', expense_count)
//     // res.render('index',{
//     //     transactions,
//     //     income_count,
//     //     expense_count

//     // })
// })

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
    else res.status(500).json({ data: count });
  });
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
// router.get("/filter_count", async (req, res) => {
//   // let rate_excellent = await 

//   // let rate_excellent = await survey_route.aggregate([
//   //   {
//   //     $match: {
//   //       rate: 1,
//   //     },
//   //   },
//   //   {
//   //     $group: {
//   //       _id: null,
//   //       excellent: { $sum: "$rate" },
//   //     },
//   //   },
//   // ]);
//   let rate_very_good = await survey_route.aggregate([
//     {
//       $match: {
//         rate: 2,
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         veryGood: { $sum: "$rate" },
//       },
//     },
//   ]);
//   let rate_Good = await survey_route.aggregate([
//     {
//       $match: {
//         rate: 3,
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         Good: { $sum: "$rate" },
//       },
//     },
//   ]);
//   let rate_bad = await survey_route.aggregate([
//     {
//       $match: {
//         rate: 4,
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         bad: { $sum: "$rate" },
//       },
//     },
//   ]);

//   data = [
//     {
//       excellent: rate_excellent.length == 0 ? 0 : rate_excellent[0].excellent,
//     },
//     {
//       veryGood: rate_very_good.length == 0 ? 0 : rate_very_good[0].veryGood,
//     },
//     {
//       Good: rate_Good.length == 0 ? 0 : rate_Good[0].Good,
//     },
//     {
//       bad: rate_bad.length == 0 ? 0 : rate_bad[0].Good,
//     },
//   ];

//   return res.status(200).json(data);
  
// });

router.post("/post", async (req, res) => {
  //   const data = await req.body;
  //   console.log(data);
  //   return res.status(200).json({ data: await req.body });

  try {
    const obj = {
      name: req.body.name,
      phone: req.body.phone,
      rate: req.body.rate,
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
