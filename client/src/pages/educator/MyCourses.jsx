import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MyCourses = () => {
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchEducatorCourses = async () => {
    try {
      const token = getToken()
      if (!token) {
        toast.error("Authentication failed. Please log in again.")
        return
      }

      const { data } = await axios.get(`${backendUrl}/api/educator/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (data.success) {
        setCourses(data.courses || [])
      } else {
        toast.error(data.message || "Failed to load courses")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses()
    } else {
      setLoading(false)
    }
  }, [isEducator])

  if (loading) return <Loading />

  return (
    <div className="h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">My Courses</h2>

        {courses.length > 0 ? (
          <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className="md:table-auto table-fixed w-full overflow-hidden">
              <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold truncate">Course</th>
                  <th className="px-4 py-3 font-semibold truncate">Earning</th>
                  <th className="px-4 py-3 font-semibold truncate">Students</th>
                  <th className="px-4 py-3 font-semibold truncate">Published On</th>
                  <th className="px-4 py-3 font-semibold truncate">Actions</th>
                </tr>
              </thead>

              <tbody className="text-sm text-gray-500">
                {courses.map((course) => {
                  const earning = Math.floor(
                    course.enrolledStudents.length *
                    (course.coursePrice - (course.discount * course.coursePrice) / 100)
                  )

                  return (
                    <tr key={course._id} className="border-b border-gray-500/20">
                      <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                        <img
                          src={course.courseThumbnail}
                          alt={course.courseTitle}
                          className="w-16 h-12 object-cover rounded-md"
                        />
                        <span className="truncate hidden md:block">{course.courseTitle}</span>
                      </td>
                      <td className="px-4 py-3">{currency}{earning}</td>
                      <td className="px-4 py-3">{course.enrolledStudents.length}</td>
                      <td className="px-4 py-3">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => navigate(`/educator/upload-chapter/${course._id}`)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs"
                        >
                          Upload Chapter
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No courses found.</p>
        )}
      </div>
    </div>
  )
}

export default MyCourses
