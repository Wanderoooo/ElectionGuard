const express = require("express");
const router = express.Router();

const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
    token: "stYbBQLQpwGJnSvFRntvuhF67BSm2TL7m4hVMSsT",
});

const fs = require('fs')
fs.readFile('data/Fake.csv', (err, inputD) => {
   if (err) throw err;
    // console.log(inputD.toString());
})

router.get("/sentiment", async (req, res) => {
    console.log("request: ", req);
    const classify = await cohere.classify({
        examples: [
            { text: "Dermatologists don't like her!", label: "Spam" },
            { text: "'Hello, open to this?'", label: "Spam" },
            { text: "I need help please wire me $1000 right now", label: "Spam" },
            { text: "Nice to know you ;)", label: "Spam" },
            { text: "Please help me?", label: "Spam" },
            { text: "Your parcel will be delivered today", label: "Not spam" },
            { text: "Review changes to our Terms and Conditions", label: "Not spam" },
            { text: "Weekly sync notes", label: "Not spam" },
            { text: "'Re: Follow up from today's meeting'", label: "Not spam" },
            { text: "Pre-read for tomorrow", label: "Not spam" },
        ],
        inputs: [
            "Class is cancelled tomorrow",
            "hey i need u to send some $",
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