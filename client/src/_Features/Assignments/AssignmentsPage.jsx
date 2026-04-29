import { Box, Select, MenuItem } from "@mui/material";
import Calendar from "./Calendar";
import { useState } from "react";

function SchedulePage() {
    const [selectedUser, setSelectedUser] = useState(1);

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box sx={{ mb: 1 }}>
                <Select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    size="small"
                >
                    <MenuItem value={1}>עובד 1</MenuItem>
                    <MenuItem value={2}>עובד 2</MenuItem>
                </Select>
            </Box>

            <Box sx={{ flex: 1, minHeight: 0 }}>
                <Calendar selectedUser={selectedUser} />
            </Box>
        </Box>
    );
}

export default SchedulePage;