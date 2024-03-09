const express = require("express");
const router = express.Router();
const csv = require('csv-parser');
const fakedata = [];
const realdata = [];

const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
    token: "stYbBQLQpwGJnSvFRntvuhF67BSm2TL7m4hVMSsT",
});

const fs = require('fs')
fs.createReadStream('data/Fake.csv')
  .pipe(csv())
  .on('data', (row) => {
    fakedata.push({ text: row.text, label: 'fake' });
  })
  .on('end', () => {
    // console.log(fakedata);
  });
fs.createReadStream('data/True.csv')
  .pipe(csv())
  .on('data', (row) => {
    realdata.push({ text: row.text, label: 'true' });
  })
  .on('end', () => {
    // console.log(realdata);
  });

router.get("/sentiment", async (req, res) => {
    console.log(req);
    const classify = await cohere.classify({
        examples: [...fakedata.slice(0,100), ...realdata.slice(0,100)],
        inputs: [
            "Campaign will be focused on getting more busses to campus",
            "Iwill provide 100000$ dollars to everyone",
        ],
    })
  
    console.log(classify); 
    res.send(classify);

  });

router.post("/sentiment", async (req, res) => {
    let input = req.body.input;
    const classify = await cohere.classify({
        examples: [...fakedata.slice(0,100), ...realdata.slice(0,100)],
        inputs: [
            input
        ],
    })
  
    console.log(classify); 
    res.send(classify);

  });

  
module.exports = router;