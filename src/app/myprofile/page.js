'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

const ordersData = [
    {
        _id: "order_001",
        data: {
            name: "John Doe",
            address: "123 Main Street, New York"
        },
        amount: "$25",
        status: "Delivered"
    },
    {
        _id: "order_002",
        data: {
            name: "Jane Smith",
            address: "456 Elm Street, Los Angeles"
        },
        amount: "$40",
        status: "Pending"
    }
];

const Page = () => {
    const [myOrders, setMyOrders] = useState([]);

    useEffect(() => {
        getMyOrders();
    }, []);

    const getMyOrders = () => {
        // Load static order data instead of fetching from API
        setMyOrders(ordersData);
    };

    return (
        <div>
            <CustomerHeader />
            {myOrders.length > 0 ? (
                myOrders.map((item) => (
                    <div key={item._id} className="restaurant-wrapper"
                         style={{ marginLeft: 'auto', marginRight: 'auto', border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                        <h4>Name: {item.data.name}</h4>
                        <div>Amount: {item.amount}</div>
                        <div>Address: {item.data.address}</div>
                        <div>Status: {item.status}</div>
                    </div>
                ))
            ) : (
                <h2 style={{ textAlign: "center" }}>No orders found.</h2>
            )}
            <Footer />
        </div>
    );
};

export default Page;
