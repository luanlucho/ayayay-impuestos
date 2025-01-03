import React from "react";

import ConfirmationModal from "./ConfirmationModal";
import { render } from "setupTests";

describe("ConfirmationModal", () => {
  it("renders with default props", () => {
    render(
      <ConfirmationModal
        title="Are you sure?"
        description="Are you sure you want to continue?"
        formName=""
      >
        <button>test</button>
      </ConfirmationModal>
    );
  });
});
