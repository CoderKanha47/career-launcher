import React from 'react';

const AdmissionForm = () => {
  return (
    <section className="py-20 bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full p-8 bg-gray-50 rounded-3xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center">Admission Form</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-3 rounded-xl border" />
          <input type="email" placeholder="Email Address" className="w-full p-3 rounded-xl border" />
          <select className="w-full p-3 rounded-xl border">
            <option>Select Course</option>
            <option>UPSC Preparation</option>
            <option>SSC-CGL Preparation</option>
            <option>OPSC Preparation</option>
            <option>Foundation Wing Preparation</option>
            <option>OSSC Preparation</option>
            <option>PGDCA Preparation</option>
            <option>IIT-JEE Preparation</option>
            <option>NEET Preparation</option>
          </select>
          <button className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold">
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdmissionForm;