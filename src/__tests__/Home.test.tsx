import { screen, render } from "@testing-library/react";

import Home from "@/app/page";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("<Home />", () => {
  test("It should render Home component", () => {
    render(<Home />);
    expect(screen.getByText("Learn")).toBeInTheDocument();
  });

  test("It should be accessible", async () => {
    const { container } = render(<Home />);
    const results = await axe(container);

    expect(results).toHaveNoViolations;
  });
});
