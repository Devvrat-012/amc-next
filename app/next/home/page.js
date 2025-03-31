import React from "react";

import BannerSlide from "@/app/components/amchome/screen/home/BannerSlide";
import LOGIN_TYPE from "@/app/constants/loginType";
import HomeBody from "../../components/amchome/screen/home/HomeBody";


function Home() {
  return (
      <div className="header-css">
        <BannerSlide role={LOGIN_TYPE.CANDIDATE} />
        <HomeBody />
      </div>
  );
}

export default Home;
