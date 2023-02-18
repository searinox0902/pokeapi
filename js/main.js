/* Observer */

let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
let pokeList = [];
let loading = true;
let isSearch = false;
const itemWrap = null || document.getElementById('item_wrap');
let itemObserver = null || document.getElementById('item_wrap').lastElementChild;

const intersectionOptions = {
  thresold: 1,
}

const onIntersect = ([entry]) => {
  if(entry.isIntersecting && loading){
    makeRequest();
  }
}


  let observer = new IntersectionObserver(onIntersect, intersectionOptions);





/* ========================================= */

async function makeRequest() {
  if(!isSearch){
    await fetch(apiUrl)
    .then(res => res.json())
    .then(async data => {
      nextRequest(data.next)
      await requestPoke(data.results);
    });
  }
 
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
        type: data.types.map((type) => type.type.name)
      }
      pokeList.push(pokemon);
    })
  }

  renderPokemons(pokeList)

}

async function renderPokemons(list) {
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
        <div class="item-card  rounded-md w-full" onclick="eventExample(this)"> 
                <div class="item-content py-4 px-6 ${e.type[0]}">
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

    itemWrap.innerHTML = pokeView;
  })
  if(document.getElementById('item_wrap').lastElementChild && !isSearch){
    itemObserver = document.getElementById('item_wrap').lastElementChild;
    observer.observe(itemObserver);
  }

}


function eventExample(e) {
  console.log(e);
  console.log('Has dado click a un pokemon')
}


function nextRequest(e) {
  apiUrl = e;
}

makeRequest();


/*  SEARCHBOX */

let searchboxElement = null || document.getElementById('searchbox');


if(searchboxElement){
  searchboxElement.preventDefault;
  searchboxElement.addEventListener("keypress", searchboxKeypress)
}

function searchboxKeypress() {
    const response = search( searchboxElement.value);
    isSearch = true;
    if(response){
      clearCards();
      renderPokemons(response)
    }else{
      console.log('no hay respuesta')
      isSearch = false;
    }
  }


const search = (query) => {
  return pokeList.filter(item => {
    return item.name.includes(query);
  }); 
}


function clearCards(){
  itemWrap.innerHTML = "";
}
