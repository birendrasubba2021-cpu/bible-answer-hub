/**
 * Applies the scholarly citation apparatus to an existing published answer.
 *
 * Run with: npx tsx prisma/apply-citations.ts
 *
 * Citation policy used here:
 *   - Creeds and confessions are cited by article/section.
 *   - Classical and patristic works are cited by their own internal divisions
 *     (book.chapter, oration.section), which are stable across every edition
 *     and translation.
 *   - Modern monographs carry exact pagination, which is edition-specific and
 *     must be taken from the copy actually consulted.
 */
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const trinity = {
  slug: "what-is-the-trinity",
  detailedAnswer: [
    "The word 'Trinity' is not found in the Bible, but the doctrine it describes is taught throughout Scripture. It can be summarized in three statements that must all be held together: (1) there is only one God; (2) the Father, the Son, and the Holy Spirit are each fully God; and (3) the Father, Son, and Spirit are distinct persons, not three names for one person.[^1]",
    "Christianity is strictly monotheistic. The Trinity does not teach three gods (tritheism), nor that one God simply appears in three modes at different times (modalism). Rather, the one divine being exists eternally as three co-equal, co-eternal persons who are distinct in their relationships yet united in essence, will, and glory.[^2]",
    "This is a mystery that exceeds full human comprehension, but it is not a contradiction. We are not saying God is one and three in the same way. God is one in being (essence) and three in persons.[^3]",
  ],
  theologicalExplanation: [
    "The doctrine was clarified by the early church at the Councils of Nicaea (325) and Constantinople (381) in response to errors such as Arianism, which denied the full deity of the Son. The Nicene Creed confesses the Son as 'true God from true God, begotten not made, of one substance (homoousios) with the Father.'[^4]",
    "Each person is distinguished by relations of origin: the Father is unbegotten, the Son is eternally begotten of the Father, and the Spirit eternally proceeds.[^5] These distinctions never divide the one divine essence, for the Son is in the Father and the Father in the Son.[^6]",
  ],
  footnotes: [
    {
      id: 1,
      text: "The Athanasian Creed (Quicunque Vult), arts. 3–6: \"…neither confounding the Persons, nor dividing the Substance.\"",
    },
    {
      id: 2,
      text: "John Calvin, Institutes of the Christian Religion 1.13.2–5, on the use of the term \"person\" (hypostasis) and the rejection of both Sabellian and Arian error.",
    },
    {
      id: 3,
      text: "Westminster Confession of Faith 2.3: \"In the unity of the Godhead there be three Persons, of one substance, power, and eternity.\"",
    },
    {
      id: 4,
      text: "The Niceno-Constantinopolitan Creed (381), art. 2.",
    },
    {
      id: 5,
      text: "Augustine, De Trinitate 5.5–5.6, on predication according to relation rather than substance.",
    },
    {
      id: 6,
      text: "Athanasius, Orations Against the Arians 3.3–3.4, expounding John 10:30 and 14:10.",
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
      author: "Augustine",
      title: "The Trinity (De Trinitate)",
      detail:
        "Translated by Edmund Hill. The Works of Saint Augustine I/5",
      publication: "Hyde Park, NY: New City Press, 1991",
    },
    {
      author: "Bavinck, Herman",
      title: "Reformed Dogmatics. Vol. 2, God and Creation",
      detail: "Edited by John Bolt. Translated by John Vriend",
      publication: "Grand Rapids: Baker Academic, 2004",
    },
    {
      author: "Calvin, John",
      title: "Institutes of the Christian Religion",
      detail:
        "Edited by John T. McNeill. Translated by Ford Lewis Battles. Library of Christian Classics 20–21",
      publication: "Philadelphia: Westminster Press, 1960",
    },
    {
      author: "Grudem, Wayne",
      title: "Systematic Theology: An Introduction to Biblical Doctrine",
      detail: "2nd ed. Chapter 14, \"God in Three Persons: The Trinity\"",
      publication: "Grand Rapids: Zondervan Academic, 2020",
    },
    {
      author: "Letham, Robert",
      title:
        "The Holy Trinity: In Scripture, History, Theology, and Worship",
      publication: "Phillipsburg, NJ: P&R Publishing, 2004",
    },
    {
      author: "Sanders, Fred",
      title:
        "The Deep Things of God: How the Trinity Changes Everything",
      publication: "Wheaton, IL: Crossway, 2010",
    },
  ],
};

async function main() {
  const updated = await prisma.question.update({
    where: { slug: trinity.slug },
    data: {
      detailedAnswer: trinity.detailedAnswer,
      theologicalExplanation: trinity.theologicalExplanation,
      footnotes: trinity.footnotes as unknown as Prisma.InputJsonValue,
      bibliography: trinity.bibliography as unknown as Prisma.InputJsonValue,
    },
    select: { slug: true },
  });
  console.log(`Applied citation apparatus to: ${updated.slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
