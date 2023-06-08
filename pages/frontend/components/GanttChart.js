import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { useEffect, useState } from 'react';

let tasks = [
    {
      start: new Date(2023, 5, 9),
      end: new Date(2023, 5, 11),
      name: 'Idea',
      id: 'Task 0',
      type:'task',
      progress: 60,
      isDisabled: true,
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
    },
    {
        start: new Date(2023, 5, 19),
        end: new Date(2023, 5, 29),
        name: 'Workout',
        id: 'Task 1',
        type:'task',
        progress: 20,
        isDisabled: true,
        styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
      },
];

function GanttChart( props ) {
    const [scheduleHere, setScheduleHere] = useState()
    const [finalSchedule, setFinalSchedule] = useState()

    useEffect(() => {
        const tempSchedule = props.schedule
        if (tempSchedule !== null) {
            setScheduleHere(tempSchedule)
        }
    }, [])

    useEffect(() => {
        if (scheduleHere) {
            console.log(scheduleHere)
            // for (let i = 0; i < scheduleHere.length; i++) {
            //     let newData = {
            //         start: scheduleHere[i].start,
            //         end: scheduleHere[i].end,
            //         name: scheduleHere[i].name,
            //         id: `Task ${i}`,
            //         type:'task',
            //         progress: 60,
            //         isDisabled: true,
            //         styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
            //     }
            //     setFinalSchedule(...finalSchedule, newData)
            // }
        }
        
    }, [scheduleHere])
    return (
        <Gantt tasks={tasks} />
    )
}

export default GanttChart;

