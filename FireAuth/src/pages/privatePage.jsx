import React, { useContext } from "react"
import AddClass from "../components/addClass"
import ScheduleView from "../components/scheduleView"
import { AuthContext } from "../auth/context/context"

const privatePage = () => {
  const { handleLogout } = useContext(AuthContext)

  return (
    <section>
      <AddClass />
      <ScheduleView />
      <button onClick={handleLogout}>Log Out</button>
    </section>
  )
}

export default privatePage
