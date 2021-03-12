import axios from "axios";

const NBPapi = "http://api.nbp.pl/api/exchangerates/tables/a?format=json";

export function getNBPCurrencyData() {
    return axios.get(NBPapi, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}
