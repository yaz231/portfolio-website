import { useState } from 'react';

export const FloatingInput = ({ label, type, name, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent transition peer"
        placeholder=" "
      />
      <label 
        className={`absolute left-0 transition-all duration-200 ${
          focused || value ? 'text-xs -top-5 text-blue-500' : 'text-base top-3 text-gray-600'
        }`}
      >
        {label}
      </label>
    </div>
  );
};