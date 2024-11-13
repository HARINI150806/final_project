import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'; // Import the icons

const styles = {
    container: {
        position: 'relative',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("https://wallpaperaccess.com/full/732220.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        filter: 'brightness(0.6)',
        zIndex: -1,
    },
    form: {
        width: '300px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    header: {
        color: '#333',
        textAlign: 'center',
        marginBottom: '20px',
    },
    inputGroup: {
        marginBottom: '15px',
        position: 'relative', // Added for icon positioning
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '96%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    passwordInput: {
        width: '85%', // Shrinking input width to accommodate the icon
    },
    icon: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
    },
    button: {
        width: '100%',
        padding: '10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: '#fff',
        cursor: 'pointer',
    },
    toggle: {
        textAlign: 'center',
        marginTop: '15px',
    },
    toggleLink: {
        color: '#007BFF',
        textDecoration: 'none',
        cursor: 'pointer',
    },
    message: {
        textAlign: 'center',
        color: '#ff0000',
        marginTop: '10px',
    },
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // New state for toggling password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // New state for toggling confirm password visibility
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3003/users');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    };

    const addUser = async (newUser) => {
        try {
            await axios.post('http://localhost:3003/users', newUser);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const updateUserPassword = async (userId, updatedUser) => {
        try {
            await axios.patch(`http://localhost:3003/users/${userId}`, updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let users = await fetchUsers();

        if (!emailRegex.test(email)) {
            setMessage('Invalid email format.');
            return;
        }

        if (isSignup) {
            if (password === confirmPassword) {
                if (users.some(user => user.email === email)) {
                    setMessage('User already exists.');
                } else {
                    const newUser = { email, password };
                    await addUser(newUser);
                    setMessage('Signup Successful! Redirecting...');
                    setTimeout(() => {
                        navigate('/home', { state: { fromLogin: true } });
                    }, 1000);
                }
            } else {
                setMessage("Passwords don't match.");
            }
        } else {
            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                setMessage('Login Successful! Redirecting...');
                setTimeout(() => {
                    navigate('/home', { state: { fromLogin: true } });
                }, 1000);
            } else {
                setMessage('Invalid email or password.');
            }
        }
    };

    const handleReset = async (event) => {
        event.preventDefault();
        let users = await fetchUsers();
        const user = users.find(user => user.email === resetEmail);

        if (!emailRegex.test(resetEmail)) {
            setMessage('Invalid email format.');
            return;
        }

        if (user) {
            if (newPassword === confirmNewPassword) {
                const updatedUser = { ...user, password: newPassword };
                await updateUserPassword(user.id, updatedUser);
                setMessage('Password reset successful! Redirecting...');
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                setMessage("Passwords don't match.");
            }
        } else {
            setMessage('User not found.');
        }
    };

    // Reusable Input Field Component
    const renderInput = (type, label, value, onChange, showToggle = false, showPasswordToggle = false) => (
        <div style={styles.inputGroup}>
            <label style={styles.label}>{label}</label>
            <input
                style={styles.input}
                type={showToggle && (showPasswordToggle ? showPassword : showConfirmPassword) ? 'text' : type}
                value={value}
                onChange={onChange}
                required
            />
            <br></br>
            <br></br>
            {showToggle && (
                
                <span style={styles.icon} onClick={showPasswordToggle ? () => setShowPassword(!showPassword) : () => setShowConfirmPassword(!showConfirmPassword)}>
                    {showPasswordToggle ? (showPassword ? <IoMdEye /> : <IoMdEyeOff />) : (showConfirmPassword ? <IoMdEye /> : <IoMdEyeOff />)}
                </span>
            )}
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.backgroundImage}></div>
            {showReset ? (
                <form style={styles.form} onSubmit={handleReset}>
                    <h2 style={styles.header}>Reset Your Password</h2>
                    {renderInput('email', 'Email:', resetEmail, (e) => setResetEmail(e.target.value))}
                    {renderInput('password', 'New Password:', newPassword, (e) => setNewPassword(e.target.value), true, true)}
                    {renderInput('password', 'Confirm New Password:', confirmNewPassword, (e) => setConfirmNewPassword(e.target.value), true, true)}
                    <button style={styles.button} type="submit">Reset Password</button>
                    {message && <p style={styles.message}>{message}</p>}
                    <div style={styles.toggle}>
                        <p>
                            <span
                                onClick={() => setShowReset(false)}
                                style={styles.toggleLink}
                            >
                                Back to Login
                            </span>
                        </p>
                    </div>
                </form>
            ) : (
                <form style={styles.form} onSubmit={handleSubmit}>
                    <h2 style={styles.header}>{isSignup ? 'Signup' : 'Login'}</h2>
                    {renderInput('email', 'Email:', email, (e) => setEmail(e.target.value))}
                    {renderInput('password', 'Password:', password, (e) => setPassword(e.target.value), true, false)}
                    {isSignup && renderInput('password', 'Confirm Password:', confirmPassword, (e) => setConfirmPassword(e.target.value), true, false)}
                    <button style={styles.button} type="submit">{isSignup ? 'Signup' : 'Login'}</button>
                    {message && <p style={styles.message}>{message}</p>}
                    <div style={styles.toggle}>
                        <p>
                            {isSignup ? 'Already a user? ' : 'New user? '}
                            <span
                                onClick={() => setIsSignup(!isSignup)}
                                style={styles.toggleLink}
                            >
                                {isSignup ? 'Login' : 'Signup'}
                            </span>
                        </p>
                    </div>
                    {!isSignup && (
                        <div style={styles.toggle}>
                            <a href="#forgot-password" style={styles.toggleLink} onClick={() => setShowReset(true)}>Forgot Password?</a>
                        </div>
                    )}
                </form>
            )}
        </div>
    );
};

export default Login;
