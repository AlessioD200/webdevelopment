const setup = () => {
    let namen = ['Alessio','Emma','Alyssa','Jonas','Thomas']
    console.log(namen.length)
    console.log(namen[0],namen[2],namen[4])
    namen.push('Alessandro')
    console.log(namen)
    console.log("Familieleden:", namen.join(", "));

}
window.addEventListener("load", setup);