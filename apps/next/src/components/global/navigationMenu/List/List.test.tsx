import React from "react";

import List from "./List";
import { render } from "setupTests";
import { NavigationMenu } from "ui/navigation-menu";

describe("List", () => {
  it("renders with default props", () => {
    render(
      <NavigationMenu>
        <List items={[]} value="" setValue={() => {}} />
      </NavigationMenu>
    );
  });
});
