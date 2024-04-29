import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

function YourHistory() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [transportationTypes, setTransportationTypes] = useState([]);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [vehicleType, setVehicleType] = useState('');
    const { user } = useContext(AuthContext);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editing, setEditing] = useState(false);

    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
 
        fetch(`http://localhost:5055/BookedTravels/${user.username}`)
        .then(response => response.json())
        .then(payload => {
            console.log(payload);
            setData(payload); 
            setFilteredData(payload);

            const uniqueTypes = Array.from(new Set(payload.map(item => item.vehicleType)));
            setTransportationTypes(uniqueTypes);
        });

    }, [isAuthenticated, navigate, user.username]);

    const handleSearch = (event) => {
        if (event) {
            event.preventDefault();
        }
    
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const lowercasedVehicleType = vehicleType.toLowerCase();
        const dateString = date ? date.toISOString().substring(0, 10) : '';
        const timeString = time ? time : '';
    
        const filtered = data.filter(item => {
            const itemDate = item.date.substring(0, 10);
            const itemTime = item.time.substring(0, 8);
    
            return (
                (lowercasedSearchTerm === '' || item.description.toLowerCase().includes(lowercasedSearchTerm)) &&
                (lowercasedVehicleType === '' || item.vehicleType.toLowerCase().includes(lowercasedVehicleType)) &&
                (dateString === '' || itemDate.includes(dateString)) &&
                (timeString === '' || itemTime.includes(timeString))
            );
        });
    
        setFilteredData(filtered);
    };

    const handleResetSearch = () => {
        setSearchTerm('');
        setDate(null);
        setTime(null);
        setVehicleType('');
        setFilteredData(data);
    };

    const handleRemove = async (id) => {
        const response = await fetch(`http://localhost:5055/DeleteBookedTravel/${id}`, {
            method: 'DELETE',
        });
    
        if (response.ok) {
            setData(data.filter(item => item.id !== id));
            setFilteredData(filteredData.filter(item => item.id !== id));
    
            if (selectedItem && selectedItem.id === id) {
                setSelectedItem(null);
            }
        } else {
            alert('Failed to remove travel');
        }
    };
    
    const handleEdit = (item) => {
        setSelectedItem(item);
        setEditing(true);
    };
    
    const handleSave = async (id) => {
        const response = await fetch(`http://localhost:5055/BookedTravel/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedItem)
        });
    
        if (response.ok) {
            setEditing(false); 
        } else {
            alert('Failed to save changes');
        }

        const updatedData = data.map(item => item.id === id ? selectedItem : item);
        setData(updatedData);
        setFilteredData(updatedData);
    };

    return selectedItem ? (
        <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Item Details</h2>
        {editing ? (
    <p className="mb-2"><strong className="font-semibold">Description:</strong> <input type="text" value={selectedItem.description} onChange={e => setSelectedItem({...selectedItem, description: e.target.value})} /></p>
        ) : (
            <p className="mb-2"><strong className="font-semibold">Description:</strong> {selectedItem.description}</p>
        )}
        {editing ? (
            <p className="mb-2"><strong className="font-semibold">Vehicle Type:</strong> <input type="text" value={selectedItem.vehicleType} onChange={e => setSelectedItem({...selectedItem, vehicleType: e.target.value})} /></p>
        ) : (
            <p className="mb-2"><strong className="font-semibold">Vehicle Type:</strong> {selectedItem.vehicleType}</p>
        )}
        {editing ? (
            <p className="mb-2"><strong className="font-semibold">Provider Name:</strong> <input type="text" value={selectedItem.providerName} onChange={e => setSelectedItem({...selectedItem, providerName: e.target.value})} /></p>
        ) : (
            <p className="mb-2"><strong className="font-semibold">Provider Name:</strong> {selectedItem.providerName}</p>
        )}
        {editing ? (
            <p className="mb-2"><strong className="font-semibold">Price:</strong> <input type="text" value={selectedItem.price} onChange={e => setSelectedItem({...selectedItem, price: e.target.value})} /></p>
        ) : (
            <p className="mb-2"><strong className="font-semibold">Price:</strong> {selectedItem.price}</p>
        )}
        {editing ? (
            <p className="mb-2"><strong className="font-semibold">Duration:</strong> <input type="text" value={selectedItem.duration} onChange={e => setSelectedItem({...selectedItem, duration: e.target.value})} /></p>
        ) : (
            <p className="mb-2"><strong className="font-semibold">Duration:</strong> {selectedItem.duration}</p>
        )}
        {editing ? (
            <p className="mb-2"><strong className="font-semibold">Origin:</strong> <input type="text" value={selectedItem.origin} onChange={e => setSelectedItem({...selectedItem, origin: e.target.value})} /></p>
        ) : (
            <p className="mb-2"><strong className="font-semibold">Origin:</strong> {selectedItem.origin}</p>
        )}
        {editing ? (
            <p className="mb-2"><strong className="font-semibold">Destination:</strong> <input type="text" value={selectedItem.destination} onChange={e => setSelectedItem({...selectedItem, destination: e.target.value})} /></p>
        ) : (
            <p className="mb-2"><strong className="font-semibold">Destination:</strong> {selectedItem.destination}</p>
        )}
        {editing ? (
            <p className="mb-2"><strong className="font-semibold">Date:</strong> <input type="text" value={selectedItem.date} onChange={e => setSelectedItem({...selectedItem, date: e.target.value})} /></p>
        ) : (
            <p className="mb-2"><strong className="font-semibold">Date:</strong> {selectedItem.date}</p>
        )}
        {editing ? (
            <p className="mb-2"><strong className="font-semibold">Time:</strong> <input type="text" value={selectedItem.time} onChange={e => setSelectedItem({...selectedItem, time: e.target.value})} /></p>
        ) : (
            <p className="mb-2"><strong className="font-semibold">Time:</strong> {selectedItem.time}</p>
        )}
        <button onClick={() => handleRemove(selectedItem.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove</button>
        <button onClick={() => handleEdit(selectedItem)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2">Edit</button>
        {editing && <button onClick={() => handleSave(selectedItem.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">Save</button>}
        {!editing && <button onClick={() => setSelectedItem(null)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Back</button>}
        </div>
    ) : (
        <div className="flex flex-col h-screen">
        <form onSubmit={handleSearch} className="p-4 flex flex-wrap items-center justify-between">
            <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded m-2 flex-grow"
                placeholder="Search Description"
            />
            <div>
                <DatePicker
                    onChange={setDate}
                    value={date}
                    className="my-custom-datepicker"
                />
            </div>

            <div>
                <TimePicker
                    onChange={setTime}
                    value={time}
                    disableClock={true}
                />
            </div>

            <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="border p-2 rounded m-2 flex-grow"
            >
                <option value="">Transportation Types</option>
                {transportationTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                ))}
            </select>
            <button type="submit" className="ml-2 border p-2 rounded m-2 flex-grow bg-blue-500 text-white hover:bg-blue-700">
                Search
            </button>
        </form>


        <div className="overflow-auto px-4">
        <button onClick={handleResetSearch} className="mb-4">
            Reset Search
        </button>

            {filteredData.length > 0 ? (
            <ul className="space-y-4">
                {filteredData.map((item, index) => (
                    <li 
                        key={index} 
                        className="w-64 px-4 py-2 border border-gray-300 rounded-md"
                        onClick={() => setSelectedItem(item)}
                    >
                        <div><strong>Description:</strong> {item.description}</div>
                        <div><strong>Vehicle Type:</strong> {item.vehicleType}</div>
                    </li>
                ))}
            </ul>
        ) : (
            <div className="text-center text-gray-600">No results found.</div>
        )}
        </div>
    </div>
    );
}

export default YourHistory;
