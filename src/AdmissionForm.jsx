import React, { useState, useEffect } from 'react'; // Added useState back in
import { useLocation } from 'react-router-dom';

const AdmissionForm = () => {
  const location = useLocation();
  const incomingCourse = location.state?.selectedCourse || "";

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    course: incomingCourse, // Initial state from navigation
  });

  // This ensures that if the user clicks "Register" on a different course, the form updates
  useEffect(() => {
    if (incomingCourse) {
      setFormData(prev => ({ ...prev, course: incomingCourse }));
    }
  }, [incomingCourse]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-20 bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full p-8 bg-gray-50 rounded-3xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center">Book Appointment</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          
          <input 
            name="fullName"
            type="text" 
            placeholder="Full Name" 
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border" 
          />
          
          <input 
            name="email"
            type="email" 
            placeholder="Email Address" 
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border" 
          />

          {/* IMPORTANT: The 'value' in <option> must match course.title exactly */}
          <select 
            name="course"
            value={formData.course} 
            onChange={handleChange}
            className="w-full p-3 rounded-xl border bg-white"
          >
            <option value="">Select Course</option>
            <option value="IIT-JEE Preparation">IIT-JEE Preparation</option>
            <option value="NEET Preparation">NEET Preparation</option>
            <option value="Foundation Wing">Foundation Wing</option>
            <option value="Crash Course">Crash Course</option>
            <option value="UPSC Preparation">UPSC Preparation</option>
            <option value="SSC Preparation">SSC Preparation</option>
            <option value="OPSC Preparation">OPSC Preparation</option>
            <option value="OSSC Preparation">OSSC Preparation</option>
            <option value="PGDCA Course">PGDCA Course</option>
            <option value="PGDCA Course">Banking Exam Preparation</option>
            <option value="PGDCA Course">Railway Exam Preparation</option>
          </select>

          <button className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition-all">
            Book Appointment Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdmissionForm;