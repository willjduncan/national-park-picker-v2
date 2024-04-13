const apiKeyNatPark = "XeD3ty79NiWNMwuU7DVhQM9fye0L5RspxNkmYSXe";
const apiKeyWeather = "VDnb8aw7KhRDLBsowfaPixWuDjegRJ83";
mapboxgl.accessToken = "pk.eyJ1Ijoid2lsbGpkdW5jYW4iLCJhIjoiY2wxcnZ0bDAxMGxxZTNvcXEzdTdxZzU3ZiJ9.2K211Cg3BG3AL1k-knpdAA"
var resultsEl = document.querySelector("#results");
var searchBtnEl = document.querySelector("#search");
var nameInputEl = document.querySelector("#park-name");
var alertsEl = document.querySelector("#alerts");
var activitiesEl = document.querySelector("#activities");
var toursEl = document.querySelector("#tours");
var addParkEl = document.querySelector("#add-park");
var storeHighEl = document.querySelector(".store-high");
var storeMedEl = document.querySelector(".store-med");
var storeLowEl = document.querySelector(".store-low");
var forecastContainerEl = document.querySelector("#fiveday-container");
var forecastTitle = document.querySelector("#forecast");
var homeCardEl = document.querySelector("#cardParent");
var i = 0;
var natParkUrl;
var parkName;
var park;

// START ARRAY OF PARK CODES
var parks = [
    {
        "name": "Gateway Arch",
        "code": "jeff"
    },
    {
        "name": "Indiana Dunes",
        "code": "indu"
    },
    {
        "name": "White Sands",
        "code": "whsa"
    },
    {
        "name": "Acadia",
        "code": "acad"
    },
    {
        "name": "Arches",
        "code": "arch"
    },
    {
        "name": "Badlands",
        "code": "badl"
    },
    {
        "name": "Big Bend",
        "code": "bibe"
    },
    {
        "name": "Glacier",
        "code": "glac"
    },
    {
        "name": "Glacier Bay",
        "code": "glba"
    },
    {
        "name": "Biscayne",
        "code": "bisc"
    },
    {
        "name": "Black Canyon of the Gunnison",
        "code": "blca"
    },
    {
        "name": "Bryce Canyon",
        "code": "brca"
    },
    {
        "name": "Canyonlands",
        "code": "cany"
    },
    {
        "name": "Capitol Reef",
        "code": "care"
    },
    {
        "name": "Carlsbad Caverns",
        "code": "cave"
    },
    {
        "name": "Channel Islands",
        "code": "chis"
    },
    {
        "name": "Congaree",
        "code": "cong"
    },
    {
        "name": "Crater Lake",
        "code": "crla"
    },
    {
        "name": "Cuyahoga Valley",
        "code": "cuva"
    },
    {
        "name": "Death Valley",
        "code": "deva"
    },
    {
        "name": "Denali",
        "code": "dena"
    },
    {
        "name": "Dry Tortugas",
        "code": "drto"
    },
    {
        "name": "Everglades",
        "code": "ever"
    },
    {
        "name": "Gates of the Arctic",
        "code": "gaar"
    },
    {
        "name": "Grand Canyon",
        "code": "grca"
    },
    {
        "name": "Grand Teton",
        "code": "grte"
    },
    {
        "name": "Great Basin",
        "code": "grba"
    },
    {
        "name": "Great Sand Dunes",
        "code": "grsa"
    },
    {
        "name": "Great Smoky Mountains",
        "code": "grsm"
    },
    {
        "name": "Guadalupe Mountains",
        "code": "gumo"
    },
    {
        "name": "Haleakala",
        "code": "hale"
    },
    {
        "name": "Hawai’i Volcanoes",
        "code": "havo"
    },
    {
        "name": "Hot Springs",
        "code": "hosp"
    },
    {
        "name": "Isle Royale",
        "code": "isro"
    },
    {
        "name": "Joshua Tree",
        "code": "jotr"
    },
    {
        "name": "Katmai",
        "code": "katm"
    },
    {
        "name": "Kenai Fjords",
        "code": "kefj"
    },
    {
        //the same as sequoia
        "name": "Kings Canyon",
        "code": "seki"
    },
    {
        "name": "Kobuk Valley",
        "code": "kova"
    },
    {
        "name": "Lake Clark",
        "code": "lacl"
    },
    {
        "name": "Lassen Volcanic",
        "code": "lavo"
    },
    {
        "name": "Mammoth Cave",
        "code": "maca"
    },
    {
        "name": "Mesa Verde",
        "code": "meve"
    },
    {
        "name": "Mount Rainier",
        "code": "mora"
    },
    {
        "name": "American Samoa",
        "code": "npsa"
    },
    {
        "name": "North Cascades",
        "code": "noca"
    },
    {
        "name": "Olympic",
        "code": "olym"
    },
    {
        "name": "Petrified Forest",
        "code": "pefo"
    },
    {
        "name": "Pinnacles",
        "code": "pinn"
    },
    {
        "name": "Redwood",
        "code": "redw"
    },
    {
        "name": "Rocky Mountain",
        "code": "romo"
    },
    {
        "name": "Saguaro",
        "code": "sagu"
    },
    {
        //the same as kings canyon
        "name": "Sequoia",
        "code": "seki"
    },
    {
        "name": "Shenandoah",
        "code": "shen"
    },
    {
        "name": "Theodore Roosevelt",
        "code": "thro"
    },
    {
        "name": "Virgin Islands",
        "code": "viis"
    },
    {
        "name": "Voyageurs",
        "code": "voya"
    },
    {
        "name": "Wind Cave",
        "code": "wica"
    },
    {
        "name": "Wrangell-St. Elias",
        "code": "wrst"
    },
    {
        "name": "Yellowstone",
        "code": "yell"
    },
    {
        "name": "Yosemite",
        "code": "yose"
    },
    {
        "name": "Zion",
        "code": "zion"
    },
    {
        "name": "New River Gorge",
        "code": "neri"
    }
]
// END ARRAY OF PARK CODES

