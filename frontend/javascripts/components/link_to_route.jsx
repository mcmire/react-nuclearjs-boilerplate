import React from "react";
import Backbone from "backbone";

export default React.createClass({
  propTypes: {
    children: React.PropTypes.any,
    href: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <a href="#" onClick={this._onClick}>
        {this.props.children}
      </a>
    );
  },

  _onClick() {
    Backbone.history.navigate(this.props.href, true);
  }
});
