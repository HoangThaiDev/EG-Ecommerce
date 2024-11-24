const funcSplitPath = (pathQueries) => {
  const optionsFilterObj = {
    option: "",
    rate: "",
    category: "",
    price: {
      min: 0,
      max: 0,
    },
    tag: [],
    page: 1,
  };

  pathQueries.forEach((query) => {
    const [typeQuery, valueQuery] = query.split("=");

    switch (typeQuery) {
      case "page":
        optionsFilterObj.page = +valueQuery;
        break;

      case "category":
        optionsFilterObj.category = valueQuery.replace("%20", " ");
        break;

      case "star":
        optionsFilterObj.rate = query;
        break;

      case "sort":
        optionsFilterObj.option = query;
        break;

      case "tags":
        optionsFilterObj.tag = valueQuery.split(",");
        break;

      case "price_min":
        optionsFilterObj.price.min = +valueQuery;
        break;

      case "price_max":
        optionsFilterObj.price.max = +valueQuery;
        break;

      default:
        break;
    }
  });

  return optionsFilterObj;
};

export default funcSplitPath;
