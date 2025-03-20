const setup = () => {
    const button = document.getElementById('maakP');
    const div = document.getElementById('myDIV');

    button.addEventListener('click', () => {
        const p = document.createElement('p');
        p.textContent = 'This is a new P element!';
        div.appendChild(p);
    });
};

window.addEventListener("load", setup);