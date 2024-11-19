//  Import Modules
import React, { useState } from "react";

// Import File CSS
import classes from "./css/reviewDetail.module.css";
import "./css/ant-design/rateReviewItem.css";

// Import Components
import { Row, Col, Rate } from "antd";

// Import Icons
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";

// Create + use DUMMY_DATA_CONSTANTS
const DUMMY_LIST_REVIEWS = [
  {
    id: "abc1",
    user: {
      name: "Jenny Wilson",
      img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    },
    desc: {
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea cum minima earum illum, quis soluta sint nemo qui nisi quas error aliquid, natus saepe harum ut. Minima dicta voluptatibus unde.",
      like: {
        isActive: false,
        amount: 5,
      },
      heart: {
        isActive: false,
        amount: 5,
      },
      comment: {
        isActive: false,
        amount: 0,
      },
    },
    reply: [],
    rating: 4,
    createAt: "20/01/2024",
  },
  {
    id: "abc2",
    user: {
      name: "Sara Waston",
      img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    },
    desc: {
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea cum minima earum illum, quis soluta sint nemo qui nisi quas error aliquid, natus saepe harum ut. Minima dicta voluptatibus unde.",
      like: {
        isActive: false,
        amount: 0,
      },
      heart: {
        isActive: false,
        amount: 5,
      },
      comment: {
        isActive: false,
        amount: 0,
      },
    },
    reply: [],
    rating: 3,
    createAt: "12/05/2024",
  },
  {
    id: "abc3",
    user: {
      name: "Kuma Nguyen",
      img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    },
    desc: {
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea cum minima earum illum, quis soluta sint nemo qui nisi quas error aliquid, natus saepe harum ut. Minima dicta voluptatibus unde.",
      like: {
        isActive: false,
        amount: 0,
      },
      heart: {
        isActive: false,
        amount: 0,
      },
      comment: {
        isActive: false,
        amount: 0,
      },
    },
    reply: [],
    rating: 5,
    createAt: "26/08/2024",
  },
];

export default function ReviewDetail() {
  // Create + use States
  const [reviews, setReviews] = useState(DUMMY_LIST_REVIEWS);
  const [isShowFormComment, setIsShowFormComment] = useState(false);

  // Create + use event handles
  const activeEmotionHandle = (icon_name, itemId) => {
    const cloneReviews = [...reviews];
    const findIndexItem = cloneReviews.findIndex(
      (review) => review.id === itemId
    );
    const itemReviews = reviews[findIndexItem];

    // Update Key - Value By Id Review
    switch (icon_name) {
      case "like":
        itemReviews.desc.like.isActive = !itemReviews.desc.like.isActive;
        break;
      case "heart":
        itemReviews.desc.heart.isActive = !itemReviews.desc.heart.isActive;
        break;
      case "comment":
        itemReviews.desc.comment.isActive = !itemReviews.desc.comment.isActive;
        setIsShowFormComment(!isShowFormComment);
        break;

      default:
        itemReviews.desc.like.isActive = false;
        itemReviews.desc.heart.isActive = false;
        itemReviews.desc.comment.isActive = false;
        break;
    }

    cloneReviews[findIndexItem] = itemReviews;
    setReviews(cloneReviews);
  };

  return (
    <div className={classes["review-detail"]}>
      <Row className={classes["review-detail-row"]}>
        {reviews.length == 0 && (
          <div className={classes["message-box-review"]}>
            <h3>
              This product has no reviews yet. Be the first to leave a positive
              review!
            </h3>
          </div>
        )}
        {DUMMY_LIST_REVIEWS.length > 0 &&
          DUMMY_LIST_REVIEWS.map((item) => (
            <Col key={item.id} className={classes["review-detail-col"]}>
              <div className={classes["card-user-review"]}>
                <div className={classes["card-user-header"]}>
                  <img src={item.user.img} alt={item.user.img} loading="lazy" />
                  <div className={classes["card-user-detail"]}>
                    <p className={classes["card-user-detail-name"]}>
                      {item.user.name}
                    </p>
                    <Rate
                      className="card-user-rate-product"
                      disabled
                      defaultValue={item.rating}
                      count={item.rating}
                    />
                  </div>
                  <p className={classes["card-user-review-date"]}>
                    {item.createAt}
                  </p>
                </div>
                <div className={classes["card-user-section"]}>
                  <p className={classes["card-user-section-category"]}>
                    Category: <span>Bakery</span>
                  </p>
                  <p className={classes["card-user-section-quality"]}>
                    Quality Product: <span>Perject</span>
                  </p>
                  <p className={classes["card-user-section-desc"]}>
                    True to description: <span>Yes</span>
                  </p>
                  <p className={classes["card-user-section-content"]}>
                    {item.desc.content}
                  </p>
                </div>
                <div className={classes["card-user-footer"]}>
                  <div className={classes["card-user-footer-emotion"]}>
                    {item.desc.like.isActive ? (
                      <AiFillLike
                        className={`${classes["emotion-icon"]} ${classes["emotion-icon-like-active"]}`}
                        onClick={() => activeEmotionHandle("like", item.id)}
                      />
                    ) : (
                      <AiOutlineLike
                        className={`${classes["emotion-icon"]} ${classes["emotion-icon-like"]}`}
                        onClick={() => activeEmotionHandle("like", item.id)}
                      />
                    )}

                    {item.desc.heart.isActive ? (
                      <FaHeart
                        className={`${classes["emotion-icon"]} ${classes["emotion-icon-heart-active"]}`}
                        onClick={() => activeEmotionHandle("heart", item.id)}
                      />
                    ) : (
                      <FaRegHeart
                        className={`${classes["emotion-icon"]} ${classes["emotion-icon-heart"]}`}
                        onClick={() => activeEmotionHandle("heart", item.id)}
                      />
                    )}

                    {item.desc.comment.isActive ? (
                      <FaComment
                        className={`${classes["emotion-icon"]} ${classes["emotion-icon-comment-active"]}`}
                        onClick={() => activeEmotionHandle("comment", item.id)}
                      />
                    ) : (
                      <FaRegComment
                        className={`${classes["emotion-icon"]} ${classes["emotion-icon-comment"]}`}
                        onClick={() => activeEmotionHandle("comment", item.id)}
                      />
                    )}
                  </div>

                  <div className={classes["card-user-footer-emotion-quantity"]}>
                    <p>
                      {item.desc.like.amount} Like, {item.desc.heart.amount}{" "}
                      Heart, {item.desc.comment.amount} Comments
                    </p>
                  </div>

                  {item.desc.comment.isActive && isShowFormComment && (
                    <form className={classes["card-user-footer-form"]}>
                      <div className={classes["form-input"]}>
                        <img
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          alt=""
                          loading="lazy"
                        />
                        <textarea
                          type="text"
                          className={classes["form-input-comment"]}
                          placeholder="Write a public comment..."
                        ></textarea>
                        <IoMdSend className={classes["form-icon-send"]} />
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
}
