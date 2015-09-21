import { Store, toImmutable } from "nuclear-js";
import { RECEIVE_ITEMS } from "../action_types";

function loadItems(currentState, { items }) {
  return currentState.withMutations((state) => {
    items.forEach((item) => {
      state.set(item.id, toImmutable(item));
    });
  });
}

export default Store({
  getInitialState() {
    return toImmutable({});
  },

  initialize() {
    this.on(RECEIVE_ITEMS, loadItems);
  }
});
