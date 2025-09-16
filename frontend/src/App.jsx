import React from 'react'
import { Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Home from './pages/home'
import About from "./pages/about";
import Shop from "./pages/shop";
import Contact from "./pages/contact";
import Signup from './pages/signup';
import Login from "./pages/login";
import Bestseller from './pages/bestseller';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Home/>} />
         
        {/* Other routes */}
        <Route path="about" element={<About />} />
        <Route path="shop" element={<Shop />} />
        <Route path="contact" element={<Contact />} /> 
        <Route path="signup" element={<Signup />} /> 
        <Route path="/login" element={<Login />} />
         <Route path="/bestsellers" element={<Bestseller/>} />
     
      </Route>
    )
  )
  return (
    <div>
    <RouterProvider router={router}/>
    </div>
  )
}

export default App
