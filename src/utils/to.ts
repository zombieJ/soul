export function toNum(val: any) {
  const target = Number(val);
  if (String(val) === String(target)) return target;
  return val;
}