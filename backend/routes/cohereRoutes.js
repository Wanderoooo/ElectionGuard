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
            "Iwill provide 100000$ dollars to everyone",
        ],
    })

    console.log(classify)
    res.send(classify);

  });

router.get("/toxicity", async (req, res) => {
    const classify = await cohere.classify({
        examples: [
            { text: 'you are hot trash', label: 'Toxic' },
            { text: 'go to hell', label: 'Toxic' },
            { text: 'get rekt moron', label: 'Toxic' },
            { text: 'get a brain and use it', label: 'Toxic' },
            { text: 'say what you mean, you jerk.', label: 'Toxic' },
            { text: 'Are you really this stupid', label: 'Toxic' },
            { text: 'I will honestly kill you', label: 'Toxic' },
            { text: 'yo how are you', label: 'Benign' },
            { text: "I'm curious, how did that happen", label: 'Benign' },
            { text: 'Try that again', label: 'Benign' },
            { text: 'Hello everyone, excited to be here', label: 'Benign' },
            { text: 'I think I saw it first', label: 'Benign' },
            { text: 'That is an interesting point', label: 'Benign' },
            { text: 'I love this', label: 'Benign' },
            { text: 'We should try that sometime', label: 'Benign' },
            { text: 'You should go for it', label: 'Benign' },
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

module.exports = router;