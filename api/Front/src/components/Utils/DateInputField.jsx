import React, { useState } from "react";
import { IoCalendarOutline } from 'react-icons/io5';

export const DateInputField = ({ field, form, label, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event) => {
    const date = event.currentTarget.value;
    form.setFieldValue(field.name, date);
    console.log(field.name, date);
    console.log();
  };

  return (
    <div className="relative flex flex-col space-y-1">
      <div className="relative">
        <input
          id={field.name}
          type="date"
          value={field.value }
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className='w-full p-2 border border-[#D9D9D9] rounded-[34px] shadow-register-field text-gray-700'
          disabled={field.disabled}
        />
        {!field.value && !isFocused && (
          <span className="absolute left-2 top-2 bg-white text-gray-400 pointer-events-none">{placeholder}</span>
        )}
      </div>
      {form.errors[field.name] && form.touched[field.name] && (
        <div className="text-red-500 text-sm">{form.errors[field.name]}</div>
      )}
    </div>
  );
};
