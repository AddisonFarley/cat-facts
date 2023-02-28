/*
    This file contains all JavaScript code
    for interacting with the remove Web API
    provided by https://thecatapi.com/.

    Author: Addison Farley
    File: script.js
    Date: 11/28/2022
 */

loadCat();

window.onload = function() {
    let button = document.querySelector("button");
    button.onclick = loadCat;
}

function loadCat()
{
    const api_key = "api_key";

    let breed_id = "";

    fetch("https://api.thecatapi.com/v1/breeds", 
    {
        method: "GET",
        mode: "cors",
        headers: 
        {
            "Content-Type": "application.json",
            "x-api-key" : api_key
        }
    })
    .then(function(response)
    {
        return response.json();
    })
    .then(function(data)
    {
        console.log(data);

        for (let i = 0; i < data.length; i++) 
        {
            let breed = data[i];
            let option = document.createElement('option');
            option.value = i;
            option.innerHTML = `${breed.name}`;
            document.getElementById("breeds").appendChild(option);
        }

        let index = document.getElementById("breeds").value;
        let name = document.getElementById("name");
        let desc = document.getElementById("description");
        let origin = document.getElementById("origin");
        let lifeSpan = document.getElementById("life-span");
        let childFriendly = document.getElementById("child-friendly");
        let dogFriendly = document.getElementById("dog-friendly");
        let energyLevel = document.getElementById("energy-level");
        let socialNeeds = document.getElementById("social-needs");
        let wiki = document.getElementById("wiki");
        
        breed_id = data[index]["id"];

        name.innerHTML = data[index]["name"];
        desc.innerHTML = data[index]["description"];
        origin.innerHTML = data[index]["origin"];
        lifeSpan.innerHTML = data[index]["life_span"];
        wiki.innerHTML = "Wikipedia";
        wiki.href = data[index]["wikipedia_url"];

        switch(data[index]["child_friendly"])
        {
            case 1:
                childFriendly.innerHTML = "Very Unfriendly " + "(" + data[index]["child_friendly"] + ")";
                break;
            case 2:
                childFriendly.innerHTML = "Unfriendly " + "(" + data[index]["child_friendly"] + ")";
                break;
            case 3:
                childFriendly.innerHTML = "Indifferent " + "(" + data[index]["child_friendly"] + ")";
                break;
            case 4:
                childFriendly.innerHTML = "Friendly " + "(" + data[index]["child_friendly"] + ")";
                break;
            case 5:
                childFriendly.innerHTML = "Very Friendly " + "(" + data[index]["child_friendly"] + ")";
                break;
        }

        switch(data[index]["dog_friendly"])
        {
            case 1:
                dogFriendly.innerHTML = "Very Unfriendly " + "(" + data[index]["dog_friendly"] + ")";
                break;
            case 2:
                dogFriendly.innerHTML = "Unfriendly " + "(" + data[index]["dog_friendly"] + ")";
                break;
            case 3:
                dogFriendly.innerHTML = "Indifferent " + "(" + data[index]["dog_friendly"] + ")";
                break;
            case 4:
                dogFriendly.innerHTML = "Friendly " + "(" + data[index]["dog_friendly"] + ")";
                break;
            case 5:
                dogFriendly.innerHTML = "Very Friendly " + "(" + data[index]["dog_friendly"] + ")";
                break;
        }

        switch(data[index]["energy_level"])
        {
            case 1:
                energyLevel.innerHTML = "Like a Sloth " + "(" + data[index]["energy_level"] + ")";
                break;
            case 2:
                energyLevel.innerHTML = "Slow Moving " + "(" + data[index]["energy_level"] + ")";
                break;
            case 3:
                energyLevel.innerHTML = "Energetic " + "(" + data[index]["energy_level"] + ")";
                break;
            case 4:
                energyLevel.innerHTML = "A Ball of Energy " + "(" + data[index]["energy_level"] + ")";
                break;
            case 5:
                energyLevel.innerHTML = "Bouncing Off the Walls " + "(" + data[index]["energy_level"] + ")";
                break;
        }

        switch(data[index]["social_needs"])
        {
            case 1:
                socialNeeds.innerHTML = "Antisocial " + "(" + data[index]["social_needs"] + ")";
                break;
            case 2:
                socialNeeds.innerHTML = "A Loner " + "(" + data[index]["social_needs"] + ")";
                break;
            case 3:
                socialNeeds.innerHTML = "Indifferent " + "(" + data[index]["social_needs"] + ")";
                break;
            case 4:
                socialNeeds.innerHTML = "Needs Friends " + "(" + data[index]["social_needs"] + ")";
                break;
            case 5:
                socialNeeds.innerHTML = "Very Needy " + "(" + data[index]["social_needs"] + ")";
                break;
        }

        fetch("https://api.thecatapi.com/v1/images/search?limit=10&breed_ids="+breed_id+"&api_key="+api_key, 
        {
            method: "GET",
            mode: "cors",
            headers: 
            {
                "Content-Type": "application.json",
                "x-api-key" : api_key
            }
        })
        .then(function(response)
        {
            return response.json();
        })
        .then(function(data)
        {
            let list = document.getElementById("bottom");

            while (list.hasChildNodes()) 
            {
                list.removeChild(list.firstChild);
            }

            for(let i = 0; i < data.length; i++)
            {
                let img = document.getElementById("bottom");

                let newImg = document.createElement("img");

                newImg.setAttribute("src", data[i].url);

                img.appendChild(newImg);
            }
        })
    })
}
