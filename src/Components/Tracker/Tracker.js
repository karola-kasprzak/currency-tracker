import React from "react";
import data from "./data";
import Currency from "./Currency";

let currencyData = Object.keys(data.rates).map((key) => {
    return {
        currency: data.rates[key].currency,
        code: data.rates[key].code,
        mid: data.rates[key].mid,
    };
});
console.log(currencyData);

class Tracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    render() {
        return (
            <div>
                <h1>Witaj, świecie!</h1>
                <h2>Aktualny czas: {this.state.date.toLocaleTimeString()}.</h2>
                <Currency />
            </div>
        );
    }
}

export default Tracker;
