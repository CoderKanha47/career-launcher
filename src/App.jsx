import React, { useState } from 'react';
// 1. ADD THESE MISSING IMPORTS
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import CustomizeCourse from './CustomizeCourse';
import AdmissionForm from './AdmissionForm';
import ScrollToTop from './ScrollToTop';

// import { Link } from 'react-router-dom';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// --- 1. Header Component ---
const Header = () => (
  <header className="sticky top-0 z-50 bg-white shadow-sm">
    <nav className="container mx-auto flex items-center justify-between p-4">
      <Link to="/" className="flex items-center gap-3">
        <div className="h-10 w-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold">EH</div>
        <span className="text-xl font-bold tracking-tight text-gray-900">EDU-HUB Academy </span>
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
    { url: '/student1.jpg', title: 'Expert Faculty', sub: 'Learn from the best and experienced teachers' },
    { url: '/student2.jpg', title: 'Top Placements', sub: 'Our students crack competitive examinations in one shot' },
    { url: '/campus1.jpg', title: 'Modern Classrooms', sub: 'Modern learning facilities' },
  ];

  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Main Container: Stacked on mobile, Side-by-side on Medium screens (md:) */}
      <div className="flex flex-col md:flex-row min-h-[60vh] lg:h-[70vh]">
        
        {/* --- LEFT SIDE: TEXT CONTENT --- */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white">
          <span className="text-blue-700 font-bold uppercase tracking-widest mb-4 block">
            Welcome to EDU-HUB
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
            Build Your <span className="text-blue-700">Future</span> With Confidence.
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Keonjhar's leading academy for UPSC, SSC, and competitive excellence. 
            Personalized coaching designed for your success.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/admission" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all">
              Enroll Now
            </Link>
            <Link to="/courses" className="border-2 border-slate-200 hover:border-blue-700 px-8 py-4 rounded-xl font-bold transition-all text-slate-700">
              View Courses
            </Link>
          </div>
        </div>

        {/* --- RIGHT SIDE: THE SLIDER --- */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-auto">
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="h-full w-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.url})` }}
                >
                  {/* Subtle Gradient Overlay to make the image look premium */}
                  <div className="absolute inset-0 bg-linear-to-r from-slate-50/20 to-transparent" />
                  
                  {/* Optional: Small floating caption on the image */}
                  <div className="absolute bottom-10 left-10 z-10 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-xl hidden lg:block">
                    <p className="text-blue-700 font-bold text-sm uppercase">{slide.title}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

// --- Testimonials Component ---
const Testimonials = () => {
  const reviews = [
    {
      name: "Ram",
      role: "IIT-JEE Student",
      text: "The faculties here are very experienced and have immense knowledge. The way they simplify complex Physics is amazing!",
      avatar: "https://ui-avatars.com/api/?name=Ram&background=0D8ABC&color=fff"
    },
    {
      name: "Navin",
      role: "UPSC Student",
      text: "I cleared my UPSC in 2025 by studying from this institution. Their current affairs analysis is the best in the business.",
      avatar: "https://ui-avatars.com/api/?name=Navin"
    },
    {
      name: "Ritesh",
      role: "NEET Student",
      text: "This institute has all the facilities such as smartboards and comfortable seating to facilitate long lectures. I am really impressed!",
      avatar: "https://ui-avatars.com/api/?name=Ritesh&background=ef4444&color=fff"
    },
    {
      name: "Manish Ram",
      role: "OSSC Student",
      text: "I cleared my OSSC examination in the first attempt and right now I am posted in Bhadrak. Highly recommended for state exams!",
      avatar: "https://ui-avatars.com/api/?name=Manish+Ram&background=22c55e&color=fff"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">What Our Students Say</h2>
        <p className="text-gray-600 mb-12">Success stories from the halls of EDU HUB.</p>

        <Swiper
          spaceBetween={30}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Pagination]}
          className="pb-12 testimonials-swiper"
        >
          {reviews.map((rev, i) => (
            <SwiperSlide key={i} className="h-auto">
              <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100 h-full flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="mb-6">
                  <div className="text-blue-600 text-4xl mb-4 font-serif">“</div>
                  <p className="text-gray-700 italic leading-relaxed text-sm md:text-base">
                    {rev.text}
                  </p>
                </div>
                <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                  <img src={rev.avatar} alt={rev.name} className="h-12 w-12 rounded-full border-2 border-blue-100" />
                  <div className="text-left">
                    <h4 className="font-bold text-gray-900">{rev.name}</h4>
                    <p className="text-xs text-blue-600 font-medium uppercase tracking-wider">{rev.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

// --- 3. Home Page (What users see first) ---
// --- 3. Home Page ---
const HomePage = () => (
  <>
    <Hero />
    <WhyChooseUs />

    {/* Ensure this section has flex and items-center to keep things truly centered */}
    <section className="py-9 bg-slate-200 flex flex-col items-center justify-center text-center">
      <div className="container mx-auto px-6 max-w-4xl">

        <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 leading-tight">
          We offer Standard Courses and <br className="hidden md:block" />
          <span className="text-blue-700">Courses Customized by You</span>
        </h2>

        <p className="text-lg text-gray-600 mb-10 mx-auto max-w-2xl">
          From competitive exams to skill-based certifications, we provide expert coaching tailored to your career goals.
        </p>

        {/* The Button Container */}
        <div className="flex flex-row justify-center items-center gap-4 mt-10">

          {/* Button 1: Explore */}
          <Link
            to="/courses"
            className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
          >
            Explore All Courses
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>

          {/* Button 2: Customize */}
          <Link
            to="/customize"
            className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
          >
            Customize Your Course
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>

        </div>

      </div>
    </section>

    <Testimonials />
  </>

);

// --- 4. Courses Component ---
const Courses = () => {
  const courseList = [
    // { title: "IIT-JEE Preparation", duration: "2 years", icon: "iitLogo.jpg", desc: "Comprehensive coaching for Physics, Chemistry, and Maths.", batches: "2", packages: "Full", fees: "₹75,000" },
    // { title: "NEET Preparation", duration: "1 years", icon: "neet.jpg", desc: "Expert guidance for Biology and entrance exam mastery.", batches: "2", packages: "Full Course", fees: "₹80,000" },
    { title: "UPSC Preparation", duration: "1 Year", icon: "upsc.jpg", desc: "Complete study of course and Intense Revision for UPSC.", batches: "2 (*+1 depending on strength)", packages: "Full, Revision Only", fees: "*subject to package" },
    { title: "SSC Preparation", duration: "1 Year", icon: "ssc.jfif", desc: "Complete study of course and Intense Revision for SSC.", batches: "2(*+2 depending on strength)", packages: "Full, Revision Only", fees: "*subject to package" },
    { title: "OPSC Preparation", duration: "1 Year", icon: "opsc.jfif", desc: "Complete study of course and Intense Revision for OPSC.", batches: "2(*+1 depending on strength)", packages: "Full, Revision Only", fees: "*subject to package" },
    { title: "OSSC Preparation", duration: "1 Year", icon: "ossc.png", desc: "Complete study of course and Intense Revision for OSSC.", batches: "2", packages: "Full", fees: "₹62,000" },
    { title: "PGDCA Course", duration: "1 Year", icon: "pgdca.jpg", desc: "Expert training of the course with hands-on experience.", batches: "1", packages: "Certification", fees: "₹15,000" },
    { title: "Banking Exam Preparation", duration: "1 Year", icon: "banking1.jpg", desc: "Full course study and intensive revision for various banking selection posts like SBI PO.", batches: "1", packages: "Full", fees: "₹35,000" },
    { title: "Railway Exam Preparation", duration: "1 Year", icon: "railway1.png", desc: "Full course study and intensive revision for RRB-NTPC, RRB-ALP, RRB-JE.", batches: "1", packages: "Full", fees: "₹30,000" },
    { title: "Foundation Wing", duration: "1 years", icon: "foundation.jpg", desc: "Strengthening basics for Class 8th to 10th students. (For School Students)", batches: "1", packages: "Full", fees: "₹10,000" },
    { title: "Crash Course", duration: "3 Months", icon: "crashcourse.png", desc: "Intensive revision and mock tests for final leaps.", batches: "2", packages: null, fees: "₹45,000" },

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
                    <img src={`/${course.icon}`} alt="{course.title}" className="max-h-full max-w-full object-contain" />
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

                {/* Changed from <a> to <Link> to navigate to /admission */}
                <Link
                  to="/admission"
                  state={{ selectedCourse: course.title }}
                  className="mt-6 bg-white text-blue-700 px-6 py-2 rounded-full font-bold text-xs hover:bg-blue-50 transition-colors shadow-lg inline-block text-center"
                >
                  Register Now
                </Link>
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
// --- 6. Footer ---
const Footer = () => (
  <footer className="bg-gray-950 text-gray-300 pt-16 pb-8">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

        {/* Column 1: Brand & About */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center font-bold">CL</div>
            <span className="text-xl font-bold tracking-tight">EDU-HUB Academy</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-300">
            Empowering students to achieve their dreams through expert guidance,
            comprehensive study materials, and a commitment to excellence.
          </p>
          <div className="flex gap-4 pt-2">
            {/* Replace # with actual social links */}
            {/* <a href="#" className="hover:text-blue-500 transition-colors">Facebook</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-pink-500 transition-colors">Instagram</a> */}
          </div>
        </div>

        {/* Column 2: Contact Details */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-lg">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="text-blue-500">📍</span>
              <span>Mandua<br />Near LIC Office <br />Keonjhar, Odisha - 758001</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500">📞</span>
              <a href="tel:+91XXXXXXXXXX" className="hover:text-white transition-colors">+91 94311 00000</a>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500">✉️</span>
              <a href="mailto:info@eduhub.com" className="hover:text-white transition-colors">info@eduhub.com</a>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500">⏰</span>
              <span>Office Hours - Mon - Sat: 10:00 AM - 8:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Location Map */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-lg">Find Us</h4>
          <div className="w-full h-40 rounded-xl overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500 shadow-lg">
            {/* Replace the src with your actual Google Maps Embed link */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1854.4796664197565!2d85.62086863879384!3d21.626508288443638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1efd474d2e35cb%3A0xa76c14d4be45c955!2sLIC%20Office%20Rd%2C%20Keonjhar%2C%20Odisha%20758014!5e0!3m2!1sen!2sin!4v1773905159329!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            >

            </iframe>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2026 EduHub. All Rights Reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

// --8. Why Choose Us

const WhyChooseUs = () => {
  const features = [
    {
      title: "Experienced Faculty",
      desc: "Learn from industry veterans with over 10+ years of teaching excellence.",
      icon: "👨‍🏫",
      color: "bg-blue-50"
    },
    {
      title: "Smart Classrooms",
      desc: "Modern infrastructure with interactive smart boards and digital learning aids.",
      icon: "💻",
      color: "bg-indigo-50"
    },
    {
      title: "AnyTime Support",
      desc: "Direct access to mentors for doubt clearing, even outside class hours.",
      icon: "📞",
      color: "bg-green-50"
    },
    {
      title: "Support Materials",
      desc: "Exhaustive study modules, daily practice papers, and recorded lectures.",
      icon: "📚",
      color: "bg-purple-50"
    }
  ];

  return (
    <section className="pt-15  bg-slate-200">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose EDUHUB Academy?</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className={`aspect-square p-8 rounded-3xl ${item.color} flex flex-col justify-center items-center text-center border border-transparent hover:border-blue-200 hover:shadow-xl transition-all duration-300 group`}
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Milestones Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">
              Milestones of our Institution
            </h2>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

            {/* Card 1: Students */}
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-50 text-center transform hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl font-black text-blue-600 mb-4">500+</div>
              <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wide">
                Students Tutored
              </h3>
              <p className="text-gray-500 mt-2 font-medium">& counting...</p>
            </div>

            {/* Card 2: Selections */}
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-green-50 text-center transform hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl font-black text-green-600 mb-4">50+</div>
              <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wide">
                Success Selections
              </h3>
              <p className="text-gray-500 mt-2 font-medium">In Competitive Exams</p>
            </div>

            {/* Card 3: Experience */}
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-orange-50 text-center transform hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl font-black text-orange-600 mb-4">5+</div>
              <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wide">
                Years Experience
              </h3>
              <p className="text-gray-500 mt-2 font-medium">Of Academic Excellence</p>
            </div>

          </div>
        </div>
      </section>
    </section>
  );

};

// --- 7. MAIN ASSEMBLY ---
export default function App() {
  return (
    <Router>
      <ScrollToTop />
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