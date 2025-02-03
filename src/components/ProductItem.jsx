/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import Hero_image from "~/assets/hero_img.jpg";

function ProductItem({ id, image, name, price }) {
    return (
        <Link className="text-gray-700 cursor-pointer " to={`/product/${id}`}>
            <div className="overflow-hidden">
                <img
                    className="hover:scale-110 transition ease-in-out"
                    src={Hero_image}
                    alt=""
                />
                <p className="pt-3 pb-1 text-sm">haha</p>
                <p className="text-sm font-medium">1000đ</p>
            </div>
        </Link>
    );
}

export default ProductItem;
