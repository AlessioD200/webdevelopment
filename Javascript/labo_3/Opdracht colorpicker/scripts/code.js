const setup = () => {
	let sliders = document.getElementsByClassName("slider");

    for(let i = 0; i < sliders.length; i++) {
        sliders[i].addEventListener("change", update);
        sliders[i].addEventListener("input", update);
    }
    update()
}


const update = () => {
	let sliders = document.getElementsByClassName("slider");
	let red =sliders[0].value;
	let green =sliders[1].value;
	let blue =sliders[2].value;
    let colorDemos = document.getElementsByClassName("colorDemo");
    colorDemos[0].style.backgroundColor=`rgb(${red},${green},${blue})`;

    document.getElementById("red").textContent=red
    document.getElementById("green").textContent=green
    document.getElementById("blue").textContent=blue
}

window.addEventListener("load", setup);

