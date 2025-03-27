"use client";
import React, { useState, useEffect } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/app/styles/header.css";
import "@/app/styles/home-body.css";
import "@/app/styles/home-body.css";

import CaseStudies from "./CaseStudies";
import Reasons from "./Reasons";
import Demo from "./Demo";
import Feature from "./Feature";
import { getRequest } from "@/app/services";
// import Blogs from '../job-seeker/Blogs';
import Companies from "@/app/components/amchome/screen/job-seeker/Companies";
import Stats from "./Stats";
import USP from "./USP";
import Testimonials from "@/app/components/amchome/screen/job-seeker/Testimonials";
import Videos from "@/app/components/amchome/screen/job-seeker/Videos";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import LOGIN_TYPE from "@/app/constants/loginType";
import UI from "@/app/constants/ui";
import AboutAMC from "@/app/components/amchome/screen/job-seeker/AboutAMC";
import Benefits from "@/app/components/amchome/screen/job-seeker/Benefits";
import BlogPage from "@/app/pages/Blog/BlogPage";

// import Rebon from '../job-seeker/Rebon';
// import WhyAMC from '../recruiters/WhyAMC';
// import BannerSlide from './BannerSlide';
// import Header from '../../components/Header';

function HomeBody() {
  const [skillsdata, setSkillsdata] = useState([]);

  const fetchSkillsData = () => {
    getRequest(
      `${MAINPAGE_API_URL.MAINPAGE_SKILLS}${LOGIN_TYPE.CANDIDATE}`
    ).then((data) => {
      setSkillsdata(data);
    });
  };

  useEffect(() => {
    fetchSkillsData();
  }, []);

  return (
    <section className="header-css section full-body-tab">
      <div className="container">
        <div className="tab-section">
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-employees"
              role="tabpanel"
              aria-labelledby="nav-employees-tab"
              tabIndex="0"
            >
              <AboutAMC role={LOGIN_TYPE.CANDIDATE} />
              <USP role={LOGIN_TYPE.CANDIDATE} showHeading />
              <Stats role={LOGIN_TYPE.CANDIDATE} />
              <Demo role={LOGIN_TYPE.CANDIDATE} />
              <Feature role={LOGIN_TYPE.CANDIDATE} />
              {skillsdata.length > 0 ? (
                <div className="client_section">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="left_wrapper">
                        <p>{UI.EMPLOYER_SKILLS_SECTION_TITLE}</p>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="logos_sec">
                        <ul>
                          {skillsdata.map((skill, index) => (
                            <li key={index}>
                              <img
                                src={skill.image}
                                alt={UI.ALT_SKILLSET_IMAGE}
                                width="79%"
                                height="100%"
                                loading="lazy"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              <Reasons role={LOGIN_TYPE.CANDIDATE} />
              <Benefits />
              <Companies role={LOGIN_TYPE.CANDIDATE} />
              <Testimonials role={LOGIN_TYPE.CANDIDATE} />
              <Videos role={LOGIN_TYPE.CANDIDATE} />
              {/* <Blogs role={LOGIN_TYPE.CANDIDATE} /> */}
              <BlogPage />
              <CaseStudies role={LOGIN_TYPE.CANDIDATE} />
              {/* <Rebon /> */}
              {/* <InstagramApi /> */}

              {/* <div className="w-100 mt-3">
                  <img src="assets/img/employees/employees-11.webp" alt="" />
                </div> */}

              {/* <div className="section counter_section">
                  <div className="section-heading centred">
                    <h3 className="section_head">
                      <span>Thousands</span> Of companies - One <br />{" "}
                      <span>Perfect fit</span>
                    </h3>
                  </div>
                  <div className="counter_nnner">
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                        <div className="counter_div">
                          <h6>
                            <span
                              className="counter"
                              data-from="0"
                              data-to="1200">
                              1200
                            </span>
                            +
                          </h6>
                          <p>Tech Companies</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                        <div className="counter_div">
                          <h6>
                            <span
                              className="counter"
                              data-from="0"
                              data-to="90">
                              90
                            </span>
                            %
                          </h6>
                          <p>Candidate satisfaction</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                        <div className="counter_div">
                          <h6>
                            <span
                              className="counter"
                              data-from="0"
                              data-to="1200">
                              2000
                            </span>
                            +
                          </h6>
                          <p>Technical Jobs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default HomeBody;
