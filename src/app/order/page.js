'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

// Static JSON Data
const STATIC_USER = {
    _id: "12345",
    name: "John Doe",
    address: "123 Main Street, New York",
    city: "New York",
    mobile: "+1 123-456-7890"
};

const STATIC_CART = [
    {
        _id: "item1",
        name: "Burger",
        price: 10,
        resto_id: "resto123"
    },
    {
        _id: "item2",
        name: "Pizza",
        price: 15,
        resto_id: "resto123"
    }
];

const Page = () => {
    const router = useRouter();
    
    // Use static JSON data
    const [userStorage] = useState(STATIC_USER);
    const [cartStorage] = useState(STATIC_CART);
    
    // Calculate total price
    const total = cartStorage.reduce((acc, item) => acc + item.price, 0);

    const [removeCartData, setRemoveCartData] = useState(false);

    useEffect(() => {
        if (cartStorage.length === 0) {
            router.push('/');
        }
    }, [cartStorage, router]);

    const orderNow = async () => {
        if (!userStorage || cartStorage.length === 0) {
            alert("Invalid order data");
            return;
        }

        const user_id = userStorage._id;
        const city = userStorage.city;
        const foodItemIds = cartStorage.map((item) => item._id).toString();

        try {
            // Simulating a delivery partner selection (static)
            const deliveryBoy_id = "delivery_partner_001";
            
            const resto_id = cartStorage[0].resto_id;
            const orderData = {
                user_id,
                resto_id,
                foodItemIds,
                deliveryBoy_id,
                status: 'confirm',
                amount: total + DELIVERY_CHARGES + (total * TAX / 100),
            };

            console.log("Order Data:", orderData);
            alert("Order confirmed!");

            setRemoveCartData(true);
            router.push('/myprofile');

        } catch (error) {
            console.error("Order error:", error);
            alert("Something went wrong.");
        }
    };

    return (
        <div>
            <CustomerHeader removeCartData={removeCartData} />
            <div className="total-wrapper">
                <div className="block-1">
                    <h2>User Details</h2>
                    <div className="row"><span>Name: </span><span>{userStorage.name}</span></div>
                    <div className="row"><span>Address: </span><span>{userStorage.address}</span></div>
                    <div className="row"><span>Mobile: </span><span>{userStorage.mobile}</span></div>

                    <h2>Amount Details</h2>
                    <div className="row"><span>Tax:</span><span>{(total * TAX / 100).toFixed(2)}</span></div>
                    <div className="row"><span>Delivery Charges:</span><span>{DELIVERY_CHARGES}</span></div>
                    <div className="row"><span>Total Amount:</span><span>{(total + DELIVERY_CHARGES + (total * TAX / 100)).toFixed(2)}</span></div>

                    <h2>Payment Methods</h2>
                    <div className="row"><span>Cash on Delivery:</span><span>{(total + DELIVERY_CHARGES + (total * TAX / 100)).toFixed(2)}</span></div>
                </div>

                <div className="block-2">
                    <button onClick={orderNow}>Place your Order Now</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
