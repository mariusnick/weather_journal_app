/* Global Variables */
const zipCode =  document.getElementById('zip').value;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const key_openweathermap = "&appid=04a7e4d3062cf486b1480437f9b1fb12&units=imperial";
const url_latLong_base = "http://api.openweathermap.org/geo/1.0/zip?zip=";
const url_openweathermap_base = "http://api.openweathermap.org/data/2.5/weather?zip=";

document.getElementById('generate').addEventListener('click', generateAction);

function generateAction(e){
    const feelings = document.getElementById('feelings').value;
    const zipCode =  document.getElementById('zip').value;
    const newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    
    getTemp(url_openweathermap_base , zipCode , key_openweathermap )
    .then((data) => postData("http://localhost:3000/weatherData",{temperature: data,
        date: newDate,
        userResponse: feelings }))
    .then(()=>{console.log('Mark7');
      getData()});
}
    
  
  //get wheather from openweathermap
  const getTemp = async(baseURL,zip,key)=> {
      url = baseURL+zip+key;
      res = await fetch(url);
      try {
          const tempData =await res.json();
          console.log(tempData);
        return tempData.main.temp; }
        catch(error) {
            console.log('error',error);}
  }

  const postData = async (url = "", data = {}) => {
    console.log("In Post");
    console.log(data);
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  
    try {
      const newData = await response.json();
      console.log('Response from Post')
      console.log(newData);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getData = async function()  {
    const request = await fetch("http://localhost:3000/all");
    try {
      const res = await request.json();
      console.log(res)
      //  update UI
      document.getElementById("date").innerHTML =  res.date;
      document.getElementById("temp").innerHTML = res.temperature;
      document.getElementById("content").innerHTML = res.userResponse ;   
    } catch (error) {
      console.log(error);
    }
  };




  const updateUI = async () => {
    const request = await fetch("/all");
    try {
      const allData = await request.json();
      document.getElementById("date").innerHTML = allData.date;
      document.getElementById("temp").innerHTML = Math.round(allData.temperature)+"F";
      document.getElementById("content").innerHTML = allData.userResponse;
    } catch (error) {
      console.log("error", error);
    }
  };