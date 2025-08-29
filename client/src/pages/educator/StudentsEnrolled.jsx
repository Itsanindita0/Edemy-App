import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

const StudentsEnrolled = () => {
  const { backendUrl, getToken, isEducator } = useContext(AppContext);
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + '/api/educator/enrolled-students',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setEnrolledStudents(data.enrolledStudents.reverse());
      } else {
        toast.error(data.message || 'Failed to fetch students');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents();
    }
  }, [isEducator]);

  // Group students by course
  const groupedByCourse = enrolledStudents
    ? enrolledStudents.reduce((acc, item) => {
        if (!acc[item.courseTitle]) {
          acc[item.courseTitle] = [];
        }
        acc[item.courseTitle].push(item);
        return acc;
      }, {})
    : {};

  return enrolledStudents ? (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      {/*  Total Students Count */}
      <h2 className="text-xl font-semibold mb-6">
        Total Enrolled Students:{" "}
        <span className="text-blue-600">{enrolledStudents.length}</span>
      </h2>

      {/*  Per Course Student Count */}
      <div className="w-full mb-6">
        <h3 className="text-lg font-semibold mb-2">Students per Course:</h3>
        <ul className="list-disc ml-6 space-y-1">
          {Object.keys(groupedByCourse).map((course, idx) => (
            <li key={idx} className="text-gray-700">
              {course}:{" "}
              <span className="font-medium text-blue-600">
                {groupedByCourse[course].length}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/*  Student List */}
      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
        <table className="table-fixed md:table-auto w-full overflow-hidden pb-4">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
                #
              </th>
              <th className="px-4 py-3 font-semibold">Student Name</th>
              <th className="px-4 py-3 font-semibold">Course Title</th>
              <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-500">
            {enrolledStudents.map((item, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="px-4 py-3 text-center hidden sm:table-cell">
                  {index + 1}
                </td>
                <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                  <img
                    src={item.student.imageUrl}
                    alt=""
                    className="w-9 h-9 rounded-full"
                  />
                  <span className="truncate">{item.student.name}</span>
                </td>
                <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default StudentsEnrolled;
