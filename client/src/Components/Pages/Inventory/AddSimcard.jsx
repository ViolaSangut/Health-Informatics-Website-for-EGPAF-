import React, { useState, useEffect ,useRef} from 'react';
import Facilities from './Facilities.json'
import axios from 'axios';
import { toast  } from 'react-toastify';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { getDatasetAtEvent } from 'react-chartjs-2';
// import "./AddInventory.css"




const PHONE_REGEX = /^[0-9]{10}$/;
const PUK_REGEX = /^[0-9]{8}$/;
const IMEI_REGEX = /^[0-9]{20}$/;
const PIN_REGEX = /^[0-9]{4}$/;
const PHONEIMEI_REGEX = /^[0-9]{15,20}$/;


function AddSimcard (props){


const [Facility, setFacility] = useState()
const [facilities, setFacilities] = useState([]);


const [PhoneNumber, setPhoneNumber] = useState()
const[validPhone, setValidPhone] = useState()
const[phoneFocus, setPhoneFocus] = useState(false)

const [IMEI, setIMEI] = useState()
const [validIMEI, setValidIMEI] = useState()
const[imeiFocus, setIMEIFocus] = useState(false)


const [PUK, setPUK] = useState()
const[validPUK, setValidPUK] = useState()
const[pukFocus, setPukFocus] = useState(false)



const [PIN, setPIN] = useState()
const[validPIN, setValidPIN]= useState()
const[pinFocus, setPinFocus] = useState(false)

const[PhoneAssigned, setPhoneAssigned] = useState()
const[validPhoneImei, setValidPhoneImei] = useState()
const[PhoneAssignedFocus, setPhoneAssignedFocus] = useState(false)


const [cards, setCards] = useState([])
const navigate = useNavigate();
const {id} =useParams(); 

const card = cards.find(card => (card.id).toString() === id);
const private_axios = usePrivateAxios();

const location = useLocation();
const from = location.state?.from?.pathname || "/Inventory";

//validating phone number
useEffect(() => { 
  const result = PHONE_REGEX.test(PhoneNumber)
//   console.log(result); 
  setValidPhone(result);
},[PhoneNumber]);

//validating IMEI
useEffect(() => { 
  const result = IMEI_REGEX.test(IMEI)
//   console.log(result); 
  setValidIMEI(result);
},[IMEI]);

//validating puk
useEffect(() => { 
  const result = PUK_REGEX.test(PUK)
//   console.log(result); 
  setValidPUK(result);
},[PUK]);


//validating pin
useEffect(() => { 
  const result = PIN_REGEX.test(PIN)
//   console.log(result); 
  setValidPIN(result);
},[PIN]);

//validating phone imei
useEffect(() => { 
  const result = PHONEIMEI_REGEX.test(PhoneAssigned)
//   console.log(result); 
  setValidPhoneImei(result);
},[PhoneAssigned]);



 useEffect(() => {
   if(card){
    setFacility(card.Facility)
    setIMEI(card.IMEI)
    setPhoneNumber(card.PhoneNumber)
    setPIN(card.PIN)
    setPUK(card.PUK) 
    setPhoneAssigned(card.PhoneAssigned) 
   }
 }, [card])

//to-do set find card by id
    useEffect(() => {
     getAllCards();
    }, [])
    

    
    //Add a new card
    const addCard = () =>{
        
        private_axios.post (`/simcards/addSimcards`, {
            PhoneNumber: PhoneNumber, IMEI:IMEI, PUK: PUK, PIN: PIN, 
            Facility: Facility, PhoneAssigned:PhoneAssigned,
        }).then((response)=>{
        // console.log(response.data)
        toast.success("Card Saved Successfully")
        navigate('/simcards');
    })      

    .catch((error)=>{
      console.log(error)
    });
    };

    
    //List all cards in the inventory
        const getAllCards = () =>{
            private_axios.get("/simcards")
            .then((response)=>{
                // console.log(response.data)
                setCards(response.data);
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        
        //Update card details
  const updateCard = async () => {


    
    try {

      const response = await  private_axios.put(`/Simcards/${id}`, {
        PhoneNumber:PhoneNumber, IMEI:IMEI, PIN:PIN, PUK: PUK,
         Facility: Facility, 
      });
      
    //   console.log(response.data);
    //   console.log(JSON.stringify(response));
      toast.success("Card Updated Succesfully");
      navigate('/Simcards')
      //clear input fields
    } catch (err) {
       
  };
  }


  const handleSubmit =(e) =>{
    e.preventDefault();
      if(id){
        updateCard();
    } else {
        addCard();
    }
  }
    const onClickBack =() =>{
    navigate("/Inventory")
    props.handleChange();

  }

//get facilities
useEffect(() => {   
    getAllFacilities();
  }, [])

  const getAllFacilities = () =>{
    axios.get("http://localhost:4000/facilities")
    .then((response)=>{
        // console.log(response.data)
        setFacilities(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })}







return(
    <div class="container mb-5">
            <button className="btn btn-outline-success mt-3" onClick={onClickBack}>Back to Inventory</button>
                <h3 class="text-center mb-3 mt-2">Simcard Detail Form</h3>
            <form>
                <div class="form-group row mt-2">
                    <label class="col-sm-3 col-form-label" >Phone Number
                        <span className={validPhone ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validPhone || !PhoneNumber ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                <div class="col-md-6">
                    <input 
                    class="form-control"
                    placeholder='Phone Number'
                    type='text' 
                    value={PhoneNumber} 
                    onChange={(e)=>setPhoneNumber(e.target.value)}
                    required
                    aria-invalid={validPhone ? "false" : "true"}
                    aria-describedby="phoneid"
                    onFocus={() => setPhoneFocus(true)}
                    onBlur={() => setPhoneFocus(false)}></input>
                    <p
                        id="phoneid"
                        className={
                            phoneFocus && PhoneNumber && !validPhone
                            ? "instructions"
                            : "offscreen"
                        }
                        >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <br />
                        Must be 10 digits long
                        </p>
                    </div>
                    </div>
               <div class="form-group row mt-2">
                <label class="col-sm-3 col-form-label">IMEI
                        <span className={validIMEI ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validIMEI || !IMEI ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                </label>
                <div class="col-md-6">
                < input
                class="form-control"
                placeholder='IMEI' 
                type='text' 
                value={IMEI} 
                onChange={(e)=>setIMEI(e.target.value)}
                required
                aria-invalid={validIMEI ? "false" : "true"}
                aria-describedby="imeiid"
                onFocus={() => setIMEIFocus(true)}
                onBlur={() => setIMEIFocus(false)}></input>
                <p
                    id="imeiid"
                    className={
                        imeiFocus && IMEI && !validIMEI
                        ? "instructions"
                        : "offscreen"
                    }
                    >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <br />
                    Must be 20 digits with no spaces.
                    </p>
                    </div>
                    </div>
                <div class="form-group row mt-2">
                <label class="col-sm-3 col-form-label">PUK
                    <span className={validPUK ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPUK || !PUK ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                    
                </label>
                <div class="col-md-6">
                < input
                class="form-control"
                placeholder='PUK' 
                type='text'
                value={PUK} 
                onChange={(e)=>setPUK(e.target.value)}
                required
                aria-invalid={validPUK ? "false" : "true"}
                aria-describedby="pukid"
                onFocus={() => setPukFocus(true)}
                onBlur={() => setPukFocus(false)}/>
                <p
                    id="pukid"
                    className={
                        pukFocus && PUK && !validPUK
                        ? "instructions"
                        : "offscreen"
                    }
                    >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <br />
                    Must be 8 digits with no spaces.
                    </p>
                    </div>
                    </div>
                    <div class="form-group row mt-2">
                <label class="col-sm-3 col-form-label">PIN
                    <span className={validPIN ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPIN || !PIN ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <div class="col-md-6">
                <input 
                class="form-control"
                placeholder='PIN' 
                type='text'
                value={PIN} 
                onChange={(e)=>setPIN(e.target.value)}
                 required
                aria-invalid={validPIN ? "false" : "true"}
                aria-describedby="pinid"
                onFocus={() => setPinFocus(true)}
                onBlur={() => setPinFocus(false)}/>
                <p
                    id="pinid"
                    className={
                        pinFocus && PIN && !validPIN
                        ? "instructions"
                        : "offscreen"
                    }
                    >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <br />
                    Must be 4 digits with no spaces.
                    </p>
                    </div>
                    </div>
                    <div class="form-group row mt-2">
                <label class="col-sm-3 col-form-label">
                    Select Assigned Facility
                </label>
                <div class="col-md-6">
                <select className=' form-select' onChange ={(e) => setFacility(e.target.value)}>
                    <option value="DEFAULT" disabled ={true}>--Select Assigned Facility--</option>
                    {
                        facilities.map((facility)=>(<option key={facility.id}text={facility.mflcode}>{facility.facilityname}</option>))
                    }
                </select>
                </div>
                </div>
                <div class="form-group row mt-2">
                <label class="col-sm-3 col-form-label">IMEI of Assigned Phone
                    <span className={validPhoneImei ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPhoneImei || !PhoneAssigned ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>



                <div class="col-md-6">
                <input 
                class="form-control"
                placeholder='Phone IMEI' 
                type='text'
                value={PhoneAssigned} 
                onChange={(e)=>setPhoneAssigned(e.target.value)}
                 required
                aria-invalid={validPIN ? "false" : "true"}
                aria-describedby="phonimeiid"
                onFocus={() => setPhoneAssignedFocus(true)}
                onBlur={() => setPhoneAssignedFocus(false)}/>
                <p
                    id="phoneimeiid"
                    className={
                        PhoneAssignedFocus && PhoneAssigned && !validPhoneImei
                        ? "instructions"
                        : "offscreen"
                    }
                    >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <br />
                    Has to be more than 15 digits long
                    </p>
                 </div>
                    </div>
                <br/>
                <div class="row">
                    <div class="col-sm-9 offset-sm-3">
                <button class="btn btn-success col-sm-3" onClick={handleSubmit} disabled={
                    !validIMEI || !validPhoneImei || !validPUK || !validPIN || !validPhone ? true : false
                    }
                >{id 
                 ? <> Update </>
                 : <> Add </>}</button>
                 </div>
                 </div>
            </form>

    </div>
    
)

}
export default AddSimcard