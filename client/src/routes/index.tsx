
import Login from '../pages/auth/login';
import Dashboard from '../pages/Dashboard'

export const routes = [
    {
        path: '/',
        element: <Login />
    },
    {
        path: 'dashboard',
        element: <Dashboard />
    },
] 