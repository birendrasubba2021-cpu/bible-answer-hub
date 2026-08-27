import type { QuestionAnswer } from "./types";

/**
 * Batch 01 — two answers for each of the five departments that had no
 * published content: Biblical Languages, Religions & Cults, Church History,
 * Practical Theology, and Mission & Ministry.
 *
 * These are drafts awaiting editorial review. On genuinely disputed matters
 * the answers set out the main evangelical positions before stating a view.
 *
 * Citation policy: creeds, confessions, and classical works are cited by their
 * own internal divisions, which hold across editions. Modern monographs are
 * cited by chapter; exact pagination is to be added from the editions actually
 * consulted.
 */

const AUTHOR = "Apologist Birendra Subba";
const DRAFTED = "2026-08-27";

export const batchOneQuestions: QuestionAnswer[] = [
  // ─── Biblical Languages ───────────────────────────────────────────────
  {
    slug: "what-language-did-jesus-speak",
    question: "What language did Jesus speak?",
    department: "biblical-languages",
    category: "Aramaic",
    topics: ["aramaic", "greek", "hebrew", "jesus", "language", "gospels"],
    difficulty: "introductory",
    views: 0,
    publishedAt: DRAFTED,
    shortAnswer:
      "Jesus' everyday language was Aramaic, the common speech of first-century Galilee and Judea. He also knew Hebrew, the language of the synagogue and the Scriptures, and he very likely had working Greek, the trade language of the eastern Roman Empire.",
    detailedAnswer: [
      "Aramaic had displaced Hebrew as the ordinary spoken language of Jewish people in Palestine after the exile. The Gospels preserve Jesus' actual Aramaic words at several points — talitha koum, 'little girl, arise' (Mark 5:41); ephphatha, 'be opened' (Mark 7:34); abba, 'Father' (Mark 14:36); and his cry from the cross, Eloi, Eloi, lema sabachthani (Mark 15:34). That the evangelists kept these phrases untranslated and then explained them for Greek readers is strong evidence that Aramaic was the language in which they were spoken.[^1]",
      "Hebrew had not died out. It remained the language of Scripture and of formal religious life, and the Dead Sea Scrolls show Hebrew still being actively composed in this period. When Jesus stood in the synagogue at Nazareth and read from Isaiah (Luke 4:16–20), he was reading a Hebrew scroll, and his debates with the scribes over the wording of particular texts assume real competence in it.[^2]",
      "Greek was the language of commerce and administration across the eastern Mediterranean, and Galilee sat on major trade routes near Greek-speaking cities. Jesus' exchanges with Pilate (John 18:33–38) and with the Roman centurion (Matthew 8:5–13) most plausibly took place in Greek, though the Gospels do not say so. The New Testament itself was written in Greek, which means the words of Jesus we read are already a faithful translation of what he originally said.",
    ],
    biblicalBasis: [
      { reference: "Mark 5:41", version: "ESV" },
      { reference: "Mark 7:34", version: "ESV" },
      { reference: "Mark 15:34", version: "ESV" },
      { reference: "Luke 4:16-20", version: "ESV" },
      { reference: "Acts 26:14", version: "ESV" },
    ],
    theologicalExplanation: [
      "That the Son of God spoke an ordinary regional dialect belongs to the reality of the incarnation. He did not address the world in a special sacred language but in the speech of Galilean villagers. The Word became flesh and spoke as his neighbours spoke (John 1:14).",
      "It also means Scripture is translatable by design. The Spirit inspired the evangelists to render Jesus' Aramaic into Greek, and that act stands behind every faithful translation since. No language holds a monopoly on the gospel — a conviction that shaped the church's missionary work from Pentecost onward (Acts 2:6–11).[^3]",
    ],
    commonMisunderstandings: [
      "That Jesus spoke only Hebrew because he was Jewish — Hebrew remained the language of Scripture, but Aramaic was the language of daily life.",
      "That the original words of Jesus are lost because the Gospels are in Greek — the evangelists translated under inspiration, and several Aramaic phrases are preserved directly in the text.",
      "That knowing Aramaic unlocks hidden meanings the Greek conceals — claims of this kind usually rest on speculation rather than manuscript or lexical evidence.",
    ],
    practicalApplication: [
      "Read the Gospels confidently in your own language; translation is not an obstacle God failed to anticipate but a method he chose.",
      "When a teacher claims a secret Aramaic meaning behind a familiar verse, ask what textual evidence supports it.",
    ],
    references: [],
    footnotes: [
      {
        id: 1,
        text: "Joseph A. Fitzmyer, \"The Languages of Palestine in the First Century A.D.,\" in A Wandering Aramean: Collected Aramaic Essays, SBL Monograph Series 25 (Missoula, MT: Scholars Press, 1979).",
      },
      {
        id: 2,
        text: "On Hebrew composition at Qumran, see Emanuel Tov, Textual Criticism of the Hebrew Bible, 3rd ed. (Minneapolis: Fortress Press, 2012), chapter on the Qumran scribal practice.",
      },
      {
        id: 3,
        text: "Lamin Sanneh, Translating the Message: The Missionary Impact on Culture, 2nd ed. (Maryknoll, NY: Orbis Books, 2009).",
      },
    ],
    bibliography: [
      {
        author: "Fitzmyer, Joseph A.",
        title: "A Wandering Aramean: Collected Aramaic Essays",
        detail: "SBL Monograph Series 25",
        publication: "Missoula, MT: Scholars Press, 1979",
      },
      {
        author: "Sanneh, Lamin",
        title: "Translating the Message: The Missionary Impact on Culture",
        detail: "2nd ed.",
        publication: "Maryknoll, NY: Orbis Books, 2009",
      },
      {
        author: "Tov, Emanuel",
        title: "Textual Criticism of the Hebrew Bible",
        detail: "3rd ed.",
        publication: "Minneapolis: Fortress Press, 2012",
      },
    ],
    relatedSlugs: ["is-the-bible-reliable", "what-is-the-pentateuch"],
    author: AUTHOR,
  },
  {
    slug: "does-agape-always-mean-divine-love",
    question: "Does the Greek word agape always mean divine love?",
    department: "biblical-languages",
    category: "Word Studies",
    topics: ["agape", "greek", "word-study", "love", "exegesis"],
    difficulty: "intermediate",
    views: 0,
    publishedAt: DRAFTED,
    shortAnswer:
      "No. Agape often carries a deep, self-giving sense in the New Testament, but that meaning comes from the contexts in which it is used — above all the cross — not from the word itself. Agape and phileo overlap considerably, and agape is even used of disordered loves.",
    detailedAnswer: [
      "A popular teaching holds that Greek has several precise words for love, with agape reserved for God's unconditional love and phileo meaning mere friendship. The New Testament does not sustain that division. John 3:35 says the Father loves (agapao) the Son; John 5:20 says the Father loves (phileo) the Son. The two verbs describe the same relationship with no discernible change in meaning.",
      "More decisively, agape is used of loves that are plainly wrong. Demas deserted Paul 'because he loved (agapesas) this present world' (2 Timothy 4:10). Jesus said people 'loved (egapesan) the darkness rather than the light' (John 3:19), and that the Pharisees 'love (agapate) the best seat in the synagogues' (Luke 11:43). A word that can take darkness, status, and the present age as its object is not a word that means 'divine love' on its own.",
      "What makes 1 Corinthians 13 or 1 John 4 so weighty is not the vocabulary but the description: love is patient, love is kind; God showed his love in that Christ died for us. The content is supplied by the sentence and by the gospel, not smuggled in by the noun. This is a general principle of responsible interpretation — meaning is determined by usage in context, not by a word's supposed inherent force.[^1]",
    ],
    biblicalBasis: [
      { reference: "John 3:35", version: "ESV" },
      { reference: "John 5:20", version: "ESV" },
      { reference: "2 Timothy 4:10", version: "ESV" },
      { reference: "Luke 11:43", version: "ESV" },
      { reference: "1 John 4:9-10", version: "ESV" },
    ],
    theologicalExplanation: [
      "The classic warning here is against what James Barr called illegitimate totality transfer — loading every possible sense of a word into a single occurrence.[^2] D. A. Carson catalogues the agape/phileo claim specifically among word-study fallacies.[^3] Guarding against it is not pedantry; it keeps the church from building sermons on a foundation the text cannot bear.",
      "There is a further irony. John 21:15–17, the passage most often used to prove the distinction, does alternate agapao and phileo — but it also alternates two words for 'know,' two for 'sheep,' and two for 'feed' and 'tend.' John varies his vocabulary for style throughout the Gospel. Reading a doctrine of two loves out of the passage requires ignoring the other three variations in the same conversation.",
    ],
    commonMisunderstandings: [
      "That agape by definition means God's unconditional love — Scripture applies it to loving the world, the darkness, and the chief seats.",
      "That Jesus was correcting Peter's lesser love in John 21 — the passage varies four word-pairs, not one, which points to style rather than doctrine.",
      "That word studies are therefore useless — they are valuable, provided meaning is drawn from how a word is actually used in its context.",
    ],
    practicalApplication: [
      "Test any teaching that turns on 'the Greek really means' by asking how the word is used elsewhere in the same book.",
      "Build sermons and studies on what the sentence asserts rather than on the supposed hidden power of a single word.",
      "Use a lexicon that lists a range of attested senses rather than a devotional word-list.",
    ],
    references: [],
    footnotes: [
      {
        id: 1,
        text: "Moisés Silva, Biblical Words and Their Meaning: An Introduction to Lexical Semantics, rev. ed. (Grand Rapids: Zondervan, 1994).",
      },
      {
        id: 2,
        text: "James Barr, The Semantics of Biblical Language (Oxford: Oxford University Press, 1961).",
      },
      {
        id: 3,
        text: "D. A. Carson, Exegetical Fallacies, 2nd ed. (Grand Rapids: Baker Academic, 1996), chapter 1, \"Word-Study Fallacies.\"",
      },
    ],
    bibliography: [
      {
        author: "Barr, James",
        title: "The Semantics of Biblical Language",
        publication: "Oxford: Oxford University Press, 1961",
      },
      {
        author: "Bauer, Walter",
        title:
          "A Greek-English Lexicon of the New Testament and Other Early Christian Literature",
        detail: "3rd ed. Revised by Frederick William Danker",
        publication: "Chicago: University of Chicago Press, 2000",
      },
      {
        author: "Carson, D. A.",
        title: "Exegetical Fallacies",
        detail: "2nd ed.",
        publication: "Grand Rapids: Baker Academic, 1996",
      },
      {
        author: "Silva, Moisés",
        title:
          "Biblical Words and Their Meaning: An Introduction to Lexical Semantics",
        detail: "Rev. ed.",
        publication: "Grand Rapids: Zondervan, 1994",
      },
    ],
    relatedSlugs: ["is-the-bible-reliable"],
    author: AUTHOR,
  },

  // ─── Religions & Cults ────────────────────────────────────────────────
  {
    slug: "how-is-allah-different-from-the-god-of-the-bible",
    question: "How is the God of Islam different from the God of the Bible?",
    department: "religions-cults",
    category: "Islam",
    topics: ["islam", "allah", "trinity", "comparative-religion", "apologetics"],
    difficulty: "intermediate",
    views: 0,
    publishedAt: DRAFTED,
    shortAnswer:
      "Islam and Christianity both confess one Creator God, and Arabic-speaking Christians have always called him Allah. But the two faiths describe him very differently. The decisive difference is the Trinity and the incarnation: the Qur'an explicitly denies that God has a Son, while the Christian gospel rests upon it.",
    detailedAnswer: [
      "Christians and Muslims agree on a good deal at the level of bare theism. God is one, eternal, uncreated, all-powerful, all-knowing, the Creator of everything, sovereign over history, and the judge of all people. Arabic-speaking Christians used the word Allah for God centuries before Islam and still do; Arabic Bibles use it in John 3:16. The word itself is not the point of disagreement.",
      "The difference lies in what is said about him. Christian faith confesses one God who exists eternally as Father, Son, and Holy Spirit, and holds that the Son became man in Jesus Christ, died for sinners, and rose again. The Qur'an rejects each of these claims directly: it denies that God begets or is begotten, warns against saying 'three,' and denies that Jesus was crucified.[^1]",
      "These are not secondary disagreements. If Jesus is not the Son of God who died and rose, there is no atonement and no gospel to preach (1 Corinthians 15:14–17). Christians therefore cannot treat the difference as a matter of emphasis. At the same time, Scripture requires that we state the disagreement honestly and speak with gentleness and respect (1 Peter 3:15), rather than caricaturing what Muslims actually believe.",
    ],
    biblicalBasis: [
      { reference: "John 1:14", version: "ESV" },
      { reference: "John 14:9", version: "ESV" },
      { reference: "1 John 2:23", version: "ESV" },
      { reference: "1 Corinthians 15:3-4", version: "ESV" },
      { reference: "1 Peter 3:15", version: "ESV" },
    ],
    theologicalExplanation: [
      "Christians differ over how to describe the relationship. Some argue that Muslims refer to the same being — the one Creator — while holding seriously mistaken beliefs about him, somewhat as the Samaritans worshipped what they did not know (John 4:22). Others argue that a God who has no Son is a different God altogether. Both groups agree that Islam's account of God excludes the gospel; they differ on how to answer the question of reference.[^2]",
      "What is not in dispute is that God is known savingly only through the Son. 'No one who denies the Son has the Father' (1 John 2:23), and Jesus said, 'Whoever has seen me has seen the Father' (John 14:9). Christian witness to Muslims is therefore not an argument about which name for God is correct, but an invitation to know the Father through the Son who died and rose.",
    ],
    commonMisunderstandings: [
      "That Allah is the name of a separate pagan deity — Allah is simply Arabic for God, used by Arab Christians before and since the rise of Islam.",
      "That Muslims deny Jesus entirely — the Qur'an honours him as a prophet born of a virgin, while denying his deity, his crucifixion, and his resurrection.",
      "That because both faiths are monotheistic the differences are cosmetic — denying the incarnation and the cross removes the gospel itself.",
    ],
    practicalApplication: [
      "Learn what Muslims actually believe before responding; misrepresenting a neighbour's faith undermines your witness.",
      "Keep the conversation on Jesus — who he is, what he did at the cross, and the resurrection — rather than on secondary grievances.",
      "Speak with the gentleness and respect Peter commands, remembering that most people are persuaded through patient friendship over years.",
    ],
    references: [],
    footnotes: [
      {
        id: 1,
        text: "Qur'an, Surah 112 (al-Ikhlas); Surah 4:157, 171 (an-Nisa').",
      },
      {
        id: 2,
        text: "Timothy George, Is the Father of Jesus the God of Muhammad? Understanding the Differences between Christianity and Islam (Grand Rapids: Zondervan, 2002); for a contrasting assessment, Miroslav Volf, Allah: A Christian Response (New York: HarperOne, 2011).",
      },
    ],
    bibliography: [
      {
        author: "George, Timothy",
        title:
          "Is the Father of Jesus the God of Muhammad? Understanding the Differences between Christianity and Islam",
        publication: "Grand Rapids: Zondervan, 2002",
      },
      {
        author: "The Qur'an",
        title: "The Qur'an",
        detail:
          "Translated by M. A. S. Abdel Haleem. Oxford World's Classics",
        publication: "Oxford: Oxford University Press, 2004",
      },
      {
        author: "Volf, Miroslav",
        title: "Allah: A Christian Response",
        publication: "New York: HarperOne, 2011",
      },
    ],
    relatedSlugs: ["what-is-the-trinity", "who-is-jesus-christ"],
    author: AUTHOR,
  },
  {
    slug: "are-jehovahs-witnesses-christian",
    question: "Are Jehovah's Witnesses Christian?",
    department: "religions-cults",
    category: "Cults",
    topics: ["jehovahs-witnesses", "watchtower", "trinity", "cults", "deity-of-christ"],
    difficulty: "intermediate",
    views: 0,
    publishedAt: DRAFTED,
    shortAnswer:
      "Jehovah's Witnesses use the Bible and speak often of Jesus, but the Watchtower organisation denies the Trinity, teaches that Jesus is a created being, and denies his bodily resurrection. On the doctrines the church has always held to be essential, their teaching falls outside historic Christianity — though individual Witnesses deserve courtesy and genuine friendship.",
    detailedAnswer: [
      "The Watchtower Bible and Tract Society, founded in the late nineteenth century, teaches that Jehovah alone is God, that Jesus is Michael the archangel — the first being Jehovah created — and that the Holy Spirit is God's impersonal active force rather than a person. It also teaches that Jesus rose spiritually rather than bodily, and that only 144,000 go to heaven while other faithful Witnesses live forever on a renewed earth.",
      "These positions are maintained partly through the New World Translation, the organisation's own Bible version. Its rendering of John 1:1 — 'the Word was a god' — is rejected by Greek grammarians across the theological spectrum, since an anarthrous predicate nominative preceding the verb normally functions qualitatively rather than indefinitely.[^1] Colossians 1:16–17 is similarly altered by inserting 'other' four times, a word absent from the Greek text.",
      "Historic Christian faith, by contrast, confesses that Jesus is fully God, 'begotten, not made,' and that he rose bodily from the grave (Luke 24:39; John 20:27). Thomas addressed the risen Christ as 'My Lord and my God' (John 20:28), and Jesus accepted it. Denying these is not a difference of emphasis within Christianity; it is a denial of the confession that defines it.[^2]",
    ],
    biblicalBasis: [
      { reference: "John 1:1", version: "ESV" },
      { reference: "John 20:28", version: "ESV" },
      { reference: "Colossians 1:16-17", version: "ESV" },
      { reference: "Colossians 2:9", version: "ESV" },
      { reference: "Luke 24:39", version: "ESV" },
    ],
    theologicalExplanation: [
      "The church has always distinguished between disagreements among Christians and denials of the faith itself. Baptism, church government, and the millennium have divided sincere believers for centuries without either side denying the gospel. The deity of Christ is of a different order: the Councils of Nicaea (325) and Constantinople (381) treated it as the boundary of Christian confession, precisely because salvation depends on who Jesus is.",
      "This judgment concerns doctrine, not the sincerity or moral character of individual Witnesses, who are often devout, disciplined, and far more willing to talk with strangers about God than most Christians are. The right response is neither hostility nor pretending the differences are small, but patient conversation about the identity of Jesus from the text of Scripture itself.",
    ],
    commonMisunderstandings: [
      "That Jehovah's Witnesses are simply another Christian denomination — the disagreement is over the deity of Christ, not secondary matters.",
      "That they reject the Bible — they revere it, but read it through a translation and commentary produced by the organisation.",
      "That the label 'cult' licenses rudeness — it is a theological description, not permission to treat people with contempt.",
    ],
    practicalApplication: [
      "If Witnesses visit, welcome them and offer to read a passage together — John 1, Colossians 1, or John 20 — rather than trading proof-texts at the door.",
      "Ask questions about how their translation handles a particular verse, and let the text do the work.",
      "Pray for those leaving the organisation, who often lose their entire community and need patient friendship from a local church.",
    ],
    references: [],
    footnotes: [
      {
        id: 1,
        text: "On the grammar of John 1:1c, see Daniel B. Wallace, Greek Grammar Beyond the Basics: An Exegetical Syntax of the New Testament (Grand Rapids: Zondervan, 1996), on anarthrous preverbal predicate nominatives.",
      },
      {
        id: 2,
        text: "The Niceno-Constantinopolitan Creed (381), art. 2.",
      },
    ],
    bibliography: [
      {
        author: "Bowman, Robert M., Jr.",
        title:
          "Understanding Jehovah's Witnesses: Why They Read the Bible the Way They Do",
        publication: "Grand Rapids: Baker Book House, 1991",
      },
      {
        author: "Rhodes, Ron",
        title: "Reasoning from the Scriptures with the Jehovah's Witnesses",
        detail: "Rev. ed.",
        publication: "Eugene, OR: Harvest House, 2009",
      },
      {
        author: "Wallace, Daniel B.",
        title:
          "Greek Grammar Beyond the Basics: An Exegetical Syntax of the New Testament",
        publication: "Grand Rapids: Zondervan, 1996",
      },
    ],
    relatedSlugs: ["what-is-the-trinity", "who-is-jesus-christ"],
    author: AUTHOR,
  },

  // ─── Church History ───────────────────────────────────────────────────
  {
    slug: "what-happened-at-the-council-of-nicaea",
    question: "What happened at the Council of Nicaea in 325?",
    department: "church-history",
    category: "Early Church",
    topics: ["nicaea", "arianism", "athanasius", "creed", "councils", "constantine"],
    difficulty: "introductory",
    views: 0,
    publishedAt: DRAFTED,
    shortAnswer:
      "The Council of Nicaea was the first ecumenical council of the church, called by the Emperor Constantine in AD 325 to settle the Arian controversy. It affirmed that the Son is of the same substance (homoousios) as the Father — fully God, not a creature — and produced the creed later expanded into the Nicene Creed recited today.",
    detailedAnswer: [
      "The controversy began with Arius, a presbyter in Alexandria, who taught that the Son was the highest of all creatures but not eternal: there was a time when he was not.[^1] His bishop, Alexander, condemned the teaching, but it spread quickly, and the resulting division threatened both the church and the newly Christianised empire. Constantine summoned bishops from across the empire to Nicaea, in modern-day Turkey, to resolve it.",
      "Roughly three hundred bishops attended, many bearing scars from persecutions that had ended barely a decade earlier. The council rejected Arius' position and confessed the Son as 'true God from true God, begotten, not made, of one substance with the Father.' The term homoousios was chosen precisely because Arians could not sign it while retaining their doctrine. Athanasius, then a young deacon accompanying Alexander, would spend the next five decades defending it.",
      "Nicaea did not end the dispute. Arianism regained imperial favour repeatedly, and Athanasius was sent into exile five times. The matter was settled only at the Council of Constantinople in 381, which reaffirmed Nicaea and added fuller language on the Holy Spirit. The creed most churches recite as 'the Nicene Creed' is in fact this expanded text of 381.",
    ],
    biblicalBasis: [
      { reference: "John 1:1", version: "ESV" },
      { reference: "John 1:18", version: "ESV" },
      { reference: "John 10:30", version: "ESV" },
      { reference: "Philippians 2:6", version: "ESV" },
      { reference: "Colossians 2:9", version: "ESV" },
    ],
    theologicalExplanation: [
      "Nicaea is often misrepresented as the moment the church invented Christ's divinity or decided which books belonged in the Bible. It did neither. The council addressed no question of canon, and it affirmed a confession of Christ's deity already evident in the New Testament and in Christian worship long before 325 — Pliny the Younger reported around AD 112 that Christians sang hymns 'to Christ as to a god.'[^2]",
      "What the council did was supply precise language to protect an old confession against a new denial. This is how doctrinal definition normally works: the church does not add to Scripture but draws a boundary when someone claims biblical warrant for a teaching Scripture does not permit. The word homoousios is not in the Bible; what it guards is.",
    ],
    commonMisunderstandings: [
      "That Nicaea invented the deity of Christ — it defended a confession the church already held, against Arius' denial.",
      "That Nicaea decided the canon of Scripture — the council did not address which books belong in the Bible.",
      "That the outcome was narrow or coerced — the overwhelming majority signed, with only two bishops refusing alongside Arius.",
    ],
    practicalApplication: [
      "Read the Nicene Creed slowly and notice how much of it is aimed at a single question: who is Jesus?",
      "When popular books or documentaries make claims about Nicaea, check them against the council's actual creed and canons, which are short and freely available.",
    ],
    references: [],
    footnotes: [
      {
        id: 1,
        text: "Athanasius, Orations Against the Arians 1.5–1.6, quoting and answering the Arian formula.",
      },
      {
        id: 2,
        text: "Pliny the Younger, Letters 10.96, to the Emperor Trajan.",
      },
    ],
    bibliography: [
      {
        author: "Athanasius",
        title: "Orations Against the Arians",
        detail:
          "In Nicene and Post-Nicene Fathers, 2nd series, vol. 4, edited by Philip Schaff and Henry Wace",
        publication: "Peabody, MA: Hendrickson, 1994",
      },
      {
        author: "Ayres, Lewis",
        title:
          "Nicaea and Its Legacy: An Approach to Fourth-Century Trinitarian Theology",
        publication: "Oxford: Oxford University Press, 2004",
      },
      {
        author: "Kelly, J. N. D.",
        title: "Early Christian Doctrines",
        detail: "5th ed.",
        publication: "London: A&C Black, 1977",
      },
      {
        author: "Pliny the Younger",
        title: "Letters",
        detail:
          "Translated by Betty Radice. Loeb Classical Library",
        publication: "Cambridge, MA: Harvard University Press, 1969",
      },
    ],
    relatedSlugs: ["what-is-the-trinity", "who-is-jesus-christ"],
    author: AUTHOR,
  },
  {
    slug: "what-are-the-five-solas-of-the-reformation",
    question: "What were the five solas of the Reformation?",
    department: "church-history",
    category: "Reformation",
    topics: ["reformation", "solas", "luther", "justification", "sola-scriptura"],
    difficulty: "introductory",
    views: 0,
    publishedAt: DRAFTED,
    shortAnswer:
      "The five solas are Latin slogans summarising the Reformation's central convictions: Scripture alone, faith alone, grace alone, Christ alone, and glory to God alone. They were not a checklist drawn up in the sixteenth century but a later summary of what the Reformers contended for.",
    detailedAnswer: [
      "Sola Scriptura holds that Scripture is the church's final authority. It does not mean Scripture is the only authority — the Reformers valued creeds, councils, and the church fathers — but that every other authority is answerable to it. Sola fide holds that a sinner is justified by faith alone, apart from works. Sola gratia holds that salvation is entirely God's gift rather than a reward. Solus Christus holds that Christ alone is the mediator between God and man. Soli Deo gloria holds that all of it is for God's glory alone.",
      "Each slogan was formed against a specific claim. The debate over sola fide turned on whether justification is God declaring a sinner righteous on the basis of Christ's righteousness received by faith, or God making the sinner progressively righteous through infused grace. Luther's insistence on the former — grounded in Romans 3–4 and Galatians 2 — is what he meant by calling justification the article on which the church stands or falls.",
      "The five function together as a single argument rather than as five separate points. If salvation is by grace alone, it cannot be earned; if it is received by faith alone, the merit belongs to Christ alone; if the authority for saying so is Scripture alone, no institution can revise it; and if all of that is true, no one but God can take the credit.",
    ],
    biblicalBasis: [
      { reference: "Romans 3:23-24", version: "ESV" },
      { reference: "Romans 3:28", version: "ESV" },
      { reference: "Ephesians 2:8-9", version: "ESV" },
      { reference: "1 Timothy 2:5", version: "ESV" },
      { reference: "2 Timothy 3:16-17", version: "ESV" },
    ],
    theologicalExplanation: [
      "The phrase 'five solas' appears to be a modern summary rather than a sixteenth-century formula; the Reformers used the individual terms but did not enumerate them as a set.[^1] That does not make the summary inaccurate, but it is worth stating plainly, since the solas are sometimes presented as a manifesto the Reformers themselves published.",
      "Roman Catholic and Protestant scholars have narrowed some of the historic distance since the sixteenth century — the 1999 Joint Declaration on the Doctrine of Justification is the most prominent attempt — though significant disagreements remain over imputation, merit, and the authority of the magisterium.[^2] Honest ecumenical conversation names those differences rather than dissolving them.",
    ],
    commonMisunderstandings: [
      "That sola Scriptura means rejecting all tradition — the Reformers used the creeds and the fathers extensively, but placed them under Scripture.",
      "That sola fide means works do not matter — the Reformers taught that saving faith always produces good works, while denying that works contribute to justification.",
      "That the five solas were a sixteenth-century list — the individual phrases are Reformation-era; the set of five is a much later summary.",
    ],
    practicalApplication: [
      "Test your assurance: it rests on Christ's finished work received by faith, not on your performance this week.",
      "Read Romans 3–5 and Galatians 2–3 straight through to see where the Reformers' language came from.",
      "Hold your convictions firmly and charitably; the Reformation was a dispute among people reading the same Bible.",
    ],
    references: [],
    footnotes: [
      {
        id: 1,
        text: "On the history of the formulation, see Matthew Barrett, ed., Reformation Theology: A Systematic Summary (Wheaton, IL: Crossway, 2017).",
      },
      {
        id: 2,
        text: "Joint Declaration on the Doctrine of Justification, Lutheran World Federation and the Pontifical Council for Promoting Christian Unity (1999).",
      },
    ],
    bibliography: [
      {
        author: "Barrett, Matthew, ed.",
        title: "Reformation Theology: A Systematic Summary",
        publication: "Wheaton, IL: Crossway, 2017",
      },
      {
        author: "Calvin, John",
        title: "Institutes of the Christian Religion",
        detail:
          "Edited by John T. McNeill. Translated by Ford Lewis Battles. Library of Christian Classics 20–21",
        publication: "Philadelphia: Westminster Press, 1960",
      },
      {
        author: "McGrath, Alister E.",
        title:
          "Iustitia Dei: A History of the Christian Doctrine of Justification",
        detail: "3rd ed.",
        publication: "Cambridge: Cambridge University Press, 2005",
      },
    ],
    relatedSlugs: ["what-is-the-gospel", "what-is-calvinism"],
    author: AUTHOR,
  },

  // ─── Practical Theology ───────────────────────────────────────────────
  {
    slug: "how-should-i-interpret-the-bible",
    question: "How should I read and interpret the Bible for myself?",
    department: "practical-theology",
    category: "Hermeneutics",
    topics: ["hermeneutics", "bible-study", "interpretation", "context", "genre"],
    difficulty: "introductory",
    views: 0,
    publishedAt: DRAFTED,
    shortAnswer:
      "Read each passage for what its author actually meant to communicate, in its context and according to its literary type, and let clearer passages govern your reading of obscure ones. Sound interpretation is a learnable discipline rather than a special gift, and it begins with reading whole books instead of isolated verses.",
    detailedAnswer: [
      "Start with context. The most common interpretive error is lifting a sentence out of the paragraph, chapter, and book that give it meaning. Jeremiah 29:11 — 'plans to prosper you' — is God's word to exiles who are told in the previous verse that they will be in Babylon for seventy years. It is a promise of eventual restoration to a nation, not a guarantee of personal success. Reading the surrounding verses costs a minute and prevents most misreadings.",
      "Next, read according to genre. Scripture contains narrative, law, poetry, proverb, prophecy, gospel, letter, and apocalyptic, and each communicates differently. Proverbs states general truths rather than unconditional promises. Narrative often reports what happened without endorsing it. Apocalyptic uses symbol deliberately. Asking 'what kind of writing is this?' before 'what does this mean for me?' prevents a great deal of confusion.",
      "Then let Scripture interpret Scripture. Where a passage is genuinely difficult, the historic principle is to read it in the light of passages that speak plainly on the same subject, rather than building doctrine on an obscure text.[^1] Finally, ask what the passage requires of you — but only after you have understood what it says. Application that runs ahead of interpretation usually ends up applying something the text never said.",
    ],
    biblicalBasis: [
      { reference: "2 Timothy 2:15", version: "ESV" },
      { reference: "2 Timothy 3:16-17", version: "ESV" },
      { reference: "Acts 17:11", version: "ESV" },
      { reference: "Nehemiah 8:8", version: "ESV" },
      { reference: "2 Peter 1:20-21", version: "ESV" },
    ],
    theologicalExplanation: [
      "Protestant confessions have long affirmed both the clarity of Scripture and the need for care. The Westminster Confession states that not everything in Scripture is equally plain, yet that what is necessary for salvation is set out so clearly that the unlearned may attain a sufficient understanding of it.[^2] Ordinary Christians can read the Bible with confidence; they should also read it with humility.",
      "This is why reading in community matters. The Spirit illumines readers, but he has also given the church teachers (Ephesians 4:11–13), and two thousand years of faithful interpretation are a gift rather than a threat. A reading that no one in the history of the church has ever arrived at is more likely mistaken than uniquely insightful.",
    ],
    commonMisunderstandings: [
      "That any interpretation is as good as another because a text 'means something different to everyone' — the text has an author and a meaning we are trying to recover.",
      "That study aids compete with the Spirit's illumination — the Spirit works through ordinary means, including grammar, history, and teachers.",
      "That difficult passages must be resolved before Scripture can benefit you — begin with what is clear and let it shape you.",
    ],
    practicalApplication: [
      "Read whole books in one sitting before dissecting individual verses; most New Testament letters take under half an hour.",
      "Before applying a verse, answer three questions: who wrote it, to whom, and what comes immediately before and after.",
      "Use a study Bible or commentary after you have read the passage yourself, so that it corrects rather than replaces your reading.",
    ],
    references: [],
    footnotes: [
      {
        id: 1,
        text: "Westminster Confession of Faith 1.9: \"The infallible rule of interpretation of Scripture is the Scripture itself.\"",
      },
      {
        id: 2,
        text: "Westminster Confession of Faith 1.7.",
      },
    ],
    bibliography: [
      {
        author: "Fee, Gordon D., and Douglas Stuart",
        title: "How to Read the Bible for All Its Worth",
        detail: "4th ed.",
        publication: "Grand Rapids: Zondervan, 2014",
      },
      {
        author: "Klein, William W., Craig L. Blomberg, and Robert L. Hubbard Jr.",
        title: "Introduction to Biblical Interpretation",
        detail: "3rd ed.",
        publication: "Grand Rapids: Zondervan Academic, 2017",
      },
      {
        author: "Plummer, Robert L.",
        title: "40 Questions About Interpreting the Bible",
        detail: "2nd ed.",
        publication: "Grand Rapids: Kregel Academic, 2021",
      },
    ],
    relatedSlugs: ["is-the-bible-reliable"],
    author: AUTHOR,
  },
  {
    slug: "what-does-the-bible-say-about-anxiety-and-depression",
    question: "What does the Bible say about anxiety and depression?",
    department: "practical-theology",
    category: "Pastoral Care & Counseling",
    topics: ["anxiety", "depression", "counseling", "lament", "mental-health", "suffering"],
    difficulty: "introductory",
    views: 0,
    publishedAt: DRAFTED,
    shortAnswer:
      "Scripture takes sorrow and fear seriously rather than dismissing them. It contains sustained laments from believers in deep distress, commands that make room for honesty before God, and promises of his presence. It never treats depression as automatic evidence of weak faith, and seeking medical or professional help is not a failure of trust.",
    detailedAnswer: [
      "The Bible is remarkably candid about anguish. Roughly a third of the Psalms are laments. Elijah, immediately after his greatest victory, asked God to take his life (1 Kings 19:4). Job cursed the day he was born. Paul described being 'so utterly burdened beyond our strength that we despaired of life itself' (2 Corinthians 1:8). Jesus himself was 'sorrowful and troubled' to the point of anguish in Gethsemane (Matthew 26:37–38). None of this is presented as a failure of faith.",
      "Notice how God responds to Elijah. He does not rebuke him. He lets him sleep, sends food twice, and only then speaks — and when he does, it is in a low whisper rather than in wind, earthquake, or fire (1 Kings 19:5–12). Rest, food, and gentleness precede instruction. That pattern should shape how the church treats those who are struggling.",
      "The commands about anxiety are invitations rather than scoldings. 'Cast all your anxieties on him, because he cares for you' (1 Peter 5:7). 'Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God' (Philippians 4:6). These assume that anxiety is real and that God is willing to carry it. They are not a demand to stop feeling.",
    ],
    biblicalBasis: [
      { reference: "Psalm 42:5-11", version: "ESV" },
      { reference: "1 Kings 19:4-8", version: "ESV" },
      { reference: "Matthew 11:28-30", version: "ESV" },
      { reference: "2 Corinthians 1:8-9", version: "ESV" },
      { reference: "Philippians 4:6-7", version: "ESV" },
      { reference: "1 Peter 5:7", version: "ESV" },
    ],
    theologicalExplanation: [
      "Christians live in a world still under the effects of the fall, and that includes our bodies. Depression frequently has physical dimensions — sleep, illness, grief, hormones, medication — and treating it as purely spiritual can deepen the suffering it aims to relieve. A believer with a broken leg consults a doctor without embarrassment; the same reasoning applies to a body and mind that are not functioning as they should.[^1]",
      "This does not reduce the spiritual dimension to nothing. The Psalms show a believer preaching to himself — 'Why are you cast down, O my soul? Hope in God' (Psalm 42:5) — which is neither denial nor despair but honest speech addressed to a God who is present.[^2] Spiritual practice and medical care are not competitors, and the church has generally erred by demanding one while forbidding the other.",
    ],
    commonMisunderstandings: [
      "That depression always indicates sin or weak faith — Elijah, Job, David, and Paul all record profound distress without rebuke.",
      "That taking medication shows a lack of trust in God — Scripture nowhere forbids the ordinary means God provides for healing.",
      "That 'do not be anxious' commands the suppression of feeling — the surrounding verses direct the feeling toward God in prayer rather than denying it.",
    ],
    practicalApplication: [
      "If you are struggling, tell someone — a pastor, a doctor, a trusted friend. Isolation is this condition's most effective ally.",
      "Pray the laments. Psalms 42, 88, and 130 give you words when you have none of your own.",
      "If someone confides in you, begin where God began with Elijah: presence, rest, and food before advice.",
      "Seek medical assessment where symptoms are persistent or severe, and treat professional care as a gift rather than a compromise. If you are in immediate danger of harming yourself, contact emergency services or a crisis line without delay.",
    ],
    references: [],
    footnotes: [
      {
        id: 1,
        text: "Michael R. Emlet, Descriptions and Prescriptions: A Biblical Perspective on Psychiatric Diagnoses and Medications (Greensboro, NC: New Growth Press, 2017).",
      },
      {
        id: 2,
        text: "Charles Haddon Spurgeon, \"The Minister's Fainting Fits,\" in Lectures to My Students (London: Passmore & Alabaster, 1875).",
      },
    ],
    bibliography: [
      {
        author: "Emlet, Michael R.",
        title:
          "Descriptions and Prescriptions: A Biblical Perspective on Psychiatric Diagnoses and Medications",
        publication: "Greensboro, NC: New Growth Press, 2017",
      },
      {
        author: "Spurgeon, Charles Haddon",
        title: "Lectures to My Students",
        publication: "London: Passmore & Alabaster, 1875",
      },
      {
        author: "Welch, Edward T.",
        title: "Depression: Looking Up from the Stubborn Darkness",
        publication: "Greensboro, NC: New Growth Press, 2011",
      },
    ],
    relatedSlugs: ["what-is-the-gospel"],
    author: AUTHOR,
  },

  // ─── Mission & Ministry ───────────────────────────────────────────────
  {
    slug: "what-is-the-great-commission",
    question: "What is the Great Commission?",
    department: "mission-ministry",
    category: "Mission",
    topics: ["great-commission", "mission", "discipleship", "baptism", "nations"],
    difficulty: "introductory",
    views: 0,
    publishedAt: DRAFTED,
    shortAnswer:
      "The Great Commission is the risen Christ's charge in Matthew 28:18–20 to make disciples of all nations, baptising them and teaching them to obey everything he commanded. It is grounded in his universal authority and accompanied by his promise to be present to the end of the age.",
    detailedAnswer: [
      "The commission has a structure worth noticing. It opens with a claim — 'All authority in heaven and on earth has been given to me' — and closes with a promise — 'I am with you always, to the end of the age.' The command sits between them. The church's mission is therefore not a burden laid on the willing but an assignment given by a King who holds all authority and who goes with those he sends.",
      "In the Greek, a single imperative governs the sentence: make disciples. 'Going,' 'baptising,' and 'teaching' are participles describing how it is done.[^1] This matters practically. The goal is not attendance, decisions, or events, but disciples — people baptised into the triune name and taught to obey all that Christ commanded. Evangelism that stops at a decision has done part of the work rather than the whole of it.",
      "'All nations' translates panta ta ethne, which refers to peoples rather than modern nation-states. The scope is every ethnic and linguistic group on earth, which is why Revelation pictures the outcome as a multitude 'from every nation, from all tribes and peoples and languages' (Revelation 7:9). This is the same promise God made to Abraham — that in him all the families of the earth would be blessed (Genesis 12:3).",
    ],
    biblicalBasis: [
      { reference: "Matthew 28:18-20", version: "ESV" },
      { reference: "Luke 24:46-48", version: "ESV" },
      { reference: "Acts 1:8", version: "ESV" },
      { reference: "Genesis 12:3", version: "ESV" },
      { reference: "Revelation 7:9", version: "ESV" },
    ],
    theologicalExplanation: [
      "Mission is grounded in the character of God before it is a task for the church. The Father sends the Son, the Father and the Son send the Spirit, and the Spirit sends the church (John 20:21). The church does not initiate mission; it participates in a sending that begins in God himself.[^2]",
      "The command to baptise 'in the name of the Father and of the Son and of the Holy Spirit' is also among the New Testament's clearest trinitarian statements — a single name held by three persons. The mission of the church and the doctrine of the Trinity are joined in the same sentence.",
    ],
    commonMisunderstandings: [
      "That the Great Commission concerns only overseas missionaries — it is addressed to the church, and the nations are now present in most cities.",
      "That 'make disciples' means securing decisions — baptising and teaching obedience belong to the same command.",
      "That the commission is a burden to carry alone — it is bracketed by Christ's authority and his abiding presence.",
    ],
    practicalApplication: [
      "Identify one person you can pray for and speak with honestly about Christ over the coming months.",
      "Support and pray for workers among peoples with little or no access to the gospel.",
      "Measure your church's discipleship by obedience taught and lived, not by attendance alone.",
    ],
    references: [],
    footnotes: [
      {
        id: 1,
        text: "The finite imperative matheteusate governs the participles poreuthentes, baptizontes, and didaskontes; see Daniel B. Wallace, Greek Grammar Beyond the Basics (Grand Rapids: Zondervan, 1996), on attendant circumstance participles.",
      },
      {
        id: 2,
        text: "On the missio Dei, see Christopher J. H. Wright, The Mission of God: Unlocking the Bible's Grand Narrative (Downers Grove, IL: IVP Academic, 2006).",
      },
    ],
    bibliography: [
      {
        author: "Köstenberger, Andreas J., and Peter T. O'Brien",
        title:
          "Salvation to the Ends of the Earth: A Biblical Theology of Mission",
        detail: "New Studies in Biblical Theology 11",
        publication: "Downers Grove, IL: InterVarsity Press, 2001",
      },
      {
        author: "Wallace, Daniel B.",
        title:
          "Greek Grammar Beyond the Basics: An Exegetical Syntax of the New Testament",
        publication: "Grand Rapids: Zondervan, 1996",
      },
      {
        author: "Wright, Christopher J. H.",
        title: "The Mission of God: Unlocking the Bible's Grand Narrative",
        publication: "Downers Grove, IL: IVP Academic, 2006",
      },
    ],
    relatedSlugs: ["what-is-the-gospel"],
    author: AUTHOR,
  },
  {
    slug: "how-do-i-share-the-gospel",
    question: "How do I share the gospel with someone?",
    department: "mission-ministry",
    category: "Evangelism",
    topics: ["evangelism", "gospel", "witness", "conversation", "apologetics"],
    difficulty: "introductory",
    views: 0,
    publishedAt: DRAFTED,
    shortAnswer:
      "Tell them who Jesus is, what he did at the cross and in the resurrection, and what he calls them to — repentance and faith. Say it clearly, in your own words, in an ordinary conversation, and trust God for the result rather than trying to manufacture a decision.",
    detailedAnswer: [
      "Get the content right first. The gospel is news about what God has done, not advice about what we should do. Paul summarises it as 'of first importance': Christ died for our sins according to the Scriptures, was buried, was raised on the third day, and appeared to witnesses (1 Corinthians 15:3–5). A presentation that never mentions sin, the cross, or the resurrection has left out the news.",
      "Then say it plainly. You do not need a script, though a simple framework helps — creation, fall, redemption, and new creation covers the storyline; God, man, Christ, response covers the logic. What matters more is being able to say it in your own words in two minutes without jargon. Words like justification and atonement are precious, but they need explaining to someone who has never heard them.",
      "Expect conversation rather than monologue. Jesus asked questions constantly, and so did Paul, who 'reasoned' in the synagogue and the marketplace (Acts 17:17). Asking what someone believes and why is not a delaying tactic; it is how you learn what they actually need to hear. Most people come to faith through a series of unhurried conversations with someone they trust rather than through a single encounter.[^1]",
    ],
    biblicalBasis: [
      { reference: "1 Corinthians 15:3-5", version: "ESV" },
      { reference: "Romans 1:16", version: "ESV" },
      { reference: "Romans 10:14-15", version: "ESV" },
      { reference: "Acts 17:22-31", version: "ESV" },
      { reference: "1 Peter 3:15", version: "ESV" },
      { reference: "Colossians 4:5-6", version: "ESV" },
    ],
    theologicalExplanation: [
      "Evangelism and conversion are distinct. Our responsibility is faithful, clear, loving proclamation; the new birth is God's work (John 3:8; 1 Corinthians 3:6–7). This distinction guards evangelism against two errors — manipulating people because the outcome seems to depend on our technique, and staying silent because the outcome depends on God.[^2]",
      "The manner matters as much as the message. Peter tells believers to give a reason for their hope 'with gentleness and respect' (1 Peter 3:15), and Paul asks for speech 'seasoned with salt' (Colossians 4:6). An argument won at the cost of the relationship rarely serves the gospel, and a life that contradicts the message undermines it.",
    ],
    commonMisunderstandings: [
      "That evangelism requires special training or gifting — every Christian can describe what Jesus has done.",
      "That success means a decision on the spot — Scripture assigns us faithfulness and reserves the harvest to God.",
      "That sharing faith means winning arguments — persuasion works through trust, patience, and clarity far more often than through debate.",
    ],
    practicalApplication: [
      "Write out the gospel in your own words in under two hundred words, then practise saying it aloud.",
      "Learn to tell your own story briefly: what you were, what changed, and what you are now.",
      "Pray regularly by name for three people who do not know Christ, and watch for ordinary openings rather than engineering dramatic ones.",
    ],
    references: [],
    footnotes: [
      {
        id: 1,
        text: "Rebecca Manley Pippert, Out of the Saltshaker and into the World: Evangelism as a Way of Life, rev. ed. (Downers Grove, IL: InterVarsity Press, 1999).",
      },
      {
        id: 2,
        text: "J. I. Packer, Evangelism and the Sovereignty of God (Downers Grove, IL: InterVarsity Press, 1961).",
      },
    ],
    bibliography: [
      {
        author: "Dever, Mark",
        title: "The Gospel and Personal Evangelism",
        publication: "Wheaton, IL: Crossway, 2007",
      },
      {
        author: "Packer, J. I.",
        title: "Evangelism and the Sovereignty of God",
        publication: "Downers Grove, IL: InterVarsity Press, 1961",
      },
      {
        author: "Pippert, Rebecca Manley",
        title:
          "Out of the Saltshaker and into the World: Evangelism as a Way of Life",
        detail: "Rev. ed.",
        publication: "Downers Grove, IL: InterVarsity Press, 1999",
      },
    ],
    relatedSlugs: ["what-is-the-gospel", "how-do-we-know-god-exists"],
    author: AUTHOR,
  },
];
