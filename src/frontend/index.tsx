import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./index.css"
import { CreateWishListPage } from "./pages/CreateWishListPage"
import { HomePage } from "./pages/HomePage"
import { ProfilePage } from "./pages/ProfilePage"
import { WishListPage } from "./pages/WishListPage"
import { TrpcQueryContextProvider } from "./trpc"

const rootElement = document.getElementById("root")!
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <TrpcQueryContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/wishlist/:wishlistid" element={<WishListPage />} />
          <Route path="/createwishlist" element={<CreateWishListPage />} />
        </Routes>
      </BrowserRouter>
    </TrpcQueryContextProvider>
  </React.StrictMode>,
)
