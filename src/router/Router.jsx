import React from 'react'
import Home from '../pages/Home'
import DonationRequests from '../pages/DonationRequests'
import Blogs from '../pages/Blogs'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import PrivateRoutes from './PrivateRoutes'

const Router = () => {
    return (
        <div className="p-5">
            <Routes>
                <Route element={<MainLayout />} >
                    <Route path="/" element={<Home />} />
                    <Route path="/donation-requests" element={<DonationRequests />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<PrivateRoutes/>}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/dashboard/profile" element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}

export default Router
