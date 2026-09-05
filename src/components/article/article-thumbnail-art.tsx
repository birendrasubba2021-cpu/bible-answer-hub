import type { ReactNode } from "react";
import type { ArticleThumbnailThemeId, ThumbnailPalette } from "@/lib/article-thumbnail";

function Pattern({
  id,
  palette,
  children,
}: {
  id: string;
  palette: ThumbnailPalette;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 800 450"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <radialGradient id={`${id}-glow`} cx="82%" cy="18%" r="70%">
          <stop offset="0%" stopColor={palette.glow} stopOpacity="0.38" />
          <stop offset="55%" stopColor={palette.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-wash`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor={palette.base} />
          <stop offset="55%" stopColor={palette.mid} />
          <stop offset="100%" stopColor={palette.edge} />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill={`url(#${id}-wash)`} />
      <rect width="800" height="450" fill={`url(#${id}-glow)`} />
      {children}
    </svg>
  );
}

function HinduismArt({ palette, id }: { palette: ThumbnailPalette; id: string }) {
  return (
    <Pattern id={id} palette={palette}>
      <g
        fill="none"
        stroke={palette.accent}
        strokeWidth="1.2"
        opacity="0.28"
        transform="translate(560 210)"
      >
        {[48, 78, 112, 150].map((r) => (
          <circle key={r} r={r} />
        ))}
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i * Math.PI) / 8;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 30}
              y1={Math.sin(a) * 30}
              x2={Math.cos(a) * 150}
              y2={Math.sin(a) * 150}
            />
          );
        })}
        <polygon
          points="0,-34 10,-10 34,-10 14,6 22,30 0,14 -22,30 -14,6 -34,-10 -10,-10"
          fill={palette.accent}
          fillOpacity="0.12"
          strokeOpacity="0.7"
        />
      </g>
      <g fill={palette.accent} opacity="0.16">
        <rect x="72" y="268" width="14" height="110" />
        <rect x="98" y="248" width="14" height="130" />
        <rect x="124" y="228" width="18" height="150" />
        <rect x="154" y="248" width="14" height="130" />
        <rect x="180" y="268" width="14" height="110" />
        <polygon points="70,268 207,268 138,208" />
      </g>
    </Pattern>
  );
}

function VedantaArt({ palette, id }: { palette: ThumbnailPalette; id: string }) {
  return (
    <Pattern id={id} palette={palette}>
      <g
        fill="none"
        stroke={palette.accent}
        strokeWidth="1.4"
        opacity="0.32"
        transform="translate(575 200)"
      >
        <circle r="86" />
        <circle cx="46" r="70" />
        <circle cx="-46" r="70" />
        <circle r="28" />
        <line x1="-120" y1="0" x2="120" y2="0" />
        <line x1="0" y1="-96" x2="0" y2="96" />
      </g>
      <g stroke={palette.ink} strokeOpacity="0.12" strokeWidth="1">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <line key={n} x1="64" y1={90 + n * 22} x2="280" y2={90 + n * 22} />
        ))}
      </g>
    </Pattern>
  );
}

function WorldReligionsArt({ palette, id }: { palette: ThumbnailPalette; id: string }) {
  return (
    <Pattern id={id} palette={palette}>
      <g
        fill="none"
        stroke={palette.accent}
        strokeWidth="1.5"
        opacity="0.28"
        transform="translate(590 205)"
      >
        <circle r="108" />
        <ellipse rx="108" ry="42" />
        <ellipse rx="42" ry="108" />
        <path d="M-108 0h216M0 -108v216" />
      </g>
      <g
        fill={palette.ink}
        opacity="0.14"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="42"
      >
        <text x="70" y="130">α</text>
        <text x="130" y="200">א</text>
        <text x="86" y="270">Ω</text>
        <text x="200" y="160">ॐ</text>
      </g>
      <g fill="none" stroke={palette.accent} strokeWidth="1.4" opacity="0.22">
        <path d="M80 320c20-18 54-22 78-8 20 12 22 34 8 48" />
        <path d="M158 312v64c-22-8-46-6-70 8" />
      </g>
    </Pattern>
  );
}

function IslamArt({ palette, id }: { palette: ThumbnailPalette; id: string }) {
  return (
    <Pattern id={id} palette={palette}>
      <g
        fill="none"
        stroke={palette.accent}
        strokeWidth="1.3"
        opacity="0.34"
        transform="translate(575 210)"
      >
        {[-90, -30, 30, 90].map((rot) => (
          <g key={rot} transform={`rotate(${rot})`}>
            <rect x="-78" y="-18" width="156" height="36" />
          </g>
        ))}
        <polygon points="0,-96 24,-24 96,0 24,24 0,96 -24,24 -96,0 -24,-24" />
        <circle r="22" />
      </g>
    </Pattern>
  );
}

function BuddhismArt({ palette, id }: { palette: ThumbnailPalette; id: string }) {
  return (
    <Pattern id={id} palette={palette}>
      <g
        fill="none"
        stroke={palette.accent}
        strokeWidth="1.4"
        opacity="0.32"
        transform="translate(580 230)"
      >
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4 - Math.PI / 2;
          const x = Math.cos(a) * 70;
          const y = Math.sin(a) * 70;
          return (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx="28"
              ry="48"
              transform={`rotate(${(i * 45)} ${x} ${y})`}
            />
          );
        })}
        <circle r="18" />
      </g>
    </Pattern>
  );
}

