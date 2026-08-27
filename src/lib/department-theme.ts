/** Visual identity per department — used for branded thumbnails and accents. */
export const DEPARTMENT_THEMES: Record<
  string,
  { from: string; via: string; to: string; accent: string }
> = {
  "biblical-studies": {
    from: "#0d1a2b",
    via: "#1e3a5f",
    to: "#2f4a6e",
    accent: "#d4b04a",
  },
  theology: {
    from: "#121820",
    via: "#1a2744",
    to: "#243656",
    accent: "#c9a227",
  },
  "biblical-languages": {
    from: "#1a1f2e",
    via: "#2a3347",
    to: "#3d4a63",
    accent: "#b8922a",
  },
  "apologetics-philosophy": {
    from: "#0f2027",
    via: "#153544",
    to: "#1e4558",
    accent: "#d4b04a",
  },
  "religions-cults": {
    from: "#1a1420",
    via: "#2d1f35",
    to: "#3d2a48",
    accent: "#c9a227",
  },
  "church-history": {
    from: "#1c1814",
    via: "#2e2419",
    to: "#3d3228",
    accent: "#b8922a",
  },
  "practical-theology": {
    from: "#0f1f18",
    via: "#1a3328",
    to: "#234438",
    accent: "#d4b04a",
  },
  "mission-ministry": {
    from: "#0d1528",
    via: "#152040",
    to: "#1e2d55",
    accent: "#c9a227",
  },
  "contemporary-issues": {
    from: "#141228",
    via: "#1f1a3d",
    to: "#2a2450",
    accent: "#d4b04a",
  },
};

export const DEFAULT_THEME = DEPARTMENT_THEMES.theology;

export function getDepartmentTheme(slug: string) {
  return DEPARTMENT_THEMES[slug] ?? DEFAULT_THEME;
}
