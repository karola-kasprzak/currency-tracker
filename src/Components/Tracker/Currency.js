import React, { Component } from "react";
import { getNBPCurrencyData } from "./NBPCurrencyAPI";
import RemoveButton from "./RemoveButton/RemoveButton";
import { Button, Modal } from "react-bootstrap";

export default class Currency extends Component {
    constructor() {
        super();

        this.state = {
            currencyRates: [],
            effectiveDate: "",
            userCurrencies: [],
            selectedCurrency: null,
            showModal: false,
        };
    }

    addToUserCurrencies = () => {
        let newUserCurrencies = this.state.userCurrencies;
        let selectedCurrency = this.state.currencyRates.find(
            (element) => element.code === this.state.selectedCurrency
        );
        //currency rate is pushed to array if it is not undefined and not already present in the array
        if (
            selectedCurrency !== undefined &&
            newUserCurrencies.findIndex(
                (element) => element.code === this.state.selectedCurrency
            ) < 0
        ) {
            newUserCurrencies.push(selectedCurrency);
        }

        this.setState({
            userCurrencies: newUserCurrencies,
        });
        console.log(newUserCurrencies);
    };

    clearUserCurrencies = () => {
        this.setState({
            userCurrencies: [],
        });
        console.log("all cleared!");
    };

    removeUserCurrency = (e) => {
        let removeCurrencyCode = e.target.getAttribute("currencyCode");
        console.log(removeCurrencyCode);
        let newUserCurrencies = this.state.userCurrencies.filter(
            (element) => element.code !== removeCurrencyCode
        );

        this.setState({
            userCurrencies: newUserCurrencies,
        });
        console.log(newUserCurrencies);
    };

    handleSelect = (e) => {
        let selectValue = e.target.value;
        this.setState({ selectedCurrency: selectValue });
        console.log(`Selected ${selectValue}`);
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
        const { currencyRates, userCurrencies, effectiveDate } = this.state;

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

        const currencyDisplayList = userCurrencies.map((item, index) => {
            return (
                <div className="d-flex justify-content-between" key={index}>
                    <span className="pr-3">{item.code}</span>
                    <span className="pr-3">{item.currency}</span>
                    <span> {item.mid}</span>
                    <RemoveButton
                        confirmAction={this.clearUserCurrencies}
                        currencyCode={item.code}
                        description=""
                    />
                </div>
            );
        });

        return (
            <div>
                <p>Rates as of {effectiveDate}</p>
                <RemoveButton
                    confirmAction={this.clearUserCurrencies}
                    currencyCode=""
                    description="Remove All"
                />
                <div className="form-group">
                    <label htmlFor="currencySelect">
                        Add a currency to track:
                    </label>
                    <select
                        className="form-control"
                        id="currencySelect"
                        onChange={this.handleSelect}
                    >
                        <option value="null">---</option>
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