// BEGIN AUTOFILL
$(document).ready(function () {
    $('input#park-name').autocomplete({
        data: {
            "Denali": null,
            "Gates of the Arctic": null,
            "Glacier Bay": 'https://placehold.it/250x250',
            "Acadia": null,
            "American Samoa": null,
            "Arches": null,
            "Badlands": null,
            "Big Bend": null,
            "Biscayne": null,
            "Black Canyon of the Gunnison": null,
            "Bryce Canyon": null,
            "Canyonlands": null,
            "Capitol Reef": null,
            "Carlsbad Caverns": null,
            "Channel Islands": null,
            "Congaree": null,
            "Crater Lake": null,
            "Cuyahoga Valley": null,
            "Death Valley": null,
            "Denali": null,
            "Dry Tortugas": null,
            "Everglades": null,
            "Gates of the Arctic": null,
            "Gateway Arch": null,
            "Glacier": null,
            "Glacier Bay": null,
            "Grand Canyon": null,
            "Grand Teton": null,
            "Great Basin": null,
            "Great Sand Dunes": null,
            "Great Smoky Mountains": null,
            "Guadalupe Mountains": null,
            "Haleakala": null,
            "Hawai’i Volcanoes": null,
            "Hot Springs": null,
            "Isle Royale": null,
            "Joshua Tree": null,
            "Katmai": null,
            "Kenai Fjords": null,
            "Kings Canyon": null,
            "Kobuk Valley": null,
            "Lake Clark": null,
            "Lassen Volcanic": null,
            "Mammoth Cave": null,
            "Mesa Verde": null,
            "Mount Rainier": null,
            "North Cascades": null,
            "Olympic": null,
            "Petrified Forest": null,
            "Pinnacles": null,
            "Redwood": null,
            "Rocky Mountain": null,
            "Saguaro": null,
            "Sequoia": null,
            "Shenandoah": null,
            "Theodore Roosevelt": null,
            "Virgin Islands": null,
            "Voyageurs": null,
            "Wind Cave": null,
            "Wrangell–St. Elias": null,
            "Yellowstone": null,
            "Yosemite": null,
            "Zion": null,
            // "Cabrillo": null,
            // "Organ Pipe Cactus": null,
            // "Gettysburg National Military Park": null,
            // "Valley Forge": null,
            // "Harpers Ferry": null,
        },
    });
});
// END AUTOFILL

