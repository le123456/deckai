export function normalizeCardName(name: string | null | undefined): string {
  if (!name) return "";

  let s = name.toLowerCase().trim();

  // remove pontos: "p.e.k.k.a" -> "pekka"
  s = s.replace(/\./g, "");

  // remove caracteres especiais e troca hifen por underline
  s = s.replace(/-/g, "_");

  // troca espaços por underline
  s = s.replace(/\s+/g, "_");

  // remove caracteres inválidos
  s = s.replace(/[^a-z0-9_]/g, "");

  // remove variações de evoluções e skins
  // ex: archers_ev1 → archers
  s = s.replace(/_ev[0-9]+$/, "");
  s = s.replace(/_evo$/, "");
  s = s.replace(/_evolution$/, "");
  s = s.replace(/_christmas$/, "");
  s = s.replace(/_super$/, "");

  // aliases importantes
  const aliases: Record<string, string> = {
    mini_pekka: "mini_pekka",
    pekka: "pekka",
    hog_rider: "hog_rider",
    royal_ghost: "royal_ghost",
    spear_goblins: "spear_goblins",
    skeleton_army: "skeleton_army",
    giant_snowball: "giant_snowball",
    elixir_golem: "elixir_golem",
  };

  return aliases[s] ?? s;
}

export function toKebabCase(snake: string): string {
  return snake.replace(/_/g, "-");
}
