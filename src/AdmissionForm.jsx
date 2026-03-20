import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AdmissionForm = () => {
  const location = useLocation();
  const incomingCourse = location.state?.selectedCourse || "";

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    course: incomingCourse,
  });

  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  useEffect(() => {
    if (incomingCourse) {
      setFormData(prev => ({ ...prev, course: incomingCourse }));
    }
  }, [incomingCourse]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    // Replace 'YOUR_FORM_ID' with your actual Formspree ID
    const response = await fetch("https://formspree.io/f/xjgazbbp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus({ submitting: false, success: true, error: null });
      setFormData({ fullName: '', email: '', course: '' }); // Reset form
    } else {
      setStatus({ submitting: false, success: false, error: "Oops! Something went wrong." });
    }
  };

  if (status.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-10 bg-green-50 rounded-3xl border border-green-200">
          <h2 className="text-2xl font-bold text-green-700">Message Sent!</h2>
          <p className="mt-2">We'll get back to you shortly.</p>
          <button onClick={() => setStatus({ ...status, success: false })} className="mt-4 text-blue-600 font-medium">Send another</button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full p-8 bg-gray-50 rounded-3xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center">Book Appointment</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <input 
            name="fullName"
            type="text" 
            placeholder="Full Name" 
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none" 
          />
          
          <input 
            name="email"
            type="email" 
            placeholder="Email Address" 
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none" 
          />

          <select 
            name="course"
            value={formData.course} 
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border bg-white focus:ring-2 focus:ring-blue-500 outline-none"
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
            <option value="Banking Exam Preparation">Banking Exam Preparation</option>
            <option value="Railway Exam Preparation">Railway Exam Preparation</option>
          </select>

          {status.error && <p className="text-red-500 text-sm">{status.error}</p>}

          <button 
            type="submit"
            disabled={status.submitting}
            className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition-all disabled:bg-gray-400"
          >
            {status.submitting ? "Sending..." : "Book Appointment Now"}
          </button>
          <input type="text" name="_gotcha" style={{ display: 'none' }} />
        </form>
      </div>
    </section>
  );
};

export default AdmissionForm;