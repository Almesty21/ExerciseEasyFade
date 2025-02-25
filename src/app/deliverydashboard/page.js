'use client';

import { useEffect, useState } from "react";
import DeliveryHeader from "../DeliveryHeader";

// Corrected ordersData structure
const ordersData = {
    "success": true,
    "result": [
        {
            "_id": "order1",
            "data": {
                "name": "John Doe",
                "address": "123 Main St, City"
            },
            "amount": 50,
            "status": "Pending"
        },
        {
            "_id": "order2",
            "data": {
                "name": "Jane Smith",
                "address": "456 Elm St, City"
            },
            "amount": 75,
            "status": "On the way"
        }
    ]
};

const Page = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate authentication check
        const delivery = JSON.parse(localStorage.getItem('delivery') || "{}");
        if (!delivery?._id) {
            window.location.href = "/deliverypartner"; // Redirect if not authenticated
        } else {
            // Use static JSON instead of fetching from API
            getMyOrders();
        }
    }, []);

    const getMyOrders = () => {
        try {
            // Simulating API call delay
            setTimeout(() => {
                if (ordersData.success) {
                    setMyOrders(ordersData.result);
                } else {
                    setError("Failed to fetch orders.");
                }
                setLoading(false);
            }, 500); // Simulated delay
        } catch (err) {
            setError("An error occurred while fetching orders.");
            setLoading(false);
        }
    };

    const handleStatusChange = (orderId, newStatus) => {
        console.log(`Order ${orderId} status changed to ${newStatus}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <DeliveryHeader />
            <h1>My Order List</h1>
            {myOrders.length === 0 ? (
                <div>No orders found.</div>
            ) : (
                myOrders.map((item) => (
                    <div key={item._id} className="restaurant-wrapper">
                        <h4>Name: {item?.data?.name || "N/A"}</h4>
                        <div>Amount: {item.amount}</div>
                        <div>Address: {item?.data?.address || "N/A"}</div>
                        <div>Status: {item.status}</div>
                        <div>
                            Update Status:
                            <select onChange={(e) => handleStatusChange(item._id, e.target.value)}>
                                <option value="Confirm">Confirm</option>
                                <option value="On the way">On the way</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Failed to deliver">Failed to deliver</option>
                            </select>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Page;
