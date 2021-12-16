import { useState } from "react"


export const useForm = (initialState = {}) => {

   const init = () => {
       return initialState;
   } 

   const [formData, setFormData] = useState(() => init ())

   const reset = ()=> {
       setFormData(initialState);
   }

   const handleInputChange = ({target}) => {  
    setFormData ({
        ...formData,
        [target.name]: target.value,
    })
    
}

return [formData, handleInputChange, reset]
}
