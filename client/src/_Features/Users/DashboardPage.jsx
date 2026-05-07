import React, { useMemo } from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Paper,
    Stack,
    Chip
} from "@mui/material";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DateRangeIcon from '@mui/icons-material/DateRange';

import dayjs from "dayjs";

import { useGetAssignments } from "../Assignments/apiHookAssignments";

function DashboardPage({ currentUserId = 1 }) {

    const { data } = useGetAssignments();

    const myShifts = useMemo(() => {
        return data.filter(e => e.user_id === currentUserId);
    }, [data, currentUserId]);

    const upcomingShifts = useMemo(() => {
        return myShifts
            .filter(s => new Date(s.start) >= new Date())
            .sort((a, b) => new Date(a.start) - new Date(b.start))
            .slice(0, 5);
    }, [myShifts]);

    const monthlyHours = useMemo(() => {
        const now = new Date();

        return myShifts
            .filter(s => {
                const d = new Date(s.start);
                return d.getMonth() === now.getMonth() &&
                    d.getFullYear() === now.getFullYear();
            })
            .reduce((sum, s) => {
                const hours =
                    (new Date(s.end) - new Date(s.start)) / (1000 * 60 * 60);
                return sum + hours;
            }, 0);
    }, [myShifts]);

    return (
        <Box sx={{ p: 2 }}>

            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
                הדשבורד שלי
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>

                <Grid item xs={12} md={4}>
                    <Card sx={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <AccessTimeIcon sx={{ fontSize: 48, color: '#fff' }} />
                            <Box>
                                <Typography variant="h3" sx={{ color: '#fff', fontWeight: 700 }}>
                                    {monthlyHours.toFixed(1)}
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                    שעות החודש
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <ScheduleIcon sx={{ fontSize: 48, color: '#fff' }} />
                            <Box>
                                <Typography variant="h3" sx={{ color: '#fff', fontWeight: 700 }}>
                                    {upcomingShifts.length}
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                    משמרות קרובות
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <DateRangeIcon sx={{ fontSize: 48, color: '#fff' }} />
                            <Box>
                                <Typography variant="h3" sx={{ color: '#fff', fontWeight: 700 }}>
                                    {myShifts.length}
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                    סה"כ משמרות
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

            <Card>
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                        משמרות קרובות
                    </Typography>

                    <Stack spacing={2}>
                        {upcomingShifts.map((shift) => (
                            <Paper
                                key={shift.id}
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    border: '2px solid',
                                    borderColor: 'divider'
                                }}
                            >
                                <Box>
                                    <Typography variant="h6" fontWeight={600}>
                                        {dayjs(shift.start).format('dddd, DD MMMM')}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {dayjs(shift.start).format('HH:mm')} - {dayjs(shift.end).format('HH:mm')}
                                    </Typography>
                                </Box>

                                <Chip
                                    label="משמרת"
                                    color="primary"
                                />
                            </Paper>
                        ))}
                    </Stack>
                </CardContent>
            </Card>

        </Box>
    );
}

export default DashboardPage;