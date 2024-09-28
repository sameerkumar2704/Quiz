const passwordPattern = /^(?=.*[0-9])(?=.*[@]).+$/;
function validatePassword(password , conform_passowrd , sign_up){
    if(password === "") throw new Error('Password is required')
    if(sign_up && password.length<8) throw new Error('Password is too short must 8 or more')
    if(sign_up && !passwordPattern.test(password)) throw new Error("Password must contains special character and numbers")
    if(sign_up && password !== conform_passowrd) throw new Error('Password not match')
   
}
function validateUserName(user_name){
    if(user_name === '') throw new Error('username is required')
}
export {validatePassword , validateUserName}