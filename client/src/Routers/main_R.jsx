import React from "react";
import { createBrowserRouter } from "react-router";
import AppLayout from "../Layout/AppLayout.jsx";
import SchedulePage from "../_Features/Assignments/SchedulePage.jsx";
import DashboardPage from "../_Features/Users/DashboardPage.jsx";


const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            //עובד
            { path: "/", element: <DashboardPage />, handle: { title: "דשבורד" } },
            { path: "/shifts", element: <div>משמרות שלי</div>, handle: { title: "משמרות שלי" } },
            { path: "/scheduling", element: <div>סידור עבודה</div>, handle: { title: "סידור עבודה" } },
            //מנהל
            { path: "/managers", element: <div>מנהלים</div>, handle: { title: "מנהלים" } },
            { path: "/employees", element: <div>עובדים</div>, handle: { title: "עובדים" } },
            { path: "/assignment", element: <SchedulePage />, handle: { title: "שיבוץ" } },
        ]
    },
]);

import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import FreeCancellationIcon from '@mui/icons-material/FreeCancellation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
export const navItems = [
    { name: 'ראשי', path: '/', icon: <HomeIcon /> },
    { name: 'עובדים', path: '/employees', icon: <BadgeIcon /> },
    { name: 'מנהלים', path: '/managers', icon: <PersonIcon /> },
    { name: 'משמרות שלי', path: '/shifts', icon: <FreeCancellationIcon /> },
    { name: 'שיבוץ', path: '/assignment', icon: <EditCalendarIcon /> },
    { name: 'סידור עבודה', path: '/scheduling', icon: <CalendarMonthIcon /> },
];

export default router;

