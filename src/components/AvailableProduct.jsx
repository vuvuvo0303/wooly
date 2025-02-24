import { Button } from "@mui/material";
import ProductItem from "./ProductItem";
import Title from "./Title";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect, useState } from "react";
import { fetchBestSellerProductAPI } from "~/apis";
import { useDispatch, useSelector } from "react-redux";
import { fetchBestSellerProducts } from "~/redux/features/activeProductSlice";
import { Link } from "react-router-dom";

function AvailableProduct() {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //     fetchBestSellerProductAPI().then((data) => {
  //         setProducts(data.data);
  //     });
  // }, []);
  const dispatch = useDispatch();
  const { items: products, status } = useSelector(
    (state) => state.products.bestSeller
  );
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBestSellerProducts());
    }
  }, [status, dispatch]);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"SẢN PHẨM"} text2={"BÁN CHẠY"} />
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {products.map((product) => (
          <Link
            to={`/product/${product.productId}`}
            key={product.id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <ProductItem
              key={product.productId}
              productName={product.productName}
              productPicture={product.productPicture}
              productPrice={product.productPrice}
            />
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />} // Thêm icon
        >
          XEM THÊM
        </Button>
      </div>
    </div>
  );
}

export default AvailableProduct;
