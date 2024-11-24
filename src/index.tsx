import React from "react"
import ReactDOM from "react-dom/client"
import { HomePage } from "./pages/HomePage"
import { ProfilePage } from "./pages/ProfilePage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"
import { WishListPage } from "./pages/WishListPage"

const rootElement = document.getElementById("root")!
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/wishlist/:wishlistid" element={<WishListPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
