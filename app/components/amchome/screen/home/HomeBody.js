
import React, { Suspense } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/app/styles/header.css";
import "@/app/styles/home-body.css";
import config from "@/app/config/config";

import CaseStudies from "./CaseStudies";
import Reasons from "./Reasons";
import Demo from "./Demo";
import Feature from "./Feature";
import Companies from "@/app/components/amchome/screen/job-seeker/Companies";
import Stats from "./Stats";
import USP from "./USP";
import Testimonials from "@/app/components/amchome/screen/job-seeker/Testimonials";
import Videos from "@/app/components/amchome/screen/job-seeker/Videos";
import LOGIN_TYPE from "@/app/constants/loginType";
import UI from "@/app/constants/ui";
import AboutAMC from "@/app/components/amchome/screen/job-seeker/AboutAMC";
import Benefits from "@/app/components/amchome/screen/job-seeker/Benefits";
import BlogPage from "@/app/next/blog/page.js";
import Loader from "@/app/loader";

export default async function HomeBody() {
  // const url = `${config.API_BASE}/mainpage/skills?role=1`;

  // let skillData = null;
  // try {
  //   const response = await fetch(url);
  //   if (!response.ok) {
  //     throw new Error(`Error fetching skills: ${response.statusText}`);
  //   }
  //   skillData = await response.json();
  //   console.log(skillData)
  // } catch (error) {
  //   console.error('Failed to fetch skills:', error);
  // }

  // Pass the fetched data to a client component or render accordingly
  return <HomeBodyClient />;
}

const HomeBodyClient = () => {
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
              {/* {skillsdata && skillsdata.length > 0 && (
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
              )} */}
              <Reasons role={LOGIN_TYPE.CANDIDATE} />
              <Benefits />
              <Companies role={LOGIN_TYPE.CANDIDATE} />
              <Testimonials role={LOGIN_TYPE.CANDIDATE} />
              <Videos role={LOGIN_TYPE.CANDIDATE} />
              <Suspense fallback={<Loader />}>
                <BlogPage role={LOGIN_TYPE.CANDIDATE} />
              </Suspense>
              {/* <CaseStudies role={LOGIN_TYPE.CANDIDATE} /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
