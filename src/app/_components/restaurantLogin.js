import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    // Static user data for demonstration
    const staticUserData = {
        email: "restaurant@example.com",
        password: "password123", // In a real application, passwords should be hashed and never stored in plain text
    };

    const handleLogin = () => {
        if (!email || !password) {
            setError(true);
            return false;
        } else {
            setError(false);
        }

        // Simulate login check against static user data
        if (email === staticUserData.email && password === staticUserData.password) {
            // Simulate user data after login
            const userData = { email, role: "restaurant" }; // Add any additional user data as needed
            localStorage.setItem("restaurantUser", JSON.stringify(userData));
            router.push("/restaurant/dashboard");
        } else {
            alert("Login failed");
        }
    };

    return (
        <>
            <h3>Login</h3>
            <div>
                <div className="input-wrapper">
                    <input
                        className="input-field"
                        type="text"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && !email && <span className="input-error">Please enter valid email</span>}
                </div>
                <div className="input-wrapper">
                    <input
                        className="input-field"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && !password && <span className="input-error">Please enter valid password</span>}
                </div>
                <div className="input-wrapper">
                    <button onClick={handleLogin} className="button">Login</button>
                </div>
            </div>
        </>
    );
};

export default RestaurantLogin;