//CLEAR THE PAGE
var clearItems = function () {
    while (resultsEl.firstChild) {
        resultsEl.removeChild(resultsEl.firstChild);
    };
    while (alertsEl.firstChild) {
        alertsEl.removeChild(alertsEl.firstChild);
    };
    while (activitiesEl.firstChild) {
        activitiesEl.removeChild(activitiesEl.firstChild);
    };
    while (toursEl.firstChild) {
        toursEl.removeChild(toursEl.firstChild);
    };
    while (addParkEl.firstChild) {
        addParkEl.removeChild(addParkEl.firstChild);
    };
    $("#main-map").addClass("hide");
    $("#main-map-link").addClass("hide");
};
// END CLEAR PAGE

// LOAD PARKS
function loadParks () {
    //Clear anything previously there and begin again.
    while (storeHighEl.firstChild) {
        storeHighEl.removeChild(storeHighEl.firstChild);
    };
    storeHighEl.textContent = "High Priority Parks";
    while (storeMedEl.firstChild) {
        storeMedEl.removeChild(storeMedEl.firstChild);
    };
    storeMedEl.textContent = "Medium Priority Parks";
    while (storeLowEl.firstChild) {
        storeLowEl.removeChild(storeLowEl.firstChild);
    };
    storeLowEl.textContent = "Low Priority Parks";
    //Add saved parks to the left-side list according to priority
    for (var i = 0; i < localStorage.length; i++) {
            var storedPark = localStorage.key(i);
            var storedParkEl = document.createElement("li");
            storedParkEl.textContent = storedPark + " National Park";
            var storedPriority = JSON.parse(localStorage.getItem(storedPark));
            if (storedPriority === "High Priority") {
                $(".store-high").removeClass("hide");
                storeHighEl.append(storedParkEl);
                addStoredParkToCard(storedPark);
            } else if (storedPriority === "Medium Priority") {
                $(".store-med").removeClass("hide");
                storeMedEl.append(storedParkEl);
            } else if (storedPriority === "Low Priority") {
                $(".store-low").removeClass("hide");
                storeLowEl.append(storedParkEl);
            }
    }
    $(".list-header li").addClass("list-item");
}
// END LOAD PARKS

//TO HANDLE THE PARK SUBMISSION BUTTON
var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var submission = nameInputEl.value.trim();
    park = parks.find(park => park.name === submission);
    console.log(park.name);
    //If the user wrote a park, empty the input section and get the nat park info
    if (submission) {
        clearItems();
        getNatParkInfo(park.code);
        getNatParkAlerts(park.code);
        getNatParkToDos(park.code);
        getNatParkTours(park.code);
        addParkPrompt(submission);
        // addNatMap(park.name)
        nameInputEl.value = "";
    } else {
        modalEnterValidPark();
    }
};

//BEGIN FETCH AND DISPLAY FOR BASIC NAT PARK INFO
function getNatParkInfo (code) {
    natParkUrl = "https://developer.nps.gov/api/v1/parks?parkCode=" + code + "&api_key=" + apiKeyNatPark;
    alerts(natParkUrl);
};

// TO PULL INFO AND GET ERRORS-MODAL CALL
function alerts(natParkUrl) {
    fetch(natParkUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    if (natParkUrl.toLowerCase().indexOf("parks") >= 0) {
                        displayNatParkInfo(data);
                    }
                    else if (natParkUrl.toLowerCase().indexOf("alerts") >= 0) {
                        displayNatParkAlerts(data);
                    }
                    else if (natParkUrl.toLowerCase().indexOf("thingstodo") >= 0) {
                        displayNatParkToDos(data);
                    }
                    else if (natParkUrl.toLowerCase().indexOf("tours") >= 0) {
                        displayNatParkTours(data);
                    }
                });
            } else {
                modalParkNotFound();
            }
        })
        .catch(function (error) {
            modalUnableToConnect();
        });
}

