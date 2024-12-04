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
import funcSplitPath from "../../helper/products/splitPathQueries";

// Import File CSS
import classes from "./css/sidebarProduct.module.css";
import "../Home/css/ant-design/rate.css";

// Import Components
import { Row, Col } from "antd";
import SelectOptions from "./SelectOptions";
import ItemProduct from "./ItemProduct";
import PaginationCustom from "../../UI/PaginationCustom";
import CollapseCategory from "./CollapseCategory";
import SliderPrice from "./SliderPrice";
import SelectTags from "./SelectTags";

// Import Icons
import { CgMenuRight } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";

export default function SidebarProduct({ categories, products }) {
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
  const { search: pathSearch } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryValueSearch = searchParams.get("category");

  // Create + use States
  // ---------------- States: Create Options ------------------------
  const [optionFilter, setOptionFilter] = useState(undefined);
  const [rateFilter, setRateFilter] = useState(undefined);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [rangePrice, setRangePrice] = useState(null);
  const [tags, setTags] = useState([]);
  const [isShowSideBarMenu, setIsShowSideBarMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Create + use side Effects
  // ----------------- Side Effect: Split path to get query and update values current of options  -----------------------
  useEffect(() => {
    if (pathSearch.length > 0) {
      const pathQueries = pathSearch.replace("?", "").split("&");
      const optionsFilterObj = funcSplitPath(pathQueries);

      // Update value states by query url
      setOptionFilter(optionsFilterObj.option);
      setRateFilter(optionsFilterObj.rate);
      setCategoryFilter(optionsFilterObj.category);
      setTags(optionsFilterObj.tag);
      setCurrentPage(optionsFilterObj.page);

      // Check client was choosen range price
      if (optionsFilterObj.price.min !== optionsFilterObj.price.max) {
        setRangePrice({
          min: optionsFilterObj.price.min,
          max: optionsFilterObj.price.max,
        });
      }
    }
  }, [pathSearch]);

  // Create + use Logics
  const filterProductsByOptions = (
    valueOption,
    valueRate,
    valueCategory,
    valuePrice,
    valueTags,
    valuePage
  ) => {
    // Get value category from url if domain has
    const optionsFilterObj = {
      option: valueOption,
      rate: valueRate,
      category: valueCategory,
      price: valuePrice,
      tag: valueTags,
      page: valuePage,
    };

    // Starting filter by options + Get urlQuery follow filter
    const modifiedURL = funcCheckOptionsFilter(pathSearch, optionsFilterObj);

    navigate(modifiedURL);
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

  const getValueNextPageHandle = (valuePage) => {
    setCurrentPage(valuePage);
    filterProductsByOptions(
      optionFilter,
      rateFilter,
      categoryFilter.title,
      rangePrice,
      tags,
      valuePage
    );

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
      categoryFilter,
      rangePrice,
      valueTags,
      currentPage
    );
  };

  const getValueRangePriceHandle = (valuePrice) => {
    setRangePrice(valuePrice);
    filterProductsByOptions(
      optionFilter,
      rateFilter,
      categoryFilter,
      valuePrice,
      tags,
      currentPage
    );
  };

  const getValueCategoryHandle = (valueCategory) => {
    setCategoryFilter(valueCategory);
    filterProductsByOptions(
      optionFilter,
      rateFilter,
      valueCategory,
      rangePrice,
      tags,
      currentPage
    );
  };

  const getValueRateFilterHandle = (valueRate) => {
    setRateFilter(valueRate);
    filterProductsByOptions(
      optionFilter,
      valueRate,
      categoryFilter,
      rangePrice,
      tags,
      currentPage
    );
  };

  const getValueOptionFilterHandle = (valueOption) => {
    setOptionFilter(valueOption);
    filterProductsByOptions(
      valueOption,
      rateFilter,
      categoryFilter,
      rangePrice,
      tags,
      currentPage
    );
  };

  return (
    <>
      <div className={classes.sidebarProduct}>
        <div className={classes["products__container"]}>
          <Row className={classes["products__row"]}>
            <Col
              className={`${classes["products__col"]} ${classes["products__col__section"]}`}
            >
              <div className={classes["col__section__header"]}>
                <p className={classes["section__note"]}>Showing 1 - 12 items</p>

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

              {/* JSX: Show message if no found products */}
              {products.value.length === 0 && pathSearch.length > 0 && (
                <div className={classes["main-products-empty"]}>
                  <img
                    src="https://res.cloudinary.com/dqrughrs2/image/upload/v1720533009/search_kequmx.png"
                    alt="https://res.cloudinary.com/dqrughrs2/image/upload/v1720533009/search_kequmx.png"
                    loading="lazy"
                  />
                  <h1>No found products in EG Shop with your key search:</h1>
                  <p>' {pathSearch} '</p>
                  <Link to="../products">Find products on page Products</Link>
                </div>
              )}

              {/* JSX: Rendering Products */}
              <Row className={classes["section__list"]}>
                {products.value.map((product) => (
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
                  className="form-filter-options"
                  popupClassName="form__popup-filter-options"
                  placeholder="Filter"
                  options={optionsFilter}
                  optionCurrent={optionFilter || undefined}
                  onSaveValueOption={getValueOptionFilterHandle}
                />

                <SelectOptions
                  className="form-filter-rating"
                  popupClassName="form__popup-filter-rating"
                  placeholder="Popularity"
                  options={optionsRating}
                  optionCurrent={rateFilter || undefined}
                  onSaveValueOption={getValueRateFilterHandle}
                />

                <CollapseCategory
                  categoryValueSearch={categoryValueSearch}
                  categoryCurrent={categoryFilter || ""}
                  className="collapse-category"
                  products={products.total}
                  categories={categories}
                  onSaveValueCategory={getValueCategoryHandle}
                />
                <SliderPrice
                  onSaveValueRangePrice={getValueRangePriceHandle}
                  rangePriceCurrent={rangePrice || null}
                />
                <SelectTags
                  onSaveValueTags={getValueTagsHandle}
                  tagsCurrent={tags}
                />
              </div>
            </Col>
          </Row>

          {/* JSX: Pagination */}
          <PaginationCustom
            className="products__pagination"
            pageSize={12}
            currentPage={currentPage}
            total={products.total.length}
            onSaveNextPageProduct={getValueNextPageHandle}
          />
        </div>
      </div>
    </>
  );
}
