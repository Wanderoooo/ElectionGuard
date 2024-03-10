const deepl = require('deepl-node');
const express = require("express");
const router = express.Router();
const csv = require('csv-parser');
const fakedata = [];
const realdata = [];

const authKey = "fa1181bd-8416-7024-11c9-11e04ee164a7:fx";
const translator = new deepl.Translator(authKey);

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



router.post("/traits", async (req, res) => {
    let input = req.body.input;
    if (req.body.language !== 'en') {
      const inputText = await translator.translateText(input, null, 'en-US');
      input = inputText.text;
    }
    console.log("input", req)
    const rArray = [];
    const tonePositive = await cohere.classify({
        examples: [
            { text: 'The President signed the bipartisan bill into law today, marking a significant step forward in addressing the nation\'s infrastructure challenges.', label: 'Neutral' },
            { text: 'The Prime Minister\'s bold economic reforms have led to a surge in job creation and economic growth, bringing prosperity to the nation.', label: 'Positive' },
            { text: 'Opposition leaders criticized the government\'s handling of the crisis, accusing officials of incompetence and failure to prioritize the needs of the people.', label: 'Negative' },
            { text: 'The government announced plans to increase funding for education, aiming to improve access to quality education for all citizens.', label: 'Neutral' },
            { text: 'The mayor unveiled a new initiative to address traffic congestion in the city, seeking input from local residents and experts.', label: 'Neutral' },
            { text: 'The President\'s healthcare reform legislation passed with overwhelming bipartisan support, hailed as a historic achievement in improving access to healthcare for millions.', label: 'Positive' },
            { text: 'The Prime Minister\'s diplomatic efforts resulted in a landmark peace agreement between long-standing adversaries, fostering hope for lasting stability in the region.', label: 'Positive' },
            { text: 'Critics slammed the opposition party\'s proposed tax policy, arguing that it would burden working-class families and hinder economic growth.', label: 'Negative' },
            { text: "The government's decision to cut funding for social welfare programs sparked outrage among advocacy groups, who warned of dire consequences for vulnerable populations.", label: 'Negative' },
            { text: 'A backlash ensued after Donald Trump launched a sexist rant against Kirsten Gillibrand Thursday morning, saying that the Democratic Senator  would do anything  for a campaign contribution.', label: 'Negative'},
            { text: 'donald trump is a great person', label: 'Positive'}
          ],
          inputs: [input]
      })

      console.log("tonePositive: ", tonePositive);
      rArray.push(tonePositive.classifications[0].labels.Negative.confidence)

      const tonePolarizing = await cohere.classify({
        examples: [
            {text: 'Donald Trump just signed the GOP tax scam into law. Of course, that meant that he invited all of his craven, cruel GOP sycophants down from their perches on Capitol Hill to celebrate in the Rose Garden at the White House. Now, that part is bad enough   celebrating tax cuts for a bunch of rich hedge fund managers and huge corporations at the expense of everyday Americans. Of course, Trump is beside himself with glee, as this represents his first major legislative win since he started squatting in the White House almost a year ago. Thanks to said glee, in true Trumpian style, he gave a free-wheeling address, and a most curious subject came up as Trump was thanking the goons from the Hill. Somehow, Trump veered away from tax cuts, and started talking about the Congressional baseball shooting that happened over the summer.In that shooting, Rep. Steve Scalise, who is also the House Majority Whip, was shot and almost lost his life. Thanks to this tragic and stunning act of political violence, Scalise had a long recovery; in fact he is still in physical therapy. But, of course, vain and looks-obsessed Trump decided that he would congratulate Scalise, not on his survival and on his miraculous recovery, but on the massive amount of weight Scalise lost while he was practically dying. And make no mistake   Scalise is VERY lucky to be alive. According to doctors, when he arrived at the hospital, Scalise was actually, quote, in  imminent risk of death.  Here is the quote, via Twitter:How stunningly tone deaf does one have to be to say something like that? I never thought I\'d say this about a Republican that I, by all reasonable accounts, absolutely loathe, but I feel sorry for him. I am sorry he got shot, and I am even sorrier that he now has to stand there and listen to that orange buffoon talk about him like that.I am sure that Scalise is a much tougher man than Trump, though. I am equally sure that he also knows that Trump is an international embarrassment and a crazy man who never should have been allowed anywhere near the White House.Featured image via Alex Wong/Getty Images', label: 'Polarizing'},
            { text: 'Republicans are working overtime trying to sell their scam of a tax bill to the public as something that directly targets middle-class and working-class families with financial relief. Nothing could be further from the truth, and they re getting hammered on that repeatedly. Speaking on CNBC, Paul Ryan was going full throttle, trying to convince us that the paltry savings we re getting is actually wait for it big money.But he didn t just go with the usual talking points. With a smug look that only someone who grew up in a wealthy family can muster when talking about that which he does not know, Ryan claimed that the $2,059 more per year that families living paycheck-to-paycheck will see is extremely significant. Then he decided he had to amend that to say such savings might be nothing to a family earning $600,000 per year (true), or for people living in New York or California (false).Those are the same two states that Trump s loyal subjects insist on stripping from the 2016 vote totals to claim that Trump actually won the popular vote. Watch Ryan completely dismiss all the struggling families living in blue states below:If you re living paycheck-to-paycheck which is more than half of the people in this country and you got #2059 more from a tax cut next year, that s not nothing. pic.twitter.com/8TKtrMqRa1  Paul Ryan (@SpeakerRyan) December 21, 2017Someone needs to reach through their computer or television and wipe that smugness off his face. It is the height of arrogance and insult to imply that there are no struggling families in either of those two states.', label: 'Polarizing'},
            { text: 'The media has been talking all day about Trump and the Republican Party s scam of a tax bill; as well as the sheer obsequiousness of Trump s cabinet, and then members of Congress, after their tax scam was all but passed. But the media isn t quite saying what Trump wants. They ve been doing analysis and discussion all day long rather than praising it for the grand achievement Trump believes it is. The GOP has increasingly sounded exactly like Trump when it comes to media coverage, and coverage of the tax scam is no different. Coverage of Trump in general hasn t changed.Today, Lindsey Graham went after the media for portraying Trump as a  kook,  and unfit for office (they wouldn t be doing their job if they weren t telling the truth, though). Graham said: You know what concerns me about the American press is this endless, endless attempt to label the guy as some kind of kook; not fit to be president. Jake Tapper notes that he himself has never labeled Trump that way. But then he points out something rather odd about Graham s opinion. Take a look at the short video clip below:Lindsey Graham today: I m concerned by the media s attempt to label Trump as a kook or not fit to be President.Lindsey Graham in 2016:  I think he s a kook. I think he s crazy. I think he s unfit for office.  pic.twitter.com/hIxs3DciO8  Tomthunkit  (@TomthunkitsMind) December 17, 2017There it is, out of Graham s own mouth. He parroted himself. In 2016, he used the exact words to describe Trump that he said the media is using today.', label: 'Polarizing'},
            { text: 'Former President Donald Trump attended a fundraising event in Florida yesterday. The event, held at a private residence, was attended by supporters and donors. During his speech, Trump discussed various topics, including economic policies and foreign relations. Attendees expressed their enthusiasm for hearing from the former president, with some stating that they appreciated his efforts during his time in office. The event concluded without any notable incidents.', label: 'Unifying'},
            { text: 'Donald Trump, the former President of the United States, made a public appearance at a charity event in New York City yesterday. The event, organized by a local nonprofit organization, aimed to raise funds for community projects. Trump delivered a brief speech during the event, focusing on the importance of philanthropy and community involvement. Attendees included local residents, business leaders, and representatives from various organizations. The event concluded successfully, with funds raised exceeding the initial goal.', label: 'Unifying'},
            { text: 'In a recent interview, former President Donald Trump discussed his views on various economic and foreign policy issues. During the interview, conducted by a prominent journalist, Trump addressed topics such as trade relations, immigration, and global security. He provided insights into his administration\'s policies and shared his perspectives on current events. The interview generated widespread interest among the public and received coverage across various media outlets. Trump\'s remarks were met with both support and criticism from different segments of the population.', label: 'Unifying'}
        ],
        inputs: [input],
      })
    
      console.log("tonePolarizing: ", tonePolarizing);
      rArray.push(tonePolarizing.classifications[0].labels.Polarizing.confidence)

      const toneBiased = await cohere.classify({
        examples: [
            { text: 'It almost seems like Donald Trump is trolling America at this point. In the beginning, when he tried to gaslight the country by insisting that the crowd at his inauguration was the biggest ever   or that it was even close to the last couple of inaugurations   we all kind of scratched our heads and wondered what kind of bullshit he was playing at. Then when he started appointing people to positions they had no business being in, we started to worry that this was going to go much worse than we had expected.After 11 months of Donald Trump pulling the rhetorical equivalent of whipping his dick out and slapping it on every table he gets near, I think it s time we address what s happening: Dude is a straight-up troll. He gets pleasure out of making other people uncomfortable or even seeing them in distress. He actively thinks up ways to piss off people he doesn t like.Let s set aside just for a moment the fact that that s the least presidential  behavior anyone s ever heard of   it s dangerous.His latest stunt is one of the grossest yet. Everyone is, by now, used to Trump not talking about things he doesn t want to talk about, and making a huge deal out of things that not many people care about. So it wasn t a huge surprise when the president didn t discuss the Sandy Hook shooting of 2012 on the fifth anniversary of that tragic event. What was a huge surprise was that he not only consciously decided not to invite the victims  families to the White House Christmas party this year   as they have been invited every year since the massacre took place, along with others who share those concerns.In each of the past 4 years, President Obama invited gun violence prevention activists, gun violence survivors (including the Sandy Hook families) and supportive lawmakers to his Christmas party.', label: 'Biased'},
            { text: 'Donald Trump just couldn t wish all Americans a Happy New Year and leave it at that. Instead, he had to give a shout out to his enemies, haters and  the very dishonest fake news media.  The former reality show star had just one job to do and he couldn t do it. As our Country rapidly grows stronger and smarter, I want to wish all of my friends, supporters, enemies, haters, and even the very dishonest Fake News Media, a Happy and Healthy New Year,  President Angry Pants tweeted.  2018 will be a great year for America! As our Country rapidly grows stronger and smarter, I want to wish all of my friends, supporters, enemies, haters, and even the very dishonest Fake News Media, a Happy and Healthy New Year. 2018 will be a great year for America!  Donald J. Trump (@realDonaldTrump) December 31, 2017Trump s tweet went down about as welll as you d expect.What kind of president sends a New Year s greeting like this despicable, petty, infantile gibberish? Only Trump! His lack of decency won t even allow him to rise above the gutter long enough to wish the American citizens a happy new year!  Bishop Talbert Swan (@TalbertSwan) December 31, 2017no one likes you  Calvin (@calvinstowell) December 31, 2017Your impeachment would make 2018 a great year for America, but I ll also accept regaining control of Congress.  Miranda Yaver (@mirandayaver) December 31, 2017Do you hear yourself talk? When you have to include that many people that hate you you have to wonder? Why do the they all hate me?  Alan Sandoval (@AlanSandoval13) December 31, 2017Who uses the word Haters in a New Years wish??  Marlene (@marlene399) December 31, 2017You can t just say happy new year?  Koren pollitt (@Korencarpenter) December 31, 2017Here s Trump s New Year s Eve tweet from 2016.Happy New Year to all, including to my many enemies and those who have fought me and lost so badly they just don t know what to do. Love!  Donald J. Trump (@realDonaldTrump) December 31, 2016This is nothing new for Trump. He s been doing this for years.Trump has directed messages to his  enemies  and  haters  for New Year s, Easter, Thanksgiving, and the anniversary of 9/11. pic.twitter.com/4FPAe2KypA  Daniel Dale (@ddale8) December 31, 2017Trump s holiday tweets are clearly not presidential.', label: 'Biased'},
            { text: 'One of Donald Trump s favorite punching bags is CNN. He even once tweeted a GIF image of himself punching a person with a CNN logo superimposed over the head   indicating that he d like to enact violence against CNN s reporters. Then there was the time he tweeted the  Trump Train  roaring over  CNN.  Now, he s back at it   this time suggesting that  fake  CNN should be the ones representing America to the world, and that they are doing a bad job. Here is that tweet:.@FoxNews is MUCH more important in the United States than CNN, but outside of the U.S., CNN International is still a major source of (Fake) news, and they represent our Nation to the WORLD very poorly. The outside world does not see the truth from them!  Donald J. Trump (@realDonaldTrump) November 25, 2017Of course, it is beneath the dignity of most people to respond to a moronic buffoon like Trump under normal circumstances. However, he is currently squatting in the White House, and has his tiny orange hands on the levers of power   not to mention the nuclear codes   so they have to stoop to a Trumpian level when personally attacked. However, being, well, you know, FIT to be doing the job they are doing, the good folks at CNN Communications fired back at Trump, and their response is nothing short of perfect:It\'s not CNN\'s job to represent the U.S to the world. That\'s yours. Our job is to report the news. #FactsFirst   CNN Communications (@CNNPR) November 25, 2017BOOM! Couldn t have asked for a sicker burn than this. And they are right of course   especially the part about #FactsFirst. Trump has a problem with the truth, as we all well know. That s what makes what the CNN Communications people replied so fabulous. It is the ultimate truth   something the likes of the pathological orange liar that is Donald Trump knows nothing about.', label: 'Biased'},
            { text: 'A Georgian-American businessman who met then-Miss Universe pageant owner Donald Trump in 2013, has been questioned by congressional investigators about whether he helped organize a meeting between Russians and Trumps eldest son during the 2016 election campaign, four sources familiar with the matter said. The meeting at Trump Tower in New York involving Donald Trump Jr. and other campaign advisers is a focus of probes by Congress and Special Counsel Robert Mueller on whether campaign officials colluded with Russia when it sought to interfere in the U.S. election, the sources said. Russia denies allegations by U.S. intelligence agencies that it meddled in the election and President Donald Trump denies any collusion. The Senate and House of Representatives intelligence committees recently questioned behind closed doors Irakly Kaveladze, a U.S. citizen born in the former Soviet republic of Georgia, the sources said. He is a U.S.-based representative of Azerbaijani oligarch Aras Agalarovs real estate firm, the Crocus Group. The panels knew Kaveladze was at the June 9, 2016 meeting but became more interested in him after learning he also attended a private dinner in Las Vegas in 2013 with Trump and Agalarov as they celebrated an agreement to hold that years Miss Universe pageant in Moscow, the sources said.  Committee members now want to know more about the extent of Kaveladzes contacts with the Trump family and whether he had a bigger role than previously believed in setting up the Trump Tower meeting when Trump was a Republican candidate for president. The White House declined to comment. Muellers office also declined to comment. Scott Balber, a New York lawyer who represents Kaveladze, confirmed that his client attended both the dinner in Las Vegas and the Trump Tower meeting but said he did not set up the second meeting. Trumps son-in-law Jared Kushner, other Trump campaign aides, and Russian lawyer Natalia Veselnitskaya were also at that meeting. Lawyer Balber also said the committees were only seeking Kaveladzes input as a witness and were not targeting him for investigation. No-one has ever told me that they have any interest in him other than as a witness, Balber said. Lawyers for Trump Jr. and Kushner did not respond to requests for comment about their contacts with Kaveladze.??A lawyer for President Trump declined to comment.', label: 'Objective'},
            { text: 'Alabama Secretary of State John Merrill said he will certify Democratic Senator-elect Doug Jones as winner on Thursday despite opponent Roy Moores challenge, in a phone call on CNN. Moore, a conservative who had faced allegations of groping teenage girls when he was in his 30s, filed a court challenge late on Wednesday to the outcome of a U.S. Senate election he unexpectedly lost.', label: 'Objective'}
        ],
        inputs: [input],
  });

  console.log("toneBiased: ", toneBiased);
  rArray.push(toneBiased.classifications[0].labels.Biased.confidence)

  const toneCritical = await cohere.classify({
    examples: [
        { text: 'One of the editors of a new climate report from the federal government criticized President Trump administration for releasing the assessment on Black Friday, comparing it to “burning it and burying it in the backyard.\” \“They dropped the report on Black Friday, and you know it’s the press who calls releasing anything on a Friday afternoon ‘taking out the trash’ — this was burning it and burying it in the backyard, so it’s one of the worst possible days you could pick,” Andrew Light, former climate change advisor under the Obama administration, told Hill.TV correspondent Jamal Simmons on Tuesday. “I’m not going to try to ascribe any kind of motivations to anyone in the administration for this but it’s just not the responsible thing to do when you’ve got a report that’s talking about the welfare of Americans,” he continued. The scientific report was originally set to be released next month. But the National Centers for Environmental Information Technical Support Unit, David Easterling, said the report was moved up due to two upcoming conferences. Some scientists and environment activists warn that the Trump administration’s timing of the release could potentially bury the report’s dire findings.', label: 'Critical'},
        { text: 'Donald Trump\'s tenure as president was marked by ongoing scrutiny and criticism over potential conflicts of interest stemming from his extensive business empire. Throughout his presidency, Trump faced accusations of using his position for personal financial gain and leveraging his businesses for political advantage. Critics argue that Trump\'s refusal to fully divest from his business holdings and his decision to retain ownership of his companies while in office created numerous ethical challenges. Concerns were raised over foreign governments and entities potentially seeking to influence U.S. policy by patronizing Trump\'s properties or engaging in business dealings with the Trump Organization. Furthermore, Trump\'s decision to host official events and foreign dignitaries at his properties, such as the Trump International Hotel in Washington, D.C., raised questions about conflicts of interest and violations of the Emoluments Clause of the U.S. Constitution, which prohibits federal officeholders from receiving gifts or payments from foreign governments. Critics also pointed to instances where Trump\'s policy decisions appeared to benefit his business interests, such as his administration\'s efforts to roll back environmental regulations that could affect Trump-owned properties or developments.', label: 'Critical'},
        { text: 'President Joe Biden\'s administration announced a bipartisan agreement on a landmark infrastructure bill. The bill, which represents a significant investment in the nation\'s infrastructure, aims to modernize roads, bridges, and public transportation systems while also expanding broadband access and addressing climate change. The agreement garnered praise from both Democrats and Republicans, with lawmakers hailing it as a crucial step towards improving the country\'s infrastructure and creating jobs. President Biden lauded the bipartisan effort, highlighting the importance of cooperation in addressing critical issues facing the nation. The bill\'s passage is expected to have a positive impact on the economy and quality of life for millions of Americans.', label: 'Favorable'},
        { text: 'Congress passed a bipartisan bill aimed at providing relief to small businesses affected by the COVID-19 pandemic. The bill, which received overwhelming support from both Democrats and Republicans, allocates funding for grants and loans to help struggling businesses stay afloat during these challenging times. President Biden praised the bipartisan cooperation and swiftly signed the bill into law, emphasizing the importance of supporting small businesses as they work to recover and rebuild. The relief measures included in the bill are expected to provide much-needed assistance to entrepreneurs and employees across the country, stimulating economic growth and revitalizing local communities.', label: 'Favorable'},
        { text: 'State legislators passed a bipartisan bill aimed at improving access to education for underprivileged students. The bill, which received strong support from both sides of the aisle, includes provisions for expanding early childhood education programs, increasing funding for low-income schools, and providing scholarships for students from disadvantaged backgrounds. Governor [Name] praised the collaborative efforts of lawmakers and signed the bill into law, stating that it represents a significant step towards ensuring equal opportunities for all students. The legislation is expected to positively impact the lives of countless children and families across the state, setting them on a path towards success and prosperity.', label: 'Favorable'}
    ],
    inputs: [input],
  });

  console.log("toneCritical", toneCritical);
  rArray.push(toneCritical.classifications[0].labels.Critical.confidence)
  
  const toneFake = await cohere.classify({
    examples: [...fakedata.slice(0,100), ...realdata.slice(0,100)],
    inputs: [
        input
    ],
  })
  
  console.log("toneFake", toneFake);
  rArray.push(toneFake.classifications[0].labels.fake.confidence)
  
  const summary = await summarizeText(input);
  rArray.push(summary.summary);

  console.log("rArray", rArray)

  res.send(rArray)
});


async function summarizeText(input) {
  const summary = await cohere.summarize({
    text: input
  });
  console.log(summary);
  return summary;
}
module.exports = router;


