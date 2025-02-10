import { Button } from "@mui/material";
import ProductItem from "./ProductItem";
import Title from "./Title";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect, useState } from "react";

import { fetchLatestProductAPI } from "~/apis";

function LatestCollection() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchLatestProductAPI().then((data) => {
            setProducts(data.data);
        });
    }, []);

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1={"SẢN PHẨM"} text2={"CÓ SẴN"} />
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {products.map((product) => (
                    <ProductItem
                        key={product.productId}
                        productName={product.productName}
                        productPicture={product.productPicture}
                        productPrice={product.productPrice}
                    />
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

export default LatestCollection;
