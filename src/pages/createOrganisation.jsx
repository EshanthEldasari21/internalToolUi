
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const createOrganisation = () => {
        const navigate = useNavigate();

    const [organisationName, setOrganisationName] = useState("");
    const [description, setDescription] =  useState("");

const handleCreate = () => {

  const newOrganisation = {
    id: Date.now(),
    organisationName,
    description
  };

  let existingOrgs = JSON.parse(localStorage.getItem("organisationData"));

  // If nothing exists → start array
  if (!existingOrgs) {
    existingOrgs = [];
  }

  // If it is object → convert to array
  if (!Array.isArray(existingOrgs)) {
    existingOrgs = [existingOrgs];
  }

  // Push new organisation
  existingOrgs.push(newOrganisation);

  localStorage.setItem("organisationData", JSON.stringify(existingOrgs));
  navigate("/dashboard/projectDashboard");
  alert("Organisation created successfully!");

  setOrganisationName("");
  setDescription("");
};
  return (
    <div style={{ padding: "30px",    }} >

        <h1 className='text-2xl font-bold'>Create Organisation</h1>
        <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-700'>Organisation Name</label>
            <input type="text" placeholder='Enter Organisation Name' className='mt-1 block w-full  shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50' style={{padding:"8px", border: "1px solid #ccc"}} value={organisationName} onChange={(e) => setOrganisationName(e.target.value)} />
        </div>
        
        <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-700'>Description</label>
            <textarea placeholder='Enter Organisation Description' className='mt-1 block w-full shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50' rows={4} style={{padding:"8px", border: "1px solid #ccc"}} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div style={{display: "flex", justifyContent: "flex-end"}}>
        <button className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700' onClick={handleCreate}>
          Create
        </button>
        </div>
    </div>
  )
}   

   

 
export default createOrganisation