//DISPLAY NAT PARK'S INDIVIDUAL MAP
getNPMap = (long,lat) => {
    var map = new mapboxgl.Map({
     container: 'map',
     center: [long, lat],
     zoom:8,
     style: 'mapbox://styles/mapbox/streets-v11'
    });
}

function displayNewNav() {
    $("#desc-link").removeClass("hide");
    $("#weather-link").removeClass("hide");
    $("#map-link").removeClass("hide");
}

    
// DISPLAY SEARCHED PARK INFO
function displayNatParkInfo(data) {
    console.log("BASIC INFO: ");
    console.log(data);
    displayNewNav();
    //Fetch NP's Weather
    get5Day(data.data[0].latitude, data.data[0].longitude);
    //Fetch NP's Map
    getNPMap(data.data[0].longitude, data.data[0].latitude);
    //Display National Park name as a title
    var name = data.data[0].fullName;
    var titleEl = document.createElement("h2");
    titleEl.textContent = name;
    titleEl.setAttribute("id", "desc-header");
    resultsEl.append(titleEl);
    //display description beneath the title
    var description = data.data[0].description;
    var descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    resultsEl.append(descriptionEl);
    //display address
    var line1 = data.data[0].addresses[0].line1;
    var line2 = data.data[0].addresses[0].line2;
    var city = data.data[0].addresses[0].city;
    var state = data.data[0].addresses[0].stateCode;
    var zip = data.data[0].addresses[0].postalCode;
    var addressTitleEl = document.createElement("span");
    addressTitleEl.textContent = "Address: ";
    addressTitleEl.setAttribute("style", "font-weight:bold;");
    var addressEl = document.createElement("span");
    if (!line2) {
        addressEl.textContent = line1 + ", " + city + ", " + state + " " + zip;
    } else {
        addressEl.textContent = line1 + ", " + line2 + ", " + city + ", " + state + " " + zip;
    }
    addressEl.setAttribute("style", "font-style:italic;");
    var allAddressEl = document.createElement("p");
    allAddressEl.append(addressTitleEl);
    allAddressEl.append(addressEl);
    resultsEl.append(allAddressEl);
    //display directions
    var directions = data.data[0].directionsInfo;
    var directionsEl = document.createElement("p");
    directionsEl.textContent = directions;
    resultsEl.append(directionsEl);
    //display new pictures for slider
    console.log("IMAGES: ");
    console.log(data.data[0].images);
    var images = data.data[0].images;
    for (var i = 0; i < 4; i++) {
        var index = ("img" + i);
        var indexN = ("imgName" + i);
        var indexD = ("descr" + i);
        //in case if National Park have at least 4 photos
        if (i < images.length) {
            //post imgs            
            document.getElementById(index).src = images[i].url;
            //post names for imgs
            document.getElementById(indexN).textContent = images[i].title;
            //post descriptions for imgs
            document.getElementById(indexD).textContent = images[i].caption;
        }
        //in case they don't have enough photos for slideshow
        else {
            document.getElementById(index).src = "https://comfort-frankfurt.com/wp-content/uploads/2018/06/uhfuehfuh-1.jpg";
            document.getElementById(indexN).textContent = "We are sorry! National Park didn't provide any more photos :(";
            document.getElementById(indexD).textContent = "But! You can contact us to place your advertisement here!";
        }

    }
    //replace links in the footer for nps, rec.gov, and npmaps to reflect the searched park
    var newUrl = data.data[0].url;
    $("#nat-park-site").attr("href", newUrl);
    parkName = $("#results").find("h2").text();
    $("#rec-site").attr("href", "https://www.recreation.gov/search?q=" + parkName);
    var parkSearchArr = parkName.split(" National Park");
    var parkSearchCode = parkSearchArr[0];
    parkSearchCode = parkSearchCode.replaceAll("National and State Parks", "");
    parkSearchCode = parkSearchCode.replaceAll(" ", "-");
    parkSearchCode = parkSearchCode.replaceAll("ʻ", "");
    parkSearchCode = parkSearchCode.toLowerCase();
    // parkSearchCode = parkSearchCode.join("");

    $("#map-site").attr("href", "http://npmaps.com/" + parkSearchCode + "/")
}
//END FETCH AND DISPLAY OF BASIC PARK INFO 



