export function nextRandomInt(exclusiveMax: number): number {
  return Math.floor(Math.random() * exclusiveMax);
}

export function randomFrom(terms: any[]): any {
  return terms.length === 0 ? null : terms[nextRandomInt(terms.length)];
}
