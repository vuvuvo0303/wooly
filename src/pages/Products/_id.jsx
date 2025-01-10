import { useParams } from "react-router-dom";

function Product() {
    const { productId } = useParams();
    console.log(productId);
    return <div>Product</div>;
}

export default Product;
