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

        //create a currency list
        // let currencyList = [];
        // currencyRates.forEach((item) => currencyList.push(item.currency));
        // console.log(currencyList);

        //currency select
        const currencySelectOptions = currencyRates.map((item) => {
            return (
                <option key={item.code} value={item.code}>
                    {item.currency}
                </option>
            );
        });

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
                <div className="form-group">
                    <label htmlFor="currencySelect">
                        Add a currency to track:
                    </label>
                    <select className="form-control" id="currencySelect">
                        {currencySelectOptions}
                    </select>
                </div>
                <div>{currencyDisplayList}</div>
            </div>
        );
    }
}
