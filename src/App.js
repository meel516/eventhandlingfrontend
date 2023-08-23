import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
 <Routes>
  <Route path="/" element={<Home/>}/>
<Route path="/user/:name" element={<Dashboard/>}/>

  
 </Routes>
 </BrowserRouter> 
    </div>
  );
}

export default App;
