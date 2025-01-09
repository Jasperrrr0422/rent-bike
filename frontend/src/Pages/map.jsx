import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const scooterIcon = new L.Icon({
  iconUrl: '/scooter.png', // Change this path if needed
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const bikeIcon = new L.Icon({
  iconUrl: '/bike.png', // Ensure this path is correct
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function Map() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [journeySummary, setJourneySummary] = useState(null);
  const [user, setUser] = useState({ id: 1 }); // Mocked user for demo
  const [showReportForm, setShowReportForm] = useState(false);
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = () => {
    axios.get('http://localhost:8000/api/vehicles/')
      .then(response => {
        setVehicles(response.data.results);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching vehicles:', error);
      });
  };

  const handleMarkerClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setJourneySummary(null);
  };

  const formatBatteryLevel = (level) => {
    const parsed = parseFloat(level);
    return isNaN(parsed) ? 'N/A' : parsed.toFixed(2) + '%';
  };

  const handleRent = (vehicle) => {
    if (vehicle) {
      axios.post('http://localhost:8000/api/rent/', {
        vehicle_id: vehicle.vehicle_id,
        user_id: user.id
      })
        .then(response => {
          console.log('Rental successful:', response.data);
          setJourneySummary(response.data);
          setSelectedVehicle(null);
          fetchVehicles(); // Refresh vehicle list
        })
        .catch(error => {
          console.error('Error renting vehicle:', error);
          alert('Failed to rent vehicle. Please try again.');
        });
    }
  };

  return (
    <div className="flex h-screen bg-green-100 relative">
      <nav className="navbar fixed-top navbar-expand-lg headerColor">
        <div className="container-fluid">
          <a className="navbar-brand HeaderLogo" href="#">E-Vehicle</a>


          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="headerList navbar-nav me-auto">
              <li className="nav-item">
                <button className="nav-link headerList-nav-link"
                  onClick={() => {
                    navigate("/")
                  }}>Home</button>
              </li>
              <button className='customerButton btn btn-primary'>Account</button>
              <button className='customerButton btn btn-primary'>Payment</button>
              <button className='customerButton btn btn-primary'>Ride History</button>
              <button
                type="submit"
                className="ReportButton btn btn-danger"
                onClick={() => setShowReportForm(!showReportForm)}
              >
                {showReportForm ? 'Hide Report Form' : 'Report problem'}
              </button>
              <button className='customerButton btn btn-primary'>Log out</button>
            </ul>
          </div>
        </div>
      </nav>
      <div className='textareaCus row col-12'>
        {/* Conditionally render textarea based on showReportForm */}
        {showReportForm && (
          <div className="col-4">
            <textarea className="customerReport form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
        )}
        {showReportForm && (
          <div className="col-4">
            <button className='ReportButton btn btn-warning'>Submit report</button>
          </div>
        )}

      </div>


      {/* Map and Vehicle Info */}
      <div className="flex-1 flex flex-col relative">
        <div className='card'>
          <div className="MapMargin flex-1">
            <MapContainer
              center={[55.8642, -4.2518]}
              zoom={13}
              style={{ height: '80vh', width: '100%', zIndex: 1 }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {vehicles.map(vehicle => (
                <Marker
                  key={vehicle.vehicle_id}
                  position={[vehicle.location.latitude, vehicle.location.longitude]}
                  icon={vehicle.vehicle_type === 1 ? scooterIcon : bikeIcon} // Use the scooter icon for type 1
                  eventHandlers={{
                    click: () => handleMarkerClick(vehicle),
                  }}
                >
                  <Popup minWidth={150} maxWidth={440}>
                    <div style={{ fontSize: '12px', maxHeight: '220px', overflowY: 'auto' }}>
                      <h4 className="font-bold">Vehicle ID: {vehicle.vehicle_id}</h4>
                      <p>Type: {vehicle.vehicle_type === 1 ? 'Electric Scooter' : 'Electric Bike'}</p>
                      <p>Location: {vehicle.location.name}</p>
                      <p>Battery: {formatBatteryLevel(vehicle.battery_level)}</p>
                      <img
                        src={vehicle.vehicle_type === 1 ? scooterIcon.options.iconUrl : bikeIcon.options.iconUrl}
                        style={{ width: '65px', height: '65px', marginRight: '8px' }}
                      />
                     
                      <button
                        onClick={() => handleRent(vehicle)}
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                      >
                        Rent
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {journeySummary && (
                <Polyline
                  positions={[
                    [journeySummary.start_location.latitude, journeySummary.start_location.longitude],
                    [journeySummary.end_location.latitude, journeySummary.end_location.longitude]
                  ]}
                  color="blue"
                />
              )}
            </MapContainer>
          </div>
        </div>

        {/* Warning Footer */}
        {/* <div className="bg-yellow-100 p-4 text-center">
          <p className="text-sm text-gray-700">
            Warning: Please ensure you follow all traffic rules and wear appropriate safety gear when using e-bikes.
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default Map;
