const setup = () => {
    const button = document.querySelector('button');
    button.addEventListener('click', plaatsSpaties);
    function plaatsSpaties() {
        const inputText = document.querySelector('.spaties').value;
        let result = "";
        for (let i = 0; i < inputText.length; i++) {
            result += inputText[i] + " ";
        }
        console.log(result.trim());
    }

}
window.addEventListener("load", setup);