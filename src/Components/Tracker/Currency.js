import React, { Component } from "react";
import { getNBPCurrencyData } from "./NBPCurrencyAPI";

export default class Currency extends Component {
    constructor() {
        super();

        this.state = {
            currencyRates: [],
            effectiveDate: "",
            // currencyList: [],
            userCurrencies: [],
        };
    }

    componentDidMount() {
        getNBPCurrencyData()
            .then((response) => {
                this.setState({
                    currencyRates: response.data[0].rates,
                    effectiveDate: response.data[0].effectiveDate,
                });
            })
            .catch((err) => console.log(err.message));
    }

    render() {
        const { currencyRates, effectiveDate } = this.state;

        // console.log(effectiveDate, currencyRates);

        const currencyDisplayList = currencyRates.map((item, index) => {
            return (
                <div
                    className="w-75 d-flex justify-content-between"
                    key={index}
                >
                    <span className="pr-3">{item.code}</span>
                    <span className="pr-3">{item.currency}</span>
                    <span> {item.mid}</span>
                </div>
            );
        });

        return (
            <div>
                <p>Rates as of {effectiveDate}</p>

                <div>{currencyDisplayList}</div>
            </div>
        );
    }
}
