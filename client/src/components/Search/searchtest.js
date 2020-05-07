import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Search } from "./index";

it("renders correctly", () => {
  const { queryByTestId, queryByPlaceholderText } = render(<Search />);

  expect(queryByTestId("button")).toBeTruthy();
});

describe("Input value", () => {
  it("updates on change", () => {
    const { queryByPlaceholderText } = render(<Search />);
    const searchInput = queryByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput.value).toBe("test");
  });
});
