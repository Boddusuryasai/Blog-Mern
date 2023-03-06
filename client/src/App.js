
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import BlogList from './components/BlogList';
import BlogDetails from './components/BlogDetails';
import CreatePost from './components/CreatePost';

import {
  createBrowserRouter,
  RouterProvider,
 
} from "react-router-dom";
import Main from './components/Main';
import EditPost from './components/EditPost';
const appRouter = createBrowserRouter([
  {
  path:"/",
  element:<Login/>,
},
{
  path:"/register",
  element:<Register/>,
},
{
  path:"/Home",
  element:<Main/>,
  children:[
    {
      path:"Blog",
      element:<BlogList/>
    },
    {
      path:"Blog/:id",
      element:<BlogDetails/>
    },
    {
      path:"edit/:id",
      element:<EditPost/>
    },
    {
      path:"CreatePost",
      element:<CreatePost/>
    },
    
  ]
}

])
function App() {
  return (
    <div className="container mx-auto px-5 font-[Poppins]">
       <RouterProvider router={appRouter} />
    </div>
  );
}


export default App;
