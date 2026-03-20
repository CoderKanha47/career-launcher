import React, { useState, useEffect } from 'react';

const CustomizeCourse = () => {
    const [selections, setSelections] = useState({
        category: 'IIT-JEE',
        subjects: [],
        mode: 'Online'
    });

    const [modalConfig, setModalConfig] = useState({ show: false, type: '' });
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setModalConfig({ show: false, type: '' });
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

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
            institutionFee = 500; developmentFee = 100;
        } else {
            onlineArrangementFee = 500;
        }

        const total = tuition + institutionFee + developmentFee + onlineArrangementFee;
        return { tuition, institutionFee, developmentFee, onlineArrangementFee, total };
    };

    const { tuition, institutionFee, developmentFee, onlineArrangementFee, total } = calculateFees();

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
                newSubs = newSubs.filter(s => s !== 'General');
            }
            return { ...prev, subjects: newSubs };
        });
    };

    const handleConfirmClick = () => {
        if (selections.subjects.length === 0) {
            setModalConfig({ show: true, type: 'error' });
        } else {
            setModalConfig({ show: true, type: 'policy' });
        }
    };

    // --- RESTORED & MOVED INSIDE COMPONENT ---
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = {
            email: email,
            category: selections.category,
            subjects: selections.subjects.join(', '),
            mode: selections.mode,
            totalFee: `₹${total}`,
            message: `New Enrollment Request for ${selections.category}`
        };

        try {
            const response = await fetch("https://formspree.io/f/xjgazbbp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setModalConfig({ show: true, type: 'success' });
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error || "Submission failed."}`);
            }
        } catch (error) {
            alert("Network error. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-10 text-slate-800">Customize Your Course</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    
                    {/* LEFT SIDE */}
                    <div className="space-y-8">
                        <div>
                            <label className="block font-bold mb-3 text-slate-700">1. Preparing for?</label>
                            <select
                                className="w-full p-4 rounded-xl border border-gray-200 font-medium outline-none focus:ring-2 focus:ring-blue-500"
                                value={selections.category}
                                onChange={(e) => setSelections({ ...selections, category: e.target.value })}
                            >
                                <option value="IIT-JEE">IIT-JEE (Engineering)</option>
                                <option value="NEET">NEET (Medical)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-bold mb-3 text-slate-700">2. Select Subjects</label>
                            <div className="space-y-3">
                                {['General', 'Maths', 'Physics', 'Chemistry', 'Biology'].map(sub => {
                                    const isBioDisabled = selections.category === 'IIT-JEE' && sub === 'Biology';
                                    const isIncluded = selections.subjects.includes('General') && sub !== 'General';
                                    const price = sub === 'General' ? (selections.category === 'IIT-JEE' ? "4000" : "5500") : "1500";

                                    return (
                                        <label key={sub} className={`flex items-center p-4 rounded-xl border transition ${isBioDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:border-blue-300'} ${selections.subjects.includes(sub) ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-gray-100'}`}>
                                            <input
                                                type="checkbox"
                                                className="mr-4 h-5 w-5 accent-blue-600"
                                                checked={selections.subjects.includes(sub)}
                                                disabled={isBioDisabled || isIncluded}
                                                onChange={() => toggleSubject(sub)}
                                            />
                                            <div className="flex justify-between w-full items-center text-slate-700">
                                                <div className="flex flex-col">
                                                    <span className="font-bold">{sub}</span>
                                                    {isBioDisabled && <span className="text-[10px] text-red-500 font-bold uppercase">Unavailable for this prep</span>}
                                                    {isIncluded && <span className="text-[10px] text-green-600 font-bold uppercase">Included in General</span>}
                                                </div>
                                                <span className={`text-xs font-black ${isBioDisabled ? 'text-gray-300 line-through' : 'text-blue-600'}`}>₹{price}</span>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <label className="block font-bold mb-3 text-slate-700">3. Mode</label>
                            <div className="flex gap-4">
                                {['Online', 'Offline'].map(m => (
                                    <button key={m} onClick={() => setSelections({ ...selections, mode: m })} className={`flex-1 py-3 rounded-xl font-bold border transition ${selections.mode === m ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-600 border-gray-200'}`}>
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE SUMMARY */}
                    <div className="bg-blue-900 text-white p-8 rounded-2xl flex flex-col justify-between shadow-2xl">
                        <div>
                            <h3 className="text-xs font-bold mb-6 border-b border-blue-700 pb-4 text-blue-200 uppercase text-x tracking-widest">Fee Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm"><span>Tuition</span><span className="font-mono">₹{tuition}</span></div>
                                {selections.mode === 'Offline' ? (
                                    <><div className="flex justify-between text-xm text-blue-300"><span>+ Admission Fee(One-Time)</span><span>₹{institutionFee}</span></div>
                                    <div className="flex justify-between text-xm text-blue-300"><span>+ Infrastructure(One-Time)</span><span>₹{developmentFee}</span></div></>
                                ) : (
                                    <div className="flex justify-between text-xm text-blue-300"><span>+ Digital Portal(One-Time)</span><span>₹{onlineArrangementFee}</span></div>
                                )}
                            </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-blue-700">
                            <div className="flex justify-between items-end mb-8">
                                <span className="text-blue-300 text-xs font-bold">GRAND TOTAL</span>
                                <span className="text-4xl font-black text-green-400 font-mono">₹{total}</span>
                            </div>
                            <button onClick={handleConfirmClick} className="w-full bg-green-500 hover:bg-green-600 py-5 rounded-xl font-black text-lg transition shadow-xl">Confirm & Enroll</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL SYSTEM */}
            {modalConfig.show && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="absolute inset-0" onClick={() => setModalConfig({ show: false, type: '' })}></div>
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative z-10">
                        
                        {modalConfig.type === 'error' && (
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-6 text-2xl font-bold">!</div>
                                <h3 className="text-xl font-black text-slate-800 mb-2">Selection Required</h3>
                                <p className="text-slate-600 mb-8">Please select at least one subject before enrolling.</p>
                                <button onClick={() => setModalConfig({ show: false, type: '' })} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold">Go Back</button>
                            </div>
                        )}

                        {modalConfig.type === 'policy' && (
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-widest">Enrollment Policy</h3>
                                <p className="text-slate-600 text-sm mb-6">
                                    The amount <span className="font-bold text-blue-700">₹{total}</span> is the one time admission fee.<br /> Monthly tuition starts next month.
                                </p>
                                <div className="space-y-3">
                                    <button onClick={() => setModalConfig({ ...modalConfig, type: 'email' })} className="w-full bg-blue-700 text-white py-4 rounded-xl font-black uppercase">Accept & Proceed</button>
                                    <button onClick={() => setModalConfig({ show: false, type: '' })} className="w-full text-slate-400 text-xs font-bold">Cancel</button>
                                </div>
                            </div>
                        )}

                        {modalConfig.type === 'email' && (
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Secure Your Seat</h3>
                                <form onSubmit={handleFormSubmit} className="space-y-4">
                                    <input 
                                        type="email" 
                                        required 
                                        placeholder="Enter your email" 
                                        className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                    />
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full bg-blue-700 text-white py-4 rounded-xl font-black uppercase disabled:bg-slate-400"
                                    >
                                        {isSubmitting ? "Sending..." : "Finish Enrollment"}
                                    </button>
                                    <button type="button" onClick={() => setModalConfig({ ...modalConfig, type: 'policy' })} className="w-full text-slate-400 text-xs font-bold underline">Back</button>
                                </form>
                            </div>
                        )}

                        {modalConfig.type === 'success' && (
                            <div className="text-center py-4">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4 text-2xl">✓</div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">REQUEST SENT</h3>
                                <p className="text-slate-600 mb-8 text-sm">Please visit the institution to complete your admission.</p>
                                <button onClick={() => setModalConfig({ show: false })} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold">Close</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default CustomizeCourse;