"use client";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import Link from "next/link";
import { getRequest } from "@/app/services";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import LOGIN_TYPE from "@/app/constants/loginType";
import UI from "@/app/constants/ui";
import URL from "@/app/constants/urls";
import Image from "next/image";

function AboutAMC({ role }) {
  const [aboutdata, setAboutdata] = useState(null);
  console.log(aboutdata);

  const fetchAboutData = () => {
    getRequest(`${MAINPAGE_API_URL.MAINPAGE_ABOUT}${role}`).then((data) => {
      setAboutdata(data);
    });
  };

  useEffect(() => {
    if (!role) return;
    fetchAboutData();
  }, [role]);
  const imageUrl = `https://demo.alignmycareer.com${aboutdata?.image}`;

  return (
    <section
      className={`section time-consuming-sec ${
        role === LOGIN_TYPE.EMPLOYER && "recruiters_heading pb-0"
      }`}
    >
      <div className="container">
        {aboutdata ? (
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="section-heading">
                <h1 className="section_head">{aboutdata.title}</h1>
                <Image
                  src={imageUrl}
                  alt={UI.ALT_ABOUT_SECTION_IMAGE}
                  layout="intrinsic"
                  width={1000}
                  height={1000}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="right-para">
                <p>{aboutdata.description}</p>
                {/* <a
                href="https://www.alignmycareer.com/register"
                target="_blank"
                rel="noopener noreferrer"
                className="white-btn"
              >
                Create Your Account
                <span></span> <span></span> <span></span> <span></span>
              </a> */}

                <Link
                  href={URL.REGISTER}
                  rel="noopener noreferrer"
                  className="white-btn"
                >
                  {UI.CREATE_YOUR_ACCOUNT}
                  <span /> <span /> <span /> <span />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="skeleton-view">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="section-heading">
                  <Skeleton
                    variant="text"
                    width={450}
                    height={90}
                    className="section_head"
                  />
                  <Skeleton variant="rectangular" width={460} height={248} />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="right-para">
                  <Skeleton variant="rectangular" width={430} height={400} />
                  <Skeleton
                    variant="rounded"
                    width={203}
                    height={42}
                    style={{ marginTop: 20 }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

AboutAMC.propTypes = {
  role: PropTypes.number.isRequired,
};

export default AboutAMC;
