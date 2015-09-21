import { Reactor } from "nuclear-js";

// Import any stores here. For example:
import ItemStore from "./stores/item_store";

const reactor = new Reactor({ debug: true });

reactor.registerStores({
  // Register stores here. For example:
  items: ItemStore
});

export default reactor;
