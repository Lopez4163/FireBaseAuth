import { createContext, useState, useEffect } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { auth, db } from "../firebase"
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"

const handleAddClass = async ({
  selectedDay,
  className,
  classDescription,
  classTime,
  instructor,
}) => {
  try {
    const classesRef = collection(db, "schedule", selectedDay, "classes")
    const classDocRef = doc(classesRef)
    await setDoc(classDocRef, {
      className: className,
      classDescription: classDescription,
      classTime: classTime,
      classInstructor: instructor,
      bookedBy: false,
    })
    console.log(classDocRef)
  } catch (e) {
    console.log(e.message)
  }
}

export { handleAddClass }

const fetchSchedule = async () => {
  try {
    const scheduleData = []
    const scheduleRef = collection(db, "schedule")
    const querySnapshot = await getDocs(scheduleRef)
    for (const doc of querySnapshot.docs) {
      const classesRef = collection(doc.ref, "classes")
      const classesQuerySnapshot = await getDocs(classesRef)
      const classesData = []
      classesQuerySnapshot.forEach(classDoc => {
        classesData.push({ id: classDoc.id, ...classDoc.data() })
      })
      scheduleData.push({ id: doc.id, classes: classesData })
    }
    console.log(scheduleData)
    return scheduleData
  } catch (error) {
    console.error("Error fetching schedule:", error)
    return null
  }
}

export { fetchSchedule }

const handleDeleteClass = async (classId, selectedDay) => {
  try {
    const classRef = doc(db, "schedule", selectedDay, "classes", classId)
    await deleteDoc(classRef)
    console.log("Class deleted successfully!")
  } catch (error) {
    console.error("Error deleting class:", error.message)
  }
}

export { handleDeleteClass }
