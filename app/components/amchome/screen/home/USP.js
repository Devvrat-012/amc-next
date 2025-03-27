"use client ";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";
import { getRequest } from "@/app/services";
import arrow from "@/app/assets/arrow.svg";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import LOGIN_TYPE from "@/app/constants/loginType";
import UI from "@/app/constants/ui";
import Image from "next/image";

function USP(props) {
  const { role, showHeading } = props;
  const [uspdata, setUspdata] = useState([]);
  const [selectedUSP, setSelectedUSP] = useState();
  const fetchUSPData = () => {
    getRequest(`${MAINPAGE_API_URL.MAINPAGE_USP}${role}`).then((data) => {
      setUspdata(data);
      setSelectedUSP(data[0]);
    });
  };

  useEffect(() => {
    if (!role) return;
    fetchUSPData();
  }, [role]);

  const handleUSPClick = (usp) => {
    setSelectedUSP(usp);
  };
  const imageUrl = `https://demo.alignmycareer.com${selectedUSP?.image}`;
  return (
    <div>
      {uspdata.length > 0 ? (
        <section className="section full-body-tab">
          <div className="container">
            {showHeading && role === LOGIN_TYPE.CANDIDATE && (
              <div className="section-heading centred">
                <h2 className="section_head">
                  {UI.CANDIDATE_SKILL_SECTION_TITLE}
                </h2>
              </div>
            )}
            {showHeading && role === LOGIN_TYPE.EMPLOYER && (
              <div className="section-heading centred">
                <h2 className="section_head">
                  {UI.EMPLOYER_SKILL_SECTION_TITLE}
                </h2>
                <div />
              </div>
            )}
            <div className="employees_tab usp_block">
              <ul
                className="nav nav-pills  usp_block_nav_wrapper"
                id="pills-tab"
                role="tablist"
              >
                {uspdata?.map((usp, index) => (
                  <li
                    className="nav-item usp_nav_item"
                    role="presentation"
                    key={index}
                  >
                    <button
                      className={
                        usp?.id === selectedUSP?.id
                          ? "nav-link active"
                          : "nav-link"
                      }
                      id={`pills-job-tab${index}`}
                      onClick={() => handleUSPClick(usp)}
                      type="button"
                      role="tab"
                      aria-controls={`#pills-job${index}`}
                      aria-selected="true"
                      style={{ marginBottom: 15 }}
                    >
                      {usp.title}
                    </button>
                  </li>
                ))}
              </ul>

              <div
                className="tab-content usp-tab-content"
                id="pills-tabContent"
              >
                {selectedUSP && (
                  <div
                    className="tab-pane fade show active"
                    role="tabpanel"
                    tabIndex="0"
                  >
                    <div className="employee_tab w-100">
                      <div className="row">
                        <div className="col-lg-7">
                          <div className="left_wrap">
                            <div className="section-heading">
                              <span className="section_head">
                                {selectedUSP.heading}
                              </span>
                              <div className="list_item mt-3">
                                <ul>
                                  {selectedUSP?.description?.map(
                                    (detail, detailItem) => (
                                      <li key={detailItem}>
                                        <img
                                          src={arrow}
                                          alt={UI.ALT_SKILL_TAB_LEFT}
                                          width="24px"
                                          height="24px"
                                        />
                                        <p>{detail.detail}</p>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-5">
                          <div className="right_wrap">
                            <Image
                              src={imageUrl}
                              alt={UI.ALT_SKILL_TAB_RIGHT}
                              layout="intrinsic"
                              width={900}
                              height={1000}
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="section full-body-tab">
          <div className="container">
            <div className="section-heading centred">
              <Skeleton variant="text" width={697} height={90} />
            </div>

            <div className="employees_tab usp_block d-flex flex-column">
              <ul>
                <li style={{ display: "flex", marginBottom: 25 }}>
                  <Skeleton
                    variant="rounded"
                    width={184}
                    height={50}
                    className="ms-4"
                  />
                  <Skeleton
                    variant="rounded"
                    width={184}
                    height={50}
                    className="ms-4"
                  />
                  <Skeleton
                    variant="rounded"
                    width={184}
                    height={50}
                    className="ms-4"
                  />
                  <Skeleton
                    variant="rounded"
                    width={184}
                    height={50}
                    className="ms-4"
                  />
                </li>
              </ul>

              <div
                className="tab-content usp-tab-content"
                id="pills-tabContent"
              >
                <div
                  className="tab-pane fade show active"
                  role="tabpanel"
                  tabIndex="0"
                >
                  <div className="employee_tab w-100">
                    <div className="row">
                      <div className="col-lg-7">
                        <div className="left_wrap">
                          <div className="section-heading">
                            <Skeleton
                              variant="rectangular"
                              width={260}
                              height={32}
                            />
                            <div className="list_item mt-3">
                              <ul>
                                <li>
                                  <Skeleton
                                    variant="rectangular"
                                    width={493}
                                    height={131}
                                  />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div>
                          <Skeleton
                            variant="rectangular"
                            width={312}
                            height={328}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
USP.propTypes = {
  role: PropTypes.number,
  showHeading: PropTypes.bool,
};

USP.defaultProps = {
  role: 1,
  showHeading: true,
};

export default USP;
