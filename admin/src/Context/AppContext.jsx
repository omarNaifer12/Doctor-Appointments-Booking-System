import { createContext } from "react";

export const AppContext=createContext();
const AppContextProvider=(props)=>{
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const slotDataFormat=(slotDate)=>{
  const dateArray=slotDate.split('_');
  return dateArray[0]+' '+months[Number(dateArray[1])]+' '+dateArray[2];
  }
    const calculateAge=(dob)=>{
        
        
        const today=new Date();
        const birthDate=new Date(dob);
        let years = today.getFullYear() - birthDate.getFullYear();

      
        if (
            today.getMonth() < birthDate.getMonth() || 
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
        ) {
            years--;
        }
    
        return years;
    }
    const value={
        calculateAge,slotDataFormat
    }
    return <AppContext.Provider value={value}>
        {
            props.children
        }
    </AppContext.Provider>
}
export default AppContextProvider;