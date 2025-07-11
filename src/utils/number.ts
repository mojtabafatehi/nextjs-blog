export default function toPersianDigits(input: string | number): string {
  return input.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
}
