import {createNewUser, validateCredential} from  './util/authentication.js'
import { validatePassword, validateUserName } from './util/form_validation.js'
function init() {
    const sign_in = document.getElementById('sign-in')
    const sign_up = document.getElementById('sign-up')
    const swith_to_sign_in_btn = document.getElementById('switch-to-sign-in')
    const swith_to_sign_up_btn = document.getElementById('switch-to-sign-up')
    const sign_in_password = document.getElementById('sign-in-input-box')
    const show_password_sing_in = document.getElementById('show-password')
    const show_password_sign_up = document.getElementById('show-password-sign-up')
    const sign_up_password = document.getElementById('sign-up-password')
    const sign_up_conform_password = document.getElementById('sign-up-conform-password')
    const show_conform_password_sing_up = document.getElementById('show-conform-password')
    const sign_up_form = document.getElementById('sign-up-form')
    const sign_in_form = document.getElementById('sign-in-form')
    const form_error = document.getElementsByClassName('form-error')
    sign_up_form.addEventListener('submit' , (e)=>{
        e.preventDefault()
        const user_name = sign_up_form.elements.user_name.value
        const passowrd = sign_up_form.elements.password.value;
        const conform_password =  sign_up_form.elements.conform_password.value;
        try{
            validateUserName(user_name)
            validatePassword(passowrd , conform_password)
            createNewUser( user_name ,passowrd )
        }catch(e){
            form_error[0].innerHTML = `*** ${e.message} ***`
        }
       

    })
    sign_in_form.addEventListener('submit' , (e)=>{
        e.preventDefault();
        const user_name = sign_in_form.elements.login_user_name.value;
        const password = sign_in_form.elements.login_user_password.value
        try{
            validateUserName(user_name)
            validatePassword(password,password)
            validateCredential(user_name ,password)
            form_error[1].innerHTML = ``
        }catch(e){
            form_error[1].innerHTML = `*** ${e.message} ***`
        }

    })
    show_password_sing_in.addEventListener('change', (e) => {
        if (e.target.checked) {
            sign_in_password.type = "text"
        } else {
            sign_in_password.type = "password"
        }
    })
    show_password_sign_up.addEventListener('change' , (e)=>{
        console.log("samerewrawd")
        if (e.target.checked) {
            sign_up_password.type = "text"
        } else {
            sign_up_password.type = "password"
        }
    })
    show_conform_password_sing_up.addEventListener('change' , (e)=>{
        if (e.target.checked) {
            sign_up_conform_password.type = "text"
        } else {
            sign_up_conform_password.type = "password"
        }
    })



    swith_to_sign_in_btn.addEventListener('click', () => {
        sign_in.style.display = "block"
        sign_up.style.display = "none"


    })
    swith_to_sign_up_btn.addEventListener("click", () => {
        sign_up.style.display = "block"
        sign_in.style.display = "none"

    })


}
init()