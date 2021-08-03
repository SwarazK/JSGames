let btn_element = document.getElementById("btn");
btn_element.addEventListener('click', func);

function func() {
    let text_d = btn_element.textContent;
    if(text_d == "Click Me!!") text_d = "Done!";
    else text_d = "Click Me!!";
    btn_element.textContent = text_d;
}