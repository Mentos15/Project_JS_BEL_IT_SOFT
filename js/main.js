window.onload = async function (){
  showAllTeams();
}

async function showAllTeams(teamId){
  try{

      let refresh = document.getElementsByClassName("refresh")[0];
      refresh.style.display = "flex";

      let allInfoDiv = document.getElementsByClassName("allInfoDiv")[0];
      allInfoDiv.innerHTML = ' ';
      let back = document.getElementsByClassName("back")[0];
      back.style.display = "none";

      const allTeams = await fetch("https://api.football-data.org/v2/teams ", {
        method: 'GET',
        headers: {
            "X-Auth-Token": "f71cc937e0304e22b362fd72d75649e1"
        }
    });

    let teams = await allTeams.json();

    let teamsList = document.getElementsByClassName("teams")[0];
    
    for(let i=0; i<teams.count; i++){
      
      let team = document.createElement("div");
      team.classList.add("team");
      
      let nameTeam = document.createElement("div");
      nameTeam.classList.add("name");
      nameTeam.innerText = `${teams.teams[i].name}`;

      let photoTeamDiv = document.createElement("div");
      photoTeamDiv.classList.add("photoTeam");
      photoTeamDiv.innerHTML += `<img src = "${teams.teams[i].crestUrl}" >`;

      let viewMore = document.createElement("div");
      viewMore.innerHTML += `<button class = "viewMore" onclick = "getAllInfoTeam('${teams.teams[i].id}')">Подробнее</button>`;

      team.appendChild(nameTeam);
      team.appendChild(photoTeamDiv);
      team.appendChild(viewMore);
      teamsList.appendChild(team);
    } 
  }
  catch(err){

  }  
}


