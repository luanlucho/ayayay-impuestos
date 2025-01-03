import React from "react";

import DialogContent from "./DialogContent";
import { render } from "setupTests";
import { Dialog } from "ui/dialog";

describe("DialogContent", () => {
  it("renders with default props", () => {
    render(
      <Dialog>
        <DialogContent>Test</DialogContent>
      </Dialog>
    );
  });
});
