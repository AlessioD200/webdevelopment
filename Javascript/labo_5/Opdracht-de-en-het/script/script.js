let text = "De gisteren zat de jongen op de Stoep en at de helft van de appel";

for (let i = 0; i < text.length; i++) {
    text = text.toLowerCase().replace("de", "het");
}
console.log(text);
