/* Observer */

let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
let pokeList = [];
let pokeListFavorites = [
];
let loading = true;
const itemWrap = null || document.getElementById('item_wrap');
let itemObserver = null || document.getElementById('item_wrap').lastElementChild;
const ELEMENTEMPTYSPACE = null || document.getElementById('emptySpace');

const intersectionOptions = {
  thresold: 1,
}

const onIntersect = ([entry]) => {
  if (entry.isIntersecting && loading) {
    makeRequest();
  }
}


let observer = new IntersectionObserver(onIntersect, intersectionOptions);


/* ========================================= */

async function makeRequest() {
  await fetch(apiUrl)
    .then(res => res.json())
    .then(async data => {
      nextRequest(data.next)
      await requestPoke(data.results);
    });
}


async function requestPoke(e) {
  for (const item of e) {
    await fetch(item.url)
      .then(res => res.json())
      .then(data => {
        const pokemon = {
          name: data.name,
          id: data.id,
          img: data.sprites["front_default"],
          type: data.types.map((type) => type.type.name),
          favorite: false,
        }
        pokeList.push(pokemon);
      })
  }

  renderPokemons(pokeList, false)
}

async function renderPokemons(list, isSearch) {
   
    let pokeView = '';
    list.map((e) => {
      let typesPokemonCollection = [];
      for (let i = 0; i < e.type.length; i++) {
        typesPokemonCollection +=
          ` <span class="text-start bg-white rounded-full px-3 py-1 mb-2 text-sm inline-block font-bold"> 
              ${e.type[i]}  
            </span> <br>
          `;
      }

      
  
      pokeView +=
        `
          <div class="item-card  rounded-md w-full"> 
                  <div class="item-content py-4 px-6 ${e.type[0]}">
                      <div class="item-content__card ">
                          <div class="flex">
                              <div class="flex-1">
                                  <p class="text-start m-0 leading-none text-white mb-2"># ${e.id}</p>
                                  <h2 class="w-full text-2xl text-start text-white uppercase mb-2"> ${e.name} </h2>
  
                                  <div class="flex-1 text-start">
                                    ${typesPokemonCollection}  
                                  </div>
                              </div>
  
                              <div class="flex-1 w-full items-center">
                                      <figure class="w-full">
                                          <img class="item-content__img w-full"
                                              src="${e.img}"
                                              alt="${e.name} + Imagen">
                                      </figure>
                              </div>
                          
                              <div class="btnFavoriteWrap w-auto ${e.favorite}">
                                  
                                  <button class="bg-white p-1 rounded-full" id="addFavorite"  onclick="addFavorite(${e.id})">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#c9c9c9"
                                          class="w-6 h-6">
                                          <path
                                              d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                      </svg>
                                  </button>
  
                                  <button class="bg-white p-1 rounded-full" id="removeFavorite" >
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red"
                                          class="w-6 h-6">
                                          <path
                                              d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                      </svg>

                                      
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
        `
  
      itemWrap.innerHTML = pokeView;
    })
    if (document.getElementById('item_wrap').lastElementChild && !isSearch) {
      ELEMENTEMPTYSPACE.style.display = 'none';
      itemObserver = document.getElementById('item_wrap').lastElementChild;
      observer.observe(itemObserver);
    }
}


function addFavorite(pokeId) {

  // Tenemos una lista con los pokemos, podemos alimentar esa lista con estos pokemons favoritos;

  //console.log(pokeListFavorites.indexOf(e));

    pokeList.forEach((item) => {
      if (!item.id === pokeId){
        console.log('El pokemon no existe en la lista Principal ninguna lista')
        item.favorite = true;
        pokeListFavorites.push(item)
        renderPokemons(pokeList, true)
        return
      }
    })

    compareFavorites(pokeId);
}

function compareFavorites(pokeId){
  //comprobar si existe la lista pokemones favoritos ya
  console.log(pokeId)

  const isFavoriteList = pokeListFavorites.filter(item => {
    return item.id === pokeId;
  });



  if(pokeListFavorites.length > 0 && isFavoriteList.length){
      
    console.log('El pokemon Ya está en la lista de favoritos')
   
  }else{
    console.log('Pokemon no existe en la lista de Favoritos, se ingresa al toque')
    
    pokeList.forEach((item) => {
      if(item.id === pokeId){
        item.favorite = true;
        renderPokemons(pokeList, false)
        pokeListFavorites.push(item)
      }
    })
  }
}

//Esta funcion recibe la lista de Favoritos y la guarda en el LocalStorage

function updateLocalStorage() {

  localStorage.setItem('pokemonPokemonListFavorites', JSON.stringify(pokeListFavorites));
  localStorage.getItem('pokemonPokemonListFavorites');
}

function clearLocalStorate() {
    localStorage.clear();
}


function nextRequest(e) {
  apiUrl = e;
}

makeRequest();


/*  SEARCHBOX */

let searchboxElement = null || document.getElementById('searchbox');


if (searchboxElement) {
  searchboxElement.preventDefault;
  searchboxElement.addEventListener("keyup", searchboxKeypress)
}


const search = (query) => {
  return pokeList.filter(item => {
    return item.name.includes(query);
  });
}

function searchboxKeypress() {
  const searchboxValue = searchboxElement.value;
  const response = search(searchboxValue);


  //misdreavus


  if (response.length > 0 || searchboxValue.length < 4) { 
    console.log('Petición Local')
    clearCards();
    renderPokemons(response, false)
  } else if (searchboxValue.length >= 4)  {
    console.log('Petición de Pokemon Individual.')
    //Petición de Pokemon Individual.
    let pokemonIndividual = [];

    try {

      fetch('https://pokeapi.co/api/v2/pokemon/' + searchboxValue)
        .then(res => {
          if(res.ok){
            ELEMENTEMPTYSPACE.style.display = 'none';
            return res.json();
           
          }else{
            clearCards();
            ELEMENTEMPTYSPACE.style.display = 'block';
          }
          
        })
        .then(data => {
          if (data){
            const pokemon = {
              name: data.name,
              id: data.id,
              img: data.sprites["front_default"],
              type: data.types.map((type) => type.type.name)
            }
            pokemonIndividual.push(pokemon);
            renderPokemons(pokemonIndividual, true)
            ELEMENTEMPTYSPACE.style.display = 'none';
          }
        });
    } catch (error) {
      console.log(false);
      ELEMENTEMPTYSPACE.style.display = 'block';
    }
  }else{
    ELEMENTEMPTYSPACE.style.display = 'none';
    clearCards();
    makeRequest();
  }

  /*
  if {
    ELEMENTEMPTYSPACE.style.display = 'none';
    clearCards();
    makeRequest();
  } */

}





function clearCards() {
  itemWrap.innerHTML = "";
}
