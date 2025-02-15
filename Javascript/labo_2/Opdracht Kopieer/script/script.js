const setup = () => {
    const kopieer = () => {
        let txtInput = document.getElementById("txtInput");
        let txtOutput = document.getElementById("txtOutput");
        let tekst = txtInput.value;
        txtOutput.textContent = tekst;
    }

    let btnKopieer = document.getElementById("btnKopieer");
    btnKopieer.addEventListener("click", kopieer);
}

window.addEventListener("load", setup);