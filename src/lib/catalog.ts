export const models = ["iPhone 18 Pro Max", "iPhone 18 Pro", "iPhone 17 Pro Max", "iPhone 17 Pro"] as const;
export const colors = [
  { name: "Black", swatch: "bg-case-black" },
  { name: "Blue", swatch: "bg-case-blue" },
] as const;

export function nextBannerModel(current: string, random = Math.random): string {
  const alternatives = models.filter((model) => model !== current);
  return alternatives[Math.min(alternatives.length - 1, Math.max(0, Math.floor(random() * alternatives.length)))] ?? models[0];
}