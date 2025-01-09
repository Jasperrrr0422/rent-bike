import React from 'react';
// 添加 Bootstrap CSS 导入

function VehicleManagementSystem() {
  return (
    <div className="container-fluid pb-5">
      <header className="bg-primary text-white py-4 mb-4 shadow">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3 text-center">Vehicle Management System</h1>
          <nav className="mt-2">
            <ul className="nav nav-pills gap-3">
              <li className="nav-item">
                <a className="nav-link text-white hover-effect px-4" 
                   href="Operator2"
                   style={{
                     transition: 'all 0.3s ease',
                     borderRadius: '25px',
                   }}
                   onMouseOver={e => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                   onMouseOut={e => e.target.style.backgroundColor = 'transparent'}>
                   Vehicle State
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white hover-effect px-4" 
                   href="#locations"
                   style={{
                     transition: 'all 0.3s ease',
                     borderRadius: '25px',
                   }}
                   onMouseOver={e => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                   onMouseOut={e => e.target.style.backgroundColor = 'transparent'}>
                   Locations
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white hover-effect px-4" 
                   href="#charge"
                   style={{
                     transition: 'all 0.3s ease',
                     borderRadius: '25px',
                   }}
                   onMouseOver={e => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                   onMouseOut={e => e.target.style.backgroundColor = 'transparent'}>
                   Charge
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white hover-effect px-4" 
                   href="#repair"
                   style={{
                     transition: 'all 0.3s ease',
                     borderRadius: '25px',
                   }}
                   onMouseOver={e => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                   onMouseOut={e => e.target.style.backgroundColor = 'transparent'}>
                   Repair
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white hover-effect px-4" 
                   href="#move-vehicle"
                   style={{
                     transition: 'all 0.3s ease',
                     borderRadius: '25px',
                   }}
                   onMouseOver={e => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                   onMouseOut={e => e.target.style.backgroundColor = 'transparent'}>
                   Move Vehicle
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section id="locations">
        <h2 className="text-center">Vehicle Locations</h2>
        {/* Google Map will be embedded here */}
        <div id="map"></div>
      </section>

      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <section id="charge" className="card h-100">
              <div className="card-header bg-info text-white py-2">
                <h2 className="h5 mb-0">Charge</h2>
              </div>
              <div className="card-body">
                <form id="charge-form">
                  <div className="mb-2">
                    <label htmlFor="vehicle-code" className="form-label small">Vehicle Code:</label>
                    <input type="text" className="form-control form-control-sm" id="vehicle-code" name="vehicle-code" required />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="operator-name" className="form-label small">Operator Name:</label>
                    <input type="text" className="form-control form-control-sm" id="operator-name" name="operator-name" required />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="state-code" className="form-label small">State Code:</label>
                    <input type="text" className="form-control form-control-sm" id="state-code" name="state-code" required />
                  </div>
                  <button type="submit" className="btn btn-primary btn-sm">Charge</button>
                </form>
              </div>
            </section>
          </div>

          <div className="col-md-4 mb-4">
            <section id="repair" className="card h-100">
              <div className="card-header bg-warning text-white py-2">
                <h2 className="h5 mb-0">Repair</h2>
              </div>
              <div className="card-body">
                <form id="repair-form">
                  <div className="mb-2">
                    <label htmlFor="repair-vehicle-code" className="form-label small">Vehicle Code:</label>
                    <input type="text" className="form-control form-control-sm" id="repair-vehicle-code" name="repair-vehicle-code" required />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="repair-operator-name" className="form-label small">Operator Name:</label>
                    <input type="text" className="form-control form-control-sm" id="repair-operator-name" name="repair-operator-name" required />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="repair-state-code" className="form-label small">State Code:</label>
                    <input type="text" className="form-control form-control-sm" id="repair-state-code" name="repair-state-code" required />
                  </div>
                  <button type="submit" className="btn btn-warning btn-sm">Repair</button>
                </form>
              </div>
            </section>
          </div>

          <div className="col-md-4 mb-4">
            <section id="move-vehicle" className="card h-100">
              <div className="card-header bg-success text-white py-2">
                <h2 className="h5 mb-0">Move Vehicle</h2>
              </div>
              <div className="card-body">
                <form id="move-form">
                  <div className="mb-2">
                    <label htmlFor="move-vehicle-code" className="form-label small">Vehicle Code:</label>
                    <input type="text" className="form-control form-control-sm" id="move-vehicle-code" name="move-vehicle-code" required />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="move-operator-name" className="form-label small">Operator Name:</label>
                    <input type="text" className="form-control form-control-sm" id="move-operator-name" name="move-operator-name" required />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="move-state-code" className="form-label small">State Code:</label>
                    <input type="text" className="form-control form-control-sm" id="move-state-code" name="move-state-code" required />
                  </div>
                  <button type="submit" className="btn btn-success btn-sm">Move</button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleManagementSystem;