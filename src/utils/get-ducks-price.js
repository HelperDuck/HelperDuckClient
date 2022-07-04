const getDucksPrice = numDucks =>
  (Math.round(numDucks * 1.5 * 100) / 100).toFixed(2);

export default getDucksPrice;
