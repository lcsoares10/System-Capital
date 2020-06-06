export default (date,sum,optionSum="year")=>{

    const d = new Date(date)
    console.log(d)
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();

    switch (optionSum) {
        case "month":
            return Date(year, month + sum, day);
            break;
        case "day":
            return new Date(year, month, day + sum);
            break;

        default:
            return new Date(year + sum, month, day);
            break;
    }
}

