import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each toppings option from server", async () => {
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
