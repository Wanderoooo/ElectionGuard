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
    console.log("request: ", req);
    const classify = await cohere.classify({
        examples: [...fakedata.slice(0,100), ...realdata.slice(0,100)],
        inputs: [
            "Campaign will be focused on getting more busses to campus",
            "I will provide 100000$ dollars to everyone",
        ],
    })

    console.log(classify)
    res.send(classify);

  });

router.get("/traits", async (req, res) => {
    const classify = await cohere.classify({
        examples: [
            { text: 'The President signed the bipartisan bill into law today, marking a significant step forward in addressing the nation\'s infrastructure challenges.', label: 'Neutral' },
            { text: 'The Prime Minister\'s bold economic reforms have led to a surge in job creation and economic growth, bringing prosperity to the nation.', label: 'Positive' },
            { text: 'Opposition leaders criticized the government\'s handling of the crisis, accusing officials of incompetence and failure to prioritize the needs of the people.', label: 'Negative' },
            { text: 'The government announced plans to increase funding for education, aiming to improve access to quality education for all citizens.', label: 'Neutral' },
            { text: 'The mayor unveiled a new initiative to address traffic congestion in the city, seeking input from local residents and experts.', label: 'Neutral' },
            { text: 'The President\'s healthcare reform legislation passed with overwhelming bipartisan support, hailed as a historic achievement in improving access to healthcare for millions.', label: 'Positve' },
            { text: 'The Prime Minister\'s diplomatic efforts resulted in a landmark peace agreement between long-standing adversaries, fostering hope for lasting stability in the region.', label: 'Positive' },
            { text: 'Critics slammed the opposition party\'s proposed tax policy, arguing that it would burden working-class families and hinder economic growth.', label: 'Negative' },
            { text: "The government's decision to cut funding for social welfare programs sparked outrage among advocacy groups, who warned of dire consequences for vulnerable populations.", label: 'Negative' },
          ],
          inputs: [
            'this game sucks, you suck',
            'stop being a dumbass',
            "Let's do this once and for all",
            'This is coming along nicely',
          ]
      })
    
      console.log("toxicity: ", classify);
      res.send(classify)
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
    const output = {percentage: classify.classifications[0].labels.fake.confidence,
      label: "negative"}
    
    res.send(output);

  });


module.exports = router;