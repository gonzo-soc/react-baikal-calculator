import React, { Component } from 'react';
import "./Home.scss";
import OptionBar from "@/component/layout/OptionBar/OptionBar";

export default class Home extends Component {
  constructor() {
    super();
    this.onHandleNext = this.onHandleNext.bind(this);
  }

  onHandleNext() {

  }

  render() {
    return (
      <section className="home">
        <header className="home__header">
          <h1 className="home__header__title">
            Рассчитайте<br />стоимость доставки из Китая</h1>
        </header>
        <OptionBar />
      </section>
    );
  }
}