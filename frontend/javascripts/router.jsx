import Backbone from "backbone";
import React from "react";
import app from "./app";

// Import any page components here. For example:
import ItemsPage from "./components/items_page.jsx";

var Router = Backbone.Router.extend({
  routes: {
    // Add routes here. For example:
    "": "showAllItems"
  },

  initialize() {
    this.app = document.querySelector("[data-role='app']");
  },

  // Add methods for routes here. For example:
  showAllItems() {
    console.log("Fetching all items...");
    app.actions.fetchItems();
    React.render(<ItemsPage />, this.app);
  }
});

export default Router;
