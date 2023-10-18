import './App.css';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TrailFinder } from './components/TrailFinder';
import MyMapComponent from './components/Map';

function App() {
  return (
    <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/" element={<TrailFinder/>} />
              {/* <Route path="/" element={<MyMapComponent/>} /> */}
            </Routes>
          </div>
    </BrowserRouter>
  );
}

export default App;
