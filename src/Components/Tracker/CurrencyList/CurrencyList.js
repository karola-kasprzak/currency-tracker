import React from "react";
import RemoveButton from "../RemoveButton/RemoveButton";

function CurrencyList(props) {
    const currencyDisplayList = props.userCurrencies.map((item, index) => {
        return (
            <div
                className="row my-3 border border-light rounded bg-white"
                key={index}
            >
                <span className="col-2">{item.code}</span>
                <span className="col-5 col-sm-6">{item.currency}</span>
                <span className="col-3"> {item.mid}</span>
                <RemoveButton
                    className="col-1"
                    confirmAction={props.remove}
                    currencyCode={item.code}
                    description=""
                />
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-10 col-xl-8"> {currencyDisplayList}</div>
            </div>
        </div>
    );
}

export default CurrencyList;
