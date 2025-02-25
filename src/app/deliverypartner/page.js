'use client';
import { useEffect, useState } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";

// Static JSON for delivery partners
const deliveryPartners = [
    {
        _id: "1",
        name: "John Doe",
        mobile: "1234567890",
        password: "password123",
        city: "New York",
        address: "123 Main St"
    },
    {
        _id: "2",
        name: "Jane Smith",
        mobile: "0987654321",
        password: "password456",
        city: "Los Angeles",
        address: "456 Elm St"
    }
];

const Page = () => {
    const [loginMobile, setLoginMobile] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const router = useRouter();

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery') || "{}");
        if (delivery?._id) {
            router.push('/deliverydashboard');
        }
    }, [router]);

    const handleSignUp = () => {
        if (!name || !mobile || !password || !confirmPassword || !city || !address) {
            alert("All fields are required.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Simulate adding to a database
        const newUser = { _id: Date.now().toString(), name, mobile, password, city, address };
        localStorage.setItem('delivery', JSON.stringify(newUser));
        alert("Signup successful!");
        router.push('/deliverydashboard');
    };

    const loginHandle = () => {
        const user = deliveryPartners.find(u => u.mobile === loginMobile && u.password === loginPassword);

        if (user) {
            localStorage.setItem('delivery', JSON.stringify(user));
            router.push('/deliverydashboard');
        } else {
            alert("Invalid mobile number or password. Please try again.");
        }
    };

    return (
        <div>
            <DeliveryHeader />
            <h1>Delivery Partner</h1>
            <div className="auth-container">
                <div className="login-wrapper">
                    <h3>Login</h3>
                    <div className="input-wrapper">
                        <input type="text" placeholder="Enter mobile" value={loginMobile} onChange={(e) => setLoginMobile(e.target.value)} className="input-field" />
                    </div>
                    <div className="input-wrapper">
                        <input type="password" placeholder="Enter password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="input-field" />
                    </div>
                    <div className="input-wrapper">
                        <button onClick={loginHandle} className="button">Login</button>
                    </div>
                </div>

                <div className="signup-wrapper">
                    <h3>Signup</h3>
                    <div className="input-wrapper">
                        <input type="text" className="input-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" className="input-field" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter mobile" />
                    </div>
                    <div className="input-wrapper">
                        <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                    </div>
                    <div className="input-wrapper">
                        <input type="password" className="input-field" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" className="input-field" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" className="input-field" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />
                    </div>
                    <div className="input-wrapper">
                        <button onClick={handleSignUp} className="button">Signup</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
