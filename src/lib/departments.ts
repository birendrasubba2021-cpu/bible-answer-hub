import type { Department } from "./types";

// The nine departments and their categories, taken directly from the
// Bible Answer Hub master specification.
export const departments: Department[] = [
  {
    slug: "biblical-studies",
    name: "Biblical Studies",
    description:
      "The text of Scripture itself — Old and New Testament, biblical theology, backgrounds, and manuscripts.",
    icon: "scroll",
    categories: [
      "Old Testament",
      "New Testament",
      "Biblical Theology",
      "Intertestamental Studies",
      "Biblical Backgrounds",
      "Manuscripts & Textual Studies",
    ],
  },
  {
    slug: "theology",
    name: "Theology",
    description:
      "Systematic theology from the doctrine of Scripture to the doctrine of last things.",
    icon: "book",
    categories: [
      "Bibliology",
      "Theology Proper",
      "Christology",
      "Pneumatology",
      "Angelology",
      "Anthropology",
      "Hamartiology",
      "Soteriology",
      "Ecclesiology",
      "Eschatology",
    ],
  },
  {
    slug: "biblical-languages",
    name: "Biblical Languages",
    description:
      "Greek, Hebrew, and Aramaic — exegesis and word studies for serious study of the text.",
    icon: "languages",
    categories: ["Greek", "Hebrew", "Aramaic", "Exegesis", "Word Studies"],
  },
  {
    slug: "apologetics-philosophy",
    name: "Apologetics & Philosophy",
    description:
      "Defending the faith with reason — worldviews, logic, science and faith, and answering skepticism.",
    icon: "shield",
    categories: [
      "Christian Apologetics",
      "Philosophy of Religion",
      "Logic",
      "Critical Thinking",
      "Worldviews",
      "Science and Faith",
      "Atheism",
      "Skepticism",
    ],
  },
  {
    slug: "religions-cults",
    name: "Religions & Cults",
    description:
      "World religions, new religious movements, cults, and false teachings examined biblically.",
    icon: "globe",
    categories: [
      "Hinduism",
      "Buddhism",
      "Islam",
      "Judaism",
      "Sikhism",
      "Jainism",
      "Folk Religions",
      "New Religious Movements",
      "Comparative Religion",
      "Cults",
      "False Teachings",
    ],
  },
  {
    slug: "church-history",
    name: "Church History",
    description:
      "From the early church and the fathers, through the Reformation, to the modern global church.",
    icon: "landmark",
    categories: [
      "Early Church",
      "Medieval Church",
      "Reformation",
      "Modern Church",
      "Church Fathers",
      "Denominations",
      "Christianity in Asia",
    ],
  },
  {
    slug: "practical-theology",
    name: "Practical Theology",
    description:
      "Christian living, ethics, hermeneutics, homiletics, counseling, worship, and discipleship.",
    icon: "heart",
    categories: [
      "Christian Living",
      "Christian Ethics",
      "Hermeneutics",
      "Homiletics",
      "Pastoral Care & Counseling",
      "Worship",
      "Leadership",
      "Spiritual Formation",
      "Discipleship",
    ],
  },
  {
    slug: "mission-ministry",
    name: "Mission & Ministry",
    description:
      "Mission, evangelism, church planting, and every area of pastoral and church ministry.",
    icon: "send",
    categories: [
      "Mission",
      "Evangelism",
      "Church Planting",
      "Pastoral Ministry",
      "Youth Ministry",
      "Women Ministry",
      "Children Ministry",
      "Church Administration",
    ],
  },
  {
    slug: "contemporary-issues",
    name: "Contemporary Issues",
    description:
      "The hardest questions the church faces today — culture, sexuality, movements, and false prophets.",
    icon: "flame",
    categories: [
      "Church Issues",
      "Marriage & Family",
      "Politics and Christianity",
      "Prosperity Gospel",
      "Healing Movements",
      "Speaking in Tongues",
      "Slain in the Spirit",
      "Laughing Spirit",
      "Head Covering",
      "Social Media & Christianity",
      "False Prophets",
    ],
  },
];

export function getDepartment(slug: string): Department | undefined {
  return departments.find((d) => d.slug === slug);
}
