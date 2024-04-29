import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';

function PayNow() {

    const { bookingDetails, user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleBookNow = async (event) => {
        event.preventDefault();
    
        const payload = {
            ...bookingDetails,
            username: user.username, 
        };
    
        delete payload.id;
    
        try {
            const response = await fetch('http://localhost:5055/BookedTravel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            navigate('/yourhistory');
        } catch (error) {
            alert('Failed to book travel');
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-6">Payment Information</h1>
            <form className="flex flex-col items-center" onSubmit={handleBookNow}>
                <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="w-64 px-4 py-2 mb-4 border border-gray-300 rounded-md"
                />
                <input
                    type="text"
                    placeholder="Card Number"
                    className="w-64 px-4 py-2 mb-4 border border-gray-300 rounded-md"
                />
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-32 px-4 py-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="CVV"
                        className="w-32 px-4 py-2 mb-4 border border-gray-300 rounded-md"
                    />
                </div>
                <button type="submit">Book Now</button>
            </form>
        </div>
    );
}

export default PayNow;