async function getAllInfoTeam(teamId){

  try {


    let refresh = document.getElementsByClassName("refresh")[0];
    refresh.style.display = "none";

    let back = document.getElementsByClassName("back")[0];
    back.style.display = "flex";

    let teams = document.getElementsByClassName("teams")[0];
    teams.innerHTML = ' ';
    
    const allInfo = await fetch(`https://api.football-data.org/v2/teams/${teamId}  `, {
        method: 'GET',
        headers: {
            "X-Auth-Token": "f71cc937e0304e22b362fd72d75649e1"
        }
    });
    
    let allInfoTeam = await allInfo.json();

    let allInfoDiv = document.getElementsByClassName("allInfoDiv")[0];
    

    let mainInfo = document.createElement("div");
    mainInfo.classList.add("mainInfo");

    let leftColumn = document.createElement("div");
    leftColumn.classList.add("leftColumn");

    let rightColumn = document.createElement("div");
    rightColumn.classList.add("rightColumn");

    let nameTeamDiv = document.createElement("div");
    nameTeamDiv.classList.add("nameTeam");
    nameTeamDiv.innerText = `${allInfoTeam.name}`;

    let photoTeamDiv = document.createElement("div");
    photoTeamDiv.classList.add("photoTeam");
    photoTeamDiv.innerHTML += `<img src = "${allInfoTeam.crestUrl}" >`;

    let phoneTeamDiv = document.createElement("div");
    phoneTeamDiv.classList.add("phoneTeam");
    phoneTeamDiv.innerText = `PHONE: ${allInfoTeam.phone}`;

    let webSiteTeamDiv = document.createElement("a");
    webSiteTeamDiv.classList.add("webSiteTeam");
    webSiteTeamDiv.href = `${allInfoTeam.website}`;
    webSiteTeamDiv.innerText = "Web site";

    let emailTeamDiv = document.createElement("div");
    emailTeamDiv.classList.add("emailTeam");
    if(allInfoTeam.email === null){
      emailTeamDiv.innerText = `EMAIL: Отсутствует`;
    }
    else{
      emailTeamDiv.innerText = `EMAIL: ${allInfoTeam.email}`;
    }
    

    let squadList = document.createElement("div");
    squadList.classList.add("squad");
    
    for(let i=0; i<allInfoTeam.squad.length ; i++){
      let playerDiv = document.createElement("div");
      playerDiv.classList.add("playerDiv");
      
      let playerPhoto = document.createElement("div");
      playerPhoto.classList.add("playerPhoto");
      
      let playerName = document.createElement("div");
      playerName.classList.add("playerName");
      playerName.innerText = `Name: ${allInfoTeam.squad[i].name}`;

      let playerPosition = document.createElement("div");
      playerPosition.classList.add("playerPosition");
      playerPosition.innerText = `Position: ${allInfoTeam.squad[i].position}`;

      let playerNationality = document.createElement("div");
      playerNationality.classList.add("playerNationality");
      playerNationality.innerText = `Nationality: ${allInfoTeam.squad[i].nationality}`;

      let playerRole = document.createElement("div");
      playerRole.classList.add("playerRole");
      playerRole.innerText = `Role: ${allInfoTeam.squad[i].role}`;

      let firstRow = document.createElement("div");
      firstRow.classList.add("firstRow");

      let secondRow = document.createElement("div");
      secondRow.classList.add("secondRow");
      
      let firstColumn = document.createElement("div");
      firstColumn.classList.add("firstColumn");

      let secondColumn = document.createElement("div");
      secondColumn.classList.add("secondColumn");

      firstRow.appendChild(firstColumn);
      firstRow.appendChild(secondColumn);

      secondRow.appendChild(playerName);
   
      firstColumn.appendChild(playerPhoto);

      secondColumn.appendChild(playerPosition);
      secondColumn.appendChild(playerNationality);
      secondColumn.appendChild(playerRole);

      playerDiv.appendChild(firstRow);
      playerDiv.appendChild(secondRow);

      squadList.appendChild(playerDiv);
    }
    
    let upcomingMatches = document.createElement("div");
    upcomingMatches.innerHTML += `<button class="upcomingMatches" onclick="showUpcomingMatches('${teamId}')">Показать ближайшие матчи</button>`;

    leftColumn.appendChild(nameTeamDiv);
    leftColumn.appendChild(photoTeamDiv);

    rightColumn.appendChild(phoneTeamDiv);
    rightColumn.appendChild(emailTeamDiv);
    rightColumn.appendChild(webSiteTeamDiv);

    mainInfo.appendChild(leftColumn);
    mainInfo.appendChild(rightColumn);

    allInfoDiv.appendChild(mainInfo);
    allInfoDiv.appendChild(squadList);
    allInfoDiv.appendChild(upcomingMatches);
  } catch (error) {
    
  }
}

async function showUpcomingMatches(teamId){
  try {
    const getMatches = await fetch(`https://api.football-data.org/v2/teams/${teamId}/matches`, {
      method: 'GET',
      headers: {
          "X-Auth-Token": "f71cc937e0304e22b362fd72d75649e1"
      }
    });

    let allMatches = await getMatches.json();

    let allInfoDiv = document.getElementsByClassName("allInfoDiv")[0];
      
    let test = document.getElementsByClassName("matchesList")[0];
    
    if(test !== undefined){
      allInfoDiv.removeChild(test);
    }

    let matchesList = document.createElement("div");
    matchesList.classList.add("matchesList");

    


    for(let i=0; i< allMatches.matches.length; i++){
      
        if(allMatches.matches[i].status === "SCHEDULED"){
          let match = document.createElement("div");
          match.classList.add("match");
    
          let homeTeam = document.createElement("div");
          homeTeam.classList.add("homeTeam");
          homeTeam.innerText = `${allMatches.matches[i].homeTeam.name}`;
    
          let date = document.createElement("div");
          date.classList.add("date");
          let str = `${allMatches.matches[i].utcDate}`;
          date.innerText = str.substring(0,10) +" " + str.substring(11,19);
    
          let awayTeam = document.createElement("div");
          awayTeam.classList.add("awayTeam");
          awayTeam.innerText = `${allMatches.matches[i].awayTeam.name}`;
    
          match.appendChild(homeTeam);
          match.appendChild(date);
          match.appendChild(awayTeam);
    
          matchesList.appendChild(match);
        }
        allInfoDiv.appendChild(matchesList);
      }
      
  } catch (error) {
    
  }
}