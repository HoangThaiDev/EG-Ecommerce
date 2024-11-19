// Import Modules
import React, { useState, useContext, useEffect } from "react";
import {
  useNavigate,
  useLocation,
  Link,
  useSearchParams,
} from "react-router-dom";
import { APIContext } from "../../storeContext/APIContext";

// Import Functions
import funcCheckOptionsFilter from "../../helper/products/checkOptionsFilter";
import funcFilterProducts from "../../helper/products/filterProducts";

// Import File CSS
import classes from "./css/sidebarProduct.module.css";
import "../Home/css/ant-design/rate.css";

// Import Components
import { Row, Col } from "antd";
import SelectOptions from "./SelectOptions";
import ItemProduct from "./ItemProduct";
import PaginationPage from "../../UI/PaginationPage";
import CollapseCategory from "./CollapseCategory";
import SliderPrice from "./SliderPrice";
import SelectTags from "./SelectTags";

// Import Icons
import { CgMenuRight } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";

export default function SidebarProduct() {
  // Create + use DUMMY_DATA_CONSTANTS
  const optionsFilter = [
    {
      value: "sort=name-a-z",
      label: (
        <p>
          A <span className="symbol-arrow symbol-arrow-next">&#10141;</span> Z
        </p>
      ),
    },
    {
      value: "sort=name-z-a",
      label: (
        <p>
          Z <span className="symbol-arrow symbol-arrow-next">&#10141;</span> A
        </p>
      ),
    },
    {
      value: "sort=price-asc",
      label: (
        <p>
          Price <span className="symbol-arrow symbol-arrow-up">&#10141;</span>
        </p>
      ),
    },
    {
      value: "sort=price-desc",
      label: (
        <p>
          Price <span className="symbol-arrow symbol-arrow-down">&#10141;</span>
        </p>
      ),
    },
    {
      value: "sort=sale-true",
      label: "Sale Off",
    },
    {
      value: "sort=bestSeller-true",
      label: "Best Seller",
    },
  ];

  const optionsRating = [
    {
      value: "star=5",
      label: `5 Star`,
    },
    {
      value: "star=4",
      label: `4 Star`,
    },
    {
      value: "star=3",
      label: `3 Star`,
    },
    {
      value: "star=2",
      label: `2 Star`,
    },
    {
      value: "star=1",
      label: `1 Star`,
    },
  ];

  // Create + use Hooks
  const { search: pathSearch, state: stateProducts } = useLocation();
  const [searchParams] = useSearchParams();
  const nameValueSearch = searchParams.get("name");
  const categoryValueSearch = searchParams.get("category");
  const navigate = useNavigate();

  const { categories, products: productsAPI } = useContext(APIContext); // Get data products from server

  // Create + use States
  const [productsFromSearch, setProductsFromSearch] = useState([]); // Get data products from input search

  // ---------------- States: Create Data  ------------------
  const [products, setProducts] = useState(productsAPI);
  const [sliceProduct, setSliceProduct] = useState(products.slice(0, 12));

  // ---------------- States: Create Options ------------------------
  const [optionFilter, setOptionFilter] = useState(undefined);
  const [rateFilter, setRateFilter] = useState(undefined);
  const [categoryFilter, setCategoryFilter] = useState({
    id: "",
    title: "",
  });
  const [rangePrice, setRangePrice] = useState(null);
  const [tags, setTags] = useState([]);
  const [isShowSideBarMenu, setIsShowSideBarMenu] = useState(false);

  // Create + use side Effects
  // ----------------- Side Effect: Update New products after search value -----------------------
  useEffect(() => {
    if (stateProducts && stateProducts.searchedProducts.length > 0) {
      // Update data product after search key
      if (pathSearch.includes("?category=")) {
        const valueCategorySearch = pathSearch
          .split("=")[1]
          .replace(/%20/g, " ");

        setCategoryFilter((prevState) => ({
          ...prevState,
          title: valueCategorySearch,
        }));
      }
      setProductsFromSearch(stateProducts.searchedProducts);
      setProducts(stateProducts.searchedProducts);
      setSliceProduct(stateProducts.searchedProducts.slice(0, 12));
    }
  }, [stateProducts]);

  // Create + use Logics
  const filterProductsByOptions = (
    valueOption,
    valueRate,
    valueCategory,
    valuePrice,
    valueTags
  ) => {
    // Get value category from url if domain has
    const optionsFilterObj = {
      option: valueOption,
      rate: valueRate,
      category: valueCategory,
      price: valuePrice,
      tag: valueTags,
    };

    let productsToFilter =
      productsFromSearch.length > 0 ? productsFromSearch : productsAPI;

    // When client dont choose category or change category ==> Call data API original
    if (productsFromSearch.length > 0 && optionsFilterObj.category === "") {
      productsToFilter = productsAPI;
      setProductsFromSearch([]);
    } else {
      productsToFilter = productsAPI;
      setProductsFromSearch([]);
    }

    // Starting filter by options + Get urlQuery follow filter
    const modifiedURL = funcCheckOptionsFilter(pathSearch, optionsFilterObj);
    const modifiedProducts = funcFilterProducts(
      productsToFilter,
      optionsFilterObj
    );

    // Update domain + total products + slice page products
    navigate(modifiedURL);
    setProducts(modifiedProducts);
    setSliceProduct(modifiedProducts.slice(0, 12));
  };

  //  Create + use event handles
  const clearOptionsFilterHandle = () => {
    window.history.replaceState(null, null, "/products");
    sessionStorage.removeItem("search-product");
    window.location.reload();
  };

  const showSideBarMenuHandle = () => {
    setIsShowSideBarMenu(!isShowSideBarMenu);
  };

  const getValueNextPageHandle = (value) => {
    setSliceProduct(value);
    window.scrollTo({
      top: 450,
      left: 0,
      behavior: "smooth",
    });
  };

  const getValueTagsHandle = (valueTags) => {
    setTags(valueTags);
    filterProductsByOptions(
      optionFilter,
      rateFilter,
      categoryFilter.title,
      rangePrice,
      valueTags
    );
  };

  const getValueRangePriceHandle = (valuePrice) => {
    setRangePrice(valuePrice);
    filterProductsByOptions(
      optionFilter,
      rateFilter,
      categoryFilter.title,
      valuePrice,
      tags
    );
  };

  const getValueCategoryHandle = (_id, title) => {
    const newCategory = { _id, title };
    setCategoryFilter(newCategory);
    filterProductsByOptions(
      optionFilter,
      rateFilter,
      newCategory.title,
      rangePrice,
      tags
    );
  };

  const getValueRateFilterHandle = (valueRate) => {
    setRateFilter(valueRate);
    filterProductsByOptions(
      optionFilter,
      valueRate,
      categoryFilter.title,
      rangePrice,
      tags
    );
  };

  const getValueOptionFilterHandle = (valueOption) => {
    setOptionFilter(valueOption);
    filterProductsByOptions(
      valueOption,
      rateFilter,
      categoryFilter.title,
      rangePrice,
      tags
    );
  };

  const addToCartHandle = (productId) => {
    console.log(productId);
  };

  return (
    <>
      {stateProducts?.searchedProducts.length === 0 && (
        <div className={classes["main-products-empty"]}>
          <img
            src="https://res.cloudinary.com/dqrughrs2/image/upload/v1720533009/search_kequmx.png"
            alt="https://res.cloudinary.com/dqrughrs2/image/upload/v1720533009/search_kequmx.png"
            loading="lazy"
          />
          <h1>
            No found products in EG Shop with your key search:
            <span>' {nameValueSearch} '</span>
          </h1>
          <Link to="../products">Find products on page Products</Link>
        </div>
      )}

      {/* Rendering when go to Products Page || search find products have items */}
      {(!stateProducts || stateProducts?.searchedProducts.length > 0) && (
        <div className={classes.sidebarProduct}>
          <div className={classes["products__container"]}>
            <Row className={classes["products__row"]}>
              <Col
                className={`${classes["products__col"]} ${classes["products__col__section"]}`}
              >
                <div className={classes["col__section__header"]}>
                  <p className={classes["section__note"]}>
                    Showing 1 - 12 items
                  </p>

                  {(pathSearch.length > 0 ||
                    optionFilter ||
                    rateFilter ||
                    categoryFilter.title ||
                    rangePrice ||
                    tags.length > 0) && (
                    <div className={classes["section__options"]}>
                      <button
                        type="button"
                        className={classes["section__btn-clear-options"]}
                        onClick={clearOptionsFilterHandle}
                      >
                        Clear <span>X</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* JSX: Rendering Products */}
                <Row className={classes["section__list"]}>
                  {sliceProduct.map((product) => (
                    <Col
                      className={classes["section__col__item"]}
                      key={product._id}
                    >
                      <ItemProduct product={product} />
                    </Col>
                  ))}
                </Row>
              </Col>

              {/* JSX: SideBar */}
              <CgMenuRight
                className={classes["icon-show-menu-sidebar"]}
                onClick={showSideBarMenuHandle}
              />
              <Col
                className={
                  isShowSideBarMenu
                    ? `${classes["products__col"]} ${classes["products__col__sidebar"]} ${classes["products__col__sidebar-active"]}`
                    : `${classes["products__col"]} ${classes["products__col__sidebar"]}`
                }
              >
                <IoMdClose
                  className={classes["icon-hide-menu-sidebar"]}
                  onClick={showSideBarMenuHandle}
                />
                <div className={classes["header__form"]}>
                  <SelectOptions
                    stateProducts={stateProducts}
                    className="form-filter-options"
                    popupClassName="form__popup-filter-options"
                    placeholder="Filter"
                    options={optionsFilter}
                    onSaveValueOption={getValueOptionFilterHandle}
                  />

                  <SelectOptions
                    stateProducts={stateProducts}
                    className="form-filter-rating"
                    popupClassName="form__popup-filter-rating"
                    placeholder="Popularity"
                    options={optionsRating}
                    onSaveValueOption={getValueRateFilterHandle}
                  />

                  <CollapseCategory
                    categoryValueSearch={categoryValueSearch}
                    className="collapse-category"
                    products={products}
                    categories={categories}
                    onSaveValueCategory={getValueCategoryHandle}
                  />
                  <SliderPrice
                    stateProducts={stateProducts}
                    onSaveValueRangePrice={getValueRangePriceHandle}
                  />
                  <SelectTags
                    stateProducts={stateProducts}
                    onSaveValueTags={getValueTagsHandle}
                  />
                </div>
              </Col>
            </Row>

            {/* JSX: Pagination */}
            <PaginationPage
              className="products__pagination"
              pageSize={12}
              products={products}
              onSaveNextPageProduct={getValueNextPageHandle}
            />
          </div>
        </div>
      )}
    </>
  );
}
