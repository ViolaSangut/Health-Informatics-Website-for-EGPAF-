import React, { useState, useEffect ,useRef} from 'react';
import Facilities from './Facilities.json'
import axios from 'axios';
import { toast  } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePrivateAxios from '../../hooks/usePrivateAxios';





const PHONE_REGEX = /^[0-9]{10}$/;
const PUK_REGEX = /^[0-9]{8}$/;
const IMEI_REGEX = /^[0-9]{20}$/;
const PIN_REGEX = /^[0-9]{4}$/;
const PHONEIMEI_REGEX = /^[0-9]{15,20}$/;


function AddSimcard (){


const [Facility, setFacility] = useState()


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

//validating phone number
useEffect(() => { 
  const result = PHONE_REGEX.test(PhoneNumber)
  console.log(result); 
  setValidPhone(result);
},[PhoneNumber]);

//validating IMEI
useEffect(() => { 
  const result = IMEI_REGEX.test(IMEI)
  console.log(result); 
  setValidIMEI(result);
},[IMEI]);

//validating puk
useEffect(() => { 
  const result = PUK_REGEX.test(PUK)
  console.log(result); 
  setValidPUK(result);
},[PUK]);


//validating pin
useEffect(() => { 
  const result = PIN_REGEX.test(PIN)
  console.log(result); 
  setValidPIN(result);
},[PIN]);

//validating phone imei
useEffect(() => { 
  const result = PHONEIMEI_REGEX.test(PhoneAssigned)
  console.log(result); 
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
        
        private_axios.post(`/simcards/addSimcards`, {
            PhoneNumber: PhoneNumber, IMEI:IMEI, PUK: PUK, PIN: PIN, 
            Facility: Facility, PhoneAssigned:PhoneAssigned,
        }).then((response)=>{
        console.log(response.data)
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
                console.log(response.data)
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
      
      console.log(response.data);
      console.log(JSON.stringify(response));
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
  }








return(
    <div align ="middle">
            <button className="buttonadd" onClick={onClickBack}>Back to Simcard List</button>

        <section>
            <form>
                <h1>Simcard Details</h1>
                <label>Phone Number
                    <span className={validPhone ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPhone || !PhoneNumber ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
                </label>
                <input 
                placeholder='Phone Number'
                type='text' 
                value={PhoneNumber} 
                onChange={(e)=>setPhoneNumber(e.target.value)}
                required
                aria-invalid={validPhone ? "false" : "true"}
                aria-describedby="phoneid"
                onFocus={() => setPhoneFocus(true)}
                onBlur={() => setPhoneFocus(false)}/>
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

               
                <label>IMEI
                        <span className={validIMEI ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validIMEI || !IMEI ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                </label>
                < input
                placeholder='IMEI' 
                type='text' 
                value={IMEI} 
                onChange={(e)=>setIMEI(e.target.value)}
                required
                aria-invalid={validIMEI ? "false" : "true"}
                aria-describedby="imeiid"
                onFocus={() => setIMEIFocus(true)}
                onBlur={() => setIMEIFocus(false)}/>
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
                <label>PUK
                    <span className={validPUK ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPUK || !PUK ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                < input
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
                <label>PIN
                    <span className={validPIN ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPIN || !PIN ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input 
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
                <label>
                    Select Assigned Facility
                </label>
                <select  onChange ={(e) => setFacility(e.target.value)}>
                    <option selected disabled ="true">--Select Assigned Facility--</option>
                    {
                        Facilities.Facilitynames.map((result)=>(<option key={result.no}text={result.mfl}>{result.facility}</option>))
                    }
                </select>
                <label>IMEI of Assigned Phone
                    <span className={validPhoneImei ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPhoneImei || !PhoneAssigned ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>



                
                <input 
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
                <br/>
                <button onClick={handleSubmit} disabled={
                    !validIMEI || !validPhoneImei || !validPUK || !validPIN || !validPhone ? true : false
                    }
                >Submit</button>
            </form>
        </section>

    </div>
    
)


}
export default AddSimcard