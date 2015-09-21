import reactor from "./reactor";
import network from "./network";

// Import action types here. For example:
import { RECEIVE_ITEMS } from "./action_types";

export default {
  // Add methods for performing actions here. For example:
  fetchItems() {
    return network.fetchItems().then((response) => {
      let items = response.body;
      reactor.dispatch(RECEIVE_ITEMS, { items: items });
    });
  }
};
