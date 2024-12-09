import React, { createContext, useState, useContext } from 'react';

// Create Context for managing form data globally
const FormContext = createContext();

// Provider to wrap around your app
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    corpId: null,
    companyName: "",
    emailId: "",
    phoneNo: "",
    address: "",
    userid: "",
    passwd: "",
    name: "",
  });

  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const deleteFormData = () => {
    setFormData({
      corpId: null,
      companyName: "",
      emailId: "",
      phoneNo: "",
      address: "",
      userid: "",
      passwd: "",
      name: "",
    });
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, deleteFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to access the form context
export const useForm = () => useContext(FormContext);