// BEGIN FETCH AND DISPLAY OF PARK ALERTS
function getNatParkAlerts (code) {
    natParkUrl = "https://developer.nps.gov/api/v1/alerts?parkCode=" + code + "&api_key=" + apiKeyNatPark;
    alerts(natParkUrl);
};

function displayNatParkAlerts(data) {
    var alertArr = data.data;
    for (var i = 0; i < alertArr.length; i++) {
        var alertTitle = alertArr[i].title;
        var alertTitleEl = document.createElement("p");
        alertTitleEl.innerHTML = '<a class="btn-floating pulse"><i class="material-icons alert">priority_high</i></a> ALERT: ' + alertTitle;
        alertTitleEl.setAttribute("style", "color: red");
        alertsEl.append(alertTitleEl);
    }
}
//END FETCH AND DISPLAY OF NAT PARK ALERTS

//BEGIN FETCH AND DISPLAY OF THINGS TO DO
function getNatParkToDos (code) {
    natParkUrl = "https://developer.nps.gov/api/v1/thingstodo?parkCode=" + code + "&api_key=" + apiKeyNatPark;
    alerts(natParkUrl);
};

function displayNatParkToDos(data) {
    console.log("TO DOS: ");
    console.log(data);
    $("#toDos-link").removeClass("hide");
    var toDoArr = data.data;
    var toDoEl = document.createElement("h3");
    if (!toDoArr[0]) {
        toDoEl.textContent = "No Recommended Activities";
    } else {
        //Add a photo of the first activity to the page
        toDoEl.textContent = "Recommended Activities";
        var imgEl = document.createElement("img");
        let testimg = toDoArr[0];
        // if(toDoArr[0].images[0])
        imgEl.src = toDoArr[0].images[0].url;
        imgEl.alt = toDoArr[0].images[0].altText;
        imgEl.setAttribute("style", "display:block; width:auto; height:450px");
        // RETURN TO LATER FOR FIXING ACTIVITY PICS
        if(imgEl.width<imgEl.height) {
            console.log("this pic isn't perfect");
        //     pickNewPic();
        }
        toDoEl.setAttribute("style", "text-decoration:underline");
        toDoEl.append(imgEl);
    }
    toDoEl.setAttribute("id", "activities-header");
    activitiesEl.append(toDoEl);
    //get title, duration, description, and season description
    for (var i = 0; i < toDoArr.length; i++) {
        //get activity title
        var toDoTitle = toDoArr[i].title;
        var toDoTitleEl = document.createElement("h5");
        toDoTitleEl.textContent = toDoTitle + " ";
        //if there is a duration mentioned in the data, append it to the end of the activity title
        var toDoLengthEl = document.createElement("span");
        if (toDoArr[i].duration) {
            toDoLengthEl.textContent = " Duration: " + toDoArr[i].duration;
            toDoLengthEl.setAttribute("style", "font-weight:bold; font-size:.65em");
            toDoTitleEl.append(toDoLengthEl);
        }
        //add the short description
        var toDoDesc = toDoArr[i].shortDescription;
        var toDoDescEl = document.createElement("p");
        toDoDescEl.textContent = toDoDesc;
        //add season description
        var seasonDescEl = document.createElement("p");
        $(seasonDescEl).html(toDoArr[i].seasonDescription);
        toDoDescEl.append(seasonDescEl);
        //append to page
        activitiesEl.append(toDoTitleEl);
        activitiesEl.append(toDoDescEl);
    }
}
//END FETCH AND DISPLAY OF THINGS TO DO



