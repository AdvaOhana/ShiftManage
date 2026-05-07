import {
    Box,
    Typography,
    Paper,
    Avatar,
    Chip,
    Divider,
    CircularProgress
} from "@mui/material";

import { useState } from "react";

import CalendarWrapper from "./CalendarWrapper";

import { useGetUsers } from "../Users/apiHookUsers.js";

const shiftTypes = [
    {
        id: 1,
        name: 'בוקר',
        color: '#ffb74d'
    },
    {
        id: 2,
        name: 'ערב',
        color: '#64b5f6'
    },
    {
        id: 3,
        name: 'אמצע',
        color: '#9575cd'
    }
];

function SchedulePage() {

    const [selectedUser, setSelectedUser] = useState();

    const { data: users, isLoading } = useGetUsers();

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 5
                }}
            >
                <CircularProgress />
            </Box>
        );
    }
    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    lg: 'row'
                },
                gap: 2
            }}
        >

            <Paper
                sx={{
                    width: {
                        xs: '100%',
                        lg: 320
                    },
                    height: {
                        xs: 300,
                        lg: '100%'
                    },
                    p: 2,
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    overflowY: 'auto',

                    border: '1px solid #e5e7eb',

                    boxShadow:
                        '0 4px 20px rgba(0,0,0,0.06)'
                }}
            >

                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ mb: 1 }}
                >
                    עובדים זמינים
                </Typography>

                {
                    users?.map((user) => (

                        <Paper
                            key={user.id}

                            onClick={() => setSelectedUser(Number(user.id))}

                            sx={{
                                p: 1.5,

                                display: 'flex',

                                alignItems: 'center',

                                gap: 1.5,

                                cursor: 'pointer',

                                borderRadius: 2,

                                transition: '0.2s',

                                border:
                                    Number(selectedUser) === Number(user.id)
                                        ? '2px solid #1a1a2e'
                                        : '2px solid transparent',

                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 3
                                }
                            }}
                        >

                            <Avatar
                                sx={{
                                    bgcolor: '#1a1a2e',
                                    width: 42,
                                    height: 42,
                                    fontWeight: 700
                                }}
                            >
                                {user.name?.charAt(0)}
                            </Avatar>

                            <Box>

                                <Typography fontWeight={700}>
                                    {user.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {user.role}
                                </Typography>

                            </Box>

                        </Paper>
                    ))
                }

                <Divider sx={{ my: 2 }} />

                <Typography
                    variant="subtitle2"
                    fontWeight={700}
                >
                    סוגי משמרות
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1
                    }}
                >

                    {
                        shiftTypes.map((shift) => (

                            <Chip
                                key={shift.id}
                                label={shift.name}

                                sx={{
                                    bgcolor: shift.color,
                                    fontWeight: 700
                                }}
                            />
                        ))
                    }

                </Box>

            </Paper>

            <Box
                sx={{
                    flex: 1,
                    minWidth: 0,
                    minHeight: 0
                }}
            >

                <CalendarWrapper
                    selectedUser={selectedUser}
                />

            </Box>

        </Box>
    );
}

export default SchedulePage;