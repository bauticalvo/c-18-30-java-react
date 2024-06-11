import React, {useRef} from "react";
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useLocation } from "react-router-dom";



export const FileInputField = ({ field, form }) => {
    const fileInputRef = useRef();
    const location = useLocation()
  
    const handleClick = () => {
      fileInputRef.current.click();
    };
  
    const handleChange = (event) => {
      const file = event.currentTarget.files[0];
      form.setFieldValue(field.name, file);
    };
  
    return (
      <div className="flex items-center">
        {
            field.name === 'profile_picture' &&(
                <button
                type="button"
                onClick={handleClick}
                className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400'  
                >
                 <IoCloudUploadOutline className="h-[20px] w-[20px]" />  
                 <p>  Adjunta una foto  profesional</p>
                </button>
            )
          }
          {
             field.name === 'certification' &&  (<button
                type="button"
                onClick={handleClick}
                className='w-full p-2 border border-[#D9D9D9] rounded-[34px] space-x-4 flex items-center justify-center  shadow-register-field text-gray-400'  

              >
                <IoCloudUploadOutline className="h-[20px] w-[20px]" /> 
                <p>Adjuntar archivos de certificación / Titulación / especialización / Doctorado</p>
              </button>
            )}

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleChange}
          style={{ display: 'none' }}
          accept=".jpg,.png,.jpeg"
        />
        {field.value && (
          <div className="text-gray-700">
            {field.value.name}
          </div>
        )}
      </div>
    );
  };
