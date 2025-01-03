import React from "react";

import VerticalNavigationMenu from "./VerticalNavigationMenu";
import { render } from "setupTests";
import { NavigationMenu } from "ui/navigation-menu";

describe("VerticalNavigationMenu", () => {
  it("renders with default props", () => {
    render(
      <NavigationMenu>
        <VerticalNavigationMenu items={[]} />
      </NavigationMenu>
    );
  });
});
