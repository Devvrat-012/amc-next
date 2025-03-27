"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { getRequest } from "@/app/services";
import "@/app/styles/job-seeker-page.css";
import mobile from "@/app/assets/mobile.webp";
import approach from "@/app/assets/approach.webp";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import URL from "@/app/constants/urls";
import LOGIN_TYPE from "@/app/constants/loginType";
import UI from "@/app/constants/ui";
import Image from "next/image";

function Demo({ role }) {
  const [demodata, setDemodata] = useState("");

  const fetchDemoData = () => {
    getRequest(`${MAINPAGE_API_URL.MAINPAGE_DEMO}${role}`).then((data) => {
      setDemodata(data);
    });
  };

  useEffect(() => {
    if (!role) return;
    fetchDemoData();
  }, [role]);
  return (
    <>
      {role === LOGIN_TYPE.CANDIDATE && (
        <section className="job_opportunitie">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="left_wrapper">
                  <Image
                    src={mobile}
                    alt={UI.ALT_APPROACH_SECTION_HOME_IMAGE}
                    layout="intrinsic"
                  />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="right_wrapper">
                  <div className="section-heading">
                    <h3 className="section_head">
                      {demodata.title && demodata.title}
                    </h3>
                    <p>{demodata.description}</p>
                    <Link
                      href={URL.REGISTER}
                      rel="noopener noreferrer"
                      className="white-btn"
                    >
                      {UI.REGISTER}
                      <span /> <span /> <span /> <span />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {role === LOGIN_TYPE.EMPLOYER && (
        <div className="full-body-tab recruiters_approach">
          <div className="section approach_section">
            <div className="container">
              <div className="row left_inner_one_row">
                <div className="col-lg-6">
                  <div className="left_inner">
                    <p>{UI.EMPLOYER_APPROACH_SECTION_TITLE}</p>
                    <Link
                      href={URL.LOGIN}
                      rel="noopener noreferrer"
                      className="white-btn"
                    >
                      {UI.START_HIRING}
                      <span /> <span /> <span /> <span />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6">
                  <Image
                    src={approach}
                    alt={UI.ALT_APPROACH_SECTION_HOME_IMAGE}
                    width="100%"
                    height="100%"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
Demo.propTypes = {
  role: PropTypes.number.isRequired,
};

export default Demo;
