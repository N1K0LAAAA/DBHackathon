var x =0 ;
let a = ["Lebensmittel", "Einkäufe", "Transport", "Versicherungen", "Freizeit", "Urlaub"];
let b = ["Chips", "PC", "Ticket", "Krankenkasse", "Kiten", "Italien-Reise"]

function append(){
  for (let i = 0; i < 11; i++) {
    
    
  
    x = x+1
    f = Math.floor(Math.random()*6);
    g = a[f];
    z = b[f];
    var jsonObject = {
      className: "list-group-item",
      eId:`${x}list-group-item`,
      p:`${z}`,
      pId:`${x}name`,
      dId:`${x}box-cat`,
      cId:`${x}categories`,
      iH:`${g}`,
      pC:"name",
      dC:"box-cat",
      cc:"categories",
    };
  
    var jsonString = JSON.stringify(jsonObject); // this is json for your div. 
    /// for append div and get div object back from js
    var elementProto = JSON.parse(jsonString);
    
    var element = document.createElement("li");
    element.className = elementProto.className;
    element.id = elementProto.eId;
    
    // append to container (in your case its page 1 or 2)
    
    document.getElementById("list-group").append(element);

    var element = document.createElement("p");
    element.id = elementProto.pId;
    element.innerHTML = elementProto.p;
    element.className = elementProto.pC
    // append to container (in your case its page 1 or 2)
    
    document.getElementById(`${x}list-group-item`).append(element);
    

    var element = document.createElement("div");
    element.id = elementProto.dId;
    element.className = elementProto.dC;
    // append to container (in your case its page 1 or 2)
    
    document.getElementById(`${x}list-group-item`).append(element);


    var element = document.createElement("div");
    element.id = elementProto.cId;
    element.className = elementProto.cc;
    element.innerHTML = elementProto.iH;
    
    // append to container (in your case its page 1 or 2)
    
    document.getElementById(`${x}box-cat`).append(element);

    }
  }