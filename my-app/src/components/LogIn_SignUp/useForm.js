import { useState/*,useEffect*/ } from "react";

const useForm = validate =>{
    const[values,setValues]=useState({
        username:"",
        email:"",
        pwd:"",
        pwd2:""
    });

    //error
    const[errors,setErrors]=useState({})

    //change sth, update values
    //e: shortform of event
    const handleChange = e =>{
        const{name,value}=e.target
        setValues({
            ...values,
            [name]:value
        });
    };

    //handle submit prevent refresh after type in info
    const handleSubmit = e =>{
        e.preventDefault();

        setErrors(validate(values));
    };
    return {handleChange,values,handleSubmit,errors};
};

export default useForm;