import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";

import SideNav from "@/app/components/SideNav";

expect.extend(toHaveNoViolations);

describe("<SideNav />", () => {
  describe("When SideNav is closed", () => {
    let container;

    beforeEach(async () => {
      const renderResult = render(<SideNav />);
      container = renderResult.container;
    });

    test("SideNav should not be visible", async () => {
      const navElement = screen.queryByRole("navigation");
      expect(navElement).toBeNull();
    });

    test("Page should be accessible", async () => {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("When SideNav is open", () => {
    let container;

    beforeEach(async () => {
      const renderResult = render(<SideNav />);
      container = renderResult.container;
      const toggleButton = screen.getByRole("button", { name: "openSideNav" });
      await userEvent.click(toggleButton);
    });

    test("SideNav should be visible", async () => {
      const navElement = screen.getByRole("navigation");
      expect(navElement).toBeVisible();
    });

    test("Page should be accessible", async () => {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
