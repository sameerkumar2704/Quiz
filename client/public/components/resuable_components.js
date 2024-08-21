function CustomButton( custom_class  , text , link){
    const  button = document.createElement("a")
    button.classList.add(custom_class)
    button.href  = link
    button.innerText =text
    return button;
}
export {CustomButton}
