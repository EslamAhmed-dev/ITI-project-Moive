import { useState } from 'react'
import MoviesList from './Pages/MoviesList';
import { createBrowserRouter } from "react-router";
import Navbar from './Components/Navbar';
import TvShowsList from './Pages/TvShowsList';
import WishList from './Pages/WishList';
import MovieDetails from './Pages/MovieDetails';
import TvShowDetails from './Pages/TvShowsDetails';
import Ai_Assistant from './Pages/Ai_Assistant';
import SearchResults from './Pages/SearchResults';
import { RouterProvider } from "react-router/dom";
import { Outlet } from 'react-router';
import './App.css'

function MainLayout(){
  return(
    <div style={{width:"100%",overflowX:"hidden"}}>
      <Navbar/>
      <Outlet/>
      
    </div>
  );
}

function App() {
  const routes=createBrowserRouter([
    {
      path:"/",
      element:<MainLayout/>,
      children:[

        {
        path:"",
        element:<MoviesList/>
        },
        {
          path:"tvshowslist",
          element:<TvShowsList/>
        },
        {
          path:"wishlist",
          element:<WishList/>
        },
        {
          path:"Ai_Assistant",
          element:<Ai_Assistant/>
        },
        {
          path:"movies/:id",
          element:<MovieDetails/>
        },
         {
          path:"shows/:id",
          element:<TvShowDetails/>
        },
         {
          path:"search",
          element:<SearchResults/>
        }
       
       

      ]
     
  }
  ])

  return (
    <>
      <RouterProvider router={routes} />
    </>
  
  
  )
}

export default App
