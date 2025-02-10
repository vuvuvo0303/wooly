import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllProductAPI } from "~/apis";
import Hero_image from "~/assets/hero_img.jpg";

function Collection() {
    const [showFilter, setShowFilter] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchAllProductAPI().then((data) => {
            setProducts(data);
        });
    }, []);

    return (
        <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t">
            {/* Sidebar Filter */}
            <div
                className={`w-full sm:w-1/4 p-4 border-r transition-all ${
                    showFilter ? "block" : "hidden sm:block"
                }`}
            >
                <h2 className="text-lg font-semibold mb-4">Bộ Lọc</h2>
                <div>
                    <label className="block mb-2">
                        <input type="checkbox" className="mr-2" /> Sản phẩm có
                        sẵn
                    </label>
                    <label className="block mb-2">
                        <input type="checkbox" className="mr-2" /> Sản phẩm
                        custom
                    </label>
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
                            <p className="text-gray-600">{product.price}</p>
                            <p className="text-gray-600">
                                Số lượng: {product.stockQuantity}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Collection;
