import React, { useEffect, useState, useContext } from "react"
import { handleAddClass } from "../utils"
import { AuthContext } from "../auth/context/context"

const AddClass = () => {
  const { user } = useContext(AuthContext)
  const [selectedDay, setSelectedDay] = useState("")
  const [className, setClassName] = useState("")
  const [classDescription, setClassDescription] = useState("")
  const [classTime, setClassTime] = useState("")
  const [instructor, setInstructor] = useState(user.email)
  const [newClass, setNewClass] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = event => {
    event.preventDefault()
    if (!selectedDay || !className || !classDescription || !classTime) {
      setError("Please fill in all fields")
    } else {
      setNewClass({
        selectedDay,
        className,
        classDescription,
        classTime,
        instructor,
      })
      setError(null)
    }
  }
  useEffect(() => {
    if (newClass) {
      handleAddClass(newClass)
    }
  }, [newClass])

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <select
          value={selectedDay}
          onChange={e => setSelectedDay(e.target.value)}
        >
          <option value="" disabled>
            Select a day
          </option>
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>

        <input
          type="text"
          placeholder="Class Name"
          value={className}
          onChange={e => setClassName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Class Description"
          value={classDescription}
          onChange={e => setClassDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Class Time"
          value={classTime}
          onChange={e => setClassTime(e.target.value)}
        />
        <button type="submit">Add Class</button>
      </form>
    </div>
  )
}

export default AddClass
