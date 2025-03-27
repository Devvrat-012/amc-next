"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import YoutubeEmbed from "@/app/components/YoutubeEmbed";

import { getRequest } from "@/app/services";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import UI from "@/app/constants/ui";

function Videos({ role }) {
  const [videodata, setVideodata] = useState([]);

  const slidesToShow = videodata.length >= 3 ? 3 : videodata.length;
  const fetchVideoData = () => {
    getRequest(`${MAINPAGE_API_URL.MAINPAGE_VIDEOS}${role}`).then((data) => {
      setVideodata(data);
    });
  };

  useEffect(() => {
    if (!role) return;
    fetchVideoData();
  }, [role]);

  const handleVideoClick = (id, index) => {
    const videoElement = document.getElementById(`play${index}`);
    videoElement.src += "?autoplay=1&rel=0";

    const newVideoBox = document.querySelector(`.home-newvideo-box${index}`);
    const chasingContent = document.querySelector(
      `.videochasingcontentt${index}`
    );

    if (newVideoBox && chasingContent) {
      newVideoBox.style.display = "none";
      chasingContent.style.display = "block";
    }
  };

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

  return (
    <div>
      {videodata.length > 0 ? (
        <div className="section case_studies video_section">
          <div className="container">
            <div className="section-heading centred mb-3">
              <h3 className="section_head">{UI.VIDEO_SECTION_TITLE}</h3>
            </div>
            <div className="case_studies_slider">
              <Slider {...settings1}>
                {videodata.map((video, index) => (
                  <div key={index} className="partner-slide slide-1">
                    <div className="slide__text">
                      <div className="blog_video">
                        <div
                          className={`home-newvideo-box-content videochasingcontentt${video.id}`}
                          onClick={() => handleVideoClick(video.id, index + 1)}
                        >
                          <YoutubeEmbed
                            embedId={video.video}
                            id={`play${video.id}`}
                            image={video.image}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
Videos.propTypes = {
  role: PropTypes.number,
};
Videos.defaultProps = {
  role: 1,
};

export default Videos;
