import { Button, Checkbox, FormControlLabel } from "@mui/material";
import Title from "~/components/Title";
import Hero_image from "~/assets/hero_img.jpg";
import { useState } from "react";

function Cart() {
  // Sample cart products with quantity
  const cartProducts = [
    {
      id: 1,
      image: "~/assets/hero_img.jpg", // Example image path
      name: "Sản phẩm 1",
      price: 500000, // Store price as a number
      quantity: 2,
    },
    {
      id: 2,
      image: "~/assets/hero_img.jpg",
      name: "Sản phẩm 2",
      price: 1000000,
      quantity: 1,
    },
    {
      id: 3,
      image: "~/assets/hero_img.jpg", // Example image path
      name: "Sản phẩm 3",
      price: 500000,
      quantity: 3,
    },
    {
      id: 4,
      image: "~/assets/hero_img.jpg",
      name: "Sản phẩm 4",
      price: 1000000,
      quantity: 1,
    },
  ];

  // State to manage selected products
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedProducts((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((productId) => productId !== id)
      );
    }
  };

  const handleRemoveProduct = (id) => {
    // Placeholder function for deleting a product (you can replace this with actual logic)
    console.log(`Removing product with id: ${id}`);
  };

  // Calculate total price of selected products
  const totalPrice = cartProducts.reduce((total, product) => {
    if (selectedProducts.includes(product.id)) {
      return total + product.price * product.quantity;
    }
    return total;
  }, 0);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"GIỎ HÀNG"} text2={"CỦA BẠN"} />
      </div>

      {/* Cart content */}
      <div className="space-y-6">
        {cartProducts.length > 0 ? (
          cartProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center space-x-6 border-b py-4"
            >
              {/* Checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onChange={(e) => handleCheckboxChange(e, product.id)}
                  />
                }
                label=""
              />

              {/* Product Image */}
              <img
                // src={product.image}
                src={Hero_image}
                alt={product.name}
                className="w-24 h-24 object-cover"
              />

              {/* Product Name */}
              <div className="flex-1">
                <p className="font-medium text-lg">{product.name}</p>
              </div>

              {/* Product Price */}
              <div className="text-sm text-gray-500 font-medium">
                <p>{product.price.toLocaleString()}đ</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center space-x-2">
                <p className="text-sm">Số lượng:</p>
                <input
                  type="number"
                  value={product.quantity}
                  min="1"
                  className="w-16 text-center border border-gray-300 rounded"
                />
              </div>

              {/* Total Price */}
              <div className="text-sm font-medium">
                <p>{(product.price * product.quantity).toLocaleString()}đ</p>
              </div>

              {/* Delete Button */}
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleRemoveProduct(product.id)}
                className="ml-4"
              >
                Xóa
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center text-lg text-gray-500">
            Chưa có sản phẩm nào trong giỏ hàng.
          </div>
        )}
      </div>

      {/* Total Price of Selected Products */}
      {selectedProducts.length > 0 && (
        <div className="flex items-center justify-between mt-6 p-4 bg-gray-100 border-t">
          {/* "Tổng tiền:" label */}
          <p className="font-medium text-lg">Tổng tiền:</p>

          {/* Right-aligned content containing total price and Thanh Toán button */}
          <div className="flex items-center space-x-4">
            {/* Total Price */}
            <p className="font-bold text-xl text-red-500">
              {totalPrice.toLocaleString()}đ
            </p>

            {/* Thanh toán Button */}
            <Button
              variant="contained"
              color="warning" // "warning" gives the orange color
              className="text-white px-8"
            >
              THANH TOÁN
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <Button variant="contained" color="primary">
          TIẾP TỤC MUA SẮM
        </Button>
      </div>
    </div>
  );
}

export default Cart;
