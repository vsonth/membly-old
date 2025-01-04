import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'


export default function Calendar({ handleDateSelect }) {

  return (

    <FullCalendar
      plugins={[
        dayGridPlugin,
        interactionPlugin,
        timeGridPlugin,
      ]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,dayGridMonth',
      }}
      initialView='timeGridWeek'
      nowIndicator={true}
      editable={true}
      selectable={true}
      select={handleDateSelect}
      selectMirror={true}
      initialEvents={[
        { title: 'nice event', start: new Date(), resourceId: 'a' },
      ]}
    />

  )
}