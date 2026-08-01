"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Search } from "lucide-react";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import { COLORS } from "@/constants/colors";

export interface Country {
  name: string;
  code: string; // ISO 2-letter code
  dialCode: string;
  placeholder: string; // Example number placeholder
}

export const COUNTRIES: Country[] = [
  { name: "India", code: "IN", dialCode: "+91", placeholder: "98765 43210" },
  { name: "United States", code: "US", dialCode: "+1", placeholder: "201-555-0123" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", placeholder: "7400 123456" },
  { name: "Canada", code: "CA", dialCode: "+1", placeholder: "204-555-0123" },
  { name: "Australia", code: "AU", dialCode: "+61", placeholder: "412 345 678" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971", placeholder: "50 123 4567" },
  { name: "Kenya", code: "KE", dialCode: "+254", placeholder: "712 345678" },
  { name: "New Zealand", code: "NZ", dialCode: "+64", placeholder: "21 345 6789" },
  { name: "Singapore", code: "SG", dialCode: "+65", placeholder: "8123 4567" },
  { name: "South Africa", code: "ZA", dialCode: "+27", placeholder: "82 123 4567" },
  { name: "Germany", code: "DE", dialCode: "+49", placeholder: "151 23456789" },
  { name: "Uganda", code: "UG", dialCode: "+256", placeholder: "701 234567" },
  { name: "Tanzania", code: "TZ", dialCode: "+255", placeholder: "712 345 678" },
  { name: "Nigeria", code: "NG", dialCode: "+234", placeholder: "803 123 4567" },
];

export const validatePhoneNumber = (number: string, countryIso: string): boolean => {
  if (!number) return false;
  try {
    const parsed = parsePhoneNumberFromString(number, countryIso as CountryCode);
    return parsed ? parsed.isValid() : false;
  } catch (error) {
    return false;
  }
};

interface PhoneInputProps {
  id: string;
  label: string;
  required?: boolean;
  value: string; // The local part of number
  countryCode: string; // e.g. "+91"
  countryIso: string; // e.g. "IN"
  onChange: (data: {
    number: string;
    countryCode: string;
    countryIso: string;
    countryName: string;
    isValid: boolean;
  }) => void;
  shaking?: boolean;
}

export function PhoneInput({
  id,
  label,
  required = false,
  value,
  countryCode,
  countryIso,
  onChange,
  shaking = false,
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [touched, setTouched] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Find currently selected country
  const selectedCountry =
    COUNTRIES.find((c) => c.code === countryIso) || COUNTRIES[0];

  // Filter countries by search query
  const query = searchQuery.toLowerCase().trim();
  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.dialCode.toLowerCase().includes(query) ||
      c.code.toLowerCase().includes(query)
  );

  // Auto focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 50);
      setFocusedIndex(0);
    }
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation inside dropdown list scroll helper
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const parent = listRef.current;
      const activeItem = parent.children[focusedIndex] as HTMLElement;
      if (activeItem) {
        const parentRect = parent.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        if (itemRect.bottom > parentRect.bottom) {
          parent.scrollTop += itemRect.bottom - parentRect.bottom;
        } else if (itemRect.top < parentRect.top) {
          parent.scrollTop -= parentRect.top - itemRect.top;
        }
      }
    }
  }, [focusedIndex, isOpen]);

  const handleSelectCountry = (country: Country) => {
    const isValid = validatePhoneNumber(value, country.code);
    onChange({
      number: value,
      countryCode: country.dialCode,
      countryIso: country.code,
      countryName: country.name,
      isValid,
    });
    setIsOpen(false);
    setSearchQuery("");
    triggerRef.current?.focus();
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, ""); // Allow digits only
    const isValid = validatePhoneNumber(rawVal, selectedCountry.code);
    onChange({
      number: rawVal,
      countryCode: selectedCountry.dialCode,
      countryIso: selectedCountry.code,
      countryName: selectedCountry.name,
      isValid,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      triggerRef.current?.focus();
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      setFocusedIndex((prev) => (filtered.length > 0 ? (prev + 1) % filtered.length : 0));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setFocusedIndex((prev) =>
        filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0
      );
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (filtered[focusedIndex]) {
        handleSelectCountry(filtered[focusedIndex]);
      }
      e.preventDefault();
    }
  };

  const isValid = validatePhoneNumber(value, selectedCountry.code);
  const showError = touched && !isValid && value.length > 0;

  return (
    <div className={`space-y-1 ${shaking ? "animate-shake" : ""}`}>
      <label
        className="block text-[11px] font-bold tracking-wider uppercase"
        style={{ color: COLORS.textMuted }}
        htmlFor={id}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        <div
          className={`flex rounded-xl border transition-all duration-200 ${
            showError
              ? "border-red-400 bg-red-50/5 focus-within:border-red-400"
              : isValid
                ? "border-emerald-500/40 bg-emerald-50/5 focus-within:border-emerald-500"
                : "border-slate-200 focus-within:border-amber-700 bg-[#FDFCF9]/50 focus-within:bg-white"
          }`}
        >
          {/* Country code selector trigger */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-[#FDFCF9]/30 text-sm font-semibold cursor-pointer border-r border-slate-200 hover:bg-stone-50 select-none shrink-0 rounded-l-xl focus:outline-none focus:bg-stone-50/50"
            style={{ color: COLORS.textPrimary }}
          >
            <img
              src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
              width="20"
              alt=""
              className="object-contain rounded-sm border border-stone-200/60"
            />
            <span className="leading-none text-[13px] font-bold text-stone-700">{selectedCountry.dialCode}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${
                isOpen ? "rotate-180 text-amber-700" : ""
              }`}
            />
          </button>

          {/* Phone number digits input */}
          <input
            id={id}
            type="tel"
            placeholder={`e.g. ${selectedCountry.placeholder}`}
            value={value}
            onChange={handlePhoneInputChange}
            onBlur={() => setTouched(true)}
            className={`flex-grow pl-4 ${isValid ? "pr-10" : "pr-4"} py-2.5 bg-transparent text-sm focus:outline-none rounded-r-xl`}
            style={{ color: COLORS.textPrimary }}
          />
        </div>

        {/* Success checkmark */}
        {isValid && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-emerald-500 pointer-events-none">
            <svg className="w-4 h-4 animate-scale-up" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        )}

        {/* Dropdown list popup */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute left-0 mt-2 w-[280px] rounded-2xl border bg-white p-2.5 shadow-2xl focus:outline-none z-[100] animate-scale-up"
            style={{ borderColor: COLORS.borderGold }}
          >
            <div className="flex items-center gap-2 px-3 py-2 border rounded-xl mb-2 border-stone-100 bg-stone-50/50 focus-within:border-amber-700/40 focus-within:bg-white transition-all duration-200">
              <Search className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search country name or code..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setFocusedIndex(0);
                }}
                className="w-full bg-transparent text-xs outline-none text-stone-800 placeholder-stone-400"
              />
            </div>
            
            <div
              ref={listRef}
              className="max-h-56 overflow-y-auto space-y-0.5 text-stone-700 custom-scrollbar pr-1"
            >
              {filtered.length > 0 ? (
                filtered.map((country, index) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleSelectCountry(country)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors duration-150 cursor-pointer ${
                      index === focusedIndex
                        ? "bg-amber-50/70 text-amber-900 font-semibold"
                        : "hover:bg-stone-50"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <img
                        src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                        width="18"
                        alt=""
                        className="object-contain rounded-sm border border-stone-100"
                      />
                      <span className="font-medium text-stone-700">{country.name}</span>
                    </span>
                    <span className="text-stone-400 font-semibold text-[11px] bg-stone-50 px-1.5 py-0.5 rounded border border-stone-100/80">
                      {country.dialCode}
                    </span>
                  </button>
                ))
              ) : (
                <div className="text-center py-4 text-xs text-stone-400 font-medium">
                  No countries found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Validation Warning Feedback */}
      {showError && (
        <span className="block text-[10px] font-semibold text-red-500 animate-fade-in pl-1">
          Please enter a valid {selectedCountry.name} phone number
        </span>
      )}
    </div>
  );
}
