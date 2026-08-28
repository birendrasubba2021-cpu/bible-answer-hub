/**
 * Applies the scholarly citation apparatus to all published answers
 * that do not yet have structured notes and bibliography.
 *
 * Run with: npx tsx prisma/apply-citations-batch.ts
 *
 * Citation policy (Turabian notes-bibliography):
 *   - Creeds, confessions, and canons: by article/section.
 *   - Classical and patristic works: by internal divisions.
 *   - Modern monographs: title + imprint; pagination only when the
 *     specific edition has been consulted for that note.
 */
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type Footnote = { id: number; text: string };
type BibliographyEntry = {
  author: string;
  title: string;
  publication?: string;
  detail?: string;
};

type CitationPackage = {
  slug: string;
  detailedAnswer: string[];
  theologicalExplanation: string[];
  footnotes: Footnote[];
  bibliography: BibliographyEntry[];
};

const packages: CitationPackage[] = [
  {
    slug: "what-is-speaking-in-tongues",
    detailedAnswer: [
      "The Bible describes tongues in two main settings. At Pentecost (Acts 2) the disciples spoke in known foreign languages so that visitors from many nations heard the gospel in their own tongue. In 1 Corinthians 12–14, Paul treats tongues as one of several spiritual gifts given by the Spirit for the building up of the church.[^1]",
      "Paul values the gift but insists on order: in a gathering, tongues should be limited, taken in turn, and always interpreted so the church is edified. Without interpretation, he says, it is better to speak words people understand (1 Corinthians 14:19).[^2]",
      "Sincere Christians differ on whether this gift continues today. Continuationists believe all the gifts remain active. Cessationists believe the miraculous sign-gifts served the apostolic era and have ceased. Both sides agree the gift must never be used in disorder or as a measure of someone's spiritual maturity or salvation.[^3]",
    ],
    theologicalExplanation: [
      "Tongues is listed among gifts the Spirit distributes 'as he wills' (1 Corinthians 12:11), which means no single gift is required of every believer. Paul explicitly asks, 'Do all speak with tongues?' expecting the answer 'no' (1 Corinthians 12:30).[^4]",
      "The governing principle for all gifts is love and edification (1 Corinthians 13–14). A gift used without love or order does not honor God regardless of how impressive it seems.[^5]",
    ],
    footnotes: [
      {
        id: 1,
        text: "Gordon D. Fee, The First Epistle to the Corinthians, New International Commentary on the New Testament (Grand Rapids: Eerdmans, 1987), on Acts 2 as xenolalia and 1 Corinthians 12–14 as congregational regulation of the gift.",
      },
      {
        id: 2,
        text: "D. A. Carson, Showing the Spirit: A Theological Exposition of 1 Corinthians 12–14 (Grand Rapids: Baker, 1987), ch. 3, on the necessity of interpretation for edification.",
      },
      {
        id: 3,
        text: "Westminster Confession of Faith 1.6 and 1.10 place Scripture, not private experience, as the final judge of controversies of religion — a principle shared by both continuationist and cessationist confessions when testing gifts.",
      },
      {
        id: 4,
        text: "1 Corinthians 12:11, 30; cf. Fee, First Epistle to the Corinthians, on the Spirit's sovereign distribution of gifts.",
      },
      {
        id: 5,
        text: "Carson, Showing the Spirit, ch. 4, on love as the criterion that relativizes every gift.",
      },
    ],
    bibliography: [
      {
        author: "Carson, D. A.",
        title: "Showing the Spirit: A Theological Exposition of 1 Corinthians 12–14",
        publication: "Grand Rapids: Baker, 1987",
      },
      {
        author: "Fee, Gordon D.",
        title: "The First Epistle to the Corinthians",
        detail: "New International Commentary on the New Testament",
        publication: "Grand Rapids: Eerdmans, 1987",
      },
      {
        author: "Grudem, Wayne",
        title: "Systematic Theology: An Introduction to Biblical Doctrine",
        detail: "2nd ed. Chapters 52–53, on spiritual gifts",
        publication: "Grand Rapids: Zondervan Academic, 2020",
      },
      {
        author: "Thiselton, Anthony C.",
        title: "The First Epistle to the Corinthians",
        detail: "New International Greek Testament Commentary",
        publication: "Grand Rapids: Eerdmans, 2000",
      },
    ],
  },
  {
    slug: "what-is-being-slain-in-the-spirit",
    detailedAnswer: [
      "The Bible does record people falling down in God's presence — for example, when overwhelmed by a vision of God's glory or in fear and reverence (Ezekiel 1:28; Daniel 8:17; Revelation 1:17). The soldiers arresting Jesus fell back (John 18:6), and Saul fell at his conversion (Acts 9:4).[^1]",
      "However, none of these passages describe the specific contemporary practice of a minister causing people to fall backward by a touch, with catchers waiting behind them, as a repeatable church ritual. The biblical instances are spontaneous responses to a genuine encounter with God's holiness, usually marked by fear, repentance, and worship — not by emotional excitement or showmanship.[^2]",
      "Because the practice is not commanded in Scripture, Christians should evaluate it by its fruit and its faithfulness to God's Word. Anything that draws attention to a human minister, produces disorder, or replaces the clear teaching of Scripture with experiences should be approached with caution (1 Thessalonians 5:21).[^3]",
    ],
    theologicalExplanation: [
      "Scripture is the final authority for testing all spiritual experiences (Acts 17:11; 1 John 4:1). An experience is not validated simply because it feels powerful; it must align with God's revealed truth.[^4]",
      "God 'is not a God of confusion but of peace' (1 Corinthians 14:33). The Spirit's work characteristically produces self-control (Galatians 5:23) and edification, not chaos.[^5]",
    ],
    footnotes: [
      {
        id: 1,
        text: "The biblical instances of falling (Ezekiel 1:28; Daniel 8:17–18; Revelation 1:17; John 18:6; Acts 9:4) are descriptive narrative, not a liturgical pattern prescribed for the gathered church.",
      },
      {
        id: 2,
        text: "John MacArthur, Strange Fire: The Danger of Offending the Holy Spirit with Counterfeit Worship (Nashville: Thomas Nelson, 2013), ch. 11, distinguishes biblical theophanic awe from modern staged falling.",
      },
      {
        id: 3,
        text: "1 Thessalonians 5:19–22: \"Do not quench the Spirit… but test everything; hold fast what is good.\" Testing is itself an act of obedience to the Spirit-inspired Word.",
      },
      {
        id: 4,
        text: "Westminster Confession of Faith 1.10: the Holy Spirit speaking in Scripture is the supreme judge of all religious controversies and private spirits.",
      },
      {
        id: 5,
        text: "Galatians 5:22–23 lists self-control among the fruit of the Spirit; 1 Corinthians 14:33 and 14:40 require peace and order in congregational worship.",
      },
    ],
    bibliography: [
      {
        author: "Carson, D. A.",
        title: "Showing the Spirit: A Theological Exposition of 1 Corinthians 12–14",
        publication: "Grand Rapids: Baker, 1987",
      },
      {
        author: "MacArthur, John",
        title: "Strange Fire: The Danger of Offending the Holy Spirit with Counterfeit Worship",
        publication: "Nashville: Thomas Nelson, 2013",
      },
      {
        author: "Packer, J. I.",
        title: "Keep in Step with the Spirit",
        detail: "Rev. ed.",
        publication: "Grand Rapids: Baker, 2005",
      },
    ],
  },
  {
    slug: "is-the-prosperity-gospel-biblical",
    detailedAnswer: [
      "The prosperity gospel claims that faith, positive confession, and financial 'seed' giving obligate God to grant material wealth and physical health. In this system, poverty or sickness is treated as a sign of weak faith or sin.[^1]",
      "This contradicts the Bible at its core. Jesus had no place to lay his head (Matthew 8:20), warned that we cannot serve both God and money (Matthew 6:24), and called disciples to take up their cross. The apostle Paul learned contentment in both plenty and need (Philippians 4:11-13) and listed his many sufferings as marks of faithful ministry, not failure (2 Corinthians 11:23-28).[^2]",
      "The true gospel is the good news that Jesus Christ died for sinners and rose again, offering forgiveness and eternal life by grace through faith. Its central promise is God himself, not material things. Godliness with contentment is great gain (1 Timothy 6:6); the love of money is a root of all kinds of evil (1 Timothy 6:10).[^3]",
    ],
    theologicalExplanation: [
      "Prosperity teaching often rests on misreading verses like 3 John 2 ('that you may prosper') or 2 Corinthians 8:9, ignoring their actual context. Sound interpretation reads each verse in light of the whole of Scripture.[^4]",
      "Suffering is part of the normal Christian life (John 16:33; Romans 8:17). God does promise to meet our needs and may grant material blessing, but he never guarantees wealth as a reward for faith.[^5]",
    ],
    footnotes: [
      {
        id: 1,
        text: "David W. Jones and Russell S. Woodbridge, Health, Wealth, and Happiness: How the Prosperity Gospel Overwrites the Gospel of Christ (Grand Rapids: Kregel, 2011), ch. 1, summarize the movement's core claims.",
      },
      {
        id: 2,
        text: "John Piper, \"Why I Abominate the Prosperity Gospel,\" Desiring God (2007), drawing especially on 1 Timothy 6 and the Pauline catalogues of suffering.",
      },
      {
        id: 3,
        text: "1 Timothy 6:5–10; cf. Westminster Larger Catechism, Q. 141–142, on the eighth commandment and contentment with one's estate.",
      },
      {
        id: 4,
        text: "Jones and Woodbridge, Health, Wealth, and Happiness, ch. 3, on the misuse of 3 John 2 and 2 Corinthians 8:9.",
      },
      {
        id: 5,
        text: "Romans 8:17; Philippians 1:29; 2 Timothy 3:12 affirm that suffering with Christ is normal for disciples, not evidence of failed faith.",
      },
    ],
    bibliography: [
      {
        author: "Jones, David W., and Russell S. Woodbridge",
        title: "Health, Wealth, and Happiness: How the Prosperity Gospel Overwrites the Gospel of Christ",
        publication: "Grand Rapids: Kregel, 2011",
      },
      {
        author: "Piper, John",
        title: "Desiring God: Meditations of a Christian Hedonist",
        detail: "Rev. ed.",
        publication: "Sisters, OR: Multnomah, 2011",
      },
      {
        author: "Piper, John",
        title: "Why I Abominate the Prosperity Gospel",
        detail: "Desiring God conference address",
        publication: "2007",
      },
    ],
  },
  {
    slug: "what-does-the-bible-say-about-homosexuality",
    detailedAnswer: [
      "From the beginning, the Bible presents marriage as the union of a man and a woman (Genesis 2:24), affirmed by Jesus himself (Matthew 19:4-6). Within this framework, both Old and New Testaments describe homosexual acts as contrary to God's design (Leviticus 18:22; Romans 1:26-27; 1 Corinthians 6:9-11).[^1]",
      "It is important to distinguish between temptation and action, and between a person's identity and their conduct. Experiencing same-sex attraction is not itself the same as acting on it, and the Bible's call to holiness in this area is the same call to sexual faithfulness it gives to everyone, including heterosexual people, who are equally called to chastity outside marriage and faithfulness within it.[^2]",
      "Crucially, 1 Corinthians 6:9-11 lists many sins — including greed, slander, and drunkenness — and then says, 'And such were some of you. But you were washed, you were sanctified, you were justified.' The gospel offers cleansing and a new identity in Christ to all who come to him, whatever their past.[^3]",
    ],
    theologicalExplanation: [
      "The biblical sexual ethic flows from the doctrine of creation: God made humanity male and female and gave marriage as a picture of Christ and the church (Ephesians 5:31-32). Sexuality is therefore not a private preference but part of God's good created order.[^4]",
      "Because all have sinned (Romans 3:23), the church approaches this topic with humility, never with self-righteousness, holding together both truth and grace as Jesus did (John 1:14).[^5]",
    ],
    footnotes: [
      {
        id: 1,
        text: "Kevin DeYoung, What Does the Bible Really Teach about Homosexuality? (Wheaton, IL: Crossway, 2015), chs. 2–5, survey the principal Old and New Testament texts.",
      },
      {
        id: 2,
        text: "Sam Allberry, Is God Anti-Gay? And Other Questions about Homosexuality, the Bible and Same-Sex Attraction (Epsom, UK: The Good Book Company, 2013), distinguishes temptation from practice and calls for chastity for all unmarried persons.",
      },
      {
        id: 3,
        text: "1 Corinthians 6:9–11; cf. DeYoung, What Does the Bible Really Teach about Homosexuality?, ch. 6, on the gospel's offer of washing and a new identity.",
      },
      {
        id: 4,
        text: "Genesis 1:27; 2:24; Matthew 19:4–6; Ephesians 5:31–32. Marriage as creation ordinance and Christ–church typology is the theological frame for the biblical sexual ethic.",
      },
      {
        id: 5,
        text: "John 1:14; Ephesians 4:15. The church is bound to hold truth and love together rather than choose between them.",
      },
    ],
    bibliography: [
      {
        author: "Allberry, Sam",
        title: "Is God Anti-Gay? And Other Questions about Homosexuality, the Bible and Same-Sex Attraction",
        publication: "Epsom, UK: The Good Book Company, 2013",
      },
      {
        author: "DeYoung, Kevin",
        title: "What Does the Bible Really Teach about Homosexuality?",
        publication: "Wheaton, IL: Crossway, 2015",
      },
      {
        author: "Gagnon, Robert A. J.",
        title: "The Bible and Homosexual Practice: Texts and Hermeneutics",
        publication: "Nashville: Abingdon, 2001",
      },
      {
        author: "Yuan, Christopher",
        title: "Holy Sexuality and the Gospel: Sex, Desire, and Relationships Shaped by God's Grand Story",
        publication: "Colorado Springs: Multnomah, 2018",
      },
    ],
  },
  {
    slug: "what-does-the-bible-say-about-transgender-identity",
    detailedAnswer: [
      "Scripture opens with the statement that God created humanity 'male and female' in his image (Genesis 1:27), a distinction Jesus reaffirmed (Matthew 19:4). The Bible presents our bodies as good gifts from God, not mistakes to be overcome (Psalm 139:13-14).[^1]",
      "The Bible does not address modern medical and cultural questions about gender dysphoria directly, but its overall teaching is that our maleness or femaleness is part of how God made us, and that lasting identity and worth are found in being God's image-bearers and, for believers, in being united to Christ (Galatians 2:20).[^2]",
      "Many people experience real and painful distress about their gender. The right Christian response is neither mockery nor dismissal, but compassion, patience, and a willingness to walk alongside people as they seek God's truth — pointing them to the One who knows them fully and loves them.[^3]",
    ],
    theologicalExplanation: [
      "Christian anthropology teaches that human beings are embodied souls; the body is not separate from or opposed to the true self but integral to it (1 Corinthians 6:19-20).[^4]",
      "In a fallen world, our desires and self-perceptions can be disordered (Jeremiah 17:9), which is why Scripture, not feelings, is our guide for identity and conduct.[^5]",
    ],
    footnotes: [
      {
        id: 1,
        text: "Andrew T. Walker, God and the Transgender Debate: What Does the Bible Actually Say about Gender Identity? (Epsom, UK: The Good Book Company, 2017), chs. 2–3, on Genesis 1:27 and Jesus' reaffirmation in Matthew 19:4.",
      },
      {
        id: 2,
        text: "Preston Sprinkle, Embodied: Transgender Identities, the Church, and What the Bible Has to Say (Colorado Springs: David C Cook, 2021), on identity grounded in creation and union with Christ rather than dysphoric feelings.",
      },
      {
        id: 3,
        text: "Walker, God and the Transgender Debate, ch. 8, on pastoral presence that combines conviction with compassion.",
      },
      {
        id: 4,
        text: "1 Corinthians 6:19–20; cf. Herman Bavinck, Reformed Dogmatics, vol. 2, God and Creation, ed. John Bolt, trans. John Vriend (Grand Rapids: Baker Academic, 2004), on humanity as embodied image-bearers.",
      },
      {
        id: 5,
        text: "Jeremiah 17:9; Proverbs 14:12. Feelings are real but not self-authenticating; Scripture remains the rule of faith and life.",
      },
    ],
    bibliography: [
      {
        author: "Sprinkle, Preston",
        title: "Embodied: Transgender Identities, the Church, and What the Bible Has to Say",
        publication: "Colorado Springs: David C Cook, 2021",
      },
      {
        author: "Walker, Andrew T.",
        title: "God and the Transgender Debate: What Does the Bible Actually Say about Gender Identity?",
        publication: "Epsom, UK: The Good Book Company, 2017",
      },
      {
        author: "Yarhouse, Mark A.",
        title: "Understanding Gender Dysphoria: Navigating Transgender Issues in a Changing Culture",
        publication: "Downers Grove, IL: IVP Academic, 2015",
      },
    ],
  },
  {
    slug: "what-is-the-gospel",
    detailedAnswer: [
      "The word 'gospel' means 'good news.' Paul summarizes it in 1 Corinthians 15:3-4: 'Christ died for our sins in accordance with the Scriptures, that he was buried, that he was raised on the third day.'[^1]",
      "The gospel addresses humanity's deepest problem: we have all sinned and fallen short of God's glory (Romans 3:23), and the just penalty for sin is death (Romans 6:23). We cannot save ourselves by good works (Ephesians 2:8-9).[^2]",
      "In love, God sent his Son to live the righteous life we could not live and to die the death we deserved, taking our punishment in our place. By raising Jesus, God declared his sacrifice accepted and his victory over sin and death complete. The proper response is repentance (turning from sin) and faith (trusting in Christ).[^3]",
    ],
    theologicalExplanation: [
      "The gospel is received by grace alone, through faith alone, in Christ alone. Salvation is God's gift, not a wage we earn (Romans 4:4-5).[^4]",
      "Saving faith is not mere intellectual agreement but trust that results in a transformed life (James 2:17).[^5]",
    ],
    footnotes: [
      {
        id: 1,
        text: "1 Corinthians 15:3–4; Greg Gilbert, What Is the Gospel? (Wheaton, IL: Crossway, 2010), ch. 2, on Paul's summary as the fixed content of the apostolic gospel.",
      },
      {
        id: 2,
        text: "Romans 3:23; 6:23; Ephesians 2:8–9. The human predicament is guilt before a holy God, not merely ignorance or social brokenness.",
      },
      {
        id: 3,
        text: "The Apostles' Creed confesses the death, burial, and resurrection of Jesus Christ \"for us and for our salvation,\" summarizing the church's reception of the same gospel.",
      },
      {
        id: 4,
        text: "The Reformation solas — sola gratia, sola fide, solus Christus — are a later summary of the Pauline teaching in Romans 3–5 and Galatians 2.",
      },
      {
        id: 5,
        text: "James 2:14–26; cf. Westminster Confession of Faith 14.2 on saving faith as receiving, resting upon, and yielding obedience to Christ.",
      },
    ],
    bibliography: [
      {
        author: "Calvin, John",
        title: "Institutes of the Christian Religion",
        detail: "Book 3, chapters 1–4, on faith and repentance. Edited by John T. McNeill. Translated by Ford Lewis Battles",
        publication: "Philadelphia: Westminster Press, 1960",
      },
      {
        author: "Gilbert, Greg",
        title: "What Is the Gospel?",
        publication: "Wheaton, IL: Crossway, 2010",
      },
      {
        author: "Stott, John R. W.",
        title: "The Cross of Christ",
        publication: "Downers Grove, IL: InterVarsity Press, 1986",
      },
    ],
  },
  {
    slug: "who-is-jesus-christ",
    detailedAnswer: [
      "Jesus is not merely a great teacher or prophet. The New Testament presents him as the eternal Word who 'was God' and 'became flesh' (John 1:1, 14). He is the second person of the Trinity, who took on a true human nature without ceasing to be God.[^1]",
      "In his earthly life Jesus taught with authority, performed miracles, forgave sins, and claimed a unique relationship with the Father. He was crucified under Pontius Pilate, died, and was buried — and on the third day rose bodily from the grave, witnessed by many.[^2]",
      "His resurrection vindicates his claims and guarantees salvation for those who trust him. He has ascended to the Father's right hand and will return to judge the living and the dead.[^3]",
    ],
    theologicalExplanation: [
      "The Council of Chalcedon (451) confessed that Jesus is one person in two natures — truly God and truly man — 'without confusion, without change, without division, without separation.'[^4]",
      "Because he is fully God, his sacrifice has infinite worth; because he is fully man, he can represent humanity and be our mediator (1 Timothy 2:5).[^5]",
    ],
    footnotes: [
      {
        id: 1,
        text: "John 1:1, 14; Colossians 1:15–20; Philippians 2:5–11. The New Testament ascribes to Jesus the divine name, works, and worship.",
      },
      {
        id: 2,
        text: "1 Corinthians 15:3–8 lists the principal resurrection appearances; the Apostles' Creed places the passion \"under Pontius Pilate\" as a historical confession.",
      },
      {
        id: 3,
        text: "Acts 1:9–11; Hebrews 1:3; 2 Timothy 4:1. Ascension and return belong to the same Christological confession as incarnation and resurrection.",
      },
      {
        id: 4,
        text: "The Definition of Chalcedon (451): \"…to be acknowledged in two natures, inconfusedly, unchangeably, indivisibly, inseparably…\"",
      },
      {
        id: 5,
        text: "1 Timothy 2:5; Hebrews 2:14–18. The mediator must share our nature and possess the dignity of God.",
      },
    ],
    bibliography: [
      {
        author: "Athanasius",
        title: "On the Incarnation",
        detail: "Translated by a Religious of C.S.M.V. With an introduction by C. S. Lewis",
        publication: "Crestwood, NY: St Vladimir's Seminary Press, 1996",
      },
      {
        author: "Lewis, C. S.",
        title: "Mere Christianity",
        detail: "Book 2, on the \"trilemma\" concerning Jesus' claims",
        publication: "New York: HarperOne, 2001",
      },
      {
        author: "Macleod, Donald",
        title: "The Person of Christ",
        detail: "Contours of Christian Theology",
        publication: "Downers Grove, IL: InterVarsity Press, 1998",
      },
      {
        author: "Wells, David F.",
        title: "The Person of Christ: A Biblical and Historical Analysis of the Incarnation",
        publication: "Westchester, IL: Crossway, 1984",
      },
    ],
  },
  {
    slug: "is-the-bible-reliable",
    detailedAnswer: [
      "The New Testament is the best-attested document of the ancient world, with thousands of Greek manuscripts and many more in other languages, far exceeding any other classical text in quantity and closeness to the originals. This wealth of evidence lets scholars reconstruct the text with a very high degree of confidence.[^1]",
      "The Bible was written by dozens of authors over roughly 1,500 years, yet tells one unified story centered on God's redemption in Christ. Many historical details have been confirmed by archaeology, and its prophecies and their fulfillment add further weight.[^2]",
      "No reliability claim removes the need for faith, but Christian faith is not a leap into the dark. It rests on testimony that can be examined, especially the eyewitness accounts of Jesus' resurrection (1 Corinthians 15:3-8).[^3]",
    ],
    theologicalExplanation: [
      "Christians confess that Scripture is 'God-breathed' (2 Timothy 3:16) — fully inspired by God while written through real human authors in real history.[^4]",
      "The doctrine of inspiration is closely tied to the trustworthiness of Christ, who treated the Scriptures as the authoritative Word of God (Matthew 5:17-18).[^5]",
    ],
    footnotes: [
      {
        id: 1,
        text: "F. F. Bruce, The New Testament Documents: Are They Reliable?, 6th ed. (Grand Rapids: Eerdmans, 1981), chs. 2–3, on the manuscript attestation of the New Testament relative to other ancient literature.",
      },
      {
        id: 2,
        text: "Bruce M. Metzger and Bart D. Ehrman, The Text of the New Testament: Its Transmission, Corruption, and Restoration, 4th ed. (New York: Oxford University Press, 2005), summarize the methods by which the text is established.",
      },
      {
        id: 3,
        text: "1 Corinthians 15:3–8; cf. Richard Bauckham, Jesus and the Eyewitnesses: The Gospels as Eyewitness Testimony, 2nd ed. (Grand Rapids: Eerdmans, 2017).",
      },
      {
        id: 4,
        text: "2 Timothy 3:16; Westminster Confession of Faith 1.2–1.4 on the inspiration and authority of Holy Scripture.",
      },
      {
        id: 5,
        text: "Matthew 5:17–18; John 10:35. Jesus treats the written Word as abiding and unbreakable.",
      },
    ],
    bibliography: [
      {
        author: "Bauckham, Richard",
        title: "Jesus and the Eyewitnesses: The Gospels as Eyewitness Testimony",
        detail: "2nd ed.",
        publication: "Grand Rapids: Eerdmans, 2017",
      },
      {
        author: "Bruce, F. F.",
        title: "The New Testament Documents: Are They Reliable?",
        detail: "6th ed.",
        publication: "Grand Rapids: Eerdmans, 1981",
      },
      {
        author: "Metzger, Bruce M., and Bart D. Ehrman",
        title: "The Text of the New Testament: Its Transmission, Corruption, and Restoration",
        detail: "4th ed.",
        publication: "New York: Oxford University Press, 2005",
      },
      {
        author: "Wallace, Daniel B.",
        title: "Revisiting the Corruption of the New Testament: Manuscript, Patristic, and Apocryphal Evidence",
        publication: "Grand Rapids: Kregel Academic, 2011",
      },
    ],
  },
  {
    slug: "how-do-we-know-god-exists",
    detailedAnswer: [
      "Several classic arguments point toward God. The cosmological argument observes that whatever begins to exist has a cause; since the universe began to exist, it has a cause beyond itself. The teleological (design) argument notes the remarkable fine-tuning of the universe for life. The moral argument reasons that objective right and wrong require a transcendent moral Lawgiver.[^1]",
      "Beyond arguments, people across all cultures and ages have an awareness of the divine. The Bible says this is because God has made himself known in what he has created, so that his existence is evident (Romans 1:19-20).[^2]",
      "Christianity claims that God has not only left clues but has personally entered history in Jesus Christ, the clearest revelation of who God is (Hebrews 1:1-3).[^3]",
    ],
    theologicalExplanation: [
      "Theologians distinguish general revelation (God known through creation and conscience) from special revelation (God known through Scripture and Christ). Both testify that God is.[^4]",
      "Arguments can show that belief in God is reasonable, but saving knowledge of God comes through his self-revelation in Christ and the work of the Spirit.[^5]",
    ],
    footnotes: [
      {
        id: 1,
        text: "William Lane Craig, Reasonable Faith: Christian Truth and Apologetics, 3rd ed. (Wheaton, IL: Crossway, 2008), chs. 3–4, on the kalam cosmological argument, fine-tuning, and the moral argument.",
      },
      {
        id: 2,
        text: "Romans 1:19–20; Psalm 19:1–4. General revelation renders God's eternal power and divine nature \"clearly perceived\" in the things that have been made.",
      },
      {
        id: 3,
        text: "Hebrews 1:1–3; John 1:18. Special revelation culminates in the incarnate Son.",
      },
      {
        id: 4,
        text: "Timothy Keller, The Reason for God: Belief in an Age of Skepticism (New York: Dutton, 2008), chs. 8–9, on clues of God in the world and the necessity of Christ.",
      },
      {
        id: 5,
        text: "Westminster Confession of Faith 1.1 distinguishes the light of nature from the necessity of Holy Scripture for saving knowledge of God.",
      },
    ],
    bibliography: [
      {
        author: "Craig, William Lane",
        title: "Reasonable Faith: Christian Truth and Apologetics",
        detail: "3rd ed.",
        publication: "Wheaton, IL: Crossway, 2008",
      },
      {
        author: "Keller, Timothy",
        title: "The Reason for God: Belief in an Age of Skepticism",
        publication: "New York: Dutton, 2008",
      },
      {
        author: "Plantinga, Alvin",
        title: "God, Freedom, and Evil",
        publication: "Grand Rapids: Eerdmans, 1974",
      },
      {
        author: "Swinburne, Richard",
        title: "The Existence of God",
        detail: "2nd ed.",
        publication: "Oxford: Clarendon Press, 2004",
      },
    ],
  },
  {
    slug: "what-is-the-pentateuch",
    detailedAnswer: [
      "The word 'Pentateuch' comes from Greek meaning 'five scrolls.' These books tell the story of creation, the fall, the flood, the patriarchs (Abraham, Isaac, Jacob), the exodus from Egypt, the giving of the Law at Sinai, and Israel's journey toward the Promised Land.[^1]",
      "In Jewish tradition these books are 'the Torah,' the heart of the Hebrew Scriptures. They establish key themes carried through the whole Bible: covenant, sacrifice, holiness, and God's promise to bless the nations through Abraham's offspring — ultimately fulfilled in Christ.[^2]",
      "Jesus and the New Testament writers repeatedly cite the Pentateuch as authoritative, and Jesus referred to 'the Law of Moses' as pointing to himself (Luke 24:44).[^3]",
    ],
    theologicalExplanation: [
      "The Pentateuch lays the theological groundwork for the entire biblical storyline: a good creation, human sin, and God's covenant plan of redemption.[^4]",
      "Its sacrificial system and law anticipate and find their fulfillment in Jesus Christ, the true and better sacrifice (Hebrews 10:1-14).[^5]",
    ],
    footnotes: [
      {
        id: 1,
        text: "T. Desmond Alexander, From Paradise to the Promised Land: An Introduction to the Pentateuch, 3rd ed. (Grand Rapids: Baker Academic, 2012), ch. 1, on the shape and storyline of the five books.",
      },
      {
        id: 2,
        text: "Genesis 12:1–3; Galatians 3:8, 16. The Abrahamic promise of blessing for the nations is read by Paul as fulfilled in Christ.",
      },
      {
        id: 3,
        text: "Luke 24:27, 44; John 5:46. Jesus treats the Law of Moses as Scripture that bears witness to him.",
      },
      {
        id: 4,
        text: "Alexander, From Paradise to the Promised Land, parts 2–3, on creation, fall, and covenant as the Pentateuch's theological frame.",
      },
      {
        id: 5,
        text: "Hebrews 10:1–14; cf. the Epistle to the Hebrews throughout on the fulfillment of the Mosaic cultus in Christ.",
      },
    ],
    bibliography: [
      {
        author: "Alexander, T. Desmond",
        title: "From Paradise to the Promised Land: An Introduction to the Pentateuch",
        detail: "3rd ed.",
        publication: "Grand Rapids: Baker Academic, 2012",
      },
      {
        author: "Hamilton, Victor P.",
        title: "Handbook on the Pentateuch",
        detail: "2nd ed.",
        publication: "Grand Rapids: Baker Academic, 2005",
      },
      {
        author: "Sailhamer, John H.",
        title: "The Pentateuch as Narrative: A Biblical-Theological Commentary",
        publication: "Grand Rapids: Zondervan, 1992",
      },
    ],
  },
  {
    slug: "what-is-calvinism",
    detailedAnswer: [
      "Calvinism stresses that salvation is entirely a work of God's grace from beginning to end. Because of sin, no one seeks God on their own (total depravity); God graciously chooses to save people not because of foreseen merit (unconditional election); Christ's death effectively secures salvation for his people; God's saving grace effectively draws those he calls; and those truly saved will persevere to the end.[^1]",
      "Calvinism is one historic Protestant understanding of how God saves. Other faithful Christians hold Arminian or other views that place more emphasis on human free response. The debate concerns how to put together the Bible's teaching on God's sovereignty and human responsibility.[^2]",
      "Both Calvinists and their counterparts affirm that salvation is by grace through faith in Christ, that the gospel must be preached to all, and that no one is saved apart from God's grace.[^3]",
    ],
    theologicalExplanation: [
      "The five points were articulated at the Synod of Dort (1618–1619) in response to the Remonstrants (followers of Jacobus Arminius).[^4]",
      "Scripture holds together divine sovereignty and genuine human responsibility; different traditions weight and relate these truths differently while affirming both.[^5]",
    ],
    footnotes: [
      {
        id: 1,
        text: "The five points (often remembered by the acronym TULIP) are a pedagogical summary of the Canons of Dort (1619), heads 1–5, not a full statement of Calvin's own Institutes.",
      },
      {
        id: 2,
        text: "John Calvin, Institutes of the Christian Religion 3.21–24, on election; compare the Arminian Remonstrance of 1610 on conditional election and resistible grace.",
      },
      {
        id: 3,
        text: "Ephesians 2:8–9; Romans 10:14–17. Both Reformed and Arminian confessions affirm sola gratia and the necessity of gospel preaching.",
      },
      {
        id: 4,
        text: "The Canons of Dort (1619), First through Fifth Heads of Doctrine, answer the five articles of the Remonstrants point by point.",
      },
      {
        id: 5,
        text: "Philippians 2:12–13; Acts 2:23. Scripture attributes both divine purpose and human agency to the same events without dissolving either.",
      },
    ],
    bibliography: [
      {
        author: "Calvin, John",
        title: "Institutes of the Christian Religion",
        detail: "Book 3, chapters 21–24. Edited by John T. McNeill. Translated by Ford Lewis Battles",
        publication: "Philadelphia: Westminster Press, 1960",
      },
      {
        author: "Horton, Michael",
        title: "For Calvinism",
        publication: "Grand Rapids: Zondervan, 2011",
      },
      {
        author: "Olson, Roger E.",
        title: "Arminian Theology: Myths and Realities",
        publication: "Downers Grove, IL: IVP Academic, 2006",
      },
      {
        author: "Synod of Dort",
        title: "The Canons of Dort",
        detail: "1619. In The Origins of the Reformed Churches and the Synod of Dort",
        publication: "Grand Rapids: Baker, various eds.",
      },
    ],
  },
];

async function main() {
  console.log(`Applying citation apparatus to ${packages.length} answers...`);
  for (const pkg of packages) {
    await prisma.question.update({
      where: { slug: pkg.slug },
      data: {
        detailedAnswer: pkg.detailedAnswer,
        theologicalExplanation: pkg.theologicalExplanation,
        footnotes: pkg.footnotes as unknown as Prisma.InputJsonValue,
        bibliography: pkg.bibliography as unknown as Prisma.InputJsonValue,
      },
    });
    console.log(`  ✓ ${pkg.slug}`);
  }
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
