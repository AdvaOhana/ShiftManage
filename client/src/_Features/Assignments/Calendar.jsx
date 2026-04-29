import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { useGetAssignments, useAddAssignment, useUpdateAssignment, useDeleteAssignment } from "./apiHookAssignments.js";
import { useConfirm } from "material-ui-confirm";
import { Box } from "@mui/material";

import { createDeleteConfirmConfig } from "../../utils/confirmDialogUtils";

function Calendar({ selectedUser }) {

    const { data, isLoading } = useGetAssignments();
    const { addAssignment, isLoading: isAdding } = useAddAssignment();
    const { updateAssignment, isLoading: isUpdating } = useUpdateAssignment();
    const { deleteAssignment, isLoading: isDeleting } = useDeleteAssignment();

    const confirm = useConfirm();

    const events = data?.map(event => ({
        id: event.id,
        title: `עובד ${event.user_id}`,
        start: event.start,
        end: event.end
    }));

    const handleSelect = (info) => {
        addAssignment({
            user_id: selectedUser,
            start: info.startStr,
            end: info.endStr
        });
    };

    const handleEventDrop = (info) => {
        updateAssignment({
            id: Number(info.event.id),
            start: info.event.startStr,
            end: info.event.endStr
        });
    };
    const handleEventResize = (info) => {
        updateAssignment(
            {
                id: Number(info.event.id),
                start: info.event.startStr,
                end: info.event.endStr
            }
        )
    };

    const handleEventClick = async (info) => {
        const res = await confirm(
            createDeleteConfirmConfig(
                "שיבוץ",
                info.event.title
            )
        );
        if (!res?.confirmed) return;
        deleteAssignment(info.event.id);

    };

    if (isLoading || isAdding || isUpdating || isDeleting) return <div>טוען...</div>;

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',

                '& .fc': {
                    fontSize: '15px'
                },

                '& .fc-toolbar-title': {
                    fontSize: '20px',
                    fontWeight: 600
                }
            }}
        >
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                allDaySlot={false}
                selectable
                editable
                events={events}
                select={handleSelect}
                eventDrop={handleEventDrop}
                eventResize={handleEventResize}
                eventClick={handleEventClick}
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay'
                }}
                height="100%"
                slotMinTime="07:00:00"
                slotMaxTime="24:00:00"
                slotDuration="00:30:00"
            />
        </Box>
    );
}

export default Calendar;