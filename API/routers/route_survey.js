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
    if (err)  res.status(500).json({ data: "error" });
    else  res.status(500).json({ data: count });;
  });
});

router.get("/count_data", async (req, res) => {

  let rate_excellent = await survey_route.aggregate([
    {
        $match:{
            rate: 1
        }
    },
    {
        $group:{
            _id:null,
            excellent: {$sum:'$rate'}
        }
    }
])
  let rate_very_good = await survey_route.aggregate([
    {
        $match:{
            rate: 2
        }
    },
    {
        $group:{
            _id:null,
            veryGood: {$sum:'$rate'}
        }
    }
])



return res.status(200).json({ data:rate_excellent});

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
