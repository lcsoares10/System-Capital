

export default (date) => {

    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Intl.DateTimeFormat("pt-BR", options).format(date);
}