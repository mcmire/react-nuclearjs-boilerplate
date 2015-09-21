import Backbone from "backbone";
import "./app";
import Router from "./router.jsx";

new Router();
Backbone.history.start({ pushState: true, hashChange: false });
