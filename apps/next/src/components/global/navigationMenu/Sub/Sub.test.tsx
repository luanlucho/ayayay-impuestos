import { Edit2 } from "lucide-react";
import React from "react";

import Sub from "./Sub";
import { render } from "setupTests";
import { NavigationMenu } from "ui/navigation-menu";

describe("Sub", () => {
  it("renders with default props", () => {
    render(
      <NavigationMenu>
        <Sub
          item={{ href: "", icon: Edit2, items: [], title: "" }}
          parentSetValue={() => {}}
          parentValue=""
        />
      </NavigationMenu>
    );
  });
});
