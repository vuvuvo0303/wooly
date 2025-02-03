import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Hero_image from "~/assets/hero_img.jpg";

function OrderHistory() {
  // Sample order data (replace with actual data)
  const orders = [
    {
      id: "ORD001",
      status: "Đang xử lý",
      products: [
        {
          id: 1,
          image: `${Hero_image}`,
          name: "Sản phẩm 1",
          price: 500000,
          quantity: 2,
        },
        {
          id: 2,
          image: `${Hero_image}`,
          name: "Sản phẩm 2",
          price: 1000000,
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD002",
      status: "Đã giao",
      products: [
        {
          id: 3,
          image: `${Hero_image}`,
          name: "Sản phẩm 3",
          price: 500000,
          quantity: 3,
        },
      ],
    },
  ];

  // Function to handle status color
  const getStatusColor = (status) => {
    if (status === "Đang xử lý") return "text-yellow-500"; // Yellow for processing
    if (status === "Đã giao") return "text-green-500"; // Green for delivered
    return "text-gray-500"; // Default gray color
  };

  return (
    <div className="my-10 px-4 sm:px-6">
      <div className="text-center py-8 text-3xl">
        <p className="font-bold">LỊCH SỬ ĐƠN HÀNG</p>
      </div>

      {/* Orders content */}
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="border-t py-6">
            <div className="flex justify-between items-center mb-4">
              <div className="font-medium text-xl">{`Mã đơn hàng: ${order.id}`}</div>
              <div
                className={`font-medium text-lg ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </div>
            </div>

            {/* Order Products */}
            {order.products.map((product) => (
              <div
                key={product.id}
                className="flex items-center space-x-6 border-b py-4"
              >
                {/* Product Image */}
                <img
                  src={product.image}
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
                  <p className="text-sm">{product.quantity}</p>
                </div>

                {/* Total Price for the product */}
                <div className="text-sm font-medium">
                  <p>{(product.price * product.quantity).toLocaleString()}đ</p>
                </div>
              </div>
            ))}

            {/* Order Total */}
            <div className="flex justify-between items-center mt-6 p-4 bg-gray-100 border-t">
              <p className="font-medium text-lg">Tổng tiền:</p>
              <div className="flex items-center space-x-4">
                <p className="font-bold text-xl text-red-500">
                  {order.products
                    .reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )
                    .toLocaleString()}{" "}
                  đ
                </p>
                <Link to={`/order/${order.id}`}>
                  <Button variant="contained" color="warning" className="px-8">
                    Xem chi tiết
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-lg text-gray-500">
          Bạn chưa có đơn hàng nào.
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
