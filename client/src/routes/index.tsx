
import Login from '../pages/Auth/login'
import Dashboard from '../pages/Dashboard/Dashboard'

export const routes = [
    {
        path: '/',
        element: <Login />
    },
    {
        path: 'dashboard',
        element: <Dashboard />
    },
    {
        path: 'users',
        element: <Dashboard />
    },
] 