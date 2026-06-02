import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import * as api from "../services/apirequest";
import ProductList from "../pages/ProductList";
import { MemoryRouter } from "react-router-dom";
import {beforeEach} from "vitest";

vi.mock("axios");
beforeEach(() => {
  axios.get.mockResolvedValue({ data: { products: [] } });
});
//check to searchProductsByQuery function when query is empty it should not send request and return empty array

describe("testSearchProductsByQuery", () => {
  it("should not send request when query is empty", async () => {
    const result = api.searchProductsByQuery("");

    expect(result).toBe("https://dummyjson.com/products/search?limit=10&q=");
    expect(axios.get).not.toHaveBeenCalled();
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

    const text = await screen.findByText("Products Not Found");

    expect(text).toBeInTheDocument();
  });
});
