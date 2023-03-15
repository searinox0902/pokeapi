/* Observer */

let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
let pokeList = [];
let pokemonIndividual;
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

// window.onbeforeunload = saveLocalStorage;

/* =========================== */

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

  if (localStorage.length > 0) {
    pokeList.forEach(e => {
      if (JSON.parse(localStorage.getItem(e.name))) {
        e.favorite = true;
      } else {
        e.favorite = false;
      }
    })
  }

  let pokeView = '';


  if (list.length > 1) {
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
                            
                                <div class="btnFavoriteWrap w-auto ">
                                    
                                    <button class="bg-white ${e.favorite} p-1 rounded-full" id="addFavorite"  onclick="addFavorite(${e.id})">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#c9c9c9"
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
  } else {

    let typesPokemonCollection = [];
    console.log(pokemonIndividual.type)
    
    for (let i = 0; i < pokemonIndividual.type.length; i++) {
      console.log(i)
      typesPokemonCollection +=
        ` <span class="text-start bg-white rounded-full px-3 py-1 mb-2 text-sm inline-block font-bold"> 
                ${pokemonIndividual.type[i]}  
              </span> <br>
            `;
    }



    pokeView +=
      `
            <div class="item-card  rounded-md w-full"> 
                    <div class="item-content py-4 px-6 ${pokemonIndividual.type[0]}">
                        <div class="item-content__card ">
                            <div class="flex">
                                <div class="flex-1">
                                    <p class="text-start m-0 leading-none text-white mb-2"># ${pokemonIndividual.id}</p>
                                    <h2 class="w-full text-2xl text-start text-white uppercase mb-2"> ${pokemonIndividual.name} </h2>
    
                                    <div class="flex-1 text-start">
                                      ${typesPokemonCollection}  
                                    </div>
                                </div>
    
                                <div class="flex-1 w-full items-center">
                                        <figure class="w-full">
                                            <img class="item-content__img w-full"
                                                src="${pokemonIndividual.img}"
                                                alt="${pokemonIndividual.name} + Imagen">
                                        </figure>
                                </div>

                                <div class="btnFavoriteWrap w-auto ">
                                    
                                <button class="bg-white false p-1 rounded-full" id="addFavoriteIndividualSearch"  onclick="addFavoriteIndividualSearch(${pokemonIndividual.id})">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#c9c9c9"
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

  }


}

function addFavoriteIndividualSearch(pokeId) {

  const isExist = pokeList.findIndex(e => e.id === pokeId);

  if (isExist >= 0) {
    console.log('se evita duplicidad de datos')
  } else {
    pokemonIndividual.favorite = true;
    pokeList.push(pokemonIndividual);
    saveLocalStorage();
    const addFavoriteIndividualSearch = document.getElementById('addFavoriteIndividualSearch');
    addFavoriteIndividualSearch.classList.remove('false');
    addFavoriteIndividualSearch.classList.add(pokemonIndividual.favorite)
  }


}

function addFavorite(pokeId) {


  /* si el ID no se encuentra en el Storage no vas a renderizar de nuevo */


  pokeList = pokeList.map((data) => {

    if (data.favorite == true && data.id === pokeId) {
      data.favorite = false;
      return data;
    }

    if (data.id === pokeId) {
      data.favorite = true;
      return data;
    } else {
      return data
    }
  });
  clearLocalStorate();
  saveLocalStorage();
  renderPokemons(pokeList, false);



}

/* guardar pokemones en localstorage y actualizamos el Storage */

function saveLocalStorage() {
  clearLocalStorate();
  pokeList.forEach(e => {
    if (e.favorite === true) {
      localStorage.setItem(e.name, JSON.stringify(e));
    }
  });
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
    clearCards();
    renderPokemons(response, false)
  } else if (searchboxValue.length >= 4) {


    try {

      fetch('https://pokeapi.co/api/v2/pokemon/' + searchboxValue)
        .then(res => {
          if (res.ok) {
            ELEMENTEMPTYSPACE.style.display = 'none';
            return res.json();

          } else {
            clearCards();
            ELEMENTEMPTYSPACE.style.display = 'block';
          }

        })
        .then(data => {
          if (data) {
            const pokemon = {
              name: data.name,
              id: data.id,
              img: data.sprites["front_default"],
              type: data.types.map((type) => type.type.name),
              favorite: false,
            }
            pokemonIndividual = pokemon;
            renderPokemons(pokemonIndividual, true)
            ELEMENTEMPTYSPACE.style.display = 'none';
          }
        });
    } catch (error) {
      console.log(false);
      ELEMENTEMPTYSPACE.style.display = 'block';
    }
  } else {
    ELEMENTEMPTYSPACE.style.display = 'none';
    clearCards();
    makeRequest();
  }
}





function clearCards() {
  itemWrap.innerHTML = "";
}
