import React from "react";

import ListItemLink from "./ListItemLink";
import { render } from "setupTests";
import { NavigationMenu } from "ui/navigation-menu";

describe("ListItemLink", () => {
  it("renders with default props", () => {
    render(
      <NavigationMenu>
        <ListItemLink href="/">Home</ListItemLink>
      </NavigationMenu>
    );
  });
});
