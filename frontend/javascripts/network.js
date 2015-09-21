import http from "./http";

export default {
  // Add methods to make HTTP requests here. For example:
  fetchItems() {
    return http.makeRequest({
      method: "GET",
      url: "/items",
      headers: {
        type: {
          "Accept": "application/json"
        }
      }
    });
  }
};
