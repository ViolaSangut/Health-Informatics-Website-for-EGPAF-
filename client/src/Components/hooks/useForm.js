import { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { toast } from 'react-toastify' ;

const useForm = (callback, validate) => {
    const [facilities, setFacilities] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const saveorUpdateFacility = (e) =>{
        e.preventDefault();
        const facility = {mflcode, facilityname, ipaddress, subcounty, county}
      //Preventing adding empty fields
        if(facility.mflcode ==="" || facility.facilityname ==="" || facility.ipaddress ==="" || facility.county ==="" || facility.subcounty ===""){
            alert("All the fields are mandatory!");
         return;
        } else{
            if (id) {
                updateFacility();
            } else{
                saveFacility();
            }
        
        }
        setErrors(validate(facilities));
        setIsSubmitting(true);
    }
    
    const saveFacility = () =>{
    
  
        axios.post("http://localhost:4000/facilities/addfacility", {
          facilityname:facilityname, mflcode:mflcode, subcounty: subcounty,
            status:status, ipaddress:ipaddress, county:county, ushauri:ushauri, WebADT:WebADT
        }).then((response)=>{
        console.log(response.data)
        console.log("Facility inserted!");
        toast.success("Facility inserted successfully")
        navigate('/facilities');
    })
    .catch((error)=>{
      console.log(error)
    });
    }
    
    
      //Update facility
    const updateFacility = () =>{
        axios.put(`http://localhost:4000/facilities/${id}`, {
          facilityname:facilityname, mflcode:mflcode, subcounty: subcounty,
            status:status, ipaddress:ipaddress, county:county, ushauri:ushauri, WebADT:WebADT,
        }).then((response)=>{
        console.log(response.data)
        console.log("facility updated!");
        toast.success("facility updated successfully")
        navigate('/facilities');
    })
        
        .catch((error)=>{
        console.log(error)
        });
      };
       


useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return {saveorUpdateFacility, errors};
};
export default useForm;