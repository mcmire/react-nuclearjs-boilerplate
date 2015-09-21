import { Promise } from "es6-promise";
import { actions, getters, reactor } from "../frontend/javascripts/app";
import network from "../frontend/javascripts/network";

describe("The entire app", () => {
  describe("actions", () => {
    afterEach(() => {
      reactor.reset();
    });

    describe("fetchItems", () => {
      it("loads the items into the ItemStore", (done) => {
        const items = [
          { id: 1, first: "item" },
          { id: 2, second: "item" }
        ];
        const response = { status: 200, body: items };
        const promiseForResponse = Promise.resolve(response);
        spyOn(network, "fetchItems")
          .and.returnValue(promiseForResponse);

        actions.fetchItems().then(() => {
          expect(reactor.evaluateToJS(getters.allItems)).toEqual({
            1: items[0],
            2: items[1]
          });
          done();
        });
      });
    });
  });
});
