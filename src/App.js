import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Update from './components/Home/Update';
import Main from './layout/Main';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/:id',
          element: <Update></Update>,
          loader: ({ params }) => fetch(`https://todos-server-iota.vercel.app/${params.id}`)
        }
      ]
    }
  ])

  return (
    <div >
      <RouterProvider router={router}></RouterProvider>

    </div >
  );
}

export default App;
