
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import BlogList from './components/BlogList';
import {
  createBrowserRouter,
  RouterProvider,
 
} from "react-router-dom";
import Main from './components/Main';
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
    }
  ]
}

])
function App() {
  return (
    <div className="container mx-auto bg-slate-100 font-[Poppins]">
       <RouterProvider router={appRouter} />
    </div>
  );
}


export default App;
