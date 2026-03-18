import React, { useState } from 'react';
// 1. ADD THESE MISSING IMPORTS
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import CustomizeCourse from './CustomizeCourse';
import AdmissionForm from './admissionForm';
// import { Link } from 'react-router-dom';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// --- 1. Header Component ---
const Header = () => (
  <header className="sticky top-0 z-50 bg-white shadow-sm">
    <nav className="container mx-auto flex items-center justify-between p-4">
      <Link to="/" className="flex items-center gap-3">
        <div className="h-10 w-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold">CL</div>
        <span className="text-xl font-bold tracking-tight text-gray-900">CareerLauncher</span>
      </Link>
      <ul className="hidden md:flex gap-8 font-medium text-gray-600">
        <li><Link to="/" className="hover:text-blue-700">Home</Link></li>
        <li><Link to="/courses" className="hover:text-blue-700">Courses Offered</Link></li>
        {/* <li><Link to="/fees" className="hover:text-blue-700">Fees & Duration</Link></li> */}
        <li><Link to="/customize" className="hover:text-blue-700">Customize Course ✨</Link></li>
      </ul>
    </nav>
  </header>
);

// --- 2. Hero Component ---
const Hero = () => {
  const slides = [
    { url: '/student1.jpg', title: 'Expert Faculty', sub: 'Learn from the best in the industry' },
    { url: '/student2.jpg', title: 'Top Placements', sub: 'Our students work at global companies' },
    { url: '/student3.jpg', title: 'Modern Campus', sub: 'State-of-the-art learning facilities' },
  ];

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full w-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.url})` }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content Container */}
              <div className="relative z-10 text-center text-white px-4">
                <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tight">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-8 font-medium opacity-90">
                  {slide.sub}
                </p>

                {/* Button Group */}
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">

                  {/* Internal React Link */}
                  <Link
                    to="/admission"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition shadow-lg inline-block text-center w-48"
                  >
                    Enroll Now
                  </Link>

                  {/* External WhatsApp Link */}
                  <a
                    href="https://wa.me/91XXXXXXXXXX?text=Hi! I want to enquire about your courses."
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition inline-block text-center w-48"
                  >
                    WhatsApp Us
                  </a>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

// --- 3. Home Page (What users see first) ---
const HomePage = () => (
  <>
    <Hero />
    <section className="py-20 text-center bg-slate-50">
      <h1 className="text-5xl font-black mb-6">Shape Your Future</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">Expert coaching for career excellence.</p>
    </section>
  </>
);

// --- 4. Courses Component ---
const Courses = () => {
  const courseList = [
    { title: "IIT-JEE Prep", duration: "2 years", icon: "iitLogo.jpg", desc: "Comprehensive coaching for Physics, Chemistry, and Maths.", batches: "4", packages: "Full", fees: "₹75,000" },
    { title: "NEET Prep", duration: "1 years", icon: "neet.jpg", desc: "Expert guidance for Biology and entrance exam mastery.", batches: "4", packages: "Full Course", fees: "₹80,000" },
    { title: "Foundation Wing", duration: "2 years", icon: "foundation.jpg", desc: "Strengthening basics for Class 8th to 10th students.", batches: "1", packages: "Full", fees: "₹10,000" },
    { title: "Crash Course", duration: "3 Months", icon: "crashcourse.png", desc: "Intensive revision and mock tests for final leaps.", batches: "2", packages: null, fees: "₹45,000" },
    { title: "UPSC Preparation", duration: "1 Year", icon: "upsc.jpg", desc: "Complete study of course and Intense Revision for UPSC.", batches: "2 (*+1 depending on strength)", packages: "Full, Revision Only", fees: "*subject to package" },
    { title: "SSC Preparation", duration: "1 Year", icon: "ssc.jfif", desc: "Complete study of course and Intense Revision for SSC.", batches: "2(*+2 depending on strength)", packages: "Full, Revision Only", fees: "*subject to package" },
    { title: "OPSC Preparation", duration: "1 Year", icon: "opsc.jfif", desc: "Complete study of course and Intense Revision for OPSC.", batches: "2(*+1 depending on strength)", packages: "Full, Revision Only", fees: "₹55,000" },
    { title: "OSSC Preparation", duration: "1 Year", icon: "ossc.png", desc: "Complete study of course and Intense Revision for OSSC.", batches: "2", packages: "Full", fees: "₹62,000" },
    { title: "PGDCA Course", duration: "1 Year", icon: "pgdca.jpg", desc: "Expert training of the course with hands-on experience.", batches: "1", packages: "Certification", fees: "₹15,000" },
  ];

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Courses Offered</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courseList.map((course, index) => (
            /* --- THE CARD CONTAINER --- */
            <div key={index} className="relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center group transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden min-h-95">

              {/* --- FRONT SIDE (Visible by default) --- */}
              <div className="transition-opacity duration-300 group-hover:opacity-0">
                <div className="mb-4 h-20 w-20 mx-auto flex items-center justify-center">
                  {course.icon.includes('.') ? (
                    <img src={`/${course.icon}`} alt="" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-4xl">{course.icon}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-4">{course.duration}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{course.desc}</p>
              </div>

              {/* --- BACK SIDE (The "Know More" Overlay) --- */}
              <div className="absolute inset-0 bg-blue-700 p-6 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <h4 className="font-bold text-lg mb-4 border-b border-blue-400 pb-2 w-full">
                  {course.title} Details
                </h4>
                <div className="text-left space-y-3 text-xs sm:text-sm">
                  <p><span className="font-bold text-blue-200">Batches:</span> {course.batches || "2 (+1 Optional)"}</p>
                  <p><span className="font-bold text-blue-200">Fees:</span> {course.fees}</p>
                  <p><span className="font-bold text-blue-200">Packages:</span> {course.packages || "Full / Revision"}</p>
                  <p><span className="font-bold text-blue-200">Duration:</span> {course.duration}</p>
                </div>

                {/* WhatsApp Enquiry Button */}
                <a
                  // href={`https://wa.me/91XXXXXXXXXX?text=I%20want%20to%20know%20more%20about%20${course.title}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 bg-white text-blue-700 px-6 py-2 rounded-full font-bold text-xs hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Register Now
                </a>
              </div>
            </div> /* Card ends here cleanly! */
          ))}
        </div>
      </div>
    </section>
  );
};
// --- 5. Fees Component ---
const FeesTable = () => {
  const feeData = [
    { course: "IIT-JEE Prep", duration: "2 Years", totalFee: "₹1,50,000" },
    { course: "NEET Prep", duration: "2 Years", totalFee: "₹1,40,000" },
  ];
  return (
    <div className="py-20 container mx-auto px-6 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-12">Fees & Duration</h2>
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-4">Course</th>
              <th className="p-4">Fee</th>
            </tr>
          </thead>
          <tbody>
            {feeData.map((f, i) => (
              <tr key={i} className="border-b"><td className="p-4">{f.course}</td><td className="p-4">{f.totalFee}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- 6. Footer ---
const Footer = () => (
  <footer className="bg-gray-950 text-gray-400 py-10 text-center">
    <p>© 2026 CareerLauncher. Dedicated to Success.</p>
  </footer>
);



// --- 7. MAIN ASSEMBLY (ONLY ONE APP DEFINITION) ---
export default function App() {
  return (
    <Router>
      <div className="font-sans antialiased">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/fees" element={<FeesTable />} />
          <Route path="/customize" element={<CustomizeCourse />} />
          <Route path="/admission" element={<AdmissionForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}