import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Signup } from '../components/Signup';
import GreenLightRedLight from '../components/GreenLightRedLight';

function Router(props) {
    return (
        <Routes>
            <Route path="/" element={<Signup/>}/>
            <Route path="/Dashboard" element={<GreenLightRedLight/>}/>
        </Routes>
    );
}

export default Router;