import React from 'react';
import "./Home.scss";
import OptionBar from "@/component/layout/OptionBar/OptionBar";
import backgroundIllustrationSvg from "@/styles/images/background-images/home-pg/home-illustration-bg.svg";

export default function Home() {
  return (
    <section className="home">
      <img src={backgroundIllustrationSvg} className="home__bg_img" alt="Home Background" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <header className="home__header">
              <h1 className="home__header__title">
                Рассчитайте<br />стоимость доставки из Китая</h1>
            </header>
          </div>
        </div>
      </div>
      <OptionBar />
    </section>
  );
}