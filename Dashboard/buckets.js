


function load(){
   kS = (Math.random(1000)*10000).toFixed(2);


   
   var jsonObject = {
    name: "Kai",
    id:"Vorname",
    kS:`${kS}`,
    pL:0.125,
    pE:0.225,
    pT:0.9,
    pV:0.16,
    pF:0.23,
    pU:0.13
   }
   
   var jsonString = JSON.stringify(jsonObject); // this is json for your div. 
    /// for append div and get div object back from js
    var elementProto = JSON.parse(jsonString);
    
    var element = document.createElement("h3");
    element.innerHTML = "Hallo "+elementProto.name+ "!";
    element.id = elementProto.id;
    
    // append to container (in your case its page 1 or 2
    document.getElementById("deinName").append(element);

    document.getElementById("kontoEuro").innerHTML = elementProto.kS+"€";
    document.getElementById("Lebensmittel").innerText = (elementProto.kS*elementProto.pL).toFixed(2)+`€`;
    document.getElementById("Transport").innerText = (elementProto.kS*elementProto.pT).toFixed(2)+`€`;
    document.getElementById("Einkäufe").innerHTML = (elementProto.kS*elementProto.pE).toFixed(2)+`€`;
    document.getElementById("Versicherungen").innerHTML = (elementProto.kS*elementProto.pV).toFixed(2)+`€`;
    document.getElementById("Freizeit").innerHTML = (elementProto.kS*elementProto.pF).toFixed(2)+`€`;
    document.getElementById("Urlaub").innerHTML = (elementProto.kS*elementProto.pU).toFixed(2)+`€`;
}