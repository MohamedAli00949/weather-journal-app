/* Global Variables */


// Personal API Key for OpenWeatherMap API
const myApiKey = "&appid=bce177f61e67a135d4c0b56e769dcb0c";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

const myDate = document.querySelector("#date"); 
const myTemp = document.querySelector("#temp"); 
const myContant = document.querySelector("#content"); 


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


/* Function called by event listener */
const performAction = (event) => { 
    event.preventDefault();

    const myZip = document.querySelector("#zip").value;
    const myFeelings = document.querySelector("#feelings").value;

    getDataOfWeather(baseURL, myZip, myApiKey)
        .then((data) => {
            postData('/addData', {temp: data.main.temp, date: newDate, content: myFeelings});
    }).then(() =>{ 
        updateUI()
    });
    
        
};

const getDataOfWeather = async (baseURL, zip, myApiKey) =>{
    const res = await fetch(baseURL + zip + myApiKey);
    try {
        const data = await res.json();
        return data;
    }catch (error){
        console.log("error", error);
    }

};

const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: { 
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });
    try {
        const myNewData = await res.json();    
        return myNewData;
    } catch (error) {
        console.log("error", error);
    }
    
}; 

const updateUI = async () => {
    let request = await fetch("/allData");
    try {
        const myData = await request.json();

        myDate.innerHTML = `My Date Now Is <span style="color: #000fff; font-size: 24px" >${myData.date}</span> .`;
        myTemp.innerHTML = `Temperature Now Is <span style="color: #000fff"; font-size: 24px" >${myData.temp}</span> °C .`;
        myContant.innerHTML = `My Feelings Are  <span style="color: #000fff"; font-size: 24px"  >${myData.content}</span> .`;

    }catch (error) {
        console.log('error', error);
    }
};


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);


