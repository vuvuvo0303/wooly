import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "~/redux/features/activeProductSlice";
import { addToCart } from "~/redux/features/cartSlice";
import { toast } from "react-toastify";
import Hero_image from "~/assets/hero_img.jpg";

function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const {
    item: product,
    status,
    error,
  } = useSelector((state) => state.products.productDetail);
  const { accessToken } = useSelector((state) => state.auth);

  const [selectedPart, setSelectedPart] = useState(0);
  const [selectedColors, setSelectedColors] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (productId) dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product?.partNames?.length > 0 && product?.partColors?.length > 0) {
      const initialColors = {};
      product.partNames.forEach((part, index) => {
        initialColors[index] = {
          colorID: product.partColors[0].colorID,
          partColor: product.partColors[0].partColor,
        };
      });
      setSelectedColors(initialColors);
    }
  }, [product]);

  if (status === "loading")
    return <p className="text-center">Đang tải sản phẩm...</p>;
  if (status === "failed")
    return <p className="text-center text-red-500">Lỗi: {error}</p>;
  if (!product) return <p className="text-center">Không tìm thấy sản phẩm.</p>;

  const handleColorChange = (partIndex, colorID, partColor) => {
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [partIndex]: { colorID, partColor },
    }));
  };

  const openPopup = () => {
    if (!accessToken) {
      toast.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }
    setIsPopupOpen(true);
  };

  const handleAddToCart = () => {
    if (!productId || !product) {
      toast.error("Không tìm thấy sản phẩm!");
      return;
    }

    const cartItems = Object.keys(selectedColors).map((partIndex) => ({
      productPartId: product.partNames[partIndex]?.partID || null,
      partColorId: selectedColors[partIndex]?.colorID || null,
      name: product.partNames[partIndex]?.partName || "",
      color: selectedColors[partIndex]?.partColor || "",
    }));

    dispatch(addToCart({ productId, quantity, cartItems }))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
        } else {
          toast.error("Không thể thêm sản phẩm vào giỏ hàng.");
        }
      })
      .catch(() => toast.error("Có lỗi xảy ra!"));

    setIsPopupOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <img
            src={product.imageUrl || Hero_image}
            alt={product.productName}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{product.productName}</h1>
          <p className="text-xl text-red-500 font-medium mt-2">
            {product.price}đ
          </p>
          <p className="mt-2 text-gray-600">{product.description}</p>

          {product.partNames && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Chọn bộ phận:</h3>
              <div className="flex gap-3">
                {product.partNames.map(({ partID, partName }, index) => (
                  <button
                    key={partID}
                    className={`px-4 py-2 border-2 rounded-lg ${
                      selectedPart === index
                        ? "border-black bg-gray-200"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedPart(index)}
                  >
                    {partName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.partColors && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Chọn màu:</h3>
              <div className="flex gap-3">
                {product.partColors.map(({ colorID, partColor }) => (
                  <button
                    key={colorID}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColors[selectedPart]?.colorID === colorID
                        ? "border-black scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: partColor }}
                    onClick={() =>
                      handleColorChange(selectedPart, colorID, partColor)
                    }
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-4">
            <button
              className="w-full sm:w-1/2 bg-orange-100 text-red-500 border-2 border-red-500 py-3 rounded-lg text-lg font-medium hover:bg-orange-200 transition"
              onClick={openPopup}
            >
              Thêm vào giỏ hàng
            </button>
            <button className="w-full sm:w-1/2 bg-red-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-red-600 transition">
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Xác nhận sản phẩm</h2>
            <p className="text-lg font-medium">{product.productName}</p>
            <p className="text-red-500 font-semibold">{product.price}đ</p>

            <div className="mt-4">
              <h3 className="text-lg font-medium">Chi tiết lựa chọn:</h3>
              {Object.keys(selectedColors).map((partIndex) => (
                <p key={partIndex}>
                  {product.partNames[partIndex]?.partName} -{" "}
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: selectedColors[partIndex]?.partColor,
                    }}
                  ></span>
                </p>
              ))}
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium">Số lượng:</h3>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full mt-2 p-2 border rounded-lg"
              />
            </div>

            <p className="mt-4 text-lg font-bold">
              Tổng tiền: {product.price * quantity}đ
            </p>

            <div className="mt-4 flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setIsPopupOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={handleAddToCart}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
