const calculatePrice = (price, percent_discount, quantity) => {
  const parsePrice = parseFloat(price);

  //   Check product have percent discount
  const discountedPrice =
    percent_discount > 0
      ? parsePrice - (parsePrice * percent_discount) / 100
      : parsePrice;

  return (discountedPrice * quantity).toFixed(2);
};

export default calculatePrice;
