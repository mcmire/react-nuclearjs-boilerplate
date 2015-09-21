import http from "../frontend/javascripts/http";
import network from "../frontend/javascripts/network";

describe("Network", () => {
  describe("#fetchItems", () => {
    it("uses popsicle to make a request to the /items endpoint", () => {
      spyOn(http, "makeRequest");

      network.fetchItems();

      expect(http.makeRequest).toHaveBeenCalledWith({
        method: "GET",
        url: "/items",
        headers: {
          type: {
            "Accept": "application/json"
          }
        }
      });
    });

    it("returns the same thing that http#makeRequest returns", () => {
      const expectedPromise = { a: "promise" };
      spyOn(http, "makeRequest").and.returnValue(expectedPromise);

      expect(network.fetchItems()).toBe(expectedPromise);
    });
  });
});
