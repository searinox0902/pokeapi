const emptySpaceHTML = document.getElementById('emptySpace');
const favoritesWrapHTML = document.getElementById('favoritesWrap');
const pokeLigthBox = document.getElementById('pokeLigthBox');
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
let localStoragePokemons = [];

function pokeListFavorites() {

    localStoragePokemons = [];

    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            const pokeName = localStorage.key(i);
            const pokeObject = JSON.parse(localStorage.getItem(pokeName));
            localStoragePokemons.push(pokeObject);
        }
        renderFavoritePokemons(localStoragePokemons);
        favoritesWrapHTML.classList.remove('hidden')
        return
    }

    emptySpaceHTML.classList.remove('hidden')
    return;
}


function renderFavoritePokemons(pokemonList) {
    let pokemonTemplate = '';
    pokemonList.map((e) => {
        let typesPokemonCollection = [];
        for (let i = 0; i < e.type.length; i++) {
            typesPokemonCollection +=
                ` <span class="text-start bg-white rounded-full px-2 py-0 mb-1 text-xs inline-block font-bold"> 
                  ${e.type[i]}  
                </span> <br>
              `;
        }

        pokemonTemplate +=
            `
              <div class="item-card  h-full w-full"> 
                      <div class="item-content h-full w-full  rounded-lg py-2 px-3 ${e.type[0]}">
                          <div class="item-content__card ">
                              <div class="flex">
                                  <div class="flex flex-col">
                                      <p class="text-start m-0 leading-none text-white mb-2 "># ${e.id}</p>
                                      <h2 class="w-full text-md text-start text-white uppercase mb-1"> ${e.name} </h2>
      
                                      <div class="flex-1 text-start">
                                        ${typesPokemonCollection}  
                                      </div>
                                  </div>
      
                                  <div class="flex-1 w-full items-center">
                                          <figure class="w-full">
                                              <img class="item-content__img w-full m-auto"
                                                  src="${e.img}"
                                                  alt="${e.name} + Imagen">
                                          </figure>
                                  </div>


                                  <div class="flex flex-col gap-2"> 
                                    <div class="btnFavoriteWrap w-6">
                                        <button class="bg-white ${e.favorite} p-1  rounded-full" id="removeFavorite"  onclick="removeFavorite(${e.id})">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#c9c9c9"
                                                class="w-4 h-4">
                                                <path
                                                    d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="pokeDetails w-6">
                                      

                                        <button 
                                            class="
                                                    bg-white 
                                                    p-1 
                                                    rounded-full" 
                                            id="removeFavorite"  
                                            onclick="pokemonDetails(${e.id})">
                                           

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>

                                        </button>
                                    </div>
                                  </div>
                              
                                 

                                  
                              </div>
                          </div>
                      </div>
                  </div>
            `

    })

    favoritesWrapHTML.innerHTML = pokemonTemplate;
}

function removeFavorite(pokemonId) {
    removePokemonLocalStorage = localStoragePokemons.filter(pokemon => pokemon.id === pokemonId);
    localStorage.removeItem(removePokemonLocalStorage[0].name)
    pokeListFavorites();
}


pokeListFavorites();

async function pokemonDetails(pokeId) {


    pokeLigthBox.classList.remove('hidden');

    const pokemonSelected = localStoragePokemons.filter(pokemon => pokemon.id === pokeId);
    const pokemonSelectedName = pokemonSelected[0].name;

    await fetch(apiUrl + pokemonSelectedName)
        .then(res => res.json())
        .then(async data => {
            const pokemon = {
                name: data.name,
                id: data.id,
                weight: data.weight,
                height: data.height,
                img_front: data.sprites["front_default"],
                img_back: data.sprites["back_default"],
                type: data.types.map((type) => type.type.name),
                stats: data.stats,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
            }
            console.log(pokemon.stats)
            renderPokemonDetails(pokemon);
        })
}

function renderPokemonDetails(pokemon) {

    let typesPokemonTemplate = '';
     
    for (let i = 0; i < pokemon.type.length; i++) {
        console.log(i)
        typesPokemonTemplate +=
            ` <span class="text-start bg-white rounded-full px-3   text-sm inline-block font-bold border-2 border-black"> 
                  ${pokemon.type[i]}  
                </span> <br>
            `;
      }
  

    const poketemplate =
        `
    <div class="max-w-lg max-h-screen bg-white rounded-lg h-auto w-full flex flex-col py-4">
            <div class="flex  justify-end mr-4">
                <button class="inline-block w-12 h-12 flex justify-center items-center" onclick="addFavoriteIndividualSearch()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      
                </button>
            </div>

            <div class="flex px-4 lg:px-16">
                <figure class="blok w-full">
                    <img src="${pokemon.img_front}" class="w-full">
                </figure>
                <figure class="blok w-full">
                    <img src="${pokemon.img_back}" class="w-full">
                </figure>
              
            </div>

            <p class="mt-4 mb-12 font_vt323 text-4xl text-center">
                ${pokemon.name}
            </p>

            <div class="px-6 space-y-4 pb-6 h-auto overflow-auto">
                <div  class="flex gap-6">
                    <label for="weigth" class=" font_vt323 text-2xl">Tipo:</label>
                    <div class="flex items-center gap-2">
                        ${typesPokemonTemplate}
                    </div>
                </div>
                <div  class="flex flex-col">
                    <label for="weigth" class="mb-2 font_vt323 text-2xl">Peso: ${pokemon.weight / 10} KG</label>
                </div>
                <div  class="flex flex-col">
                    <label for="weigth" class="mb-2 font_vt323 text-2xl">Altura:  ${pokemon.height * 10} CM</label>
                </div>
                <div  class="flex flex-col">
                    <p for="weigth" class="flex gap-2 items-center mb-2 font_vt323 text-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        Salud:  
                        ${pokemon.hp}
                    </p>
                    <div style="width:  ${pokemon.hp}%; max-width: 100%" class="h-3  w-full ${pokemon.type[0]}"></div>
                </div>
                <div  class="flex flex-col">
                    <p class="mb-2 flex items-center gap-2 font_vt323 text-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                  
                        Ataque: ${pokemon.attack}
                    </p>
                    <div style="width: ${pokemon.attack}%; max-width: 100%" class="h-3  w-full ${pokemon.type[0]}"></div>
                </div>
                <div  class="flex flex-col">
                    <p class="flex items-center gap-2 mb-2 font_vt323 text-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                  
                  
                        Defensa:  ${pokemon.defense}
                    </p>
                    <div style="width: ${pokemon.defense / 2}%; max-width: 100%" class="h-3  w-full ${pokemon.type[0]}"></div>
                </div>
                <div  class="flex flex-col">
                    <p class="flex gap-2 items-center mb-2 font_vt323 text-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>

                        Velocidad:   ${pokemon.speed}
                    </p>
                    <div style="width: ${pokemon.speed}%; max-width: 100%" class="h-3  w-full  ${pokemon.type[0]}"></div>
                </div>
            </div>
            
           


        </div>
    `
    pokeLigthBox.innerHTML = poketemplate;

}

function addFavoriteIndividualSearch() {
    pokeLigthBox.classList.add('hidden');
    pokeLigthBox.innerHTML = '';
}