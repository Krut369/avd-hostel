"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronLeft, User, Phone, MapPin, GraduationCap } from "lucide-react";
import { COLORS } from "@/constants/colors";
import { hostelData } from "@/data/hostel";
import { INDIAN_STATES, GUJARAT_DISTRICTS, GUJARAT_CITIES } from "@/constants/locations";
import { PhoneInput, validatePhoneNumber } from "@/components/ui/PhoneInput";

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
    contactCountryCode: "+91",
    contactCountryIso: "IN",
    contactCountryName: "India",
    contactNumber: "",
    fatherCountryCode: "+91",
    fatherCountryIso: "IN",
    fatherCountryName: "India",
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

    if (step === 1) {
      const isContactValid = validatePhoneNumber(formData.contactNumber, formData.contactCountryIso);
      const isFatherValid = validatePhoneNumber(formData.fatherContact, formData.fatherCountryIso);
      if (!isContactValid) {
        invalid["contactNumber"] = true;
        if (!firstInvalidField) firstInvalidField = "contactNumber";
      }
      if (!isFatherValid) {
        invalid["fatherContact"] = true;
        if (!firstInvalidField) firstInvalidField = "fatherContact";
      }
    }

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

    // Construct submission payload with country code prepended
    const payload = {
      ...formData,
      contactNumber: `${formData.contactCountryCode} ${formData.contactNumber}`,
      fatherContact: `${formData.fatherCountryCode} ${formData.fatherContact}`,
    };
    console.log("Submitting enquiry payload:", payload);

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

    const particles: Array<{
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
      contactCountryCode: "+91",
      contactCountryIso: "IN",
      contactCountryName: "India",
      contactNumber: "",
      fatherCountryCode: "+91",
      fatherCountryIso: "IN",
      fatherCountryName: "India",
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
            className="rounded-3xl p-6 md:p-8 border transition-all duration-300"
            style={{ backgroundColor: COLORS.surface, borderColor: COLORS.borderGold }}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Sleek Step Indicator Tracker */}
                <div className="flex items-center justify-between pb-6 border-b" style={{ borderBottomColor: COLORS.borderLight }}>
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                      style={{
                        backgroundColor: step >= 1 ? COLORS.primary : "#FFF1ED",
                        color: step >= 1 ? COLORS.textWhite : COLORS.primary
                      }}
                    >
                      1
                    </div>
                    <span
                      className="text-xs font-bold tracking-wider uppercase hidden sm:inline"
                      style={{ color: COLORS.primary }}
                    >
                      Personal Details
                    </span>
                  </div>

                  <div className="flex-1 h-0.5 mx-4" style={{ backgroundColor: COLORS.primaryTint }} />

                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                      style={{
                        backgroundColor: step >= 2 ? COLORS.primary : "#FFF1ED",
                        color: step >= 2 ? COLORS.textWhite : COLORS.primary
                      }}
                    >
                      2
                    </div>
                    <span
                      className="text-xs font-bold tracking-wider uppercase hidden sm:inline"
                      style={{ color: COLORS.primary }}
                    >
                      Residence
                    </span>
                  </div>

                  <div className="flex-1 h-0.5 mx-4" style={{ backgroundColor: COLORS.primaryTint }} />

                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                      style={{
                        backgroundColor: step >= 3 ? COLORS.primary : "#FFF1ED",
                        color: step >= 3 ? COLORS.textWhite : COLORS.primary
                      }}
                    >
                      3
                    </div>
                    <span
                      className="text-xs font-bold tracking-wider uppercase hidden sm:inline"
                      style={{ color: COLORS.primary }}
                    >
                      Academics
                    </span>
                  </div>
                </div>

                {/* STEP 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="pb-1">
                      <h3 className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>Personal Information</h3>
                      <p className="text-[11px] mt-0.5" style={{ color: COLORS.textMuted }}>Please fill your primary communication details.</p>
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
                      <PhoneInput
                        id="contactNumber"
                        label="Contact Number"
                        required
                        value={formData.contactNumber}
                        countryCode={formData.contactCountryCode}
                        countryIso={formData.contactCountryIso}
                        shaking={!!shakingFields.contactNumber}
                        onChange={(data) => {
                          setFormData((prev) => ({
                            ...prev,
                            contactNumber: data.number,
                            contactCountryCode: data.countryCode,
                            contactCountryIso: data.countryIso,
                            contactCountryName: data.countryName,
                          }));
                          if (shakingFields.contactNumber) {
                            setShakingFields((prev) => ({ ...prev, contactNumber: false }));
                          }
                        }}
                      />

                      {/* Father's Contact */}
                      <PhoneInput
                        id="fatherContact"
                        label="Father's Contact"
                        required
                        value={formData.fatherContact}
                        countryCode={formData.fatherCountryCode}
                        countryIso={formData.fatherCountryIso}
                        shaking={!!shakingFields.fatherContact}
                        onChange={(data) => {
                          setFormData((prev) => ({
                            ...prev,
                            fatherContact: data.number,
                            fatherCountryCode: data.countryCode,
                            fatherCountryIso: data.countryIso,
                            fatherCountryName: data.countryName,
                          }));
                          if (shakingFields.fatherContact) {
                            setShakingFields((prev) => ({ ...prev, fatherContact: false }));
                          }
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2: Location & Residence */}
                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="pb-1">
                      <h3 className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>Location & Residence</h3>
                      <p className="text-[11px] mt-0.5" style={{ color: COLORS.textMuted }}>Please inform us about your residential location details.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {/* City / Village */}
                      <div className={`space-y-1 ${shakingFields.city ? "animate-shake" : ""}`}>
                        <label className="block text-[11px] font-bold tracking-wider uppercase" style={{ color: COLORS.textMuted }} htmlFor="city">
                          City / Village <span className="text-red-500">*</span>
                        </label>
                        {isManualCity || formData.state !== "Gujarat" ? (
                          <div className="relative">
                            <input
                              id="city"
                              type="text"
                              placeholder="Type City or Village"
                              value={formData.city}
                              onChange={(e) => handleInputChange("city", e.target.value)}
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:bg-white transition-all duration-200 ${
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
                                className="text-[10px] font-bold mt-1.5 flex items-center gap-1 hover:underline transition-all duration-200 cursor-pointer"
                                style={{ color: COLORS.primary }}
                              >
                                ← Select from list
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
                          <div className="relative">
                            <input
                              id="district"
                              type="text"
                              placeholder="Type District Name"
                              value={formData.district}
                              onChange={(e) => handleInputChange("district", e.target.value)}
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:bg-white transition-all duration-200 ${
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
                                className="text-[10px] font-bold mt-1.5 flex items-center gap-1 hover:underline transition-all duration-200 cursor-pointer"
                                style={{ color: COLORS.primary }}
                              >
                                ← Select from list
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
                      <h3 className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>Academic Details</h3>
                      <p className="text-[11px] mt-0.5" style={{ color: COLORS.textMuted }}>Please supply your previous academic history.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {/* School / College */}
                      <div className={`space-y-1 md:col-span-1 ${shakingFields.school ? "animate-shake" : ""}`}>
                        <label className="block text-[11px] font-bold tracking-wider uppercase" style={{ color: COLORS.textMuted }} htmlFor="school">
                          School / College <span className="text-red-500">*</span>
                        </label>
                        {isManualSchool ? (
                          <div className="relative">
                            <input
                              id="school"
                              type="text"
                              placeholder="Type School/College Name"
                              value={formData.school}
                              onChange={(e) => handleInputChange("school", e.target.value)}
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:bg-white transition-all duration-200 ${
                                shakingFields.school 
                                  ? "border-red-400 focus:border-red-400 bg-red-50/10" 
                                  : "border-slate-200 focus:border-amber-700 bg-[#FDFCF9]/50"
                              }`}
                              style={{ color: COLORS.textPrimary }}
                            />
                            <button
                              type="button"
                              onClick={() => { setIsManualSchool(false); handleInputChange("school", ""); }}
                              className="text-[10px] font-bold mt-1.5 flex items-center gap-1 hover:underline transition-all duration-200 cursor-pointer"
                              style={{ color: COLORS.primary }}
                            >
                              ← Select from list
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
              <div className="text-center py-6 space-y-4 animate-fade-in bg-white border border-stone-100 rounded-[28px] mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10" style={{ padding: '24px 32px' }}>
                
                {/* Modern Success Icon */}
                <div className="mx-auto w-24 h-24 relative flex items-center justify-center mb-2">
                   <div className="absolute inset-0 rounded-full" style={{ backgroundColor: `${COLORS.primary}08` }} />
                   <div className="absolute w-[72px] h-[72px] rounded-full" style={{ backgroundColor: `${COLORS.primary}15` }} />
                   <div className="relative w-12 h-12 rounded-full flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: COLORS.primary }}>
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                     </svg>
                   </div>
                </div>

                {/* Greeting */}
                <div className="space-y-3 pb-4">
                  <h3 className="text-[26px] font-serif font-bold" style={{ color: '#1B263B' }}>
                    Thank You, {formData.firstName}!
                  </h3>
                  <div className="text-[12.5px] text-zinc-600 font-sans leading-loose flex flex-col items-center">
                    <p>Your enquiry has been successfully registered.</p>
                    <p>
                      Our admissions team will contact you at <span className="font-bold tracking-wide" style={{ color: COLORS.primary }}>{formData.contactCountryCode} {formData.contactNumber}</span> shortly.
                    </p>
                  </div>
                </div>

              {/* Data Summary Box */}
              <div className="relative mt-6 max-w-[520px] mx-auto">
                {/* Top Ornament */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-[10px] bg-white px-2 z-10 flex items-center justify-center">
                   <svg width="70" height="20" viewBox="0 0 70 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M35 2 L39 10 L35 18 L31 10 Z" fill={COLORS.primary}/>
                      <circle cx="35" cy="10" r="1.5" fill="#fff"/>
                      <path d="M28 10 C20 18, 12 18, 10 12 C8 6, 15 4, 18 8 L21 12" stroke={COLORS.primary} strokeWidth="1.2" fill="none" />
                      <circle cx="12" cy="11" r="1" fill={COLORS.primary}/>
                      <path d="M42 10 C50 18, 58 18, 60 12 C62 6, 55 4, 52 8 L49 12" stroke={COLORS.primary} strokeWidth="1.2" fill="none" />
                      <circle cx="58" cy="11" r="1" fill={COLORS.primary}/>
                      <circle cx="28" cy="15" r="1" fill={COLORS.primary}/>
                      <circle cx="42" cy="15" r="1" fill={COLORS.primary}/>
                   </svg>
                </div>

                {/* Main Box Area */}
                <div 
                  className="relative bg-white px-8 md:px-10 py-7"
                >
                  {/* Scalloped Border Constructed with SVGs and Divs */}
                  <div className="absolute top-0 left-[11px] right-[11px] h-[1.5px]" style={{ backgroundColor: `${COLORS.primary}80` }} />
                  <div className="absolute bottom-0 left-[11px] right-[11px] h-[1.5px]" style={{ backgroundColor: `${COLORS.primary}80` }} />
                  <div className="absolute left-0 top-[11px] bottom-[11px] w-[1.5px]" style={{ backgroundColor: `${COLORS.primary}80` }} />
                  <div className="absolute right-0 top-[11px] bottom-[11px] w-[1.5px]" style={{ backgroundColor: `${COLORS.primary}80` }} />
                  
                  <svg width="12" height="12" className="absolute top-0 left-0" style={{ color: `${COLORS.primary}80` }}>
                    <path d="M 0,12 A 12,12 0 0,0 12,0" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <svg width="12" height="12" className="absolute top-0 right-0" style={{ color: `${COLORS.primary}80` }}>
                    <path d="M 0,0 A 12,12 0 0,0 12,12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <svg width="12" height="12" className="absolute bottom-0 right-0" style={{ color: `${COLORS.primary}80` }}>
                    <path d="M 12,0 A 12,12 0 0,0 0,12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <svg width="12" height="12" className="absolute bottom-0 left-0" style={{ color: `${COLORS.primary}80` }}>
                    <path d="M 12,12 A 12,12 0 0,0 0,0" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>

                  <h4 className="text-center font-extrabold text-[14px] uppercase mb-7" style={{ color: COLORS.primary, letterSpacing: '0.04em' }}>
                    ENQUIRY SUMMARY
                  </h4>
                  
                  <div className="relative">
                     {/* Dashed grid lines (Desktop) */}
                     <div className="hidden sm:block absolute inset-x-0 top-[50%] h-[1px] border-t-[1.5px] border-dotted" style={{ borderColor: `${COLORS.primary}35` }}></div>
                     <div className="hidden sm:block absolute top-[-5px] bottom-0 left-1/2 w-[1px] border-l-[1.5px] border-dotted" style={{ borderColor: `${COLORS.primary}35` }}></div>
                     
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-7 gap-x-8 relative z-10">
                        {/* Candidate */}
                        <div className="flex items-center gap-4 sm:pr-2 bg-white pb-4 border-b-[1.5px] border-dotted border-[#c44d2835] sm:border-none sm:pb-0">
                          <div className="w-[46px] h-[46px] rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${COLORS.primary}12` }}>
                            <User className="w-[20px] h-[20px]" style={{ color: COLORS.primary }} strokeWidth={2.2} />
                          </div>
                          <div className="text-left leading-snug truncate">
                            <p className="text-[12px] text-zinc-500 font-semibold mb-1">Candidate</p>
                            <p className="text-[14px] font-bold text-zinc-900 truncate">{formData.firstName} {formData.lastName}</p>
                          </div>
                        </div>
                        
                        {/* Phone */}
                        <div className="flex items-center gap-4 sm:pl-4 bg-white pb-4 border-b-[1.5px] border-dotted border-[#c44d2835] sm:border-none sm:pb-0">
                          <div className="w-[46px] h-[46px] rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${COLORS.primary}12` }}>
                            <Phone className="w-[20px] h-[20px]" style={{ color: COLORS.primary }} strokeWidth={2.2} />
                          </div>
                          <div className="text-left leading-snug truncate">
                            <p className="text-[12px] text-zinc-500 font-semibold mb-1">Phone</p>
                            <p className="text-[14px] font-bold text-zinc-900 truncate">{formData.contactCountryCode} {formData.contactNumber}</p>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-4 sm:pr-2 bg-white sm:mt-1 pb-4 border-b-[1.5px] border-dotted border-[#c44d2835] sm:border-none sm:pb-0">
                          <div className="w-[46px] h-[46px] rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${COLORS.primary}12` }}>
                            <MapPin className="w-[20px] h-[20px]" style={{ color: COLORS.primary }} strokeWidth={2.2} />
                          </div>
                          <div className="text-left leading-snug truncate">
                            <p className="text-[12px] text-zinc-500 font-semibold mb-1">Location</p>
                            <p className="text-[14px] font-bold text-zinc-900 truncate">{formData.city}, {formData.state}</p>
                          </div>
                        </div>

                        {/* Course */}
                        <div className="flex items-center gap-4 sm:pl-4 bg-white sm:mt-1">
                          <div className="w-[46px] h-[46px] rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${COLORS.primary}12` }}>
                            <GraduationCap className="w-[20px] h-[20px]" style={{ color: COLORS.primary }} strokeWidth={2.2} />
                          </div>
                          <div className="text-left leading-snug truncate">
                            <p className="text-[12px] text-zinc-500 font-semibold mb-1">Course</p>
                            <p className="text-[14px] font-bold text-zinc-900 truncate">{formData.course}</p>
                          </div>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Bottom Ornament */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-[10px] bg-white px-2 z-10 flex items-center justify-center">
                   <svg width="70" height="20" viewBox="0 0 70 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
                      <path d="M35 2 L39 10 L35 18 L31 10 Z" fill={COLORS.primary}/>
                      <circle cx="35" cy="10" r="1.5" fill="#fff"/>
                      <path d="M28 10 C20 18, 12 18, 10 12 C8 6, 15 4, 18 8 L21 12" stroke={COLORS.primary} strokeWidth="1.2" fill="none" />
                      <circle cx="12" cy="11" r="1" fill={COLORS.primary}/>
                      <path d="M42 10 C50 18, 58 18, 60 12 C62 6, 55 4, 52 8 L49 12" stroke={COLORS.primary} strokeWidth="1.2" fill="none" />
                      <circle cx="58" cy="11" r="1" fill={COLORS.primary}/>
                      <circle cx="28" cy="15" r="1" fill={COLORS.primary}/>
                      <circle cx="42" cy="15" r="1" fill={COLORS.primary}/>
                   </svg>
                </div>
              </div>

                <div className="pt-6">
                  <button
                    onClick={handleReset}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-3 rounded-[12px] text-[13px] font-bold text-zinc-700 bg-white border border-stone-200 hover:bg-stone-50 transition-colors duration-200"
                  >
                    <ChevronLeft className="w-4 h-4 text-zinc-400 group-hover:-translate-x-1 transition-transform" />
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
