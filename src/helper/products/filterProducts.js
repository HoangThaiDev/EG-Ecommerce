const filterProducts = (products, optionsFilterObj) => {
  const { option, rate, category, price, tag } = optionsFilterObj;
  let newProducts = [...products];

  //   Function modify product from options
  newProducts = modifiedProductsByOption(newProducts, option);
  newProducts = modifiedProductsByRate(newProducts, rate);
  newProducts = modifiedProductsByCategory(newProducts, category);
  newProducts = modifiedProductsByPrice(newProducts, price);
  newProducts = modifiedProductsByTags(newProducts, tag);

  return newProducts;
};

// Create + use child function to check value
const modifiedProductsByOption = (newProducts, option) => {
  let newSortProducts = [...newProducts];

  // Check option have value is not
  if (option) {
    // Detach query filter to get: type + value
    const [func, typeFunc] = option.split("=");
    const regex = /^(\w+)-(.+)$/;
    const match = typeFunc.match(regex); // Use method match with regex to get obj from typeFunc
    const optionObj = { type: match[1], value: match[2] };

    // Check type then use value to filter products
    switch (optionObj.type) {
      //----------------------------Sort: Name -------------------------------------------
      case "name":
        if (optionObj.value === "a-z") {
          newSortProducts = newSortProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        } else {
          newSortProducts = newSortProducts.sort((a, b) =>
            b.name.localeCompare(a.name)
          );
        }
        break;
      //----------------------------Sort: Price -------------------------------------------
      case "price":
        if (optionObj.value === "asc") {
          newSortProducts = newSortProducts.sort((a, b) => a.price - b.price);
        } else {
          newSortProducts = newSortProducts.sort((a, b) => b.price - a.price);
        }
        break;
      //----------------------------Sort: Sale -------------------------------------------
      case "sale":
        newSortProducts = newSortProducts.filter(
          (product) => product.percent_discount > 0
        );

      //----------------------------Sort: Best-Seller -------------------------------------------
      case "bestSeller":
        newSortProducts = newSortProducts.filter(
          (product) => product.best_seller === true
        );
        break;
      //----------------------------Sort: Default -------------------------------------------
      default:
        return newSortProducts;
    }
  } else {
    newSortProducts = newProducts;
  }
  return newSortProducts;
};

const modifiedProductsByRate = (newProducts, rate) => {
  let newRateProducts = [...newProducts];

  // Check option have value is not
  if (rate) {
    // Detach query filter to get: type + value
    const [type, value] = rate.split("=");

    newRateProducts = newRateProducts.filter(
      (product) => product.rating === +value
    );
  } else {
    newRateProducts = newProducts;
  }
  return newRateProducts;
};

const modifiedProductsByCategory = (newProducts, categoryTitle) => {
  let newCategoryProducts = [...newProducts];

  // Check option have value is not
  if (categoryTitle.length > 0) {
    newCategoryProducts = newCategoryProducts.filter(
      (product) => product.categoryId.title === categoryTitle
    );
  } else {
    newCategoryProducts = newProducts;
  }
  return newCategoryProducts;
};

const modifiedProductsByPrice = (newProducts, price) => {
  let newRangePriceProducts = [...newProducts];

  // Check option have value is not
  if (price) {
    if (price.min !== price.max) {
      newRangePriceProducts = newRangePriceProducts.filter((product) => {
        const newPrice =
          product.percent_discount > 0
            ? product.price - (product.price * product.percent_discount) / 100
            : product.price;
        if (price.min <= newPrice && newPrice <= price.max) {
          return product;
        }
      });
    }
  }

  return newRangePriceProducts;
};

const modifiedProductsByTags = (newProducts, tags) => {
  let newTagsProducts = [...newProducts];

  // Check option have value is not
  if (tags.length > 0) {
    console.log(tags);
    newTagsProducts = newTagsProducts.filter((product) =>
      product.tags.some((tag) => tags.includes(tag))
    );
  } else {
    newTagsProducts = newProducts;
  }
  return newTagsProducts;
};

export default filterProducts;
