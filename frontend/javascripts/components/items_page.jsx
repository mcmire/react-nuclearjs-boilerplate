import React from "react";
import { reactor, getters } from "../app";

export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      items: getters.allItems
    };
  },

  render() {
    const items = this.state.items.map((item) => {
      return (
        <li key={item.get("id")}>
          {item.get("value")}
        </li>
      );
    }).toArray();

    return (
      <ul className="items">
        {items}
      </ul>
    );
  }
});
