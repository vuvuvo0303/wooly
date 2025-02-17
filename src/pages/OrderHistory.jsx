import { Button } from "@mui/material";
import { useEffect, useState } from "react"; // Thêm useState
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
                    className="w-24 h-24 object-cover"
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
                  <div className="mt-4 p-4 bg-gray-50">
                    <h3 className="font-bold text-lg mb-4">
                      Chi tiết sản phẩm:
                    </h3>
                    <p className="text-sm text-gray-500">
                      Giá: {formatPrice(product.productPrice)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Số lượng: {product.productQuantity}
                    </p>
                    {product.partList && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Các phần:</p>
                        {product.partList.map((part) => (
                          <div
                            key={part.orderDetailPartId}
                            className="text-sm text-gray-500"
                          >
                            {part.name}:{" "}
                            <span style={{ color: part.color }}>■</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Order Total */}
            <div className="flex justify-between items-center mt-6 p-4 bg-gray-100 border-t">
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
