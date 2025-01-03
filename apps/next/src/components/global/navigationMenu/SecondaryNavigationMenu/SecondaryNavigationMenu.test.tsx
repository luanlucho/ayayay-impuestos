import React from "react";

import SecondaryNavigationMenu from "./SecondaryNavigationMenu";
import { render } from "setupTests";
import { NavigationMenu } from "ui/navigation-menu";

vi.mock("next/navigation", () => ({
  usePathname: () => "/customers"
}));

describe("SecondaryNavigationMenu", () => {
  it("renders with default props", () => {
    render(
      <NavigationMenu>
        <SecondaryNavigationMenu items={[]} basePath="/" />
      </NavigationMenu>
    );
  });
});
