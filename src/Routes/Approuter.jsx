import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mapview from '../Pages/Mapview'



const Approuter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Mapview />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Approuter