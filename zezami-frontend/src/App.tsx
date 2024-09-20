import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './views/Dashboard/Dashboard';
import ProductList from './components/ProductList/ProductList';

function App() {
  return (
    <div className="App"> 
      <Router>
        <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<ProductList />} />
          {/* Add more sub-routes here if needed */}
        </Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
