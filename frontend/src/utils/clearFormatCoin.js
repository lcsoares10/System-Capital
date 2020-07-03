export default function (value) {
  console.log(value);
  let coin = value.replace('.', '');
  coin = coin.replace(',', '.');
  return coin.replace(/[R]|[$]|[real]/g, '');
}
