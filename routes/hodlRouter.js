var express = require('express');
var router = express.Router();
const HodlModel = require('../models/hodlmodel');
const axios = require('axios');

let dataFetched = false;
router.get('/', async function(req, res, next) {
  if (!dataFetched) { // Check if data has not been fetched/stored yet
    try {
      const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
      const res_data = response.data;

      const keys = Object.keys(res_data);
      console.log(keys);

      for(let i = 0; i < 10; i++) {
        const currentItem = res_data[keys[i]];
        if (currentItem && currentItem.name && currentItem.last && currentItem.buy && currentItem.sell && currentItem.volume && currentItem.base_unit) {
          await HodlModel.create({
            name: currentItem.name,
            last: currentItem.last,
            buy: currentItem.buy,
            sell: currentItem.sell,
            volume: currentItem.volume,
            base_unit: currentItem.base_unit
          });
        } else {
          console.error(`Missing or undefined properties in item ${i}`);
        }
      }

      console.log("Data Created Successfully");
      dataFetched = true; // Set the flag to true to indicate data has been fetched/stored
    } catch (error) {
      console.error("Error fetching or storing data:", error);
    }
  }

  const crypto = await HodlModel.find();
  console.log(crypto);
  res.render('index', { crypto });
});

router.get('/delete', async function(req,res){
  const deletingdata = await HodlModel.deleteMany();
  if(deletingdata){
    res.send("deleted Succesfully");
  }else{
    res.send("can not delete data");
  }
});

module.exports = router;
