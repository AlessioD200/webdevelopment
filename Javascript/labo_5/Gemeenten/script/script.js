const setup = () => {
    let gemeenten = [];
    let invoer;

    while (true) {
        invoer = window.prompt("Gemeente:");
        if (invoer === null || invoer.toLowerCase() === "stop") {
            break;
        }
        gemeenten.push(invoer);
    }
    console.log(gemeenten);
    console.log(gemeenten.sort());

    let select = document.getElementById("selectOp");
    select.innerHTML = gemeenten.sort().map(city => `<option>${city}</option>`).join('');
}

window.addEventListener("load", setup);