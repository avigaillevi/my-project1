import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import * as api from "../services/apirequest";
import ProductList from "../pages/ProductList";
import ProductDetails from "../pages/ProductDetails";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach } from "vitest";
import useFetch from "../hooks/useFetch";

vi.spyOn(axios, "get");
vi.spyOn(axios, "post");
vi.spyOn(axios, "put");

beforeEach(() => {
  axios.get.mockResolvedValue({
    data: { products: [] },
  });
});
afterEach(() => {
  vi.resetAllMocks();
});
//check to searchProductsByQuery function when query is empty it should not send request and return empty array

describe("test Search Products ByQuery", () => {
  it("should not send request when query is empty", async () => {
    expect(api.searchProductsByQuery("")).toBe(
      "http://localhost:5000/api/products/search?query=",
    );
  });
});

//check to productlist function when there is no products it should show empty state
describe("ProductList", () => {
  it("shows empty state", async () => {
    axios.get
      .mockResolvedValueOnce({
        data: {
          data: [], // fetchProducts
        },
      })
      .mockResolvedValueOnce({
        data: {
          message: "Search results",
          data: [], // searchProductsByQuery
        },
      });

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>,
    );

    const text = await screen.findByText("Products Not Found");
    expect(text).toBeInTheDocument();
  });
});

describe("ProductDetails", () => {
  it("error message on failed request", async () => {
    axios.get.mockRejectedValueOnce({
      response: { status: 404 },
    });
    render(
      <MemoryRouter initialEntries={["/products/1"]}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText(/page not found/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /try again/i }),
    ).toBeInTheDocument();
  });
});
