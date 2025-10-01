import App from "./App";
import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { vi } from "vitest";
import {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getCartItems,
  addItemToCart,
  checkout,
} from "./services/products";
import type { Product } from "./types/types";

vi.mock("./services/products.ts");

const user = userEvent.setup();

const mockedProductService = vi.mocked(
  {
    getProducts,
    addProduct,
    editProduct,
    deleteProduct,
    getCartItems,
    addItemToCart,
    checkout,
  },
  true
);

afterEach(() => {
  vi.resetAllMocks();
});

const mockedProductsList: Product[] = [
  // {
  //   _id: "1",
  //   title: "Apple Watch",
  //   price: 299.99,
  //   quantity: 3,
  // },
  {
    _id: "2",
    title: "Mario Kart Lego",
    price: 199.99,
    quantity: 4,
  },
];

const mockedCart: Product[] = [
  {
    _id: "2",
    title: "Mario Kart Lego",
    price: 199.99,
    quantity: 1,
  },
];

describe("App component testing", () => {
  // it("Displays product in prodcut list, and item in cart on initial render", async () => {
  //   mockedProductService.getProducts.mockResolvedValue(mockedProductsList);
  //   mockedProductService.getCartItems.mockResolvedValueOnce(mockedCart);
  //   render(<App />);

  //   const productSection = screen.getByRole("main");
  //   const productQueries = within(productSection);
  //   expect(await productQueries.findByText(/Mario Kart Lego/i)).toBeInTheDocument();

  //   const cart = screen.getByRole("table");
  //   const cartQueries = within(cart);
  //   expect(cartQueries.getByText(/Mario Kart Lego/i)).toBeInTheDocument();
  // });

  // it("Displays 'Your Cart is Empty' when no items in cart", async () => {
  //   const emptyCart: Product[] = [];
  //   mockedProductService.getProducts.mockResolvedValue(mockedProductsList);
  //   mockedProductService.getCartItems.mockResolvedValue(emptyCart);
  //   render(<App />);

  //   const cart = screen.getByRole("table");
  //   const cartQueries = within(cart);
  //   expect(cartQueries.getByText(/Your Cart is Empty!/i));
  // });

  // it("Displays new product in product list when added", async () => {
  //   const newItem = {
  //     _id: "4",
  //     title: "Nintendo Switch 2",
  //     price: 499.99,
  //     quantity: 3,
  //   };

  //   mockedProductService.getProducts
  //     .mockResolvedValueOnce(mockedProductsList)
  //     .mockResolvedValueOnce([...mockedProductsList, newItem]);
  //   mockedProductService.getCartItems.mockResolvedValueOnce(mockedCart);
  //   mockedProductService.addProduct.mockResolvedValue(newItem);

  //   render(<App />);
  //   expect(screen.queryByText(/Nintendo/i)).not.toBeInTheDocument();

  //   const productListings = screen.getByRole("main");
  //   const productListingQueries = within(productListings);
  //   expect(
  //     await productListingQueries.findByText(/Mario Kart Lego/i)
  //   ).toBeInTheDocument();
  //   expect(
  //     await productListingQueries.findByText(/Mario Kart Lego/i)
  //   ).toBeInTheDocument();

  //   const addProductButton = screen.getByRole("button", {
  //     name: /Add A Product/i,
  //   });
  //   expect(addProductButton).toBeVisible();
  //   await user.click(addProductButton);

  //   const cancelButton = screen.getByRole("button", { name: /Cancel/i });
  //   expect(cancelButton).toBeVisible();

  //   const nameInput = screen.getByRole("textbox", { name: /Product Name:/i });
  //   const priceInput = screen.getByRole("spinbutton", { name: /Price:/i });
  //   const quantityInput = screen.getByRole("spinbutton", {
  //     name: /Quantity:/i,
  //   });

  //   await user.type(nameInput, "Nintendo Switch 2");
  //   await user.type(priceInput, "499.99");
  //   await user.type(quantityInput, "3");
  //   screen.debug();

  //   const addButton = screen.getByRole("button", { name: "Add" });
  //   await user.click(addButton);
  //   expect(mockedProductService.addProduct).toHaveBeenCalled();
  //   screen.debug();

  //   expect(await screen.findByText(/Nintendo Switch 2/i)).toBeInTheDocument();

  //   expect(screen.getByText("Add A Product")).toBeInTheDocument()
  // });

  it("Dispays new value of updated product", async () => {
    const updatedProduct: Product = {
      _id: "2",
      title: "Mario Kart Lego",
      price: 149.99,
      quantity: 10,
    }
    mockedProductService.getProducts
      .mockResolvedValueOnce(mockedProductsList)
      .mockResolvedValueOnce([updatedProduct]); 
    mockedProductService.getCartItems.mockResolvedValue(mockedCart)
    render(<App />)

    await screen.findByText("199.99")
    const editButton = await screen.findByRole('button', { name: "Edit"});
    await user.click(editButton)

    // const nameInput = screen.getByRole("textbox", { name: "Product Name:"})
    const priceInput = screen.getByRole("spinbutton", { name: "Price:"})
    const quantityInput = screen.getByRole("spinbutton", { name: "Quantity:"})

    await user.clear(priceInput) 
    await user.type(priceInput, "149.99")
    await user.clear(quantityInput)
    await user.type(quantityInput, "10")

    const updateButton = screen.getByRole("button", { name: "Update"})
    await user.click(updateButton)
    expect(screen.getByText(/149.99/)).toBeInTheDocument()
    expect(screen.queryByText("Update")).not.toBeInTheDocument()

    screen.debug()
  })
});
