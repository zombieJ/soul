export function framePTG(start: number, end: number, current: number) {
  if (start === end) return 0;

  return (current - start) / (end - start);
}

export function transNumber(start: number = 0, end: number = 0, percentage: number) {
  return start + (end - start) * percentage;
}