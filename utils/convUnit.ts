import convert from 'convert-units';

export default function convUnit(size: number) {
  const { val, unit } = convert(size).from('B').toBest();
  const res = `${parseFloat(val.toFixed(val < 10 ? 2 : 1))}${unit}`;
  return res;
}
