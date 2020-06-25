function formatTel(tel) {
  const codCountry = tel.slice(0, 2);
  const part1 = tel.slice(0, 5);
  const part2 = tel.slice(5, 9);

  return `(${codCountry}) ${part1}-${part2}`;
}

export { formatTel };
