import AvailableProduct from "~/components/AvailableProduct";
import CustomProduct from "~/components/CustomProduct";
import Hero from "~/components/Header/Hero";
import LatestCollection from "~/components/LatestCollection";

function Home() {
    return (
        <div>
            <Hero />
            <LatestCollection />
            <AvailableProduct />
            <CustomProduct />
        </div>
    );
}

export default Home;
