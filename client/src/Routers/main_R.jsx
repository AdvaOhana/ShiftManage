import React from "react";
import { createBrowserRouter } from "react-router";
import AppLayout from "../Layout/AppLayout.jsx";
import AssignmentsPage from "../_Features/Assignments/AssignmentsPage.jsx";


const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            { path: "/", element: <div>דף הבית</div>, handle: { title: "דף הבית" } },
            { path: "/employees", element: <div>עובדים</div>, handle: { title: "עובדים" } },
            { path: "/managers", element: <div>מנהלים</div>, handle: { title: "מנהלים" } },
            { path: "/shifts", element: <div>משמרות שלי</div>, handle: { title: "משמרות שלי" } },
            { path: "/assignment", element: <AssignmentsPage />, handle: { title: "שיבוץ" } },
            { path: "/scheduling", element: <div>סידור עבודה</div>, handle: { title: "סידור עבודה" } },
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

