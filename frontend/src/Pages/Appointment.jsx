import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../Components/RelatedDoctors';

const Appointment = () => {
  const {docId}=useParams();
  const {doctors,currencySymbol}=useContext(AppContext);
  const [doctorInfo,setDoctorInfo]=useState(null);
  const [docSlots,setDocSlots]=useState([]);
  const [slotIndex,setSlotIndex]=useState(0);
  const [slotTime,setSlotTime]=useState('');
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const fetchDoctorInfo=async()=>{

      const response=doctors.find(doc=>doc._id===docId);
      setDoctorInfo(response);
console.log("response doctor",response);
}
const getAvailableSlots=()=>{
  const today=new Date();


if(today.getHours>=20){
  today.setDate(today.getDate()+1);
}
  GenerateSlotsOfWeek(today,8,21);
  }
useEffect(()=>{
getAvailableSlots();
},[]);
const generateDailyTimeSlots=(startTime,endTime,interval)=>{
 let Stime=startTime;
  let result=[];
  while(Stime<endTime){
    const formattedTime=Stime.toLocaleString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,  
    });
    result.push({
      dateTime: new Date(Stime),
      time:formattedTime
    });
    Stime.setMinutes(Stime.getMinutes()+interval);
  }
  return result;
}
const GenerateSlotsOfWeek=(dateTime,startHour,endHour)=>{
  let resultSlots=[];
for (let index = 0; index < 7; index++) {
  let currentDate=new Date(dateTime);
  currentDate.setDate(dateTime.getDate()+index);
  let endTime=new Date();  
  endTime.setDate(dateTime.getDate()+index);
  endTime.setHours(endHour,0,0,0);
  if(currentDate.getDate()===dateTime.getDate()&&currentDate.getHours()>7){
    currentDate.setHours(currentDate.getHours()+1);
    currentDate.setMinutes(currentDate.getMinutes()>30?30:0);
  }
  else{
    currentDate.setHours(startHour);
    currentDate.setMinutes(0);
  }
  const result=generateDailyTimeSlots(currentDate,endTime,30);
 resultSlots.push(result);
  

}
setDocSlots(resultSlots);

}
useEffect(()=>{
fetchDoctorInfo();
},[docId,doctors])
  return doctorInfo && (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Doctor Details */}
      <div className="flex flex-col md:flex-row items-start md:items-center">
        {/* Doctor Image */}
        <div className="md:w-1/3 w-full mb-6 md:mb-0">
          {console.log("image", doctorInfo.image)}
          <img
            src={doctorInfo.image}
            alt={doctorInfo.name}
            className="w-full h-60 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Doctor Info */}
        <div className="md:ml-6 md:w-2/3 w-full space-y-4">
          <div>
            <p className="text-2xl font-semibold text-gray-800 flex items-center">
              {doctorInfo.name}
              <img
                src={assets.verified_icon}
                alt="verified icon"
                className="ml-2 w-5 h-5 inline-block"
              />
            </p>
            <div className="flex items-center space-x-2 text-gray-600">
              <p className="font-medium">{doctorInfo.degree}</p>
              <span className="text-gray-400">|</span>
              <p>{doctorInfo.speciality}</p>
              <button className="ml-4 px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-md shadow-sm">
                {doctorInfo.experience} experience
              </button>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 flex items-center">
              About
              <img
                src={assets.info_icon}
                alt="info icon"
                className="ml-2 w-4 h-4"
              />
            </p>
            <p className="text-gray-600 mt-2 leading-relaxed">{doctorInfo.about}</p>
          </div>

          <p className="text-lg font-semibold text-gray-800">
            Appointment Fees:{" "}
            <span className="text-green-500">{currencySymbol}{doctorInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <p className="text-xl font-semibold text-gray-800 mt-6 mb-4">Available Booking Slots</p>
      
      {/* Slot Container */}
      <div className="flex flex-wrap justify-center gap-4">
        {docSlots && docSlots.map((item, index) => (
          <div 
            key={index} 
            onClick={() => setSlotIndex(index)} 
            className={`w-16 h-16 flex items-center justify-center rounded-full cursor-pointer transition duration-300 
              ${slotIndex === index ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border-2 border-gray-300'}
              hover:bg-blue-500 hover:text-white`}>
            
            {/* Display Day and Date */}
            <div className="text-center">
              <p className="text-sm font-semibold">{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
              <p className="text-lg font-bold">{item[0] && item[0].dateTime.getDate()}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 items-center">
  {docSlots.length && docSlots[slotIndex].map((item, index) => (
    <p 
      key={index}
      onClick={() => setSlotTime(item.time)} 
      className={`
        w-12 h-12 flex items-center justify-center rounded-full text-center cursor-pointer transition duration-300
        ${slotTime === item.time ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}
        text-xs font-semibold
      `}
    >
      {item.time.toLowerCase()}
    </p>
  ))}
</div>
    </div>

      {/* Button to Book Appointment */}
      <div className="mt-6 flex justify-center">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Book an Appointment
        </button>
      </div>
      <RelatedDoctors docId={docId} speciality={doctorInfo.speciality}/>
    </div>
    )

}
export default Appointment