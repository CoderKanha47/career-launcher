import React, { useState } from 'react';

const CustomizeCourse = () => {
    // --- 1. STATE ---
    const [selections, setSelections] = useState({
        category: 'Banking Sector',
        subjects: [],
        mode: 'Online'
    });

    const [modalConfig, setModalConfig] = useState({ show: false, type: '' });

    const handleEnrollClick = () => {
        if (selections.subjects.length === 0) {
            setModalConfig({ show: true, type: 'error' });
        } else {
            setModalConfig({ show: true, type: 'policy' });
        }
    };

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
                                onChange={(e) => setSelections({ ...selections, category: e.target.value })}
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
                                        onClick={() => setSelections({ ...selections, mode: m })}
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
                                <span className="text-blue-300">Joining Fee </span>
                                <span className="text-4xl font-black text-green-400">₹{total}</span>
                            </div>
                            <button
                                onClick={handleEnrollClick}
                                className="w-full mt-8 bg-green-500 hover:bg-green-600 py-4 rounded-xl font-black text-lg transition shadow-lg text-white">
                                Confirm & Enroll
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- GUI MODAL --- */}
            {modalConfig.show && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="text-center">
                            {modalConfig.type === 'error' ? (
                                <>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-600 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Subject Required</h3>
                                    <p className="text-gray-600">Please select at least one subject before enrolling.</p>
                                    <button
                                        onClick={() => setModalConfig({ show: false, type: '' })}
                                        className="w-full mt-8 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-xl transition-colors"
                                    >
                                        Go Back
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Fee Policy</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        This is <span className="font-bold text-gray-800">first-time Joining fee</span>.
                                        The Tuition fee shall be charged on a monthly basis without any hidden cost.
                                    </p>
                                    <button
                                        onClick={() => setModalConfig({ show: false, type: '' })}
                                        className="w-full mt-8 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-colors shadow-md"
                                    >
                                        I Understand & Proceed
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CustomizeCourse;