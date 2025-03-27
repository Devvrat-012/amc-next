"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getRequest } from "@/app/services/index";
import CustomPrevArrows from "@/app/components/amchome/CustomPrevArrows";
import CustomNextArrows from "@/app/components/amchome/CustomNextArrows";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import UI from "@/app/constants/ui";

function Companies({ role }) {
  const [companiesdata, setCompaniesdata] = useState([]);

  const slidesToShow = companiesdata.length >= 3 ? 3 : companiesdata.length;

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    autoplay: false,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrows />,
    nextArrow: <CustomNextArrows />,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow,
        },
      },
    ],
  };
  const fetchCompaniesData = () => {
    getRequest(`${MAINPAGE_API_URL.MAINPAGE_COMPANIES}${role}`).then((data) => {
      setCompaniesdata(data);
    });
  };

  useEffect(() => {
    if (!role) return;
    fetchCompaniesData();
  }, [role]);

  return (
    <div>
      {companiesdata.length > 0 ? (
        <section className="full-body-tab">
          <div className="section featured_companies container">
            <div className="section-heading centred">
              <h3 className="section_head">{UI.FEATURED_COMPANIES}</h3>
            </div>
            <div className="story_slider">
              <Slider {...settings2}>
                {companiesdata.map((company, index) => (
                  <div className="slide" key={index}>
                    <div className="slide_div row">
                      <img
                        src={`https://demo.alignmycareer.com${company?.image}`}
                        alt={UI.ALT_FEATURED_COMPANIES_IMAGE}
                        width="100%"
                        height="100%"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

Companies.propTypes = {
  role: PropTypes.number.isRequired,
};

export default Companies;
