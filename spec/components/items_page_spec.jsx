import React from "react/addons";
import { reactor } from "../../frontend/javascripts/app";
import ItemsPage from "../../frontend/javascripts/components/items_page.jsx";

const TestUtils = React.addons.TestUtils;

describe("ItemsPage", () => {
  const renderer = TestUtils.createRenderer();

  const render = () => {
    renderer.render(<ItemsPage />);
    return renderer.getRenderOutput();
  };

  afterEach(() => {
    reactor.reset();
  });

  it("renders correctly", () => {
    reactor.loadState({
      items: [
        { id: 1, value: "Walk the dog" },
        { id: 2, value: "Do the laundry" },
        { id: 3, value: "Get some cabbage" }
      ]
    });

    const element = render();

    expect(element).toMatchElement(
      <ul className="items">
        <li key="1">Walk the dog</li>
        <li key="2">Do the laundry</li>
        <li key="3">Get some cabbage</li>
      </ul>
    );
  });
});
