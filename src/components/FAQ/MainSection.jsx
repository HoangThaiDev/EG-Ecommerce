// Import Modules
import React, { Children } from "react";

// Import File CSS
import classes from "./css/mainSection.module.css";

// Import Component
import { Row, Col } from "antd";
import FormQuestion from "./FormQuestion";
import ItemCollapses from "./ItemCollapses";

// Import Icons
import { IoIosArrowDown } from "react-icons/io";

function MainSection() {
  // Create + array Item of collapse
  const DUMMY_GENERAL_FAQS = [
    {
      key: "1",
      label: "How to remove the impurities of Graphene oxide?",
      answers: [
        "To remove the impurities of graphene oxide, methods such as thermalannealing, chemical reduction, and filtration are commonly used.",
      ],
    },
    {
      key: "2",
      label: "How long will delivery take?",
      answers: [
        "Usually it will follow the process: Inspection - packaging - delivery, so it will take about 3 - 5 or more days depending on the area.",
      ],
    },
    {
      key: "3",
      label: "How long will delivery take?",
      answers: [
        "Usually it will follow the process: Inspection - packaging - delivery, so it will take about 3 - 5 or more days depending on the area.",
      ],
    },
    {
      key: "4",
      label: "Questionnaire on online shopping behavior during COVID-19?",
      answers: [
        "Increased frequency of online shopping: A significant portion of consumers reported shopping online more frequently during the pandemic.",
        "Shifts in product categories: Online purchases of groceries, household items and personal care products soared, while demand for clothing and electronics decreased.",
        "Adoption of new online shopping platforms: Many consumers have adopted new online shopping platforms, such as food delivery and online grocery shopping.",
        "Resilience of online shopping habits: A significant proportion of consumers know they intend to continue shopping online more frequently after the pandemic.",
      ],
    },
  ];

  const DUMMY_PAYMENT_FAQS = [
    {
      key: "1",
      label: "How do i set credit limits for customers?",
      answers: [
        "Collect customer information: Collect personal, financial and credit history data from customers.",
        "Assess credit worthiness: Analyze customer's credit score, income, debt-to-income ratio, employment history and other related factors.",
        "Determine credit limit: Based on credit assessment, set a credit limit that balances risk and customer repayment ability.",
        "Review and adjust: Regularly review credit limits when customers' financial situation changes.",
        "Communicate clearly: Inform customers about their credit limits, terms and conditions.",
        "Monitor and manage: Monitor customer accounts to detect potential issues and manage credit limits accordingly.",
      ],
    },
    {
      key: "2",
      label: "How good is their customer support?",
      answers: [
        "Experienced online and offline support staff: Having an online and offline support staff demonstrates a commitment to providing support through multiple channels, meeting diverse customer preferences row.",
        "High User Trust: The fact that EG Shop has earned the trust of many customers shows a positive track record of customer satisfaction and effective support.",
        "Wide variety of food products: Handling a wide variety of food products requires a deep understanding of the industry and underlying customer concerns, allowing for more informed support.",
      ],
    },
    {
      key: "3",
      label: "What is their expertise in fraud management?",
      answers: [
        "Strong customer authentication: Implement strong password requirements, multi-factor authentication, and device verification to prevent unauthorized access.",
        "Secure payment processing: Use reputable payment gateways and comply with industry data security standards to protect financial transactions.",
        "Product and Pricing Integrity: Regularly review product and pricing listings for anomalies and take measures to prevent unauthorized changes.",
      ],
    },
  ];

  const itemsCollapseGeneralFAQ = DUMMY_GENERAL_FAQS.map((item) => {
    return {
      key: item.key,
      label: item.label,
      children: (
        <ul className="collapse-list">
          {item.answers.map((value, index) => (
            <li className="collapse-item" key={index}>
              {value}
            </li>
          ))}
        </ul>
      ),
    };
  });

  const itemsCollapsePaymentFAQ = DUMMY_PAYMENT_FAQS.map((item) => {
    return {
      key: item.key,
      label: item.label,
      children: (
        <ul className="collapse-list">
          {item.answers.map((value, index) => (
            <li className="collapse-item" key={index}>
              {value}
            </li>
          ))}
        </ul>
      ),
    };
  });
  return (
    <div className={classes["main-section"]}>
      <div className={classes["main-section-container"]}>
        <Row className={classes["main-section-row"]}>
          <Col className={classes["main-section-col"]}>
            <FormQuestion />
          </Col>
          <Col className={classes["main-section-col"]}>
            <ItemCollapses
              className="collapse-general-faq"
              title="General FAQ's"
              items={itemsCollapseGeneralFAQ}
              expandicon={<IoIosArrowDown />}
            />
            <ItemCollapses
              className="collapse-payment-faq"
              title="Payment FAQ's"
              items={itemsCollapsePaymentFAQ}
              expandicon={<IoIosArrowDown />}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default MainSection;
