export default function validateFacility(facilities) {
    let errors = {};
  
    if (!facilities.facilityname.trim()) {
      errors.facilityname = 'facility name required';
    }
    else if (!/^[A-Za-z]+/.test(facilities.facilityname.trim())) {
       errors.facilityname = 'Enter a valid facility name';
     }
  
    
    if (!facilities.mflcode) {
      errors.mflcode = 'mfl is required';
    } else if (facilities.mflcode.length > 5) {
      errors.mflcode = 'mfl code cannot be more than five numbers';
    }
    return errors;      
  }
  