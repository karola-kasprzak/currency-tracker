import axios from "axios";

const NBPapi = "http://api.nbp.pl/api/exchangerates/tables/a?format=json";

export function getNBPCurrencyData() {
    return axios.get(NBPapi);
}
