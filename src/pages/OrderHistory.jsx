import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero_image from "~/assets/hero_img.jpg"; // Adjust the image import if needed
import { fetchOrderHistory } from "~/redux/features/orderSlice";

function OrderHistory() {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);
  const [expandedProductId, setExpandedProductId] = useState(null); // State để theo dõi sản phẩm được mở rộng

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  // Function to handle status color
  const getStatusColor = (status) => {
    if (status === "Đang xử lý") return "text-yellow-500";
    if (status === "Đã giao") return "text-green-500";
    return "text-gray-500";
  };

  // Function to format price
  const formatPrice = (price) => price.toLocaleString() + "đ";

  // Function to handle "Xem chi tiết" button click
  const handleViewDetails = (orderDetailId) => {
    if (expandedProductId === orderDetailId) {
      setExpandedProductId(null); // Đóng nếu đã mở
    } else {
      setExpandedProductId(orderDetailId); // Mở sản phẩm được chọn
    }
  };

  return (
    <div className="my-10 px-4 sm:px-6">
      <div className="text-center py-8 text-3xl">
        <p className="font-bold">LỊCH SỬ ĐƠN HÀNG</p>
      </div>

      {status === "loading" && (
        <div className="text-center text-lg text-gray-500">Đang tải...</div>
      )}

      {status === "failed" && (
        <div className="text-center text-lg text-red-500">{error}</div>
      )}

      {/* Orders content */}
      {status === "succeeded" && orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.orderId} className="border-t py-6">
            <div className="flex justify-between items-center mb-4">
              <div className="font-medium text-xl">{`Mã đơn hàng: ${order.orderId}`}</div>
              <div
                className={`font-medium text-lg ${getStatusColor(
                  order.customerNote
                )}`}
              >
                {order.customerNote}
              </div>
            </div>

            {/* Order Products */}
            {order.itemList.map((product) => (
              <div key={product.orderDetailId}>
                <div className="flex items-center space-x-6 border-b py-4">
                  {/* Product Image */}
                  <img
                    src={product.productPicture}
                    alt={product.productName}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  {/* Product Name */}
                  <div className="flex-1">
                    <p className="font-medium text-lg">{product.productName}</p>
                  </div>

                  {/* Product Price */}
                  <div className="text-sm text-gray-500 font-medium">
                    <p>{formatPrice(product.productPrice)}</p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center space-x-2">
                    <p className="text-sm">Số lượng:</p>
                    <p className="text-sm">{product.productQuantity}</p>
                  </div>

                  {/* Total Price for the product */}
                  <div className="text-sm font-medium">
                    <p>
                      {formatPrice(
                        product.productPrice * product.productQuantity
                      )}
                    </p>
                  </div>

                  {/* Button to view details */}
                  <Button
                    variant="contained"
                    color="warning"
                    className="px-8"
                    onClick={() => handleViewDetails(product.orderDetailId)} // Thêm sự kiện onClick
                  >
                    Xem chi tiết
                  </Button>
                </div>

                {/* Hiển thị thông tin chi tiết nếu sản phẩm được mở rộng */}
                {expandedProductId === product.orderDetailId && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg shadow-md">
                    <h3 className="font-bold text-lg mb-4 text-gray-700">
                      Chi tiết sản phẩm:
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Giá và số lượng */}
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600">Giá:</p>
                        <p className="font-medium text-gray-800">
                          {formatPrice(product.productPrice)}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600">Số lượng:</p>
                        <p className="font-medium text-gray-800">
                          {product.productQuantity}
                        </p>
                      </div>
                    </div>

                    {/* Các phần của sản phẩm */}
                    {product.partList && (
                      <div className="mt-6">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Các phần:
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          {product.partList.map((part) => (
                            <div
                              key={part.orderDetailPartId}
                              className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-2"
                            >
                              <span
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: part.color }}
                              ></span>
                              <p className="text-sm text-gray-800">
                                {part.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Order Total */}
            <div className="flex justify-between items-center mt-6 p-4 bg-gray-100 border-t rounded-b-lg">
              <p className="font-medium text-lg">Tổng tiền:</p>
              <div className="flex items-center space-x-4">
                <p className="font-bold text-xl text-red-500">
                  {formatPrice(order.totalPrice)}
                </p>
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
