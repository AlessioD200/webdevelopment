const setup = () => {
    const button = document.getElementById("substringBtn");
    button.addEventListener("click", getSubstring);
}

const getSubstring = () => {
    let word = document.getElementById('word').value;
    let start = parseInt(document.getElementById('start').value);
    let end = parseInt(document.getElementById('end').value);

    if (start >= 0 && end <= word.length && start < end) {
        let result = word.substring(start, end);
        document.getElementById('output').textContent = result;
    } else {
        document.getElementById('output').textContent = "Invalid indices.";
    }
}
window.addEventListener("load", setup);