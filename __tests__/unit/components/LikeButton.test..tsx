import LikeButton from "@/components/LikeButton";
import { render, screen, userEvent } from "@testing-library/react-native";
describe("Like Button", () => {
  it("Renders an Icon", async () => {
    //Arrange
    const button = <LikeButton liked={false} />;
    render(button);
    // Act
    const test = screen.getByRole("button");
    //Assert
    expect(test).toBeOnTheScreen();
  });

  it("Flips liked to true when pressed and liked is false", async () => {
    render(<LikeButton liked={false} />);
    const user = userEvent.setup();

    const button = screen.getByRole("button");

    user.press(button);
    console.log(button);
    expect(button).toHaveProp("liked", true);
  });
});
