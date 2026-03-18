import React, { useState } from 'react';

const CustomizeCourse = () => {
  // --- 1. STATE ---
  const [selections, setSelections] = useState({
    category: 'Banking Sector',
    subjects: [], 
    mode: 'Online'
  });

  // --- 2. LOGIC ---
  const calculateFees = () => {
    let tuition = 0;
    let institutionFee = 0;
    let developmentFee = 0;
    let onlineArrangementFee = 0;

    if (selections.subjects.includes('General')) {
      tuition = 2000;
    } else {
      if (selections.subjects.includes('Maths')) tuition += 1000;
      if (selections.subjects.includes('Reasoning')) tuition += 800;
      if (selections.subjects.includes('Science')) tuition += 1000;
    }

    if (selections.mode === 'Offline') {
      institutionFee = 500;
      developmentFee = 100;
    } else {
      onlineArrangementFee = 200;
    }

    const total = tuition + institutionFee + developmentFee + onlineArrangementFee;
    return { tuition, institutionFee, developmentFee, onlineArrangementFee, total };
  };

  const { tuition, institutionFee, developmentFee, onlineArrangementFee, total } = calculateFees();

  // --- 3. HANDLERS ---
  const toggleSubject = (sub) => {
    setSelections(prev => {
      let newSubs = [...prev.subjects];
      if (sub === 'General') {
        newSubs = prev.subjects.includes('General') ? [] : ['General'];
      } else {
        if (newSubs.includes(sub)) {
          newSubs = newSubs.filter(s => s !== sub);
        } else {
          newSubs.push(sub);
        }
      }
      return { ...prev, subjects: newSubs };
    });
  };

  // --- 4. THE VIEW (JSX) ---
  return (
    <section className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-10">Customize Your Course</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          
          {/* LEFT SIDE: SELECTIONS */}
          <div className="space-y-8">
            <div>
              <label className="block font-bold mb-3">1. Preparing for?</label>
              <select 
                className="w-full p-3 rounded-xl border border-gray-200"
                value={selections.category}
                onChange={(e) => setSelections({...selections, category: e.target.value})}
              >
                <option>Banking Sector</option>
                <option>Indian Railways</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-3">2. Subjects</label>
              <div className="space-y-3">
                {['General', 'Maths', 'Reasoning', 'Science'].map(sub => (
                  <label key={sub} className={`flex items-center p-3 rounded-xl border cursor-pointer transition ${selections.subjects.includes(sub) ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-100'}`}>
                    <input 
                      type="checkbox" 
                      className="mr-3 h-5 w-5"
                      checked={selections.subjects.includes(sub)}
                      disabled={selections.subjects.includes('General') && sub !== 'General'}
                      onChange={() => toggleSubject(sub)}
                    />
                    <span>{sub} {sub === 'General' ? '(All Subjects)' : ''}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold mb-3">3. Mode</label>
              <div className="flex gap-4">
                {['Online', 'Offline'].map(m => (
                  <button 
                    key={m}
                    onClick={() => setSelections({...selections, mode: m})}
                    className={`flex-1 py-3 rounded-xl font-bold border transition ${selections.mode === m ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-gray-600 border-gray-200'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: FEE BREAKDOWN */}
          <div className="bg-blue-900 text-white p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-6 border-b border-blue-700 pb-4 text-blue-200">Fee Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Tuition (Monthly)</span>
                  <span>₹{tuition}</span>
                </div>

                {selections.mode === 'Offline' ? (
                  <>
                    <div className="flex justify-between text-sm text-blue-300">
                      <span>+ Institution Fee</span>
                      <span>₹{institutionFee}</span>
                    </div>
                    <div className="flex justify-between text-sm text-blue-300">
                      <span>+ Development Fee</span>
                      <span>₹{developmentFee}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-sm text-blue-300">
                    <span>+ Online Arrangement</span>
                    <span>₹{onlineArrangementFee}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10 border-t border-blue-700 pt-6">
              <div className="flex justify-between items-end">
                <span className="text-blue-300">Total Investment</span>
                <span className="text-4xl font-black text-green-400">₹{total}</span>
              </div>
              <button className="w-full mt-8 bg-green-500 hover:bg-green-600 py-4 rounded-xl font-black text-lg transition shadow-lg">
                Confirm & Enroll
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CustomizeCourse;