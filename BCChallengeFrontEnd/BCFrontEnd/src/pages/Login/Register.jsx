import { useNavigate } from 'react-router-dom';   
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { useState } from 'react';

const Register = () => {

    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        navigate('/');
    };

    const { setUser } = useContext(AuthContext);

    const handleRegistration = (event) => {
        event.preventDefault();
        
        const userData = { username, password };

        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));

        setUser(userData);

        navigate('/');
      
      };
      

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-6">Register</h1>
            <form  onSubmit={handleRegistration} className="flex flex-col items-center">
            <input
                id='username'
                type="text"
                placeholder="Username"
                className="w-64 px-4 py-2 mb-4 border border-gray-300 rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                id='password'
                type="password"
                placeholder="Password"
                className="w-64 px-4 py-2 mb-4 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
                <button
                    type="submit"
                    className="w-64 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Register
                </button>
            </form>
            <p className="mt-4">
                Already have an account?{' '}
                <a onClick={handleLogin} className="text-blue-500">
                    Login
                </a>
            </p>
        </div>
    );
};

export default Register;