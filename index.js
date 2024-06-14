

let allcount = 0; 

const Allplayers = () => {
  fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=Man city")
    .then((res) => res.json())
    .then((data) => {
      displayplayers(data.player);
    });
};

const displayplayers = (players) => {
  const container = document.getElementById("players");
  container.innerHTML = "";

  players.forEach((player) => {
    const div = document.createElement("div");
    div.classList.add("div_class", "m-2", "p-2");
    div.style.width = "18rem";
    div.innerHTML = `
    <img class="cart-img" src=${player.strThumb} alt="" />
       <div class="Cart">
       <h2>${player.strPlayer}</h2>
       <h3>${player.idPlayer}</h3>
       <h3>${player.strPosition}</h3>
       <h3>${player.strTeam}</h3>
       <h3>${player.strNationality}</h3>
       <p>${player.strDescriptionEN.slice(0,50)}</p>
       </div>
       <button class="btn btn-primary" onclick="details('${player.idPlayer}')">Details</button>
      <button class="btn btn-secondary" onclick="handleAddToCart('${player.strPlayer}', this)">Add to Cart</button>
      
    `;
    container.appendChild(div);
  });
};

document.getElementById("searchButton").addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput").value.trim();
  const container = document.getElementById("players");

  if (searchInput !== "") {
    fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchInput}")
      .then((res) => res.json())
      .then((data) => {
        if (data.player && data.player.length > 0) {
          display_players(data.player);
        }
        });
  } 
  });

const details = (idPlayer) => {
  fetch("https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${idPlayer}")
    .then((res) => res.json())
    .then((data) => {
      const player = data.players[0];
      console.log(player);
      const modal_body = document.getElementById("modal_body");
      modal_body.innerHTML = `
       <div class="card-body">
      <h3>${player.strPlayer}</h3>
       <h3>${player.idPlayer}</h5>
       <h3>${player.strTeam}</h5>
       <h3>${player.strNationality}</h5>
       <p>${player.strDescriptionEN.slice(0,50)}</p>
       </div>
       <a href="${player.strFacebook}" target="_blank"><i class="bi bi-facebook"></i></a>
       <a href="${player.strTwitter}" target="_blank"><i class="bi bi-twitter"></i></i></a>
       <a href="${player.strInstagram}" target="_blank"><i class="bi bi-instagram"></i></a>
      `;
      const modal_fade = new bootstrap.Modal(document.getElementById('modal_fade'));
      modal_fade.show();
    })
    
};

const handleAddToCart = (name,button) =>{

  if(allcount >= 11){
      alert("almost 11 player add");
      return;
  }
  allcount++;
  const count = document.getElementById("count").innerText;
  let converted_count = parseInt(count);
  converted_count += 1;
  document.getElementById("count").innerText = converted_count;
  console.log(converted_count);

  const container = document.getElementById("add_cart");
  const div = document.createElement("div");
  div.classList.add("div_class1", "gap-3", "m-3");
  div.innerHTML = `
    <p class="cart_name fs-5"> ${name} </p>
  `;
  container.appendChild(div);
button.innerText = "Already Added";
  };
Allplayers();