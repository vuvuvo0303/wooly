/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function ProductItem({ productName, productPicture, productPrice }) {
    return (
        <Link className="text-gray-700 cursor-pointer ">
            <div className="overflow-hidden">
                <img
                    className="hover:scale-110 transition ease-in-out"
                    src={productPicture}
                    alt=""
                />
                <p className="pt-3 pb-1 text-sm">{productName}</p>
                <p className="text-sm font-medium">{productPrice}đ</p>
            </div>
        </Link>
    );
}

export default ProductItem;
