import axios from "axios";

const NBPapi =
    "https://cors-anywhere.herokuapp.com/http://api.nbp.pl/api/exchangerates/tables/a?format=json";

export function getNBPCurrencyData() {
    return axios.get(NBPapi);
}
