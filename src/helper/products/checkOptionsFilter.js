const checkOptionsFilter = (pathSearch, optionFilterObj) => {
  const { option, rate, category, price, tag } = optionFilterObj;
  let urlQuery = pathSearch.length > 0 ? pathSearch : "";
  const isCheckURLHasQuery = urlQuery.includes("?");

  //   Function check options filter
  urlQuery = getURLQueryByOption(urlQuery, option, isCheckURLHasQuery);
  urlQuery = getURLQueryByRate(urlQuery, rate, isCheckURLHasQuery);
  urlQuery = getURLQueryByCategory(urlQuery, category, isCheckURLHasQuery);
  urlQuery = getURLQueryByPrice(urlQuery, price, isCheckURLHasQuery);
  urlQuery = getURLQueryByTags(urlQuery, tag, isCheckURLHasQuery);

  return urlQuery;
};

// Create + use child function to check value
const getURLQueryByOption = (urlQuery, option, isCheckURLHasQuery) => {
  // Checkoption has value
  if (option) {
    // Check URL already exists query
    if (isCheckURLHasQuery) {
      //   Check query exist same type or not
      const optionRegex = /([?&]sort)/;
      urlQuery = optionRegex.test(urlQuery)
        ? urlQuery.replace(/sort=[^&]*/, option)
        : urlQuery + "&" + option;
    } else {
      urlQuery = urlQuery + "?" + option;
    }
  } else {
    // Check if there are 2 or more queries
    const urlQueriesExist = urlQuery.split("&");
    if (urlQueriesExist.length > 1) {
      // Check postion this query is where
      urlQuery = urlQuery.includes("?sort=")
        ? urlQuery.replace(/sort=[^&]*&/, "")
        : urlQuery.replace(/&sort=[^&]*/, "");
    } else {
      urlQuery = urlQuery.replace(/[?&]sort=[^&]*/, "");
    }
  }
  return urlQuery;
};

const getURLQueryByRate = (urlQuery, rate, isCheckURLHasQuery) => {
  // Checkoption has value
  if (rate) {
    // Check URL already exists query
    if (isCheckURLHasQuery) {
      //   Check query exist same type or not
      const optionRegex = /([?&]star)/;
      urlQuery = optionRegex.test(urlQuery)
        ? urlQuery.replace(/star=[^&]*/, rate)
        : urlQuery + "&" + rate;
    } else {
      urlQuery = urlQuery + "?" + rate;
    }
  } else {
    // Check if there are 2 or more queries
    const urlQueriesExist = urlQuery.split("&");
    if (urlQueriesExist.length > 1) {
      // Check postion this query is where
      urlQuery = urlQuery.includes("?star=")
        ? urlQuery.replace(/star=[^&]*&/, "")
        : urlQuery.replace(/&star=[^&]*/, "");
    } else {
      urlQuery = urlQuery.replace(/[?&]star=[^&]*/, "");
    }
  }
  return urlQuery;
};

const getURLQueryByCategory = (urlQuery, name_category, isCheckURLHasQuery) => {
  // Checkoption has value
  if (name_category.length > 0) {
    // Check URL already exists query
    if (isCheckURLHasQuery) {
      //   Check query exist same type or not
      const optionRegex = /([?&]category)/;
      urlQuery = optionRegex.test(urlQuery)
        ? urlQuery.replace(/category=[^&]*/, `category=${name_category}`)
        : urlQuery + "&category=" + name_category;
    } else {
      urlQuery = urlQuery + "?category=" + name_category;
    }
  } else {
    // Check if there are 2 or more queries
    const urlQueriesExist = urlQuery.split("&");
    if (urlQueriesExist.length > 1) {
      // Check postion this query is where
      urlQuery = urlQuery.includes("?category=")
        ? urlQuery.replace(/category=[^&]*&/, "")
        : urlQuery.replace(/&category=[^&]*/, "");
    } else {
      urlQuery = urlQuery.replace(/[?&]category=[^&]*/, "");
    }
  }

  return urlQuery;
};

const getURLQueryByPrice = (urlQuery, price, isCheckURLHasQuery) => {
  // // Checkoption has value
  if (price) {
    if (price.min !== price.max) {
      // Check URL already exists query
      if (isCheckURLHasQuery) {
        //   Check query exist same type or not
        const optionRegex = /([?&]price)/;
        if (optionRegex.test(urlQuery)) {
          urlQuery = urlQuery.replace(
            /price_min=[^&]*/,
            `price_min=${price.min}`
          );
          urlQuery = urlQuery.replace(
            /price_max=[^&]*/,
            `price_max=${price.max}`
          );
        } else {
          urlQuery =
            urlQuery + "&price_min=" + price.min + "&price_max=" + price.max;
        }
      } else {
        urlQuery =
          urlQuery + "?price_min=" + price.min + "&price_max=" + price.max;
      }
    } else if (price.min === price.max) {
      alert("Please! Check your range price min - max!");
      return false;
    }
  }

  return urlQuery;
};

const getURLQueryByTags = (urlQuery, tags, isCheckURLHasQuery) => {
  if (tags.length > 0) {
    // Check URL already exists query
    if (isCheckURLHasQuery) {
      // Check query exist same type or not
      const optionRegex = /([?&]tags)/;
      urlQuery = optionRegex.test(urlQuery)
        ? urlQuery.replace(
            /tags=[^&]*/,
            `tags=${tags.join(",").replace(/\s/g, "-")}`
          )
        : (urlQuery = urlQuery + "&tags=" + tags.join(",").replace(/\s/g, "-"));
    } else {
      urlQuery = urlQuery + "?tags=" + tags.join(",").replace(/\s/g, "-");
    }
  } else {
    // Check if there are 2 or more queries
    const urlQueriesExist = urlQuery.split("&");
    if (urlQueriesExist.length > 1) {
      // Check postion this query is where
      urlQuery = urlQuery.includes("?tags=")
        ? urlQuery.replace(/tags=[^&]*&/, "")
        : urlQuery.replace(/&tags=[^&]*/, "");
    } else {
      urlQuery = urlQuery.replace(/[?&]tags=[^&]*/, "");
    }
  }
  return urlQuery;
};

export default checkOptionsFilter;
