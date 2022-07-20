import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import { AuthProvider } from './Components/context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
      <Router>  
        <AuthProvider>
          <Routes>        
          <Route path="/*" element={<App />} />      
          </Routes>
        </AuthProvider>
     </Router>
</React.StrictMode>
);   


