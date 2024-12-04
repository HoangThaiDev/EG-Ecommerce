export default function checkCart(items) {
  const result = items.every(
    (item) => 1 <= item.quantity_item && item.quantity_item <= 20
  );
  if (!result) {
    return alert(
      "Each product has a minimum quantity of 1, a maximum quantity of 20!"
    );
  }

  const modifiedSelectItems = items.map((item) => {
    return {
      _id: item._id,
      itemId: item.itemId._id,
      quantity_item: item.quantity_item,
      totalPrice: item.totalPrice,
    };
  });

  const sumTotalPriceCart = modifiedSelectItems
    .reduce((acc, cur) => parseFloat(acc) + parseFloat(cur.totalPrice), 0)
    .toFixed(2);

  const newCart = {
    items: modifiedSelectItems,
    totalPriceCart: sumTotalPriceCart,
  };

  return newCart;
}
