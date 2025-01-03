import Navbar from "./Navbar";
import { render } from "setupTests";

describe("Navbar", () => {
  it("renders with default props", async () => {
    const Component = await Navbar({});
    render(Component);
  });
});
