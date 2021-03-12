import React, { Component } from "react";
import { getNBPCurrencyData } from "./NBPCurrencyAPI";

export default class Currency extends Component {
    constructor() {
        super();

        this.state = {
            gitHubJobs: [],
        };
    }

    componentWillMount() {
        getNBPCurrencyData()
            .then((response) => {
                this.setState({
                    gitHubJobs: response.data,
                });
            })
            .catch((err) => console.log(err.message));
    }

    render() {
        const { gitHubJobs } = this.state;

        console.log(gitHubJobs);

        const gitHubJobsList = gitHubJobs.map((item, index) => {
            return <div key={`${item.title}${index}`}>{item.title}</div>;
        });

        return <div>{gitHubJobsList}</div>;
    }
}
