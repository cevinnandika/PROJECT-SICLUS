import React from 'react';

const InspectionToggle = ({ label, isChecked, onChange }) => {
  return (
    <label className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 rounded-xl cursor-pointer transition-all duration-200 select-none group">
      <span className="text-xs font-bold text-slate-700 group-hover:text-[#00206B] transition-colors duration-150">
        {label}
      </span>
      <div className="relative">
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        {/* Track */}
        <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${isChecked ? 'bg-[#34A853]' : 'bg-slate-300'}`}></div>
        {/* Thumb */}
        <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition-transform duration-200 ${isChecked ? 'translate-x-5' : 'translate-x-0'}`}></div>
      </div>
    </label>
  );
};

export default InspectionToggle;
