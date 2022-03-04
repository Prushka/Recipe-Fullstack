//error handling ref: https://github.com/briancodex/react-form-v1

export default function ValidateInfoCheck(values){
    let errors={};

    if(!values.username.trim()){
        errors.username= "Username required"
    }

    //email error check validation
    //if no email entered
    if(!values.email){
        errors.email="Email required"
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        // invalid email form e.g no @ ...
        errors.email="Email address is invalid"
    }
    

    //error check for password
    if(!values.pwd){
        errors.pwd="Password is requried";
    }else if (values.password.length<6){
        errors.pwd="Password need at least 6 characters";
    }

    //passwprd re-type check
    if (!values.pwd2){
        errors.pwd2 = "Repeat the password is required";
    }else if(values.pwd !== values.pwd2){
        errors.pwd2="Password not match";
    }

    return errors;
}


    


