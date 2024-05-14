import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GearPage from './pages/GearPage';
import EventList from './pages/EventList';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import UserProfile from './pages/UserProfile';
import AdminDashboardPage from './pages/AdminDashboardPage';
import GearManagement from './components/admin/GearManagement';
import EventManagement from './components/admin/EventManagement';
import CreateUser from './components/admin/CreateUser';
import DisplayGear from './components/admin/DisplayGear';
import DisplayUsers from './components/admin/DisplayUsers';
import DisplayEvents from './components/admin/DisplayEvent';
import Accesse from './pages/Accesse';
import NavUser from './components/common/NavUser';
import Footer from './components/common/Footer';
import Cart from './components/cart/cart';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavUser />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gear" element={<GearPage />} />
          {/* <Route path="/gear/:slug" element={<Gear />} /> */}
          <Route path="/events" element={<EventList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/user/dashboard/:id" element={<AdminDashboardPage />} />
          <Route path="/admin/gear" element={<GearManagement />} />
          <Route path="/admin/events" element={<EventManagement />} />
          <Route path="/admin/users" element={<CreateUser />} />
          <Route path="/display-gear" element={<DisplayGear />} />
          <Route path="/display-user" element={<DisplayUsers />} />
          <Route path="/display-event" element={<DisplayEvents />} />
          <Route path="/access" element={<Accesse />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
