import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProductAPI } from "~/apis";
import Hero_image from "~/assets/hero_img.jpg";
import {
  fetchAllProducts,
  fetchProductsByCategory,
} from "~/redux/features/activeProductSlice";
import API_ROOT from "~/utils/constants";
import { fetchCategories } from "~/redux/features/categorySlice";

function Collection() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // const [categories, setCategories] = useState([]);
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //     fetchAllProductAPI().then((data) => {
  //         setProducts(data);
  //     });
  // }, []);

  const dispatch = useDispatch();
  const { items: products, status } = useSelector(
    (state) => state.products.all
  );
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllProducts());
    }
    dispatch(fetchCategories());
    console.log("categories", categories);
  }, [status, dispatch]);

  const handleCategoryChange = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      dispatch(fetchAllProducts());
    } else {
      setSelectedCategory(categoryId);
      dispatch(fetchProductsByCategory(categoryId));
    }
  };
  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t">
      {/* Sidebar Filter */}
      <div
        className={`w-full sm:w-1/4 p-4 border-r transition-all ${
          showFilter ? "block" : "hidden sm:block"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">Bộ Lọc</h2>
        {/* <input
                    type="text"
                    placeholder="Tìm kiếm danh mục..."
                    className="w-full p-2 mb-4 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
        <div>
          {categories?.map((category) => (
            <label key={category.id} className="block mb-2">
              <input
                type="checkbox"
                name="categoryFilter"
                className="mr-2"
                checked={selectedCategory === category.id}
                onChange={() => handleCategoryChange(category.id)}
              />
              {category.name}
            </label>
          ))}
          {/* <label className="block mb-2">
            <input type="checkbox" className="mr-2" /> Sản phẩm có sẵn
          </label>
          <label className="block mb-2">
            <input type="checkbox" className="mr-2" /> Sản phẩm custom
          </label>
          <label className="block mb-2">
            <input type="checkbox" className="mr-2" /> Sản phẩm custom
          </label>
          <label className="block mb-2">
            <input type="checkbox" className="mr-2" /> Sản phẩm custom
          </label>
          <label className="block mb-2">
            <input type="checkbox" className="mr-2" /> Sản phẩm custom
          </label> */}
        </div>
      </div>

      {/* Product List */}
      <div className="w-full sm:w-3/4 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Sản Phẩm</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link
              to={`/product/${product.productID}`}
              key={product.id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={Hero_image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-md font-medium mt-2">
                {product.productName}
              </h3>
              <p className="text-gray-600">{product.price}đ</p>
              <p className="text-gray-600">Số lượng: {product.stockQuantity}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
