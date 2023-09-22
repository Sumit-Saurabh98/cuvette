import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Signup } from '../components/Signup';
import GreenLightRedLight from '../components/GreenLightRedLight';
import ProtectedRoute from './ProtectedRoute';

function Router(props) {
    return (
        <Routes>
            <Route path="/" element={<Signup/>}/>
            <Route path="/dashboard" element={<ProtectedRoute><GreenLightRedLight/></ProtectedRoute>}/>
        </Routes>
    );
}

export default Router;