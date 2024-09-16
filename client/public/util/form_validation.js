function validatePassword(password , conform_passowrd){
    if(password === "") throw new Error('Password is required')
    if(password !== conform_passowrd) throw new Error('Password not match')
}
function validateUserName(user_name){
    if(user_name === '') throw new Error('username is required')
}
export {validatePassword , validateUserName}