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
    const tonePositive = await cohere.classify({
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
            { text: 'A backlash ensued after Donald Trump launched a sexist rant against Kirsten Gillibrand Thursday morning, saying that the Democratic Senator  would do anything  for a campaign contribution.', label: 'Negative'}
          ],
          inputs: [
            'this game sucks, you suck',
            'stop being a dumbass',
            "Let's do this once and for all",
            'This is coming along nicely',
          ]
      })

      const toneIncendiary = await cohere.classify({
        examples: [
            {text: 'Donald Trump just signed the GOP tax scam into law. Of course, that meant that he invited all of his craven, cruel GOP sycophants down from their perches on Capitol Hill to celebrate in the Rose Garden at the White House. Now, that part is bad enough   celebrating tax cuts for a bunch of rich hedge fund managers and huge corporations at the expense of everyday Americans. Of course, Trump is beside himself with glee, as this represents his first major legislative win since he started squatting in the White House almost a year ago. Thanks to said glee, in true Trumpian style, he gave a free-wheeling address, and a most curious subject came up as Trump was thanking the goons from the Hill. Somehow, Trump veered away from tax cuts, and started talking about the Congressional baseball shooting that happened over the summer.In that shooting, Rep. Steve Scalise, who is also the House Majority Whip, was shot and almost lost his life. Thanks to this tragic and stunning act of political violence, Scalise had a long recovery; in fact he is still in physical therapy. But, of course, vain and looks-obsessed Trump decided that he would congratulate Scalise, not on his survival and on his miraculous recovery, but on the massive amount of weight Scalise lost while he was practically dying. And make no mistake   Scalise is VERY lucky to be alive. According to doctors, when he arrived at the hospital, Scalise was actually, quote, in  imminent risk of death.  Here is the quote, via Twitter:How stunningly tone deaf does one have to be to say something like that? I never thought I d say this about a Republican that I, by all reasonable accounts, absolutely loathe, but I feel sorry for him. I am sorry he got shot, and I am even sorrier that he now has to stand there and listen to that orange buffoon talk about him like that.I am sure that Scalise is a much tougher man than Trump, though. I am equally sure that he also knows that Trump is an international embarrassment and a crazy man who never should have been allowed anywhere near the White House.Featured image via Alex Wong/Getty Images', label: 'Incendiary'},
            { text: 'Republicans are working overtime trying to sell their scam of a tax bill to the public as something that directly targets middle-class and working-class families with financial relief. Nothing could be further from the truth, and they re getting hammered on that repeatedly. Speaking on CNBC, Paul Ryan was going full throttle, trying to convince us that the paltry savings we re getting is actually wait for it big money.But he didn t just go with the usual talking points. With a smug look that only someone who grew up in a wealthy family can muster when talking about that which he does not know, Ryan claimed that the $2,059 more per year that families living paycheck-to-paycheck will see is extremely significant. Then he decided he had to amend that to say such savings might be nothing to a family earning $600,000 per year (true), or for people living in New York or California (false).Those are the same two states that Trump s loyal subjects insist on stripping from the 2016 vote totals to claim that Trump actually won the popular vote. Watch Ryan completely dismiss all the struggling families living in blue states below:If you re living paycheck-to-paycheck which is more than half of the people in this country and you got #2059more from a tax cut next year, that s not nothing. pic.twitter.com/8TKtrMqRa1  Paul Ryan (@SpeakerRyan) December 21, 2017Someone needs to reach through their computer or television and wipe that smugness off his face. It is the height of arrogance and insult to imply that there are no struggling families in either of those two states.Featured image via Mark Wilson/Getty Images', label: 'Incendiary'},
            { text: 'The media has been talking all day about Trump and the Republican Party s scam of a tax bill; as well as the sheer obsequiousness of Trump s cabinet, and then members of Congress, after their tax scam was all but passed. But the media isn t quite saying what Trump wants. They ve been doing analysis and discussion all day long rather than praising it for the grand achievement Trump believes it is. The GOP has increasingly sounded exactly like Trump when it comes to media coverage, and coverage of the tax scam is no different. Coverage of Trump in general hasn t changed.Today, Lindsey Graham went after the media for portraying Trump as a  kook,  and unfit for office (they wouldn t be doing their job if they weren t telling the truth, though). Graham said: You know what concerns me about the American press is this endless, endless attempt to label the guy as some kind of kook; not fit to be president. Jake Tapper notes that he himself has never labeled Trump that way. But then he points out something rather odd about Graham s opinion. Take a look at the short video clip below:Lindsey Graham today: I m concerned by the media s attempt to label Trump as a kook or not fit to be President.Lindsey Graham in 2016:  I think he s a kook. I think he s crazy. I think he s unfit for office.  pic.twitter.com/hIxs3DciO8  Tomthunkit  (@TomthunkitsMind) December 17, 2017There it is, out of Graham s own mouth. He parroted himself. In 2016, he used the exact words to describe Trump that he said the media is using today. Freudian slip?Featured image via video screen capture', label: 'Biased'}
        ]
      })
    
      console.log("toxicity: ", classify);
      res.send(toneIncendiary);

      const toneBiased = await cohere.classify({
        examples: [
            { text: 'It almost seems like Donald Trump is trolling America at this point. In the beginning, when he tried to gaslight the country by insisting that the crowd at his inauguration was the biggest ever   or that it was even close to the last couple of inaugurations   we all kind of scratched our heads and wondered what kind of bullshit he was playing at. Then when he started appointing people to positions they had no business being in, we started to worry that this was going to go much worse than we had expected.After 11 months of Donald Trump pulling the rhetorical equivalent of whipping his dick out and slapping it on every table he gets near, I think it s time we address what s happening: Dude is a straight-up troll. He gets pleasure out of making other people uncomfortable or even seeing them in distress. He actively thinks up ways to piss off people he doesn t like.Let s set aside just for a moment the fact that that s the least presidential  behavior anyone s ever heard of   it s dangerous.His latest stunt is one of the grossest yet. Everyone is, by now, used to Trump not talking about things he doesn t want to talk about, and making a huge deal out of things that not many people care about. So it wasn t a huge surprise when the president didn t discuss the Sandy Hook shooting of 2012 on the fifth anniversary of that tragic event. What was a huge surprise was that he not only consciously decided not to invite the victims  families to the White House Christmas party this year   as they have been invited every year since the massacre took place, along with others who share those concerns.In each of the past 4 years, President Obama invited gun violence prevention activists, gun violence survivors (including the Sandy Hook families) and supportive lawmakers to his Christmas party.', label: 'Biased'},
            { text: 'Donald Trump just couldn t wish all Americans a Happy New Year and leave it at that. Instead, he had to give a shout out to his enemies, haters and  the very dishonest fake news media.  The former reality show star had just one job to do and he couldn t do it. As our Country rapidly grows stronger and smarter, I want to wish all of my friends, supporters, enemies, haters, and even the very dishonest Fake News Media, a Happy and Healthy New Year,  President Angry Pants tweeted.  2018 will be a great year for America! As our Country rapidly grows stronger and smarter, I want to wish all of my friends, supporters, enemies, haters, and even the very dishonest Fake News Media, a Happy and Healthy New Year. 2018 will be a great year for America!  Donald J. Trump (@realDonaldTrump) December 31, 2017Trump s tweet went down about as welll as you d expect.What kind of president sends a New Year s greeting like this despicable, petty, infantile gibberish? Only Trump! His lack of decency won t even allow him to rise above the gutter long enough to wish the American citizens a happy new year!  Bishop Talbert Swan (@TalbertSwan) December 31, 2017no one likes you  Calvin (@calvinstowell) December 31, 2017Your impeachment would make 2018 a great year for America, but I ll also accept regaining control of Congress.  Miranda Yaver (@mirandayaver) December 31, 2017Do you hear yourself talk? When you have to include that many people that hate you you have to wonder? Why do the they all hate me?  Alan Sandoval (@AlanSandoval13) December 31, 2017Who uses the word Haters in a New Years wish??  Marlene (@marlene399) December 31, 2017You can t just say happy new year?  Koren pollitt (@Korencarpenter) December 31, 2017Here s Trump s New Year s Eve tweet from 2016.Happy New Year to all, including to my many enemies and those who have fought me and lost so badly they just don t know what to do. Love!  Donald J. Trump (@realDonaldTrump) December 31, 2016This is nothing new for Trump. He s been doing this for years.Trump has directed messages to his  enemies  and  haters  for New Year s, Easter, Thanksgiving, and the anniversary of 9/11. pic.twitter.com/4FPAe2KypA  Daniel Dale (@ddale8) December 31, 2017Trump s holiday tweets are clearly not presidential.', label: 'Biased'},
            { text: 'One of Donald Trump s favorite punching bags is CNN. He even once tweeted a GIF image of himself punching a person with a CNN logo superimposed over the head   indicating that he d like to enact violence against CNN s reporters. Then there was the time he tweeted the  Trump Train  roaring over  CNN.  Now, he s back at it   this time suggesting that  fake  CNN should be the ones representing America to the world, and that they are doing a bad job. Here is that tweet:.@FoxNews is MUCH more important in the United States than CNN, but outside of the U.S., CNN International is still a major source of (Fake) news, and they represent our Nation to the WORLD very poorly. The outside world does not see the truth from them!  Donald J. Trump (@realDonaldTrump) November 25, 2017Of course, it is beneath the dignity of most people to respond to a moronic buffoon like Trump under normal circumstances. However, he is currently squatting in the White House, and has his tiny orange hands on the levers of power   not to mention the nuclear codes   so they have to stoop to a Trumpian level when personally attacked. However, being, well, you know, FIT to be doing the job they are doing, the good folks at CNN Communications fired back at Trump, and their response is nothing short of perfect:It\'s not CNN\'s job to represent the U.S to the world. That\'s yours. Our job is to report the news. #FactsFirst   CNN Communications (@CNNPR) November 25, 2017BOOM! Couldn t have asked for a sicker burn than this. And they are right of course   especially the part about #FactsFirst. Trump has a problem with the truth, as we all well know. That s what makes what the CNN Communications people replied so fabulous. It is the ultimate truth   something the likes of the pathological orange liar that is Donald Trump knows nothing about.Featured image via  Andrew Burton/Getty Images', label: 'Biased'}
        ]
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