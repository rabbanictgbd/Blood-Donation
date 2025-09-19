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
import RequestBlood from '../pages/RequestBlood'
import MyDonationRequests from '../pages/MyDonationRequests'
import DonationRequestForm from '../components/DonationRequestForm'
import CreateRequest from '../pages/CreateRequest'
import ViewRequest from '../pages/ViewRequest'
import EditRequest from '../pages/EditRequest'

const Router = () => {
    return (
        <div className="p-5">
            <Routes>
                <Route element={<MainLayout />} >
                    <Route path="/" element={<Home />} />
                    <Route path="/donation-requests" element={<DonationRequests />} />
                    {/* <Route path="/requests" element={<RequestBlood />} /> */}
                    <Route path="/requests" element={<CreateRequest />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<PrivateRoutes/>}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/dashboard/profile" element={<Profile />} />
                        <Route path="/dashboard/view-request/:id" element={<ViewRequest />} />
                        <Route path="/dashboard/edit-request/:id" element={<EditRequest />} />
                        <Route path="/my-donation-requests" element={<MyDonationRequests />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}

export default Router
