import { createContext, useState } from "react"

const BookedClassesContext = createContext()

function BookedClassesProvider({ children }) {
  const [bookedClasses, setBookedClasses] = useState(["dog"])

  return (
    <BookedClassesContext.Provider value={{ bookedClasses, setBookedClasses }}>
      {children}
    </BookedClassesContext.Provider>
  )
}

export { BookedClassesContext, BookedClassesProvider }
