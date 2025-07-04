
import AddUser from './AddUser/AddUser';
import './App.css'
import User from './GetUser/User'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Update from './Updateuser/Update';

function App() {
  const route = createBrowserRouter([
    {
      path:"/",
      element : <User/>,
    },
    {
      path:"/add",
      element : <AddUser/>,
    },
    {
      path:"/update/:id",
      element: <Update/>
    }
  ])
  return (
    <div>
       <RouterProvider router={route}></RouterProvider>
    </div>
  )
}

export default App
