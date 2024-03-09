const express = require("express");
const router = express.Router();

const { CohereClient } = require("cohere-ai");
const fs = require("fs");

const cohere = new CohereClient({
    token: "stYbBQLQpwGJnSvFRntvuhF67BSm2TL7m4hVMSsT",
});

router.post("/sentiment", async (req, res) => {

    const user_id = req.body.user_id;
    const origin = req.body.origin;
  });

(async () => {
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
          "Confirm your email address",
          "hey i need u to send some $",
      ],
  })

  console.log(classify);
})();