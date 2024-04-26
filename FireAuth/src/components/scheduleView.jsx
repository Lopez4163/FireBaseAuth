import React, { useState, useEffect } from "react"
import { fetchSchedule, handleAddClass } from "../utils"

const Schedule = () => {
  const [loading, setLoading] = useState(true)
  const [schedule, setSchedule] = useState([])

  useEffect(() => {
    const handleFetchSchedule = async () => {
      try {
        const currentSchedule = await fetchSchedule()
        setSchedule(currentSchedule)
      } catch (error) {
        console.error("Error fetching schedule:", error)
      } finally {
        setLoading(false)
      }
    }
    handleFetchSchedule()
  }, [handleAddClass])

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              {daysOfWeek.map(day => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {daysOfWeek.map(day => (
                <td key={day}>
                  {/* Render classes for the current day */}
                  {schedule.map(
                    scheduleDay =>
                      scheduleDay.id === day.toLowerCase() && (
                        <React.Fragment key={scheduleDay.id}>
                          {scheduleDay.classes.map(classItem => (
                            <div key={classItem.id}>
                              <div>{classItem.className}</div>
                              <div>{classItem.classDescription}</div>
                              <div>{classItem.classTime}</div>
                              <div>{classItem.classDescription}</div>
                              {/* Add more class details as needed */}
                            </div>
                          ))}
                        </React.Fragment>
                      )
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Schedule
