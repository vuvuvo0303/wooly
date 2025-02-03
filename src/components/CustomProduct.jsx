import { Button } from "@mui/material";
import ProductItem from "./ProductItem";
import Title from "./Title";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function CustomProduct() {
    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1={"SẢN PHẨM"} text2={"ĐẶT RIÊNG"} />
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
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

export default CustomProduct;