//BEGIN FETCH AND DISPLAY OF TOURS
function getNatParkTours (code) {
    natParkUrl = "https://developer.nps.gov/api/v1/tours?parkCode=" + code + "&api_key=" + apiKeyNatPark;
    alerts(natParkUrl);
};

function displayNatParkTours (data) {
    console.log("TOURS: ");
    console.log(data);
    $("#tours-link").removeClass("hide");
    var toursArr = data.data;
    var toursTitleEl = document.createElement("h3");
    if (!toursArr[0]) {
        toursTitleEl.textContent = "No Tours Available";
    } else {
        toursTitleEl.textContent = "Tours";
    }
    toursEl.setAttribute("id", "tours-header");
    toursEl.append(toursTitleEl);
    //get title, duration, durationUnit, description, 
    for (var i = 0; i < toursArr.length; i++) {
        //get tour title
        var tourNameEl = document.createElement("h5");
        tourNameEl.textContent = toursArr[i].title + " ";
        //append duration to the tour title and label it according to the unit and wheher the duration is a range or one specific length.
        var tourLengthEl = document.createElement("span");
        if (toursArr[i].durationUnit === "m") {
            if (toursArr[i].durationMin === toursArr[i].durationMax) {
                tourLengthEl.textContent = " Duration: " + toursArr[i].durationMin + " minutes";
            } else {
                tourLengthEl.textContent = " Duration: " + toursArr[i].durationMin + " - " + toursArr[i].durationMax + " minutes";
            }
        } else if (toursArr[i].durationUnit === "h") {
            if (toursArr[i].durationMin === toursArr[i].durationMax) {
                tourLengthEl.textContent = " Duration: " + toursArr[i].durationMin + " hours";
            } else {
                tourLengthEl.textContent = " Duration: " + toursArr[i].durationMin + " - " + toursArr[i].durationMax + " hours";
            }
        } else {
            tourLengthEl.textContent = " Duration Unspecified";
        }
        tourLengthEl.setAttribute("style", "font-weight:bold; font-size:.65em");
        tourNameEl.append(tourLengthEl);
        //get tour description
        var tourDescEl = document.createElement("p");
        tourDescEl.textContent = toursArr[i].description;
        //append to the page
        toursEl.append(tourNameEl);
        toursEl.append(tourDescEl);
    }
}
//END FETCH AND DISPLAY OF TOURS


// ADD TO LIST PROMPT
function addParkPrompt (submission) {
    addParkEl.textContent = "Add " + submission + " National Park to your Must-Visit list?"
    $(".choices").removeClass("hide");
}


//SLIDESHOW OF NAT PARK PHOTOS
$(document).ready(function () {
    $('.slider').slider({
        full_width: true,
        height: 500,
        interval: 8000
    });
});

//pull park data for card
function getNPInfo(code) {
    natParkUrl = "https://developer.nps.gov/api/v1/parks?parkCode=" + code + "&api_key=" + apiKeyNatPark;
    //alerts(natParkUrl);
    fetch(natParkUrl)
    .then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                fillCards(data);
            });
        } else {
            modalParkNotFound();
        }
    })
    .catch(function (error) {
        modalUnableToConnect();
    });
};
    
//create and fill card with park-data
function fillCards(data) {
if (localStorage.length > 0) {
    $("#defaultCard").addClass("hide");
    $("#defaultCard2").addClass("hide");
    
    // //get image data which has img-url, img-name and img-descr
    var images = data.data[0].images;
    var nameOfPark = data.data[0].name;
    //create card append it to container and fill up with info from local storage
    $('#cardParent').append(
        $('<div/>')
        .attr("id", "cardNumb" + i)
        .addClass("col s9 m5 hoverable cardContainer")
        
        .append(
        $('<div/>')
        .addClass("card")

            .append(
            $('<div/>')
            .addClass("card-image")
                
                .append(
                $('<img/>')
                .attr("id", "cardImg" + i)
                .attr("src", images[i].url)
                .addClass("aspect-ratio")
                )

                .append(
                $('<span/>')
                .attr("id", "cardName" + i)
                .addClass("card-title")
                .text(nameOfPark)
                )
            )

            .append(
                $('<div/>')
                .addClass("card-content")
                .append(
                    $('<p/>')
                    .attr("id", "cardDescr" + i)
                    .text(images[i].caption)
                )
            )
        )
        );
    }
    else {
        $("#defaultCard").removeClass("hide")
    };
    i++;
};
                                                               
