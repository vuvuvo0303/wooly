import { createContext } from "react";

export const ShopContext = createContext();
const ShopContextProvider = (props) => {
    const currency = "VND";
    const delivery_fee = 10;

    const value = {
        currency,
        delivery_fee,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
