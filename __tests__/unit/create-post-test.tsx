import { render, screen, userEvent } from "@testing-library/react-native";

import { default as Create, default as submit } from "@/app/(tabs)/create";

describe("<Create />", () => {
  test("Text renders correctly on the Create page", () => {
    const { getByText } = render(<Create />);

    getByText("Create your own Post");
    expect(screen.getByRole("heading")).toBeOnTheScreen();
  });

  test("Loads the image element on the page", () => {
    render(<Create />);
    screen.getByTestId("uploadImage");
  });
});

describe("Create Functions", () => {
  test("Submit function runs when the submit button is clicked", async () => {
    render(<Create />);
    const button = screen.getByTestId("submitButton");
    const user = userEvent.setup();
    await user.press(button);

    // Mock the functions within submit

    expect(submit).toHaveBeenCalled();
  });
});
