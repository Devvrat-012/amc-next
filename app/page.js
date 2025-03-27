"use client";
import React from "react";

import Header from "@/app/components/header";

import BannerSlide from "@/app/components/amchome/screen/home/BannerSlide";
import LOGIN_TYPE from "@/app/constants/loginType";
import HomeBody from "./components/amchome/screen/home/HomeBody";
import { Provider } from "react-redux";
import store from "./redux/store";

function Home() {
  return (
    <Provider store={store}>
      <div className="header-css">
        <Header />
        <BannerSlide role={LOGIN_TYPE.CANDIDATE} />
        <HomeBody />
      </div>
    </Provider>
  );
}

export default Home;
