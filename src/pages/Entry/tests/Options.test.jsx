import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

it("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

it("displays image for each toppings option from server", async () => {
  // Mock Services worker will return three toppings from the server
  render(<Options optionType="toppings" />);

  // find images, expect 3 based on what msw returns
  const images = await screen.findAllByRole("img", { name: /toppings$/i });
  expect(images).toHaveLength(3);

  // confirm alt text of images
  // @ts-ignore
  const imageTitles = images.map((img) => img.alt);
  expect(imageTitles).toEqual([
    "Cherries toppings",
    "M&Ms toppings",
    "Hot fudge toppings",
  ]);
});

it("Don't update total if scoops input is invalid", async () => {
  render(<Options optionType="scoops" />);

  // expect button to be enabled after adding scoop
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");

  // make sure scoops subtotal hasn't updated
  const scoopsSubtotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsSubtotal).toBeInTheDocument();
});
