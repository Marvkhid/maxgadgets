export type Series = "Pro Max" | "Pro" | "Plus" | "Standard";
export type Condition = "New" | "UK-used";

export interface PhoneModel {
  id: string;
  name: string;
  generation: number;
  year: number;
  series: Series;
  color: string;
  lenses: 2 | 3;
  /** Fill these in once the owner confirms them. The UI only shows what exists. */
  condition?: Condition;
  storage?: string;
}

interface Generation {
  generation: number;
  year: number;
  series: Series[];
}

const generations: Generation[] = [
  { generation: 18, year: 2026, series: ["Pro Max", "Pro"] },
  { generation: 17, year: 2025, series: ["Pro Max", "Pro", "Standard"] },
  { generation: 16, year: 2024, series: ["Pro Max", "Pro", "Plus", "Standard"] },
  { generation: 15, year: 2023, series: ["Pro Max", "Pro", "Plus", "Standard"] },
  { generation: 14, year: 2022, series: ["Pro Max", "Pro", "Plus", "Standard"] },
  { generation: 13, year: 2021, series: ["Pro Max", "Pro", "Standard"] },
  { generation: 12, year: 2020, series: ["Pro Max", "Pro", "Standard"] },
];

const palette = ["#2d3a55", "#5b1f2b", "#8a8f98", "#2b2b2e", "#6b645d", "#4a4f5a", "#587089", "#2f4a4f"];

function buildModels(): PhoneModel[] {
  const list: PhoneModel[] = [];
  let n = 0;
  for (const g of generations) {
    for (const s of g.series) {
      const name = s === "Standard" ? `iPhone ${g.generation}` : `iPhone ${g.generation} ${s}`;
      list.push({
        id: name.toLowerCase().replace(/\s+/g, "-"),
        name,
        generation: g.generation,
        year: g.year,
        series: s,
        color: palette[n % palette.length] ?? "#2b2b2e",
        lenses: s === "Pro" || s === "Pro Max" ? 3 : 2,
      });
      n += 1;
    }
  }
  return list;
}

export const models: PhoneModel[] = buildModels();
export const generationList: number[] = generations.map((g) => g.generation);
export const seriesList: Series[] = ["Pro Max", "Pro", "Plus", "Standard"];

const homeNames = [
  "iPhone 18 Pro Max",
  "iPhone 18 Pro",
  "iPhone 17 Pro Max",
  "iPhone 17 Pro",
  "iPhone 16 Pro Max",
  "iPhone 16 Pro",
  "iPhone 15 Pro Max",
  "iPhone 14 Pro Max",
  "iPhone 13 Pro Max",
  "iPhone 12 Pro Max",
];

export const homeRange: PhoneModel[] = models.filter((m) => homeNames.includes(m.name));
