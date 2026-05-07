import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import {
    useGetAssignments,
    useAddAssignment,
    useUpdateAssignment,
    useDeleteAssignment
} from "./apiHookAssignments.js";
import { useGetUsers } from "../Users/apiHookUsers.js";

import { useConfirm } from "material-ui-confirm";
import { useState } from "react";

import {
    Box,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    Typography
} from "@mui/material";

import { createDeleteConfirmConfig } from "../../utils/confirmDialogUtils.jsx";

function CalendarWrapper({ selectedUser }) {

    const { data, isLoading } = useGetAssignments();

    const { addAssignment } = useAddAssignment();
    const { updateAssignment } = useUpdateAssignment();
    const { deleteAssignment } = useDeleteAssignment();

    const { data: users } = useGetUsers();

    const confirm = useConfirm();

    const [dialogOpen, setDialogOpen] = useState(false);

    const [selectedSlot, setSelectedSlot] = useState(null);

    const [formData, setFormData] = useState({
        start: '',
        end: ''
    });
    const events = data?.map(event => {
        const user = users?.find(u => u.id === event.user_id);
        return {
            id: event.id,
            title: `${user?.name || event.user_id}`,
            start: event.start,
            end: event.end,
            user_id: event.user_id

        };
    }) || [];


    const handleSelect = (info) => {

        if (!selectedUser) return;

        setSelectedSlot(info);

        setFormData({
            start: info.startStr.slice(0, 16),
            end: info.endStr.slice(0, 16)
        });

        setDialogOpen(true);
    };

    const handleEventDrop = (info) => {

        updateAssignment({
            id: Number(info.event.id),
            start: info.event.startStr,
            end: info.event.endStr
        });
    };

    const handleEventResize = (info) => {

        updateAssignment({
            id: Number(info.event.id),
            start: info.event.startStr,
            end: info.event.endStr
        });
    };

    const handleEventClick = async (info) => {
        console.log(info);

        const res = await confirm(
            createDeleteConfirmConfig(
                "המשמרת של",
                info.event.title
            )
        );

        if (!res?.confirmed) return;

        deleteAssignment(info.event.id);
    };

    const handleCreateAssignment = () => {

        addAssignment({
            user_id: selectedUser,
            start: formData.start,
            end: formData.end
        });

        setDialogOpen(false);
    };

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
                width: '100%',

                bgcolor: 'background.paper',

                p: 1,

                border: '1px solid #e5e7eb',

                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',

                overflow: 'hidden',

                '& .fc': {
                    height: '100%',
                },

                '& .fc-toolbar': {
                    marginBottom: '20px',
                    gap: 1
                },

                '& .fc-toolbar-title': {
                    fontSize: {
                        xs: '18px',
                        md: '28px'
                    },
                    fontWeight: 700,
                    color: '#0F3460'
                },

                '& .fc-button': {
                    background: '#ffffff',
                    border: '1px solid #d1d5db',
                    color: '#0F3460',
                    borderRadius: '10px',
                    padding: '6px 14px',
                    fontWeight: 600,
                    transition: '0.2s',
                },

                '& .fc-button:hover': {
                    background: '#0F3460',
                    color: '#ffffff'
                },

                '& .fc-button-active': {
                    background: '#0F3460 !important',
                    color: '#ffffff !important'
                },

                '& .fc-timegrid-slot': {
                    height: '30px'
                },

                '& .fc-col-header-cell': {
                    background: '#f8fafc',
                    padding: '5px 0'
                },

                '& .fc-event': {
                    border: 'none',
                    borderRadius: '10px',
                    padding: '4px',
                    fontWeight: 600,
                    background:
                        'linear-gradient(135deg, #64b5f6 0%, #1976d2 100%)'
                },

                '& .fc-timegrid-now-indicator-line': {
                    borderColor: '#e94560'
                }
            }}
        >

            <FullCalendar
                plugins={[
                    timeGridPlugin,
                    interactionPlugin
                ]}

                initialView="timeGridWeek"

                editable
                selectable

                events={events}

                select={handleSelect}

                eventDrop={handleEventDrop}

                eventResize={handleEventResize}

                eventClick={handleEventClick}

                allDaySlot={false}

                slotMinTime="07:00:00"

                slotMaxTime="24:00:00"

                slotDuration="00:30:00"

                height="100%"

                direction="rtl"

                locale="he"

                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay'
                }}

                buttonText={{
                    today: 'היום',
                    week: 'שבוע',
                    day: 'יום'
                }}
            />
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >

                <DialogTitle
                    sx={{
                        fontWeight: 700
                    }}
                >
                    הוספת משמרת
                </DialogTitle>

                <DialogContent>

                    <Stack spacing={3} sx={{ mt: 2 }}>

                        <TextField
                            label="תחילת משמרת"
                            type="datetime-local"
                            fullWidth

                            value={formData.start}

                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    start: e.target.value
                                })
                            }

                            InputLabelProps={{
                                shrink: true
                            }}
                        />

                        <TextField
                            label="סיום משמרת"
                            type="datetime-local"
                            fullWidth

                            value={formData.end}

                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    end: e.target.value
                                })
                            }

                            InputLabelProps={{
                                shrink: true
                            }}
                        />

                    </Stack>

                </DialogContent>

                <DialogActions sx={{ p: 2 }}>

                    <Button
                        onClick={() => setDialogOpen(false)}
                    >
                        ביטול
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleCreateAssignment}
                    >
                        שמור משמרת
                    </Button>

                </DialogActions>

            </Dialog>

        </Box>
    );
}

export default CalendarWrapper;