export default name => {
    if(name.includes("troll")){
        console.log(name)
    }
    return name.toLowerCase().replace(" ", "_");
}
