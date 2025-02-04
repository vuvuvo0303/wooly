import { useState } from "react";
import { useParams } from "react-router-dom";
import Hero_image from "~/assets/hero_img.jpg";

function ProductDetail() {
  const { productId } = useParams();

  // Danh sách sản phẩm mẫu
  const product = {
    id: productId,
    name: "sdfsdf",
    price: "450.000đ",
    image: `${Hero_image}`,
    colors: ["black", "red", "blue"],
  };

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const handleBuyNow = () => {
    alert(`Mua ngay: ${product.name} - Màu: ${selectedColor}`);
  };

  const handleAddToCart = () => {
    alert(`Đã thêm vào giỏ hàng: ${product.name} - Màu: ${selectedColor}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Hình ảnh sản phẩm */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-xl text-red-500 font-medium mt-2">
            {product.price}
          </p>

          {/* Chọn màu sắc */}
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Chọn màu:</h3>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-black scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

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
