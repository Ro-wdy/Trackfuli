import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export function Dropdown({ label, options, selected, onSelect, id }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef} id={id}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-gray-800 bg-[#EDEBEB] hover:bg-gray-200 transition-colors duration-200 rounded-full border border-transparent shadow-xs cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-[#004A4C]"
      >
        <span>{selected}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1.5 w-44 origin-top-right rounded-xl bg-white shadow-lg border border-gray-100 py-1.5 focus:outline-hidden">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                option === selected
                  ? 'bg-[#004A4C]/10 text-[#004A4C] font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ToggleGroup({ options, selected, onSelect, id }) {
  return (
    <div className="inline-flex bg-[#EDEBEB] p-1 rounded-full" id={id}>
      {options.map((option) => {
        const isSelected = option === selected;
        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
              isSelected
                ? 'bg-[#004A4C] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
