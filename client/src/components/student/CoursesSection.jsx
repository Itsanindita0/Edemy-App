import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';



const CoursesSection = () => {

  const {allCourses} = useContext(AppContext)


  return (
    <div className="py-16 px-6 md:px-40">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Learn from the best</h2>

        <p className="text-base text-gray-500 mt-4">
          Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.
        </p>


        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10'>

          {allCourses.slice(0,4).map((course, index) => <CourseCard key = {index} course = {course}/>)}
        </div>



        <Link
          to="/course-list"
          onClick={() => scrollTo(0, 0)}
          className="inline-block mt-6 text-gray-500 border border-gray-500/30 px-10 py-3 rounded hover:bg-gray-100"
        >
          Show all courses
        </Link>
      </div>
    </div>
  );
};

export default CoursesSection;
