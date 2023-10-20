
let a = ["Lebensmittel", "Einkäufe", "Transport", "Versicherungen", "Freizeit", "Urlaub"];
let b = ["Chips", "PC", "Ticket", "Krankenkasse", "Kiten", "Italien-Reise"]
import { CountUp } from './countUp.js';

function append(){
  let x = 0;
  fetch("http://alessio.ddnss.de/api/user-data/1").then(response => {
    response.json().then(data =>{
    for(let i=0;i<data.transactions.length;i++){

    let f = Math.floor(Math.random()*6);
    let g = a[f];
    let z = b[f];
    var jsonObject = {
      className: "list-group-item",
      eId:`${i}list-group-item`,
      pId:`${i}name`,
      dId:`${i}box-cat`,
      


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
      element.innerHTML = z;
      element.className = elementProto.pC
      // append to container (in your case its page 1 or 2)
      
      document.getElementById(`${i}list-group-item`).append(element);


      var element = document.createElement("p");
      element.id = elementProto.pId;
      if (data.transactions[i].from_Account == 1) {
        element.innerHTML = '-'+data.transactions[i].amount+'€';
        element.className = 'negativ';
        x = x-data.transactions[i].amount;
      } else {
        element.innerHTML = '+'+data.transactions[i].amount+'€';
        element.className = 'positiv';
        x = x-data.transactions[i].amount;
      }

      
      // append to container (in your case its page 1 or 2)
      
      document.getElementById(`${i}list-group-item`).append(element);
      
  
      var element = document.createElement("div");
      element.id = elementProto.dId;
      element.className = elementProto.dC;
      // append to container (in your case its page 1 or 2)
      
      document.getElementById(`${i}list-group-item`).append(element);
  
  
      var element = document.createElement("div");
      element.id = elementProto.cId;
      element.className = elementProto.cc;
      element.innerHTML = g;
      
      // append to container (in your case its page 1 or 2)
      
      document.getElementById(`${i}box-cat`).append(element);
  
      





    }
    var element = document.createElement("h3");
    element.innerHTML = "Hallo "+data.first_name+ "!";
    element.id = data.user_id;
    
    // append to container (in your case its page 1 or 2
    document.getElementById("deinName").append(element);

    
    var countUp = new CountUp('lW', data.account_data[0].balance
    );
    countUp.start();
      })
    });
    
    
  
   
    
  }
  append()