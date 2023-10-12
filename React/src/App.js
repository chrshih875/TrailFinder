import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TrailFinder } from './components/TrailFinder';

function App() {
  return (
    <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/auth" element={<TrailFinder/>} />
            </Routes>
          </div>
    </BrowserRouter>
  );
}

export default App;
