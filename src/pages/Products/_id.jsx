import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "~/redux/features/activeProductSlice";
import Hero_image from "~/assets/hero_img.jpg";

function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const {
    item: product,
    status,
    error,
  } = useSelector((state) => state.products.productDetail);

  const [selectedPart, setSelectedPart] = useState(0);
  const [selectedColors, setSelectedColors] = useState({});

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product?.partName?.length > 0) {
      const initialColors = {};
      product.partName.forEach((part, index) => {
        initialColors[index] = product.partColor?.[0] || null;
      });
      setSelectedColors(initialColors);
    }
  }, [product]);

  if (status === "loading")
    return <p className="text-center">Đang tải sản phẩm...</p>;
  if (status === "failed")
    return <p className="text-center text-red-500">Lỗi: {error}</p>;
  if (!product) return <p className="text-center">Không tìm thấy sản phẩm.</p>;

  const handleBuyNow = () => {
    alert(
      `Mua ngay: ${product.productName} - ${
        product.partName?.[selectedPart] || "N/A"
      } - Màu: ${selectedColors[selectedPart] || "N/A"}`
    );
  };

  const handleAddToCart = () => {
    alert(
      `Đã thêm vào giỏ hàng: ${product.productName} - ${
        product.partName?.[selectedPart] || "N/A"
      } - Màu: ${selectedColors[selectedPart] || "N/A"}`
    );
  };

  const handleColorChange = (partIndex, color) => {
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [partIndex]: color,
    }));
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
          <p className="mt-1 text-gray-500">
            Kích thước: {product.sizeHeight} x {product.sizeHorizontal} cm
          </p>
          <p className="mt-1 text-gray-500">
            Số lượng tồn kho: {product.stockQuantity}
          </p>

          {product.partName && product.partName.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Chọn bộ phận:</h3>
              <div className="flex gap-3">
                {product.partName.map((part, index) => (
                  <button
                    key={part}
                    className={`px-4 py-2 border-2 rounded-lg ${
                      selectedPart === index
                        ? "border-black bg-gray-200"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedPart(index)}
                  >
                    {part}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.partColor && product.partColor.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Chọn màu:</h3>
              <div className="flex gap-3">
                {product.partColor.map((color) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColors[selectedPart] === color
                        ? "border-black scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(selectedPart, color)}
                  />
                ))}
              </div>
            </div>
          )}

          <p className="mt-4 text-gray-700">
            <strong>Danh mục:</strong> {product.category}
          </p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-1/2 bg-orange-100 text-red-500 border-2 border-red-500 py-3 rounded-lg text-lg font-medium hover:bg-orange-200 transition"
            >
              Thêm vào giỏ hàng
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full sm:w-1/2 bg-red-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-red-600 transition"
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
