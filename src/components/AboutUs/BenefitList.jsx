// Import Modules
import React from "react";

// Import Components
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

// Import File CSS
import classes from "./css/benefitList.module.css";

// Create DUMMY DATA
const DUMMY_BENEFITS = [
  {
    id: "a123",
    logo: "https://res.cloudinary.com/dqrughrs2/image/upload/v1719839865/harvest_qv05q4.png",
    title: "100% Organic",
    desc: "Purely natural, eco-friendly, and chemical-free products.",
  },
  {
    id: "b111",
    logo: "https://res.cloudinary.com/dqrughrs2/image/upload/v1719842088/truck_d4hyxi.png",
    title: "Free Delivery",
    desc: "Enjoy free delivery on all orders with no minimum purchase.",
  },
  {
    id: "c222",
    logo: "https://res.cloudinary.com/dqrughrs2/image/upload/v1719840815/satisfaction_ijgokj.png",
    title: "100% Satisfaction",
    desc: "100% Satisfaction: Guaranteed happiness and fulfillment.",
  },
  {
    id: "d456",
    logo: "https://res.cloudinary.com/dqrughrs2/image/upload/v1719840814/discount_crzpno.png",
    title: "Great Daily Deal",
    desc: "Unbeatable discounts on top products daily!",
  },
  {
    id: "e231",
    logo: "https://res.cloudinary.com/dqrughrs2/image/upload/v1719839865/biodegradable_p0ftoa.png",
    title: "Wide Assortment",
    desc: "Diverse product range catering to various customer preferences.",
  },
  {
    id: "f557",
    logo: "https://res.cloudinary.com/dqrughrs2/image/upload/v1719839865/cabbage_mapwu8.png",
    title: "Premiun Quality",
    desc: "Experience the epitome of refinement and luxury",
  },
  {
    id: "g751",
    logo: "https://res.cloudinary.com/dqrughrs2/image/upload/v1719839922/pumpkin_ctmxcm.png",
    title: "Always Fresh",
    desc: "Always Fresh offers fresh, organic products daily.",
  },
  {
    id: "h789",
    logo: "https://res.cloudinary.com/dqrughrs2/image/upload/v1719839865/harvest_qv05q4.png",
    title: "Best Quality",
    desc: "Discover top-notch products for unbeatable quality and performance.",
  },
];

export default function BenefitList() {
  return (
    <div className={classes.benefitList}>
      <div className={classes["benefit__container"]}>
        <div className={classes["benefit__header"]}>
          <h2>Why Choose Us</h2>
          <p>Food Is Always Fresh</p>
        </div>
        <Row className={classes["benefit__row"]}>
          {DUMMY_BENEFITS.map((item) => (
            <Col key={item.id} className={classes["benefit__col"]}>
              <div className={classes["benefit__card"]}>
                <img src={item.logo} alt={item.logo} />
                <h2 className={classes["card__title"]}>{item.title}</h2>
                <p className={classes["card__desc"]}>{item.desc}</p>
                <Link className={classes["card__link"]}>Read More</Link>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
