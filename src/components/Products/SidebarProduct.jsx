// Import Modules
import React, { useState, useContext, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { APIContext } from "../../storeContext/APIContext";

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
  // Create + use arrays
  const optionsFilter = [
    {
      value: "name:asc",
      label: (
        <p>
          A <span className="symbol-arrow symbol-arrow-next">&#10141;</span> Z
        </p>
      ),
    },
    {
      value: "name:desc",
      label: (
        <p>
          Z <span className="symbol-arrow symbol-arrow-next">&#10141;</span> A
        </p>
      ),
    },
    {
      value: "price:asc",
      label: (
        <p>
          Price <span className="symbol-arrow symbol-arrow-up">&#10141;</span>
        </p>
      ),
    },
    {
      value: "price:desc",
      label: (
        <p>
          Price <span className="symbol-arrow symbol-arrow-down">&#10141;</span>
        </p>
      ),
    },
    {
      value: "sale:true",
      label: "Sale Off",
    },
    {
      value: "bestSeller:true",
      label: "Best Seller",
    },
  ];

  const optionsRating = [
    {
      value: "star:5",
      label: `5 Star`,
    },
    {
      value: "star:4",
      label: `4 Star`,
    },
    {
      value: "star:3",
      label: `3 Star`,
    },
    {
      value: "star:2",
      label: `2 Star`,
    },
    {
      value: "star:1",
      label: `1 Star`,
    },
  ];

  // Create + use Hooks
  // const navigate = useNavigate();
  // const { search: pathSearch } = useLocation();
  // console.log(pathSearch);
  const { categories, products } = useContext(APIContext);

  const modifiedProducts = useMemo(() => {
    return products.filter((product) => {
      product.price_discount =
        product.price - (product.price * product.percent_discount) / 100;
      return product;
    });
  }, [products]);

  const [sliceProduct, setSliceProduct] = useState(
    modifiedProducts.slice(0, 12)
  );

  const [optionFilter, setOptionFilter] = useState(undefined);
  const [rateFilter, setRateFilter] = useState(undefined);
  const [categoryFilter, setCategoryFilter] = useState({
    category_id: "",
    category_title: "",
  });
  const [rangePrice, setRangePrice] = useState(null);
  const [tags, setTags] = useState([]);
  const [isShowSideBarMenu, setIsShowSideBarMenu] = useState(false);

  //  Create + use event handlers
  const showSideBarMenuHandler = () => {
    setIsShowSideBarMenu(!isShowSideBarMenu);
  };

  const getValueNextPageHanlder = (value) => {
    setSliceProduct(value);
  };

  const getValueTagsHandler = (valueTags) => {
    setTags(valueTags);
    fetchProductByOptions(
      optionFilter,
      rateFilter,
      categoryFilter,
      rangePrice,
      valueTags
    );
  };

  const getValueRangePriceHandler = (valuePrice) => {
    setRangePrice(valuePrice);
    fetchProductByOptions(
      optionFilter,
      rateFilter,
      categoryFilter,
      valuePrice,
      tags
    );
  };

  const getValueRateFilterHandler = (valueRate) => {
    setRateFilter(valueRate);
    fetchProductByOptions(
      optionFilter,
      valueRate,
      categoryFilter,
      rangePrice,
      tags
    );
  };

  const getValueOptionFilterHandler = (valueOption) => {
    setOptionFilter(valueOption);
    fetchProductByOptions(
      valueOption,
      rateFilter,
      categoryFilter,
      rangePrice,
      tags
    );
  };

  const getValueCategoryHandler = (_id, title) => {
    const newCategory = { category_id: _id, category_title: title };
    setCategoryFilter(newCategory);
    fetchProductByOptions(
      optionFilter,
      rateFilter,
      newCategory,
      rangePrice,
      tags
    );
  };

  const fetchProductByOptions = async (
    valueOption,
    valueRate,
    valueCategory,
    valuePrice,
    valueTags
  ) => {
    console.log(
      "Filter: ",
      valueOption,
      "- ",
      valueRate,
      "- ",
      valueCategory,
      "- ",
      valuePrice,
      "- ",
      valueTags
    );
    // navigate(`?${option}`);
  };

  const addToCartHandler = (productId) => {
    console.log(productId);
  };

  return (
    <div className={classes.sidebarProduct}>
      <div className={classes["products__container"]}>
        <Row className={classes["products__row"]}>
          <Col
            className={`${classes["products__col"]} ${classes["products__col__section"]}`}
          >
            <p className={classes["section__note"]}>Showing 1 - 9 items</p>

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
            onClick={showSideBarMenuHandler}
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
              onClick={showSideBarMenuHandler}
            />
            <div className={classes["header__form"]}>
              <SelectOptions
                className="form-filter-options"
                popupClassName="form__popup-filter-options"
                defaultValue="Filter"
                placeholder="Filter"
                options={optionsFilter}
                onSaveValueOption={getValueOptionFilterHandler}
              />
              <SelectOptions
                className="form-filter-rating"
                popupClassName="form__popup-filter-rating"
                defaultValue="Popularity"
                placeholder="Popularity"
                options={optionsRating}
                onSaveValueOption={getValueRateFilterHandler}
              />
              <CollapseCategory
                className="collapse-category"
                products={products}
                categories={categories}
                onSaveValueCategory={getValueCategoryHandler}
              />
              <SliderPrice onSaveValueRangePrice={getValueRangePriceHandler} />
              <SelectTags onSaveValueTags={getValueTagsHandler} />
            </div>
          </Col>
        </Row>

        {/* JSX: Pagination */}
        <PaginationPage
          className="products__pagination"
          pageSize={12}
          products={products}
          onSaveNextPageProduct={getValueNextPageHanlder}
        />
      </div>
    </div>
  );
}
