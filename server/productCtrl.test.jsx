import { describe, it, expect, vi, afterEach} from "vitest";
import productCtrl from "./src/controllers/productCtrl.js";
import Product from "./src/models/Product.js";

vi.mock("./src/models/Product.js");


afterEach(() => {
  vi.clearAllMocks();
});

describe("productCtrl.getById", () => {
  it("should return 404 when product does not exist", async () => {
    Product.findById.mockResolvedValue(null);

    const req = {
      params: {
        id: "507f1f77bcf86cd799439011",
      },
    };

    const res = {};

    const next = vi.fn();

    await productCtrl.getById(req, res, next);

    expect(next).toHaveBeenCalled();

    const error = next.mock.calls[0][0];

    expect(error.statusCode).toBe(404);
    expect(next).toHaveBeenCalledTimes(1);
    expect(error.message).toBe("Product not found");
  });

  it("should return 200 when product exists", async () => {
    const product = {
      _id: "507f1f77bcf86cd799439011",
      title: "Laptop",
      price: 100,
    };

    Product.findById.mockResolvedValue(product);

    const req = {
      params: {
        id: "507f1f77bcf86cd799439011",
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    await productCtrl.getById(req, res, next);
    expect(Product.findById).toHaveBeenCalledWith(req.params.id);
    expect(Product.findById).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      data: product,
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("should call next on db error", async () => {
    Product.findById.mockRejectedValue(new Error("DB error"));

    const req = { params: { id: "123" } };
    const res = {};
    const next = vi.fn();

    await productCtrl.getById(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
