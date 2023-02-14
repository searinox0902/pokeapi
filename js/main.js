
const NUMBERPOKEMONS = 252;
const itemWrap = null || document.getElementById('item-wrap');
let pokeList = [];
let pokeView = [];


async function fetchData(apiUrl){
  await fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const pokemons = data.results;


      pokemons.forEach(e => {
        try{
          (async () => {
            await fetchDataPokemonOne(e.url)
          })();
        }catch(error){
          console.log(error)
        }
      });
    });
}

(async () => {
  
  try {
    for (let i = 1; i < NUMBERPOKEMONS; i++) {
      const pokeApi =  `https://pokeapi.co/api/v2/pokemon/${i}`;
     
      await fetch(pokeApi)
      .then(
        res => res.json())
      .then(data => {
          pokeList.push(data);
      })
      
    }
  } catch (error) {
    alert(error);
  }


  Promise.all(pokeList).then(resultado => {
    const pokemons = resultado.map((result) => ({
      name : result.name,
      id   : result.id,
      img  : result.sprites["front_default"],
      type : result.types.map((type) => type.type.name)
    })) 

    console.log(pokemons.length);

    showPokemon(pokemons);
  })

  const showPokemon = (pokemon) => {
    pokemon.map((e) => {

      

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
                    <div class="item-content py-4 px-6 ${e.type[0]} ">
                        <div class="item-content__card ">
                            <div class="flex">
                                <div class="flex-1">
                                    <p class="text-start m-0 leading-none text-white mb-2"># 1</p>
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
                            
                                <div class="w-auto">
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFF"
                                            class="w-6 h-6">
                                            <path
                                                d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                        </svg>
                                    </button>

                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFF"
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
        ;
    });

    itemWrap.innerHTML = pokeView;
  }
})();



