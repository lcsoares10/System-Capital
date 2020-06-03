
export default function calculateProjection(value_contract){

    let dataProjection = [0];
    for (let x =0 ; x < 11 ; x++) dataProjection.push((10*value_contract)/100);

    console.log(dataProjection);

    return dataProjection;

}
