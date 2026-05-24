import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen  } from "@testing-library/react";
import axios from "axios";
import * as api from "../services/apirequest";
import ProductList from "../pages/ProductList";
import { MemoryRouter } from "react-router-dom";

vi.mock("axios");

//check to searchProductsByQuery function when query is empty it should not send request and return empty array
describe("testSearchProductsByQuery", () => {
  it("should not send request when query is empty", async () => {
    const result = await api.searchProductsByQuery("");

    expect(axios.get).not.toHaveBeenCalled();

    expect(result).toEqual([]);
  });
});

//check to productlist function when there is no products it should show empty state
describe("ProductList", () => {
  it("shows empty state", async () => {
    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>,
    );

    const text = await screen.findByText("No products found");

    expect(text).toBeTruthy();
  });
});