import React, { Component } from "react";
import { getNBPCurrencyData } from "./NBPCurrencyAPI";

import { Button } from "react-bootstrap";

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

    addToUserCurrencies = (item) => {
        let newUserCurrencies = this.state.userCurrencies;
        newUserCurrencies.push(item);
        this.setState({
            userCurrencies: newUserCurrencies,
        });
        console.log("added!");
    };

    clearUserCurrencies = () => {
        this.setState({
            userCurrencies: [],
        });
        console.log("cleared!");
    };

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
                <div className="d-flex justify-content-between" key={index}>
                    <span className="pr-3">{item.code}</span>
                    <span className="pr-3">{item.currency}</span>
                    <span> {item.mid}</span>
                    <Button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash"
                            viewBox="0 0 16 16"
                        >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                                fill-rule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                        </svg>
                    </Button>
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
                    <Button onClick={this.addToUserCurrencies}>
                        Add Currency
                    </Button>
                </div>
                <Button onClick={this.clearUserCurrencies}>Remove All</Button>
                <div>{currencyDisplayList}</div>
            </div>
        );
    }
}
