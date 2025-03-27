"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getRequest } from "@/app/services";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import LOGIN_TYPE from "@/app/constants/loginType";
import UI from "@/app/constants/ui";

function Reasons({ role }) {
  const [reasondata, setReasondata] = useState([]);

  const slidesToShow = reasondata.length >= 3 ? 3 : reasondata.length;
  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    autoplay: false,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  const fetchReasonsData = () => {
    getRequest(`${MAINPAGE_API_URL.MAINPAGE_REASONS}${role}`).then((data) => {
      setReasondata(data);
    });
  };

  useEffect(() => {
    if (!role) return;
    fetchReasonsData();
  }, [role]);

  return reasondata.length > 0 ? (
    <div className="section card_slider">
      <div className="section-heading centred">
        <h3 className="section_head">
          More Reasons to Make Us Your
          <br />
          {role === LOGIN_TYPE.CANDIDATE && "Career"} Partner
        </h3>
      </div>
      <div className="slides_card">
        <Slider {...settings1}>
          {reasondata.map((reason, index) => (
            <div className="partner-slide slide-1" key={index}>
              <div className="slide__text">
                <img
                  src={reason.image}
                  alt={UI.ALT_BENEFITS_SLIDER_IMAGE}
                  width={121}
                  height={121}
                  loading="lazy"
                />
                <h5>{reason.title}</h5>
                <p>{reason.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  ) : null;
}

Reasons.propTypes = {
  role: PropTypes.number.isRequired,
};

export default Reasons;