// "FIND PARK" BUTTON
$("#check").click(function (data) {
    //parkName = $("#results").find("h2").text();
    var parkN = park.name;
    var priority = $('input[name=priority]:checked', '.choices').val()
    console.log(data);
    console.log(parkN);
    console.log(priority);
    localStorage.setItem(parkN, JSON.stringify(priority));
    loadParks();
    // localStorage.setItem
    
});        



//BEGIN FETCH AND DISPLAY OF WEATHER API
var get5Day = function (lat, lon) {
    var apiKey = "4ab2d4e1d400c9fddaeddcbd67c21dac"
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" 
    + lon + "&exclude=hourly,minutely&units=imperial&appid=" + apiKey;
    // var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    //fetch from weather and go to display function
    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                display5Day(data);
                console.log(data);
            });
        });
};
//display function
var display5Day = function (weather) {
    console.log(weather.daily[0]);
    forecastContainerEl.textContent = ""
    //add title
    forecastTitle.textContent = "5-Day Forecast:";
    // console.log(weather);
    var forecast = weather.daily;
    for (var i = 1; i < 6; i++) {
        var dailyForecast = forecast[i].weather;

        var forecastEl = document.createElement("div");
        forecastEl.classList = "col s6 offset-s3 m2 valign card-panel teal";

        var forecastDate = document.createElement("h5")

        var xDaysForward = moment().add(i, 'days');
        // document.write(xDaysForward.format('dddd MMMM DD'));  


        forecastDate.textContent = xDaysForward.format('dddd MMMM DD');
        forecastDate.classList = "card-header text-center"
        forecastEl.appendChild(forecastDate);

        var weatherIcon = document.createElement("img")
        weatherIcon.classList = "card-body text-center";
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast[0].icon}@2x.png`);

        //append weather
        forecastEl.appendChild(weatherIcon);

        //make element for temp
        var forecastTempEl = document.createElement("p");
        forecastTempEl.classList = "card-body text-center";
        forecastTempEl.textContent = "Temp: " + forecast[i].temp.day + "°F     ";
        forecastEl.appendChild(forecastTempEl);

        var forecastHumEl = document.createElement("p");
        forecastHumEl.classList = "card-body text-center";
        forecastHumEl.textContent = "Humidity: " + forecast[i].humidity + "% ";
        forecastEl.appendChild(forecastHumEl);

        //append forcast to div
        forecastContainerEl.appendChild(forecastEl);
    }
}
// END FETCH AND DISPLAY OF WEATHER API

// MODALS
function modalParkNotFound() {
    $("#modal-header").text("Error: National Park Not Found");
    modal();
}
function modalUnableToConnect() {
    $("#modal-header").text("Unable to connect to National Park API");
    modal();
}
function modalEnterValidPark() {
    $("#modal-header").text("Please enter a National Park.");
    modal();
}
function modal() {
    $(document).ready(function () {
        $('#modal').modal();
        $('#modal').modal('open');
    });
}
// END MODALS
 

// PULL HIGH PRIORITY CARDS FROM LOCAL STORAGE AND CREATE/FILL CARDS FOR HOMEPAGE
function addStoredParkToCard(parkName) {
    
    //remove end part of str to get name from "parks" array
    var park = parkName.replace(' National Park', '');
    //check array for name 
    function isPark(NP) {
        return NP.name === park;
    }
    //parkCode = code of chosen park
    var parkCode = parks.find(isPark).code;
    getNPInfo(parkCode);
}

searchBtnEl.addEventListener("click", formSubmitHandler);
loadParks();