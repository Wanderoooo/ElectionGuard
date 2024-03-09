const express = require("express");
const router = express.Router();

const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
    token: "stYbBQLQpwGJnSvFRntvuhF67BSm2TL7m4hVMSsT",
});

const fs = require('fs')
fs.readFile('data/Fake.csv', (err, inputD) => {
   if (err) throw err;
    console.log(inputD.toString());
})

router.get("/sentiment", async (req, res) => {
    console.log(req);
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
  
    console.log(classify); 
    res.send(classify);

  });

  
module.exports = router;