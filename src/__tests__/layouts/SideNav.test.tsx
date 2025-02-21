import { screen, render } from "@testing-library/react";
import { act } from "react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { axe, toHaveNoViolations } from "jest-axe";

import SideNav from "@/app/components/SideNav";

jest.mock("next/router", () => require("next-router-mock"));

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

    const routingLinks = [
      { linkName: "Main Page", href: "/" },
      { linkName: "NBA Dashboard", href: "/nba-dashboard" },
      { linkName: "NFL Dashboard", href: "/nfl-dashboard" },
      { linkName: "MLB Dashboard", href: "/mlb-dashboard" },
      { linkName: "Soccer Dashboard", href: "/soccer-dashboard" },
    ];

    beforeEach(async () => {
      mockRouter.setCurrentUrl("/");
      const renderResult = render(<SideNav />, {
        wrapper: MemoryRouterProvider,
      });
      container = renderResult.container;
      const toggleButton = screen.getByRole("button", { name: "openSideNav" });
      await userEvent.click(toggleButton);
    });

    test("SideNav should be visible", async () => {
      const navElement = screen.getByRole("navigation");
      expect(navElement).toBeVisible();
    });

    it.each(routingLinks)(
      "Should render and verify the $linkName link",
      ({ linkName, href }) => {
        const testLink = screen.getByRole("link", { name: linkName });
        expect(testLink).toBeInTheDocument();
        expect(testLink).toHaveAttribute("href", href);
      }
    );

    it.each(routingLinks)(
      "Clicking the $linkName link should navigate to $href",
      async ({ linkName, href }) => {
        const testLink = screen.getByRole("link", { name: linkName });

        await userEvent.click(testLink);

        act(() => {
          mockRouter.push(href);
        });

        expect(mockRouter.asPath).toEqual(href);
      }
    );

    test("Page should be accessible", async () => {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
