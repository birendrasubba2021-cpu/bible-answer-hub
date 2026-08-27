import type { MotifName } from "@/lib/topic-visuals";

/**
 * Line-engraved emblems drawn on a 100×100 field. Stroke-only so they read
 * cleanly at any size and hold their character at low opacity behind text.
 */
const MOTIFS: Record<MotifName, React.ReactNode> = {
  triquetra: (
    <>
      <circle cx="50" cy="36" r="19" />
      <circle cx="34" cy="61" r="19" />
      <circle cx="66" cy="61" r="19" />
      <circle cx="50" cy="52" r="34" />
    </>
  ),
  dove: (
    <>
      <circle cx="63" cy="33" r="5" />
      <path d="M59 37C46 43 33 53 24 68c17-2 31-10 40-22" />
      <path d="M61 39c5 9 9 19 8 31-10-6-16-16-17-26" />
      <path d="M24 68l-10 7 5-13" />
    </>
  ),
  flame: (
    <>
      <path d="M50 16c8 15 19 23 19 38a19 19 0 0 1-38 0c0-11 9-17 13-28 2 9 8 13 10 19 4-7 2-18-4-29Z" />
      <path d="M50 78a10 10 0 0 1-10-10c0-6 5-9 7-15 3 6 13 9 13 15a10 10 0 0 1-10 10Z" />
    </>
  ),
  crown: (
    <>
      <path d="M22 66 18 32l16 14 16-22 16 22 16-14-4 34Z" />
      <path d="M22 74h56" />
      <circle cx="50" cy="24" r="3" />
    </>
  ),
  cross: (
    <>
      <path d="M43 18h14v20h20v14H57v34H43V52H23V38h20Z" />
    </>
  ),
  scroll: (
    <>
      <path d="M34 32h40v36H34Z" />
      <path d="M34 32a6 6 0 0 1 0-9h40a6 6 0 0 1 0 9" />
      <path d="M34 68a6 6 0 0 0 0 9h40a6 6 0 0 0 0-9" />
      <path d="M44 43h20M44 52h20M44 61h12" />
    </>
  ),
  tablets: (
    <>
      <path d="M26 76V42a11 11 0 0 1 22 0v34Z" />
      <path d="M52 76V42a11 11 0 0 1 22 0v34Z" />
      <path d="M32 52h10M32 60h10M58 52h10M58 60h10" />
    </>
  ),
  rings: (
    <>
      <circle cx="40" cy="53" r="18" />
      <circle cx="62" cy="53" r="18" />
    </>
  ),
  scales: (
    <>
      <path d="M50 22v52M36 76h28M22 36h56" />
      <circle cx="50" cy="20" r="3" />
      <path d="M22 36v6M78 36v6" />
      <path d="M10 42q12 17 24 0M66 42q12 17 24 0" />
    </>
  ),
  shield: (
    <>
      <path d="M50 18l28 10v22c0 17-14 27-28 34-14-7-28-17-28-34V28Z" />
      <path d="M50 34v34" />
      <path d="M36 46h28" />
    </>
  ),
  globe: (
    <>
      <circle cx="50" cy="50" r="30" />
      <path d="M50 20c-16 12-16 48 0 60M50 20c16 12 16 48 0 60" />
      <path d="M20 50h60M27 35h46M27 65h46" />
    </>
  ),
  chalice: (
    <>
      <path d="M32 26h36c0 19-8 28-18 30-10-2-18-11-18-30Z" />
      <path d="M50 56v18M35 78h30" />
    </>
  ),
  lamp: (
    <>
      <path d="M30 58c0-11 9-18 20-18s20 7 20 18c0 7-9 11-20 11s-20-4-20-11Z" />
      <path d="M70 53l14-4" />
      <path d="M84 49c5-5 3-12-2-15" />
      <path d="M40 69v7h20v-7" />
    </>
  ),
  temple: (
    <>
      <path d="M16 38 50 18l34 20Z" />
      <path d="M24 40v32M38 40v32M50 40v32M62 40v32M76 40v32" />
      <path d="M14 78h72M18 40h64" />
    </>
  ),
  coin: (
    <>
      <ellipse cx="50" cy="38" rx="22" ry="9" />
      <path d="M28 38v10c0 5 10 9 22 9s22-4 22-9V38" />
      <path d="M28 52v10c0 5 10 9 22 9s22-4 22-9V52" />
    </>
  ),
  compass: (
    <>
      <circle cx="50" cy="50" r="29" />
      <path d="M50 21l8 29-8 29-8-29Z" />
      <path d="M21 50l29-8 29 8-29 8Z" />
    </>
  ),
  star: (
    <>
      <path d="M50 14l7 29 29 7-29 7-7 29-7-29-29-7 29-7Z" />
    </>
  ),
  water: (
    <>
      <path d="M14 42c8-10 16-10 24 0s16 10 24 0 16-10 24 0" />
      <path d="M14 56c8-10 16-10 24 0s16 10 24 0 16-10 24 0" />
      <path d="M14 70c8-10 16-10 24 0s16 10 24 0 16-10 24 0" />
    </>
  ),
  sword: (
    <>
      <path d="M50 14l7 14v34H43V28Z" />
      <path d="M32 64h36M50 64v22M42 82h16" />
    </>
  ),
  heart: (
    <>
      <path d="M50 80C30 66 20 54 20 42a14 14 0 0 1 30-6 14 14 0 0 1 30 6c0 12-10 24-30 38Z" />
    </>
  ),
  book: (
    <>
      <path d="M50 34c-8-6-20-8-30-6v42c10-2 22 0 30 6 8-6 20-8 30-6V28c-10-2-22 0-30 6Z" />
      <path d="M50 34v42" />
    </>
  ),
};

export function TopicMotif({
  name,
  className,
  strokeWidth = 2.2,
}: {
  name: MotifName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {MOTIFS[name] ?? MOTIFS.book}
    </svg>
  );
}
