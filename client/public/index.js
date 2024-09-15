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


    show_password_sing_in.addEventListener('change', (e) => {
        if (e.target.checked) {
            sign_in_password.type = "text"
        } else {
            sign_in_password.type = "password"
        }
    })
    show_password_sign_up.addEventListener('change' , (e)=>{
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