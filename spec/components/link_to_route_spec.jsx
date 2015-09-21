import React from "react";
import TestUtils from "react/lib/ReactTestUtils";
import Backbone from "backbone";
import LinkToRoute from "../../frontend/javascripts/components/link_to_route.jsx";

describe("LinkToRoute", () => {
  describe("when clicked", () => {
    it("navigates to the Backbone route that corresponds to the href", () => {
      let linkToRoute = TestUtils.renderIntoDocument(
        <LinkToRoute href="/foo">
          Here is the link text
        </LinkToRoute>
      );
      spyOn(Backbone.history, "navigate");

      TestUtils.Simulate.click(linkToRoute.getDOMNode());

      expect(Backbone.history.navigate).toHaveBeenCalledWith("/foo", true);
    });
  });
});
