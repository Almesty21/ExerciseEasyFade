import { useRouter } from "next/navigation";
import { useState } from "react";

const UserLogin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    // Static user data for demonstration
    const staticUserData = {
        email: "user@example.com",
        password: "password123", // In a real application, passwords should be hashed
    };

    const loginHandle = () => {
        // Check if the entered email and password match the static data
        if (email === staticUserData.email && password === staticUserData.password) {
            // Simulate user data after login
            const userData = { email }; // Add any additional user data as needed
            localStorage.setItem('user', JSON.stringify(userData));

            if (props?.redirect?.order) {
                console.log("Login successful, redirecting to order");
                router.push('/order');
            } else {
                console.log("Login successful, redirecting to home");
                router.push('/');
            }
        } else {
            alert("Failed to log in. Please try again with valid email and password.");
        }
    };

    return (
        <div>
            <div className="input-wrapper">
                <input
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="input-field"
                />
            </div>
            <div className="input-wrapper">
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="input-field"
                />
            </div>
            <div className="input-wrapper">
                <button onClick={loginHandle} className="button">Login</button>
            </div>
        </div>
    );
};

export default UserLogin;
