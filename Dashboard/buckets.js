import { CountUp } from './countUp.js';


function load(){

   
   fetch("http://alessio.ddnss.de/api/user-data/1").then(response => {
    response.json().then(data =>{
   
   
    
    var element = document.createElement("h3");
    element.innerHTML = "Hallo "+data.first_name+ "!";
    element.id = data.user_id;
    
    // append to container (in your case its page 1 or 2
    document.getElementById("deinName").append(element);

    let contentKontoEuro = data.buckets.find(x => x.user_id === 1).food+data.buckets.find(x => x.user_id === 1).transport+data.buckets.find(x => x.user_id === 1).living_expense+data.buckets.find(x => x.user_id === 1).insurance+data.buckets.find(x => x.user_id === 1).entertainment+data.buckets.find(x => x.user_id === 1).urlaub;
    let Lebensmittel= data.buckets.find(x => x.user_id === 1).food;
    let Transport = data.buckets.find(x => x.user_id === 1).transport;
    let Einkäufe = data.buckets.find(x => x.user_id === 1).living_expense;
    let Versicherungen = data.buckets.find(x => x.user_id === 1).insurance;
    let Freizeit = data.buckets.find(x => x.user_id === 1).entertainment;
    let Urlaub = data.buckets.find(x => x.user_id === 1).urlaub;
    
    var countUp = new CountUp('kontoEuro', contentKontoEuro);
    countUp.start();
    var countUp = new CountUp('Lebensmittel', Lebensmittel);
    countUp.start();
    var countUp = new CountUp('Transport', Transport);
    countUp.start();
    var countUp = new CountUp('Versicherungen', Versicherungen);
    countUp.start();
    var countUp = new CountUp('Einkäufe', Einkäufe);
    countUp.start();
    var countUp = new CountUp('Freizeit', Freizeit);
    countUp.start();
    var countUp = new CountUp('Urlaub', Urlaub);
    countUp.start();



        })  
    });
}
load()