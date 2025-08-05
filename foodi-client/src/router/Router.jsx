import {createBrowserRouter} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UserProfile from "../pages/dashboard/UserProfile";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import Login from "../components/Login";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/shop/Payment";
import Order from "../pages/dashboard/Order";
import ManageOrders from "../pages/dashboard/admin/ManageOrders";
import BookingPage from "../pages/booking/BookingPage";
import Booking from "../pages/dashboard/Booking";
import ManageBookings from "../pages/dashboard/admin/ManageBookings";
import ReviewPage from "../pages/review/ReviewPage";
import Contact from "../pages/Contact";

const router = createBrowserRouter([
  // users routes
    {
      path: "/",
      element: <Main />,
      children: [
        {
            path: "/",
            element: <Home />
        },
        {
          path: "/menu",
          element: <Menu/>,
        },
        {
          path: "/update-profile",
          element: <UserProfile />
        },
        {
          path: "/cart-page",
          element: <CartPage />
        },
        {
          path: "/process-checkout",
          element: <Payment />
        },
        {
          path: "/order",
          element:<PrivateRouter><Order/></PrivateRouter>
        },
        {
          path: "/booking-page",
          element:<BookingPage />
        },
        {
          path: "/booking",
          element:<Booking />
        },
        {
          path: "/review",
          element:<ReviewPage />
        },
        {
          path: "/contact",
          element:<Contact />
        }
      ],
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login />
    },
    // admin routes
    {
      path: "/dashboard",
      element: <PrivateRouter><DashboardLayout /></PrivateRouter>,
      children: [
        {
          path: '',
          element: <Dashboard />
        },
        {
          path: 'users',
          element: <Users />
        },
        {
          path: 'add-menu',
          element: <AddMenu />
        },
        {
          path: "manage-items",
          element: <ManageItems />
        },
        {
          path: "update-menu/:id",
          element: <UpdateMenu />,
          loader: ({params}) => fetch(`http://localhost:6001/menu/${params.id}`)
        },
        {
          path: 'manage-orders',
          element: <ManageOrders />
        },
        {
          path: 'manage-bookings',
          element: <ManageBookings />
        }
      ]
    }
    
  ]);

export default router;
