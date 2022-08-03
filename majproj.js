const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const cityname = document.getElementById('locinput');
const cityEl = document.getElementById('citydisplay');
const bckg=document.getElementById('body1');


var k=1;
var l=m=0;




const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


function timesetter(offset)
{
   

    const time =new Date()
  
    offsethome = time.getTimezoneOffset();
    
    time.setMinutes(time.getMinutes() +offset+offsethome);
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hour < 10? '0'+hour : hour) + ':' + (minutes < 10? '0'+minutes: minutes)

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}





//Getting and displaying the text for the upcoming six days of the week



//Function to get the correct integer for the index of the days array
function dateset(offset)
{
    let d = new Date();
    
    offsethome = d.getTimezoneOffset();
    d.setMinutes(d.getMinutes()+offsethome+offset+1440);
    
   

for(i=0;i<7;i++)
{
    
 document.getElementById("day" + (i+1)).innerHTML =days[d.getDay()]+"<br>"+ d.getDate()+" "+months[d.getMonth()]+", "+(d.getYear()+1900);
d.setMinutes(d.getMinutes()+1440);
}
}




const API_KEY= "6ca4de7b5dffc0a9441be38c4711d8e4";

function thislocation () {
 document.getElementById("locinput").value="";
 let x=document.getElementById("maxtempholder")
 let y=document.getElementById("mintempholder")
let z=document.getElementById("rainholder");
 x.style.display="block";
 y.style.display="block";
 z.style.display="block";
 x.style.opacity="0";
 y.style.opacity="0";
 z.style.opacity="0";

 let maxTemp = document.getElementById("maxTemp");
        maxTemp.remove();

        maxTemp=document.createElement("canvas")
        maxTemp.setAttribute("id","maxTemp")
        document.getElementById("maxtempholder").appendChild(maxTemp)

        let minTemp = document.getElementById("minTemp");
        minTemp.remove();

        minTemp=document.createElement("canvas")
        minTemp.setAttribute("id","minTemp")
        document.getElementById("mintempholder").appendChild(minTemp)

        let rainChart = document.getElementById("rainChart");
        rainChart.remove();

        rainChart=document.createElement("canvas")
        rainChart.setAttribute("id","rainChart")
        document.getElementById("rainholder").appendChild(rainChart)


    navigator.geolocation.getCurrentPosition((success) => {
        
         let coordinates;
         coordinates =  success.coords;
         let lat= coordinates.latitude
         let lon= coordinates.longitude
         coords=new Array(lat,lon)

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&exclude=hourly,minutely&units=metric&appid=6ca4de7b5dffc0a9441be38c4711d8e4`)
        .then(res => res.json()).then(data => {

            
          
            showWeatherData(data);
            let offset=(data.timezone_offset)/60
            timesetter(offset)
                
            dateset(offset);
           
           
            
            }).catch(err => alert("Something Went Wrong: could not access location"))
            
            fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coords[0]}&lon=${coords[1]}&limit=1&appid=6ca4de7b5dffc0a9441be38c4711d8e4`)
            .then(res => res.json()).then(data => {
               
                
                citydisp(data);
                
               
               
              
                
                
            })
        })
        
        
       
    }

    function citydisp(data)
    {
        cityEl.innerHTML =data[0].name+","+data[0].country;
        if(data[0].country==="FR")
        {
            console.log(data[0].country)
            bckg.style.backgroundImage="url(eiffeltower.jpg)"
        }
        else if(data[0].country==="BR")
        {
            console.log(data[0].country)
            bckg.style.backgroundImage="url(christtheredeemer.jpg)"
        }
       else
            bckg.style.backgroundImage="url(citybcg.jpg)"
    
    }
   

  

    
           
           
            
        
       

    function searchlocation(){
        let x=document.getElementById("maxtempholder")
        let y=document.getElementById("mintempholder")
       let z=document.getElementById("rainholder");
        x.style.display="block";
        y.style.display="block";
        z.style.display="block";
        x.style.opacity="0";
        y.style.opacity="0";
        z.style.opacity="0";
      
        let maxTemp = document.getElementById("maxTemp");
        maxTemp.remove();

        maxTemp=document.createElement("canvas")
        maxTemp.setAttribute("id","maxTemp")
        document.getElementById("maxtempholder").appendChild(maxTemp)

        let minTemp = document.getElementById("minTemp");
        minTemp.remove();

        minTemp=document.createElement("canvas")
        minTemp.setAttribute("id","minTemp")
        document.getElementById("mintempholder").appendChild(minTemp)

        let rainChart = document.getElementById("rainChart");
        rainChart.remove();

        rainChart=document.createElement("canvas")
        rainChart.setAttribute("id","rainChart")
        document.getElementById("rainholder").appendChild(rainChart)
        
        fetch('http://api.openweathermap.org/geo/1.0/direct?q='+cityname.value+'&limit=1&appid=6ca4de7b5dffc0a9441be38c4711d8e4')
        .then(res => res.json()).then(cityinfo => {

         
           let lat=cityinfo[0].lat;
           let lon=cityinfo[0].lon;
           coords=new Array(lat,lon)
         
           
        
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&exclude=hourly,minutely&units=metric&appid=6ca4de7b5dffc0a9441be38c4711d8e4`)
            .then(res => res.json()).then(data => {
    
                
                showWeatherData(data);
                let offset=(data.timezone_offset)/60
                timesetter(offset);
                dateset(offset);
                
           
            })
            fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coords[0]}&lon=${coords[1]}&limit=1&appid=6ca4de7b5dffc0a9441be38c4711d8e4`)
            .then(res => res.json()).then(data => {
               
                citydisp(data);
               
                
            })
        }).catch(err => alert("Could not find location"))
        document.getElementById("locinput").value="";
    }

        

        function defaultlocatoion(){

            


         

        maxTemp=document.createElement("canvas")
        maxTemp.setAttribute("id","maxTemp")
        document.getElementById("maxtempholder").appendChild(maxTemp)

        

        minTemp=document.createElement("canvas")
        minTemp.setAttribute("id","minTemp")
        document.getElementById("mintempholder").appendChild(minTemp)

       

        rainChart=document.createElement("canvas")
        rainChart.setAttribute("id","rainChart")
        document.getElementById("rainholder").appendChild(rainChart)

        
          
           fetch('http://api.openweathermap.org/geo/1.0/direct?q=delhi&limit=1&appid=6ca4de7b5dffc0a9441be38c4711d8e4')
            .then(res => res.json()).then(cityinfo => {
    
               
               let lat=cityinfo[0].lat;
               let lon=cityinfo[0].lon;
               coords=new Array(lat,lon)
            
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&exclude=hourly,minutely&units=metric&appid=6ca4de7b5dffc0a9441be38c4711d8e4`)
                .then(res => res.json()).then(data => {
        
                    
                    showWeatherData(data);
                    let offset=(data.timezone_offset)/60
                    timesetter(offset)
                    dateset(offset)
                    console.log(data)
                   
                   
                
               
                    
                    
                
                })
                fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coords[0]}&lon=${coords[1]}&limit=1&appid=6ca4de7b5dffc0a9441be38c4711d8e4`)
                .then(res => res.json()).then(data => {
                    
                    citydisp(data);
                   
                })
            })
        
            }
            defaultlocatoion();
            let x=document.getElementById("maxtempholder")
            let y=document.getElementById("mintempholder")
           let z=document.getElementById("rainholder");
            x.style.display="block";
            y.style.display="block";
            z.style.display="block";
            x.style.opacity="0";
            y.style.opacity="0";
            z.style.opacity="0";
    
    

            function showWeatherData (data){
                let i;

                document.getElementById("t0").innerHTML=data.current.temp
                document.getElementById("h0").innerHTML=data.current.humidity
                document.getElementById("r0").innerHTML=data.daily[0].rain
                if(data.daily[0].rain==undefined)
                document.getElementById("r0").innerHTML="0"

                let iconcode = data.daily[0].weather[0].icon;
                    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                    document.getElementById("img0").src=iconurl

                for(i=1;i<=7;i++)

                {
                   
                    let iconcode = data.daily[i].weather[0].icon;
                    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                    document.getElementById("img"+(i)).src=iconurl
                }
                for(i=1;i<=7;i++)
                {
                    document.getElementById("max"+(i)).innerHTML=data.daily[i].temp.max;
                }
                for(i=1;i<=7;i++)
                {
                    document.getElementById("min"+(i)).innerHTML=data.daily[i].temp.min;
                }
                for(i=1;i<=7;i++)
                {
                    document.getElementById("r"+(i)).innerHTML=data.daily[i].rain;
                    if(data.daily[i].rain==undefined)
                    {
                        document.getElementById("r"+(i)).innerHTML="0";
                    }
                }
                for(i=1;i<=7;i++)
                {
                    document.getElementById("w"+(i)).innerHTML=data.daily[i].wind_speed;
                }
                for(i=1;i<=7;i++)
                {
                    document.getElementById("h"+(i)).innerHTML=data.daily[i].wind_speed;
                }
                
                        

                       for(j=2;j<=7;j++)
                    {
                        let x=document.getElementById("changemax"+j)
                        let y=document.getElementById("max"+j).innerHTML;
                        let z=document.getElementById("max"+(j-1)).innerHTML;
                       
                        perchange=Math.round(Math.abs((y-z)/z*100));
                        x.innerHTML=perchange+"%";
                        if((z-y)>0)
                        x.style.color="red"
                      
                    
                    else if((z-y)<0)
                        x.style.color="green"

                        else if(z==y)
                    {
                    x.innerHTML="--"
                    x.style.color="white"
                      
                    }}

                    for(j=2;j<=7;j++)
                    {
                        let x=document.getElementById("changemin"+j)
                        let y=document.getElementById("min"+j).innerHTML;
                        let z=document.getElementById("min"+(j-1)).innerHTML;
                       
                        perchange=Math.round(Math.abs((y-z)/z*100));
                        x.innerHTML=perchange+"%";
                      
                        if((z-y)>0)
                        x.style.color="red"
                      
                    
                    else if((z-y)<0)
                        x.style.color="green"

                        else if(z==y)
                    {
                    x.innerHTML="--"
                    x.style.color="white"
                    }}
               
                    for(j=2;j<=7;j++)
                    {
                        let x=document.getElementById("changeh"+j)
                        let y=document.getElementById("h"+j).innerHTML;
                        let z=document.getElementById("h"+(j-1)).innerHTML;
                       
                        perchange=Math.round(Math.abs((y-z)/z*100));
                        x.innerHTML=perchange+"%";
                      
                        if((z-y)>0)
                        x.style.color="red"
                      
                    
                    else if((z-y)<0)
                        x.style.color="green"

                        else if(z==y)
                    {
                    x.innerHTML="--"
                    x.style.color="white"
                    }}

                    for(j=2;j<=7;j++)
                    {
                        let x=document.getElementById("changer"+j)
                        let y=document.getElementById("r"+j).innerHTML;
                        let z=document.getElementById("r"+(j-1)).innerHTML;
                       
                        perchange=Math.round(Math.abs((y-z)/z*100));
                        x.innerHTML=perchange+"%";
                      
                        if((z-y)>0)
                        

                        
                        x.style.color="red"
                       
                    
                    else if((z-y)<0)
                    {    
                    x.style.color="green"
                if(z==0)
                {
                    x.innerHTML="100%"
                }    
                
                }
                        else if(z==y)
                        {
                        x.style.color="white"
                    x.innerHTML="--"
                    }}

                    for(j=2;j<=7;j++)
                    {
                        let x=document.getElementById("changew"+j)
                        let y=document.getElementById("w"+j).innerHTML;
                        let z=document.getElementById("w"+(j-1)).innerHTML;
                       
                        perchange=Math.round(Math.abs((y-z)/z*100));
                        x.innerHTML=perchange+"%";
                      
                        if((z-y)>0)
                        x.style.color="red"
                      
                    
                    else if((z-y)<0)
                        x.style.color="green"
                    
                    else if(z==y)
                    {
                    x.style.color="white"
                    x.innerHTML="--"
                    }}

                       let d= new Date();
                       let offset=(data.timezone_offset)/60;
                    offsethome = d.getTimezoneOffset();
                    d.setMinutes(d.getMinutes()+offsethome+offset+1440);
                    var xValues = [];
                    for(i=0;i<7;i++)
{
    
 xValues[i]=d.getDate()+"/"+(d.getMonth()+1);
d.setMinutes(d.getMinutes()+1440);
}

let maxVal = [];
let minVal=[];
let rainVal=[]
for(i=0;i<7;i++)
{
    maxVal[i]=document.getElementById("max"+(i+1)).innerHTML;
    minVal[i]=document.getElementById("min"+(i+1)).innerHTML;
   rainVal[i]=document.getElementById("r"+(i+1)).innerHTML;

}

new Chart("maxTemp", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: "red",
        data: maxVal
      }]
    },
    options: {
      legend: {display: true},
      title: {
        display: true,
        text: "Maximum Temp Variation"
      }
    }
  });

  new Chart("minTemp", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: "green",
        data: minVal
      }]
    },
    options: {
      legend: {display: true},
      title: {
        display: true,
        text: "Minimum Temp Variation"
      }
    }
  });

  new Chart("rainChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: "blue",
        data: rainVal
      }]
    },
    options: {
      legend: {display: true},
      title: {
        display: true,
        text: "Minimum Temp Variation"
      }
    }
  });
            }
                
                

                function maxgraphbutton()
                {
                    let x=document.getElementById("maxtempholder")
                    let y=document.getElementById("mintempholder")
                   let z=document.getElementById("rainholder");
                   x.style.opacity="1";
                   y.style.opacity="1";
                   z.style.opacity="1";
                   x.style.display="block";
                    y.style.display="none";
                    z.style.display="none";

                }
            
                function mingraphbutton()
                {
                   
                    let x=document.getElementById("maxtempholder")
                    let y=document.getElementById("mintempholder")
                   let z=document.getElementById("rainholder");
                   x.style.opacity="1";
                   y.style.opacity="1";
                   z.style.opacity="1";
                   y.style.display="block";
                    x.style.display="none";
                    z.style.display="none";
                }

                function raingraphbutton()
                {
                    let x=document.getElementById("maxtempholder")
                    let y=document.getElementById("mintempholder")
                   let z=document.getElementById("rainholder");
                   x.style.opacity="1";
                   y.style.opacity="1";
                   z.style.opacity="1";
                   z.style.display="block";
                   y.style.display="none";
                   x.style.display="none";
                }
    

                
   
            
                
    
  