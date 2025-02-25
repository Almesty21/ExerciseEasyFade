import { useRouter } from "next/navigation";
import { useState } from "react";

const UserSignUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const router = useRouter();

    // Static user data for demonstration purposes
    const staticUserData = [];

    const handleSignUp = () => {
        // Basic validation
        if (!name || !email || !password || !confirmPassword || !city || !address || !mobile) {
            alert("All fields are required.");
            return;
        }
        
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Check if the user already exists
        const existingUser = staticUserData.find(user => user.email === email);
        if (existingUser) {
            alert("User already exists.");
            return;
        }

        // Simulate saving the new user
        const newUser = { name, email, password, city, address, mobile };
        staticUserData.push(newUser); // This won't persist in real applications
        localStorage.setItem('user', JSON.stringify(newUser));
        
        if (props?.redirect?.order) {
            router.push('/order');
        } else {
            router.push('/');
        }
    };

    return (
        <div>
            <div className="input-wrapper">
                <input
                    type="text"
                    className="input-field"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter name"
                />
            </div>
            <div className="input-wrapper">
                <input
                    type="text"
                    className="input-field"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter email"
                />
            </div>
            <div className="input-wrapper">
                <input
                    type="password"
                    className="input-field"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                />
            </div>
            <div className="input-wrapper">
                <input
                    type="password"
                    className="input-field"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Confirm password"
                />
            </div>
            <div className="input-wrapper">
                <input
                    type="text"
                    className="input-field"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="Enter city"
                />
            </div>
            <div className="input-wrapper">
                <input
                    type="text"
                    className="input-field"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Enter address"
                />
            </div>
            <div className="input-wrapper">
                <input
                    type="text"
                    className="input-field"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                    placeholder="Enter mobile"
                />
            </div>
            <div className="input-wrapper">
                <button onClick={handleSignUp} className="button">Signup</button>
            </div>
        </div>
    );
};

export default UserSignUp;
