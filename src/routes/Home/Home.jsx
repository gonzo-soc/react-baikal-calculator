import React, { Component } from 'react';
import "./Home.scss";
import OptionBar from "../../components/OptionBar/OptionBar";

export default class Home extends Component {
    constructor() {
        super();
        this.onHandleNext = this.onHandleNext.bind(this);
    }

    onHandleNext() {

    }
    
    render() {
        return (
            <section className="app__home">
                <header className="home__header">
                    <div className="container-fluid px-0">
                        <div className="row">
                            <div className="col-md-7">
                                <h1 className="home__header__title">
                                    Рассчитайте<br/>
                                    стоимость доставки из Китая
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>
                <OptionBar />
            </section>
        ); 
    }
}