import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

class StocklyApi {
  // Starter request function
  // inputs: endpoint, params/data, HTTP verb (defaults to GET)
  static async request(endpoint, params = {}, verb = "get") {
    let _token = localStorage.getItem("stockly-token");

    console.debug("API Call:", endpoint, params, verb);

    let req;

    if (verb === 'get') {
      req = axios.get(
        `${BASE_URL}/${endpoint}`, { params: { _token, ...params }});
    } else if (verb === 'post') {
      req = axios.post(
        `${BASE_URL}/${endpoint}`, { _token, ...params });
    }

    try {
      return (await req).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getTransactions(userId){
    let res = await this.request("transactions", { userId });
    return res.transactions;
  }

  /** Request to Buy a Stock for Given User
   * 
   * Params: { "ticker_symbol": "GPS","shares": 4, "price": 25, "_token": "xxx" }
   */
  static async buyStock(data) {
    let res = await this.request("transactions", { ...data }, 'post');
    return res.transaction;
  }

  
}

export default StocklyApi;