import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("Update Scoop Subtotal When Scoops Change", async () => {
  render(<Options optionType="scoops" />);

  // Make Sure Total Starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // Update Vanilla Scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // Update Chocolate Scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("Update Toppings Subtotal When Toppings Change", async () => {
  // render parent component
  render(<Options optionType="toppings" />);

  // make sure total starts out at $0.00
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  // add cherries and check subtotal
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");

  // add hot fudge and check subtotal
  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot fudge" });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("3.00");

  // remove hot fudge and check subtotal
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");
});
