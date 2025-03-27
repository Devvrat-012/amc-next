"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getRequest } from "@/app/services";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import LOGIN_TYPE from "@/app/constants/loginType";

function Stats({ role }) {
  const [statsdata, setStatsdata] = useState([]);

  const fetchStatsData = () => {
    getRequest(`${MAINPAGE_API_URL.MAINPAGE_STATS}${role}`).then((data) => {
      setStatsdata(data);
    });
  };

  useEffect(() => {
    if (!role) return;
    fetchStatsData();
  }, [role]);

  return (
    <div>
      {statsdata.length > 0 ? (
        <div className="section top_companies">
          <div className="container">
            <div className="section-heading centred">
              <h3 className="section_head">
                {role === LOGIN_TYPE.CANDIDATE && (
                  <>
                    Get the Best IT and Management
                    <br /> Jobs with AlignMyCareer
                  </>
                )}
                {role === LOGIN_TYPE.EMPLOYER && (
                  <>
                    One-Stop Solution for <br />
                    Recruiters
                  </>
                )}
              </h3>
            </div>

            <div className="row" style={{ rowGap: 20 }}>
              {statsdata.map((stat, index) => (
                <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={index}>
                  <div className="companies_card pink_card">
                    <h6>{stat.title}</h6>
                    <p>{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border_div" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

Stats.propTypes = {
  role: PropTypes.number,
};

Stats.defaultProps = {
  role: LOGIN_TYPE.CANDIDATE,
};

export default Stats;
