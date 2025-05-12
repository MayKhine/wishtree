import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./index.css"
import { CreateWishListPage } from "./pages/CreateWishListPage"
import { LandingPage } from "./pages/LandingPage"
import { ProfilePage } from "./pages/ProfilePage"
import { SearchedProfilesPage } from "./pages/SearchedProfilesPage"
import { SignInPage } from "./pages/SignInPage"
import { SingleWishListPage } from "./pages/SingleWishListPage"
import { WishListsPage } from "./pages/WishListsPage"
import { TrpcQueryContextProvider } from "./trpc"
import { UserProvider } from "./userContext/UserContext"

const rootElement = document.getElementById("root")!
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <TrpcQueryContextProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/signin" element={<SignInPage />}></Route>
            <Route path="/wishlists" element={<WishListsPage />}></Route>

            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/search" element={<SearchedProfilesPage />}></Route>

            <Route
              path="/wishlists/:wishlistid"
              element={<SingleWishListPage />}
            />
            <Route path="/createwishlist" element={<CreateWishListPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TrpcQueryContextProvider>
  </React.StrictMode>,
)
