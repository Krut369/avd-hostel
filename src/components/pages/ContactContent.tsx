"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronLeft } from "lucide-react";
import { COLORS } from "@/constants/colors";
import { hostelData } from "@/data/hostel";
import { INDIAN_STATES, GUJARAT_DISTRICTS, GUJARAT_CITIES } from "@/constants/locations";

// Custom CSS for transitions, steps, and shakes
const customStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    15%, 45%, 75% { transform: translateX(-4px); }
    30%, 60%, 90% { transform: translateX(4px); }
  }

  @keyframes scaleUp {
    from { transform: scale(0.97); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .animate-fade-in {
    animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .animate-shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
  }

  .animate-scale-up {
    animation: scaleUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
`;

export function ContactContent() {
  // Stepper State
  const [step, setStep] = useState(1);
  
  // Form Field State
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNumber: "",
    fatherContact: "",
    city: "",
    district: "",
    state: "Gujarat",
    school: "",
    course: "",
    semester: "",
    reference: "",
  });

  const [shakingFields, setShakingFields] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isManualSchool, setIsManualSchool] = useState(false);
  const [isManualDistrict, setIsManualDistrict] = useState(false);
  const [isManualCity, setIsManualCity] = useState(false);

  // Confetti Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Inject Styles on Mount
  useEffect(() => {
    const sheet = document.createElement("style");
    sheet.innerHTML = customStyles;
    document.head.appendChild(sheet);
    return () => {
      document.head.removeChild(sheet);
    };
  }, []);

  // Define required fields per step
  const stepRequiredFields: Record<number, string[]> = {
    1: ["firstName", "middleName", "lastName", "contactNumber", "fatherContact"],
    2: ["city", "district", "state"],
    3: ["school", "course"]
  };

  // Handle Field Changes
  const handleInputChange = (field: string, value: string) => {
    let sanitizedValue = value;
    if (field === "contactNumber" || field === "fatherContact") {
      sanitizedValue = value.replace(/\D/g, ""); // Keep only digits
    }
    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
    if (shakingFields[field]) {
      setShakingFields((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleStateChange = (val: string) => {
    setFormData((prev) => ({ ...prev, state: val, district: "", city: "" }));
    if (shakingFields.state) {
      setShakingFields((prev) => ({ ...prev, state: false }));
    }
    if (val !== "Gujarat") {
      setIsManualDistrict(true);
      setIsManualCity(true);
    } else {
      setIsManualDistrict(false);
      setIsManualCity(false);
    }
  };

  // Validate only the current step's fields
  const validateCurrentStep = () => {
    const fieldsToValidate = stepRequiredFields[step];
    let invalid: Record<string, boolean> = {};
    let firstInvalidField: string | null = null;

    fieldsToValidate.forEach((field) => {
      const val = formData[field as keyof typeof formData];
      if (!val || val.trim() === "") {
        invalid[field] = true;
        if (!firstInvalidField) firstInvalidField = field;
      }
    });

    if (Object.keys(invalid).length > 0) {
      setShakingFields(invalid);
      setTimeout(() => setShakingFields({}), 600); // Clear shake after animation

      if (firstInvalidField) {
        const element = document.getElementById(firstInvalidField);
        if (element) {
          element.focus();
        }
      }
      return false;
    }
    return true;
  };

  // Stepper controls
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep((prev) => Math.max(1, prev - 1));
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate database write / network delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        triggerConfetti();
      }, 100);
    }, 1500);
  };

  // Celebratory Gold Confetti
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
      gravity: number;
      opacity: number;
    }> = [];
    const colors = ["#8B5A2B", "#D97706", "#F59E0B", "#FBBF24", "#78350F"];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height + 20,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 18 - 12,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        gravity: 0.28,
        opacity: 1
      });
    }

    let animationId: number;
    function updateConfetti() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.007;

        if (p.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
          ctx.restore();
        }
      });

      if (alive) {
        animationId = requestAnimationFrame(updateConfetti);
      }
    }
    updateConfetti();
  };

  // Reset to Step 1
  const handleReset = () => {
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      contactNumber: "",
      fatherContact: "",
      city: "",
      district: "",
      state: "Gujarat",
      school: "",
      course: "",
      semester: "",
      reference: "",
    });
    setShakingFields({});
    setStep(1);
    setIsSubmitted(false);
    setIsManualSchool(false);
    setIsManualDistrict(false);
    setIsManualCity(false);
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col justify-center pb-16" style={{ backgroundColor: COLORS.background }}>
      {isSubmitted && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-50 w-full h-full"
        />
      )}

      {/* Hero */}
      <section className="relative pt-28 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
          <h1
            className="text-5xl sm:text-6xl font-bold mb-6"
            style={{ color: COLORS.textPrimary }}
          >
            Admission <span className="gradient-text italic">Enquiry</span>
          </h1>
          <p className="text-lg max-w-xl mx-auto font-medium" style={{ color: COLORS.textPrimary }}>
            Fill out the details below in 3 quick steps and our admissions team will contact you shortly.
          </p>
        </div>
      </section>

      {/* Centered Form Section */}
      <section className="px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in">
        <div className="max-w-3xl mx-auto w-full">
          <div
            className="rounded-3xl p-6 md:p-8 border shadow-xl transition-all duration-300 glass-warm glass-shine"
            style={{ borderColor: COLORS.borderGold }}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Sleek Step Indicator Tracker */}
                <div className="flex items-center justify-between pb-6 border-b" style={{ borderBottomColor: COLORS.borderLight }}>
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                      style={{
                        backgroundColor: step >= 1 ? COLORS.primary : COLORS.borderLight,
                        color: step >= 1 ? COLORS.textWhite : COLORS.textMuted
                      }}
                    >
                      1
                    </div>
                    <span
                      className="text-xs font-bold tracking-wider uppercase hidden sm:inline"
                      style={{ color: step === 1 ? COLORS.primary : COLORS.textMuted }}
                    >
                      Personal Details
                    </span>
                  </div>

                  <div className="flex-1 h-0.5 mx-4" style={{ backgroundColor: COLORS.borderLight }} />

                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                      style={{
                        backgroundColor: step >= 2 ? COLORS.primary : COLORS.borderLight,
                        color: step >= 2 ? COLORS.textWhite : COLORS.textMuted
                      }}
                    >
                      2
                    </div>
                    <span
                      className="text-xs font-bold tracking-wider uppercase hidden sm:inline"
                      style={{ color: step === 2 ? COLORS.primary : COLORS.textMuted }}
                    >
                      Residence
                    </span>
                  </div>

                  <div className="flex-1 h-0.5 mx-4" style={{ backgroundColor: COLORS.borderLight }} />

                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                      style={{
                        backgroundColor: step >= 3 ? COLORS.primary : COLORS.borderLight,
                        color: step >= 3 ? COLORS.textWhite : COLORS.textMuted
                      }}
                    >
                      3
                    </div>
                    <span
                      className="text-xs font-bold tracking-wider uppercase hidden sm:inline"
                      style={{ color: step === 3 ? COLORS.primary : COLORS.textMuted }}
                    >
                      Academics
                    </span>
                  </div>
                </div>

                {/* STEP 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="pb-1">
                      <h3 className="text-lg font-bold" style={{ color: COLORS.textPrimary }}>Personal Information</h3>
                      <p className="text-xs mt-0.5" style={{ color: COLORS.textMuted }}>Please fill your primary communication details.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {/* First Name */}
                      <div className={`space-y-1 ${shakingFields.firstName ? "animate-shake" : ""}`}>
                        <label className="block text-[11px] font-bold tracking-wider uppercase" style={{ color: COLORS.textMuted }} htmlFor="firstName">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          placeholder="Student Name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:bg-white transition-all duration-200 ${
                            shakingFields.firstName 
                              ? "border-red-400 focus:border-red-400 bg-red-50/10" 
                              : "border-slate-200 focus:border-amber-700 bg-[#FDFCF9]/50"
                          }`}
                          style={{ color: COLORS.textPrimary }}
                        />
                      </div>

                      {/* Middle Name */}
                      <div className={`space-y-1 ${shakingFields.middleName ? "animate-shake" : ""}`}>
                        <label className="block text-[11px] font-bold tracking-wider uppercase" style={{ color: COLORS.textMuted }} htmlFor="middleName">
                          Middle Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="middleName"
                          type="text"
                          placeholder="Father Name"
                          value={formData.middleName}
                          onChange={(e) => handleInputChange("middleName", e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:bg-white transition-all duration-200 ${
                            shakingFields.middleName 
                              ? "border-red-400 focus:border-red-400 bg-red-50/10" 
                              : "border-slate-200 focus:border-amber-700 bg-[#FDFCF9]/50"
                          }`}
                          style={{ color: COLORS.textPrimary }}
                        />
                      </div>

                      {/* Last Name */}
                      <div className={`space-y-1 ${shakingFields.lastName ? "animate-shake" : ""}`}>
                        <label className="block text-[11px] font-bold tracking-wider uppercase" style={{ color: COLORS.textMuted }} htmlFor="lastName">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          placeholder="Surname"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:bg-white transition-all duration-200 ${
                            shakingFields.lastName 
                              ? "border-red-400 focus:border-red-400 bg-red-50/10" 
                              : "border-slate-200 focus:border-amber-700 bg-[#FDFCF9]/50"
                          }`}
                          style={{ color: COLORS.textPrimary }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Contact Number */}
                      <div className={`space-y-1 ${shakingFields.contactNumber ? "animate-shake" : ""}`}>
                        <label className="block text-[11px] font-bold tracking-wider uppercase" style={{ color: COLORS.textMuted }} htmlFor="contactNumber">
                          Contact Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="contactNumber"
                          type="tel"
                          placeholder="Mobile No. (10 digits)"
                          maxLength={10}
                          pattern="[0-9]*"
                          inputMode="numeric"
                          value={formData.contactNumber}
                          onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:bg-white transition-all duration-200 ${
                            shakingFields.contactNumber 
                              ? "border-red-400 focus:border-red-400 bg-red-50/10" 
                              : "border-slate-200 focus:border-amber-700 bg-[#FDFCF9]/50"
                          }`}
                          style={{ color: COLORS.textPrimary }}
                        />
                      </div>

                      {/* Father's Contact */}
                      <div className={`space-y-1 ${shakingFields.fatherContact ? "animate-shake" : ""}`}>
                        <label className="block text-[11px] font-bold tracking-wider uppercase" style={{ color: COLORS.textMuted }} htmlFor="fatherContact">
                          Father's Contact <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="fatherContact"
                          type="tel"
                          placeholder="Emergency No. (10 digits)"
                          maxLength={10}
                          pattern="[0-9]*"
                          inputMode="numeric"
                          value={formData.fatherContact}
                          onChange={(e) => handleInputChange("fatherContact", e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:bg-white transition-all duration-200 ${
                            shakingFields.fatherContact 
                              ? "border-red-400 focus:border-red-400 bg-red-50/10" 
                              : "border-slate-200 focus:border-amber-700 bg-[#FDFCF9]/50"
                          }`}
                          style={{ color: COLORS.textPrimary }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Location & Residence */}
                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="pb-1">
                      <h3 className="text-lg font-bold" style={{ color: COLORS.textPrimary }}>Location & Residence</h3>
                      <p className="text-xs mt-0.5" style={{ color: COLORS.textMuted }}>Please inform us about your residential location details.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {/* City / Village */}
                      <div className={`space-y-1 ${shakingFields.city ? "animate-shake" : ""}`}>
                        <label className="block text-[11px] font-bold tracking-wider uppercase" style={{ color: COLORS.textMuted }} htmlFor="city">
                          City / Village <span className="text-red-500">*</span>
                        </label>
                        {isManualCity || formData.state !== "Gujarat" ? (
                          <div className="flex gap-2">
                            <input
                              id="city"
                              type="text"
                              placeholder="Type City or Village"
                              value={formData.city}
                              onChange={(e) => handleInputChange("city", e.target.value)}
                              className={`flex-1 px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:bg-white transition-all duration-200 ${
                                shakingFields.city 
                                  ? "border-red-400 focus:border-red-400 bg-red-50/10" 
                                  : "border-slate-200 focus:border-amber-700 bg-[#FDFCF9]/50"
                              }`}
                              style={{ color: COLORS.textPrimary }}
                            />
                            {formData.state === "Gujarat" && (
                              <button
                                type="button"
                                onClick={() => { setIsManualCity(false); handleInputChange("city", ""); }}
                                className="px-3 py-2 border rounded-xl text-xs hover:bg-stone-100 transition-colors bg-white font-medium whitespace-nowrap"
                                style={{ color: COLORS.textSecondary, borderColor: COLORS.borderLight }}
                              >
                                Back to List
                              </button>
                            )}
                          </div>
                        ) : (
                          <select
                            id="city"
                            value={formData.city}
                            onChange={(e) => {
                              if (e.target.value === "Other") {
                                setIsManualCity(true);
                                handleInputChange("city", "");
                              } else {
                                handleInputChange("city", e.target.value);
                              }
                            }}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:bg-white transition-all duration-200 ${
                              shakingFields.city 
                                ? "border-red-400 focus:border-red-400 bg-red-50/10" 
                                : "border-slate-200 focus:border-amber-700 bg-[#FDFCF9]/50"
                            }`}
                            style={{ color: COLORS.textPrimary }}
                          >
                            <option value="">Select City/Village</option>
                            {GUJARAT_CITIES.map((city) => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                            <option value="Other" className="font-semibold text-amber-700">Other (Type Manually)</option>
                          </select>
                        )}
                      </div>

                      {/* District */}
                      <div className={`space-y-1 ${shakingFields.district ? "animate-shake" : ""}`}>
                        <label className="block text-[11px] font-bold tracking-wider uppercase" style={{ color: COLORS.textMuted }} htmlFor="district">
                          District <span className="text-red-500">*</span>
                        </label>
                        {isManualDistrict || formData.state !== "Gujarat" ? (
                          <div className="flex gap-2">
                            <input
                              id="district"
                              type="text"
                              placeholder="Type District Name"
                              value={formData.district}
                              onChange={(e) => handleInputChange("district", e.target.value)}
                              className={`flex-1 px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:bg-white transition-all duration-200 ${
                                shakingFields.district 
                                  ? "border-red-400 focus:border-red-400 bg-red-50/10" 
                                  : "border-slate-200 focus:border-amber-700 bg-[#FDFCF9]/50"
                              }`}
                              style={{ color: COLORS.textPrimary }}
                            />
                            {formData.state === "Gujarat" && (
                              <button
                                type="button"
                                onClick={() => { setIsManualDistrict(false); handleInputChange("district", ""); }}
                                className="px-3 py-2 border rounded-xl text-xs hover:bg-stone-100 transition-colors bg-white font-medium whitespace-nowrap"
                                style={{ color: COLORS.textSecondary, borderColor: COLORS.borderLight }}
                              >
                                Back to List
                              </button>
                            )}
                          </div>
                        ) : (
                          <select
                            id="district"
                            value={formData.district}
                            onChange={(e) => {
                              if (e.target.value === "Other") {
                                setIsManualDistrict(true);
                                handleInputChange("district", "");
                              } else {
                                handleInputChange("district", e.target.value);
                              }
                            }}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:bg-white transition-all duration-200 ${
                              shakingFields.district 
                                ? "border-red-400 focus:border-red-400 bg-red-50/10" 
                                : "border-slate-200 focus:border-amber-700 bg-[#FDFCF9]/50"
                            }`}
                            style={{ color: COLORS.textPrimary }}
                          >
                            <option value="">Select District</option>
                            {GUJARAT_DISTRICTS.map((dist) => (
                              <option key={dist} value={dist}>{dist}</option>
                            ))}
                            <option value="Other" className="font-semibold text-amber-700">Other (Type Manually)</option>
                          </select>
                        )}
                      </div>

                      {/* State */}
                      <div className={`space-y-1 ${shakingFields.state ? "animate-shake" : ""}`}>
                        <label className="block text-[11px] font-bold tracking-wider uppercase" style={{ color: COLORS.textMuted }} htmlFor="state">
                          State <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleStateChange(e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:bg-white transition-all duration-200 ${
                            shakingFields.state 
                              ? "border-red-400 focus:border-red-400 bg-red-50/10" 
                              : "border-slate-200 focus:border-amber-700 bg-[#FDFCF9]/50"
                          }`}
                          style={{ color: COLORS.textPrimary }}
                        >
                          <option value="">Select State</option>
                          {INDIAN_STATES.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Academic Details */}
                {step === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="pb-1">
                      <h3 className="text-lg font-bold" style={{ color: COLORS.textPrimary }}>Academic Details</h3>
                      <p className="text-xs mt-0.5" style={{ color: COLORS.textMuted }}>Please supply your previous academic history.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {/* School / College */}
                      <div className={`space-y-1 md:col-span-1 ${shakingFields.school ? "animate-shake" : ""}`}>
                        <label className="block text-[11px] font-bold tracking-wider uppercase" style={{ color: COLORS.textMuted }} htmlFor="school">
                          School / College <span className="text-red-500">*</span>
                        </label>
                        {isManualSchool ? (
                          <div className="flex gap-2">
                            <input
                              id="school"
                              type="text"
                              placeholder="Type School/College Name"
                              value={formData.school}
                              onChange={(e) => handleInputChange("school", e.target.value)}
                              className={`flex-1 px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:bg-white transition-all duration-200 ${
                                shakingFields.school 
                                  ? "border-red-400 focus:border-red-400 bg-red-50/10" 
                                  : "border-slate-200 focus:border-amber-700 bg-[#FDFCF9]/50"
                              }`}
                              style={{ color: COLORS.textPrimary }}
                            />
                            <button
                              type="button"
                              onClick={() => { setIsManualSchool(false); handleInputChange("school", ""); }}
                              className="px-3 py-2 border rounded-xl text-xs hover:bg-stone-100 transition-colors bg-white font-medium whitespace-nowrap"
                              style={{ color: COLORS.textSecondary, borderColor: COLORS.borderLight }}
                            >
                              Back to List
                            </button>
                          </div>
                        ) : (
                          <select
                            id="school"
                            value={formData.school}
                            onChange={(e) => {
                              if (e.target.value === "Other") {
                                setIsManualSchool(true);
                                handleInputChange("school", "");
                              } else {
                                handleInputChange("school", e.target.value);
                              }
                            }}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:bg-white transition-all duration-200 ${
                              shakingFields.school 
                                ? "border-red-400 focus:border-red-400 bg-red-50/10" 
                                : "border-slate-200 focus:border-amber-700 bg-[#FDFCF9]/50"
                            }`}
                            style={{ color: COLORS.textPrimary }}
                          >
                            <option value="">Select School/College</option>
                            {hostelData.institutions.map((item) => (
                              <option key={item} value={item}>{item}</option>
                            ))}
                            <option value="Other" className="font-semibold text-amber-700">Other (Type Manually)</option>
                          </select>
                        )}
                      </div>

                      {/* Course / Std */}
                      <div className={`space-y-1 ${shakingFields.course ? "animate-shake" : ""}`}>
                        <label className="block text-[11px] font-bold tracking-wider uppercase" style={{ color: COLORS.textMuted }} htmlFor="course">
                          Course / Std <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="course"
                          type="text"
                          placeholder="e.g. B.Tech / Class XII"
                          value={formData.course}
                          onChange={(e) => handleInputChange("course", e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:bg-white transition-all duration-200 ${
                            shakingFields.course 
                              ? "border-red-400 focus:border-red-400 bg-red-50/10" 
                              : "border-slate-200 focus:border-amber-700 bg-[#FDFCF9]/50"
                          }`}
                          style={{ color: COLORS.textPrimary }}
                        />
                      </div>

                      {/* Semester */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold tracking-wider uppercase" style={{ color: COLORS.textMuted }} htmlFor="semester">
                          Semester
                        </label>
                        <select
                          id="semester"
                          value={formData.semester}
                          onChange={(e) => handleInputChange("semester", e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-700 bg-[#FDFCF9]/50 text-sm focus:bg-white transition-all duration-200 focus:outline-none"
                          style={{ color: COLORS.textPrimary }}
                        >
                          <option value="">Semester (Optional)</option>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                            <option key={sem} value={sem.toString()}>Semester {sem}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Reference (Optional) */}
                    <div className="space-y-1 pt-1">
                      <label className="block text-[11px] font-bold tracking-wider uppercase" style={{ color: COLORS.textMuted }} htmlFor="reference">
                        Reference (Optional)
                      </label>
                      <input
                        id="reference"
                        type="text"
                        placeholder="How did you hear about us?"
                        value={formData.reference}
                        onChange={(e) => handleInputChange("reference", e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-700 bg-[#FDFCF9]/50 text-sm focus:bg-white transition-all duration-200 focus:outline-none"
                        style={{ color: COLORS.textPrimary }}
                      />
                    </div>
                  </div>
                )}

                {/* ACTION BUTTONS */}
                <div className="pt-4 flex items-center justify-between border-t" style={{ borderTopColor: COLORS.borderLight }}>
                  {/* Back button */}
                  {step > 1 ? (
                    <button
                      onClick={handleBack}
                      type="button"
                      className="px-5 py-2.5 text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5 focus:outline-none"
                      style={{ color: COLORS.textMuted }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                  ) : (
                    <div /> // Placeholder to keep alignment
                  )}

                  {/* Forward / Submit button */}
                  {step < 3 ? (
                    <button
                      onClick={handleNext}
                      type="button"
                      className="text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-200 flex items-center gap-1.5 text-sm focus:outline-none hover:opacity-90 active:scale-95"
                      style={{ backgroundColor: COLORS.primary }}
                    >
                      Next
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-200 overflow-hidden min-w-[150px] flex items-center justify-center gap-2 select-none text-sm focus:outline-none hover:opacity-90 active:scale-95"
                      style={{ backgroundColor: COLORS.primary }}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <>
                          <span>Submit Enquiry</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </>
                      )}
                    </button>
                  )}
                </div>

              </form>
            ) : (
              
              /* SUCCESS CONFIRMATION PRESENTATION CARD */
              <div className="text-center py-10 space-y-6 animate-scale-up">
                <div
                  className="inline-flex items-center justify-center h-16 w-16 rounded-full border-4 mb-1 relative"
                  style={{ backgroundColor: COLORS.primaryTint, borderColor: COLORS.primary, color: COLORS.primary }}
                >
                  <div className="absolute -top-1 -right-1 animate-pulse text-sm" style={{ color: COLORS.primary }}>✦</div>
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-2xl font-extrabold" style={{ color: COLORS.textPrimary }}>Thank You, {formData.firstName}!</h3>
                  <p className="max-w-sm mx-auto text-xs leading-relaxed" style={{ color: COLORS.textPrimary }}>
                    Your enquiry has been registered. Our admissions team will contact you at <strong style={{ color: COLORS.primary }}>{formData.contactNumber}</strong> shortly.
                  </p>
                </div>

                {/* Data Summary Box */}
                <div
                  className="max-w-md mx-auto border rounded-2xl p-4 text-left space-y-3"
                  style={{ backgroundColor: COLORS.background, borderColor: COLORS.borderGold }}
                >
                  <h4
                    className="text-[10px] font-bold uppercase tracking-widest border-b pb-1.5"
                    style={{ color: COLORS.textMuted, borderBottomColor: COLORS.borderGold }}
                  >
                    Enquiry Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-y-2 text-xs">
                    <div>
                      <span style={{ color: COLORS.textMuted }} className="block">Candidate Name</span>
                      <span className="font-semibold" style={{ color: COLORS.textPrimary }}>{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div>
                      <span style={{ color: COLORS.textMuted }} className="block">Contact Phone</span>
                      <span className="font-semibold" style={{ color: COLORS.textPrimary }}>{formData.contactNumber}</span>
                    </div>
                    <div>
                      <span style={{ color: COLORS.textMuted }} className="block">Location</span>
                      <span className="font-semibold" style={{ color: COLORS.textPrimary }}>{formData.city}, {formData.state}</span>
                    </div>
                    <div>
                      <span style={{ color: COLORS.textMuted }} className="block">Desired Course</span>
                      <span className="font-semibold" style={{ color: COLORS.textPrimary }}>{formData.course}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="bg-stone-100 hover:bg-stone-200/80 active:bg-stone-200 text-stone-600 font-bold py-2.5 px-6 rounded-xl text-xs transition-all duration-200 inline-flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
