import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'


export default function Calendar({ handleDateSelect,events }) {

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
      events={events}
    />

  )
}