"use client";
import React, { useState, useEffect } from "react";

import { getRequest } from "@/app/services";

import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import LOGIN_TYPE from "@/app/constants/loginType";
import UI from "@/app/constants/ui";

function Benefits() {
  const [benefitdata, setBenefitdata] = useState([]);

  const fetchBenefitData = () => {
    getRequest(
      `${MAINPAGE_API_URL.MAINPAGE_BENEFITS}${LOGIN_TYPE.CANDIDATE}`
    ).then((data) => {
      setBenefitdata(data);
    });
  };

  useEffect(() => {
    fetchBenefitData();
  }, []);

  return (
    <div>
      {benefitdata.length > 0 ? (
        <div className="skills_intelligence">
          <section className="skills_intelligence">
            <div className="container">
              <div className="section-heading centred mb-3">
                <h3 className="section_head">
                  {UI.JOB_SEEKER_CARD_LIST_TITLE}
                </h3>
              </div>
              <div className="row justify-content-center">
                {benefitdata.map((benefit, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-12"
                    key={index}
                  >
                    <div className="Intelligence_card">
                      <div className="Intelligence_img">
                        <img
                          src={benefit.iconimage}
                          alt={UI.ALT_JOB_SEEKER_CARD_IMAGE}
                          width={50}
                          height={50}
                          loading="lazy"
                        />
                      </div>
                      <h6>{benefit.title}</h6>
                      <p>{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

export default Benefits;