function JudaismArt({ palette, id }: { palette: ThumbnailPalette; id: string }) {
  return (
    <Pattern id={id} palette={palette}>
      <g
        fill="none"
        stroke={palette.accent}
        strokeWidth="1.6"
        opacity="0.34"
        transform="translate(575 200)"
      >
        <polygon points="0,-78 68,42 -68,42" />
        <polygon points="0,78 68,-42 -68,-42" />
      </g>
      <g fill="none" stroke={palette.ink} strokeOpacity="0.14" strokeWidth="1.2">
        <rect x="70" y="92" width="86" height="210" rx="28" />
        <rect x="168" y="92" width="86" height="210" rx="28" />
        {[0, 1, 2, 3].map((n) => (
          <g key={n}>
            <line x1="88" y1={150 + n * 28} x2="140" y2={150 + n * 28} />
            <line x1="186" y1={150 + n * 28} x2="238" y2={150 + n * 28} />
          </g>
        ))}
      </g>
    </Pattern>
  );
}

function CultsArt({ palette, id }: { palette: ThumbnailPalette; id: string }) {
  return (
    <Pattern id={id} palette={palette}>
      <g stroke={palette.accent} strokeOpacity="0.12" strokeWidth="1">
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`v${i}`} x1={80 + i * 70} y1="0" x2={80 + i * 70} y2="450" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={40 + i * 60} x2="800" y2={40 + i * 60} />
        ))}
      </g>
      <g fill="none" stroke={palette.accent} strokeWidth="1.5" opacity="0.28">
        <rect x="520" y="110" width="190" height="190" />
        <line x1="520" y1="110" x2="710" y2="300" />
        <line x1="710" y1="110" x2="520" y2="300" />
      </g>
    </Pattern>
  );
}

function ChristianComparativeArt({
  palette,
  id,
}: {
  palette: ThumbnailPalette;
  id: string;
}) {
  return (
    <Pattern id={id} palette={palette}>
      <g
        fill="none"
        stroke={palette.accent}
        strokeWidth="1.5"
        opacity="0.3"
        transform="translate(575 205)"
      >
        <path d="M-18 -92h36v54h48v32h-48v96h-36v-96h-48v-32h48z" />
        <rect x="-118" y="-108" width="236" height="236" />
      </g>
      <g fill="none" stroke={palette.ink} strokeOpacity="0.12" strokeWidth="1.1">
        <path d="M72 96h210v248H72Z" />
        <path d="M177 96v248" />
        {[0, 1, 2, 3, 4].map((n) => (
          <line key={n} x1="88" y1={130 + n * 36} x2="162" y2={130 + n * 36} />
        ))}
      </g>
    </Pattern>
  );
}

function ChristianityArt({ palette, id }: { palette: ThumbnailPalette; id: string }) {
  return (
    <Pattern id={id} palette={palette}>
      <g
        fill="none"
        stroke={palette.accent}
        strokeWidth="1.6"
        opacity="0.3"
        transform="translate(580 210)"
      >
        <circle r="96" />
        <path d="M-12 -70h24v48h42v24h-42v72h-24v-72h-42v-24h42z" />
      </g>
    </Pattern>
  );
}

function BiblicalStudiesArt({ palette, id }: { palette: ThumbnailPalette; id: string }) {
  return (
    <Pattern id={id} palette={palette}>
      <g fill="none" stroke={palette.accent} strokeWidth="1.4" opacity="0.3">
        <path d="M520 90c28-8 56-8 84 0v250c-28 8-56 8-84 0V90Z" />
        <path d="M604 90c28-8 56-4 84 12v238c-28 10-56 14-84 6V90Z" />
        <path d="M540 130h48M540 158h48M540 186h36" />
      </g>
    </Pattern>
  );
}

function DefaultArt({ palette, id }: { palette: ThumbnailPalette; id: string }) {
  return (
    <Pattern id={id} palette={palette}>
      <g fill="none" stroke={palette.accent} strokeWidth="1.3" opacity="0.24">
        <rect x="520" y="80" width="200" height="280" />
        <line x1="548" y1="128" x2="692" y2="128" />
        <line x1="548" y1="160" x2="668" y2="160" />
        <line x1="548" y1="192" x2="680" y2="192" />
      </g>
    </Pattern>
  );
}

const ART: Record<
  ArticleThumbnailThemeId,
  (props: { palette: ThumbnailPalette; id: string }) => ReactNode
> = {
  hinduism: HinduismArt,
  vedanta: VedantaArt,
  "world-religions": WorldReligionsArt,
  islam: IslamArt,
  buddhism: BuddhismArt,
  judaism: JudaismArt,
  sikhism: HinduismArt,
  cults: CultsArt,
  "christian-comparative": ChristianComparativeArt,
  christianity: ChristianityArt,
  "biblical-studies": BiblicalStudiesArt,
  theology: ChristianityArt,
  "church-history": DefaultArt,
  "biblical-languages": WorldReligionsArt,
  apologetics: CultsArt,
  ethics: VedantaArt,
  ministry: BiblicalStudiesArt,
  default: DefaultArt,
};

export function ArticleThumbnailArt({
  theme,
  palette,
  uid,
}: {
  theme: ArticleThumbnailThemeId;
  palette: ThumbnailPalette;
  uid: string;
}) {
  const Draw = ART[theme] ?? DefaultArt;
  return <>{Draw({ palette, id: uid })}</>;
}
