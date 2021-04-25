
    const fixNumber = (numb:number) => {
        let string = `00${String(numb)}`
        let fixString = string.slice(-3)     
        return fixString
    }

    export default fixNumber