import React, { useState, useEffect } from 'react';

const CustomizeCourse = () => {
    // --- 1. STATE ---
    const [selections, setSelections] = useState({
        category: 'IIT-JEE', // Set a valid default from your logic
        subjects: [],
        mode: 'Online'
    });

    const [modalConfig, setModalConfig] = useState({ show: false, type: '' });

    // --- 2. SIDE EFFECTS ---
    // Automatically remove Biology if category switches to IIT-JEE
    useEffect(() => {
        if (selections.category === 'IIT-JEE' && selections.subjects.includes('Biology')) {
            setSelections(prev => ({
                ...prev,
                subjects: prev.subjects.filter(s => s !== 'Biology')
            }));
        }
    }, [selections.category]);

    // --- 3. LOGIC ---
    const calculateFees = () => {
        let tuition = 0;
        let institutionFee = 0;
        let developmentFee = 0;
        let onlineArrangementFee = 0;

        if (selections.subjects.includes('General')) {
            tuition = selections.category === 'IIT-JEE' ? 4000 : 5500;
        } else {
            if (selections.subjects.includes('Maths')) tuition += 1500;
            if (selections.subjects.includes('Physics')) tuition += 1500;
            if (selections.subjects.includes('Chemistry')) tuition += 1500;
            if (selections.subjects.includes('Biology')) tuition += 1500;
        }

        if (selections.mode === 'Offline') {
            institutionFee = 500;
            developmentFee = 100;
        } else {
            onlineArrangementFee = 500;
        }

        const total = tuition + institutionFee + developmentFee + onlineArrangementFee;
        return { tuition, institutionFee, developmentFee, onlineArrangementFee, total };
    };

    const { tuition, institutionFee, developmentFee, onlineArrangementFee, total } = calculateFees();

    // --- 4. HANDLERS ---
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
                // Remove General if individual subjects are picked
                newSubs = newSubs.filter(s => s !== 'General');
            }
            return { ...prev, subjects: newSubs };
        });
    };

    const handleEnrollClick = () => {
        if (selections.subjects.length === 0) {
            setModalConfig({ show: true, type: 'error' });
        } else {
            setModalConfig({ show: true, type: 'policy' });
        }
    };

    return (
        <section className="py-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-10">Customize Your Course</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">

                    {/* LEFT SIDE: SELECTIONS */}
                    <div className="space-y-8">
                        {/* CATEGORY SELECTION */}
                        <div>
                            <label className="block font-bold mb-3">1. Preparing for?</label>
                            <select
                                className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                                value={selections.category}
                                onChange={(e) => setSelections({ ...selections, category: e.target.value })}
                            >
                                <option value="IIT-JEE">IIT-JEE (Engineering)</option>
                                <option value="NEET">NEET (Medical)</option>
                            </select>
                        </div>

                        {/* SUBJECT SELECTION */}
                        <div>
                            <label className="block font-bold mb-3">2. Select Subjects</label>
                            <div className="space-y-3">
                                {['General', 'Maths', 'Physics', 'Chemistry', 'Biology'].map(sub => {
                                    const isBioDisabled = selections.category === 'IIT-JEE' && sub === 'Biology';
                                    const isOtherDisabled = selections.subjects.includes('General') && sub !== 'General';

                                    // Determine price to display
                                    let priceDisplay = "";
                                    if (sub === 'General') {
                                        priceDisplay = selections.category === 'IIT-JEE' ? "₹4000" : "₹5500";
                                    } else {
                                        priceDisplay = "₹1500";
                                    }

                                    return (
                                        <label
                                            key={sub}
                                            className={`flex items-center p-4 rounded-xl border transition 
                        ${isBioDisabled ? 'opacity-40 cursor-not-allowed bg-gray-50' : 'cursor-pointer'}
                        ${selections.subjects.includes(sub) ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-gray-100 hover:border-blue-200'}`}
                                        >
                                            <input
                                                type="checkbox"
                                                className="mr-4 h-5 w-5 cursor-pointer disabled:cursor-not-allowed accent-blue-600"
                                                checked={selections.subjects.includes(sub)}
                                                disabled={isBioDisabled || (isOtherDisabled && sub !== 'General')}
                                                onChange={() => toggleSubject(sub)}
                                            />
                                            <div className="flex justify-between items-center w-full">
                                                <span className="font-medium text-gray-800">
                                                    {sub} {sub === 'General' ? '(All-in-One)' : ''}
                                                </span>

                                                <span className={`text-sm font-bold ${isBioDisabled ? 'text-gray-400' : 'text-blue-600'}`}>
                                                    {isOtherDisabled ? (
                                                        <span className="text-green-600 italic font-normal">Included in General</span>
                                                    ) : (
                                                        isBioDisabled ? "N/A" : priceDisplay
                                                    )}
                                                </span>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                            {selections.category === 'IIT-JEE' && (
                                <p className="mt-2 text-xs text-gray-500 italic">* Biology is strictly for NEET preparation only.</p>
                            )}
                        </div>

                        {/* MODE SELECTION */}
                        <div>
                            <label className="block font-bold mb-3">3. Learning Mode</label>
                            <div className="flex gap-4">
                                {['Online', 'Offline'].map(m => (
                                    <button
                                        key={m}
                                        onClick={() => setSelections({ ...selections, mode: m })}
                                        className={`flex-1 py-3 rounded-xl font-bold border transition ${selections.mode === m ? 'bg-blue-700 text-white border-blue-700 shadow-md' : 'bg-white text-gray-600 border-gray-200'}`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: FEE BREAKDOWN */}
                    <div className="bg-blue-900 text-white p-8 rounded-2xl flex flex-col justify-between shadow-2xl">
                        <div>
                            <h3 className="text-xl font-bold mb-6 border-b border-blue-700 pb-4 text-blue-200">Fee Breakdown</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Tuition {selections.subjects.includes('General') ? '(Pack)' : `(${selections.subjects.length} Subjects)`}</span>
                                    <span className="font-mono">₹{tuition}</span>
                                </div>

                                {selections.mode === 'Offline' ? (
                                    <>
                                        <div className="flex justify-between text-sm text-blue-300">
                                            <span>+ Institution Fee</span>
                                            <span className="font-mono">₹{institutionFee}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-blue-300">
                                            <span>+ Development Fee</span>
                                            <span className="font-mono">₹{developmentFee}</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex justify-between text-sm text-blue-300">
                                        <span>+ Online Arrangement</span>
                                        <span className="font-mono">₹{onlineArrangementFee}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-10 border-t border-blue-700 pt-6">
                            <div className="flex justify-between items-end mb-8">
                                <span className="text-blue-300">Total Joining Fee</span>
                                <span className="text-4xl font-black text-green-400 font-mono">₹{total}</span>
                            </div>
                            <button
                                onClick={handleEnrollClick}
                                className="w-full bg-green-500 hover:bg-green-600 py-4 rounded-xl font-black text-lg transition transform hover:scale-[1.02] active:scale-95 shadow-lg text-white"
                            >
                                Confirm & Enroll
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MODAL --- */}
            {modalConfig.show && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
                        <div className="text-center">
                            {modalConfig.type === 'error' ? (
                                <>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-600 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Select a Subject</h3>
                                    <p className="text-gray-600 mb-6">Please select at least one subject to calculate your personalized fee.</p>
                                    <button
                                        onClick={() => setModalConfig({ show: false, type: '' })}
                                        className="w-full bg-gray-800 text-white font-bold py-3 rounded-xl"
                                    >
                                        Got it
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Enrollment Policy</h3>
                                    <p className="text-gray-600 text-sm mb-6">
                                        The amount <span className="font-bold text-blue-700">₹{total}</span> is the initial admission fee. Regular tuition will be billed monthly.
                                    </p>
                                    <button
                                        onClick={() => setModalConfig({ show: false, type: '' })}
                                        className="w-full bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg"
                                    >
                                        Accept & Proceed
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