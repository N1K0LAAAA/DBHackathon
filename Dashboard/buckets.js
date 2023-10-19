


function load(){
   kS = (Math.random(1000)*10000).toFixed(2);
   fetch("http://alessio.ddnss.de/api/user-data/1").then(response => {
    response.json().then(data =>{

   
   
   
   
    
    var element = document.createElement("h3");
    element.innerHTML = "Hallo "+"Kai"+ "!";
    element.id = data.user.find(x => x.user_id === 1).user_id;
    
    // append to container (in your case its page 1 or 2
    document.getElementById("deinName").append(element);

    document.getElementById("kontoEuro").innerHTML = data.buckets.find(x => x.user_id === 1).food+350+data.buckets.find(x => x.user_id === 1).living_expense+data.buckets.find(x => x.user_id === 1).insurance+data.buckets.find(x => x.user_id === 1).entertainment+400+"€";
    document.getElementById("Lebensmittel").innerText = data.buckets.find(x => x.user_id === 1).food +`€`;
    document.getElementById("Transport").innerText = 350+`€`;
    document.getElementById("Einkäufe").innerHTML = data.buckets.find(x => x.user_id === 1).living_expense+`€`;
    document.getElementById("Versicherungen").innerHTML = data.buckets.find(x => x.user_id === 1).insurance+`€`;
    document.getElementById("Freizeit").innerHTML = data.buckets.find(x => x.user_id === 1).entertainment+"€";
    document.getElementById("Urlaub").innerHTML = 400+`€`;

        })  
    });
}