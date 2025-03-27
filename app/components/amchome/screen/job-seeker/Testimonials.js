"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getRequest } from "@/app/services";
import CustomNextArrows from "@/app/components/amchome/CustomNextArrows";

import CustomPrevArrows from "@/app/components/amchome/CustomPrevArrows";

import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import LOGIN_TYPE from "@/app/constants/loginType";
import UI from "@/app/constants/ui";

function Testimonials(props) {
  const { role } = props;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: false,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrows />,
    nextArrow: <CustomNextArrows />,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
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

  const [testimonialsdata, setTestimonialsdata] = useState([]);

  const fetchTestimonialsData = () => {
    getRequest(`${MAINPAGE_API_URL.MAINPAGE_TESTIMONIAL}${role}`).then(
      (data) => {
        setTestimonialsdata(data);
      }
    );
  };

  useEffect(() => {
    if (!role) return;
    fetchTestimonialsData();
  }, [role]);
  return (
    <div>
      {testimonialsdata.length > 0 &&
        ((role === LOGIN_TYPE.CANDIDATE && (
          <section className="full-body-tab">
            <div className="container">
              <div className="section success_story_section">
                <div className="section-heading centred">
                  <h3 className="section_head">{UI.SOTRY_SLIDER}</h3>
                </div>
                <div className="story_slider">
                  <Slider {...settings}>
                    {testimonialsdata.map((testimonial, index) => (
                      <div className="slide" key={index}>
                        <div className=" row">
                          {/* <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="slide-img">
                              <img
                                src={testimonial.image}
                                alt={UI.ALT_STORIES_IMAGE}
                                className="slide_img"
                              />
                            </div>
                          </div> */}
                          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="slide-content">
                              <h6>{testimonial.name}</h6>
                              <span>{testimonial.designation}</span>
                              <p>{testimonial.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </section>
        )) ||
          (role === LOGIN_TYPE.EMPLOYER && (
            <section className="full-body-tab section pt-8 testimonials_slide">
              <div className="container section success_story_section">
                <div className="section-heading centred">
                  <h3 className="section_head mb-0">{UI.TESTIMONAL}</h3>
                </div>
                <div className="story_slider">
                  <Slider {...settings}>
                    {testimonialsdata.map((testimonial, index) => (
                      <div className="slide" key={index}>
                        <div className=" row">
                          <div className="col-lg-12">
                            <div className="slide-content p-3">
                              <img
                                src={testimonial.companylogo}
                                alt={UI.ALT_TESTIMONAL_IMAGE}
                                className="testimonials-img"
                                width="20%"
                                height="100%"
                              />
                              <p>{testimonial.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </section>
          )))}
    </div>
  );
}

Testimonials.propTypes = {
  role: PropTypes.number,
};
Testimonials.defaultProps = {
  role: 1,
};

export default Testimonials;
