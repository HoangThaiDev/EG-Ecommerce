// Import Modules
import React, { useState } from "react";

// Import File CSS
import classes from "./css/specialNews.module.css";

// Import Components
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

// Import Icons
import { AiOutlineUser } from "react-icons/ai";

// Create DUMMY_DATA_CONSANTS
const DUMMY_SPECIAL_NEWS = [
  {
    id: "a12f345",
    banner:
      "https://res.cloudinary.com/dqrughrs2/image/upload/v1719579112/hinh-nguoi-dung-thong-thai_u31tcu.jpg",
    title:
      "Be a wise consumer to choose the freshest and tastiest foods for your family.",
    content:
      "Choosing fresh food is extremely important in consumption, it greatly affects the user's health. So try to update yourknowledge about food",
    createAt: "28 Jun 2024",
    author: "Kuma Nguyen",
  },
  {
    id: "a13d255",
    banner:
      "https://res.cloudinary.com/dqrughrs2/image/upload/v1719579113/two-men-drinking-homemade-wine-women-taking-photos_482257-77533_lxgwvf.jpg",
    title:
      "Be a wise consumer to choose the freshest and tastiest foods for your family.",
    content:
      "Choosing fresh food is extremely important in consumption, it greatly affects the user's health. So try to update yourknowledge about food",
    createAt: "30 Jul 2024",
    author: "Esther Howard",
  },
  {
    id: "a14e789",
    banner:
      "https://res.cloudinary.com/dqrughrs2/image/upload/v1719579112/medium-shot-delivery-woman-holding-crate_23-2148767121_r0zraf.jpg",
    title:
      "  Be a wise consumer to choose the freshest and tastiest foods for your family.",
    content:
      "Choosing fresh food is extremely important in consumption, it greatly affects the user's health. So try to update yourknowledge about food",
    createAt: "1 May 2024",
    author: "Sara Watson",
  },
];

export default function SpecialNews() {
  // Create + use States
  const [specialNewActive, setSpecialNewActive] = useState(
    DUMMY_SPECIAL_NEWS[0]
  );
  const [sliceNews, setSliceNews] = useState(DUMMY_SPECIAL_NEWS.slice(1, 3));

  // Create + use event Handles
  const viewSpecialNewsActiveHandle = (itemChosen) => {
    // Update special new active
    setSpecialNewActive(itemChosen);

    // Update sliceNews
    const filteredSliceNews = sliceNews.filter(
      (item) => item.id !== itemChosen.id
    );
    filteredSliceNews.push(specialNewActive);
    setSliceNews(filteredSliceNews);
  };

  return (
    <div className={classes["news"]}>
      <div className={classes["news__container"]}>
        <div className={classes["news__header"]}>
          <h2>Special News</h2>
          <p>The lastest foodmaker collaboration with ReGrained's food</p>
        </div>

        <Row className={classes["news__row"]}>
          <Col className={classes["news__col"]}>
            <div className={classes["news__card-active"]}>
              <img
                loading="lazy"
                src={specialNewActive.banner}
                alt={specialNewActive.banner}
              />
              <div className={classes["card__content"]}>
                <div>
                  <h3 className={classes["content__title"]}>
                    {specialNewActive.title}
                  </h3>
                  <p className={classes["content__desc"]}>
                    {specialNewActive.content}
                  </p>
                  <div className={classes["content__footer"]}>
                    <Link className={classes["content__link"]}>Read More</Link>
                    <span className={classes["content__date"]}>
                      Date: {specialNewActive.createAt}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col className={classes["news__col"]}>
            {sliceNews.map((item) => (
              <div className={classes["news__card"]} key={item.id}>
                <img loading="lazy" src={item.banner} alt={item.banner} />
                <div className={classes["card__content"]}>
                  <h3 className={classes["content__title"]}>{item.title}</h3>
                  <p className={classes["content__desc"]}>
                    <span onClick={() => viewSpecialNewsActiveHandle(item)}>
                      Click here
                    </span>
                    to view detail new.
                  </p>
                  <div className={classes["content__footer"]}>
                    <p className={classes["content__auth"]}>
                      <AiOutlineUser className={classes["icon-user"]} />
                      <span>{item.author}</span>
                    </p>

                    <span className={classes["content__date"]}>
                      {item.createAt}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
}
