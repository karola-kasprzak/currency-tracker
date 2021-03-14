import React, { Component } from "react";
import { getNBPCurrencyData } from "./API/NBPCurrencyAPI";
import RemoveButton from "./RemoveButton/RemoveButton";
import CurrencyList from "./CurrencyList/CurrencyList";
import { Button } from "react-bootstrap";

export default class Tracker extends Component {
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
        // console.log(newUserCurrencies);
    };

    removeAllUserCurrencies = () => {
        this.setState({
            userCurrencies: [],
        });
    };

    removeUserCurrency = (currency) => {
        let removeCurrencyCode = currency;
        let newUserCurrencies = this.state.userCurrencies.filter(
            (element) => element.code !== removeCurrencyCode
        );

        this.setState({
            userCurrencies: newUserCurrencies,
        });
    };

    handleSelect = (e) => {
        let selectValue = e.target.value;
        this.setState({ selectedCurrency: selectValue });
        // console.log(`Selected ${selectValue}`);
    };

    handleShowAll = () => {
        let allCurrencies = this.state.currencyRates;
        this.setState({
            userCurrencies: allCurrencies,
        });
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

        //currency select options
        const currencySelectOptions = currencyRates.map((item) => {
            return (
                <option key={item.code} value={item.code}>
                    {item.currency}
                </option>
            );
        });

        //currency select
        const currencySelectDropdown = () => {
            return (
                <select
                    className="form-control w-50 mr-3"
                    id="currencySelect"
                    onChange={this.handleSelect}
                >
                    <option value="null">-- Select a currency --</option>
                    {currencySelectOptions}
                </select>
            );
        };

        return (
            <div className="mt-4">
                <p className="text-muted py-3">Rates as of {effectiveDate}</p>
                <div className="d-flex">
                    {currencySelectDropdown()}
                    <Button
                        className="btn-secondary"
                        onClick={this.addToUserCurrencies}
                    >
                        Add Currency
                    </Button>
                </div>
                <div className="my-3">
                    <Button
                        className="btn-secondary mr-3"
                        onClick={this.handleShowAll}
                    >
                        Show All
                    </Button>
                    <RemoveButton
                        confirmAction={this.removeAllUserCurrencies}
                        currencyCode=""
                        description="Remove All"
                    />
                </div>
                <CurrencyList
                    userCurrencies={userCurrencies}
                    remove={this.removeUserCurrency}
                />
            </div>
        );
    }
}
