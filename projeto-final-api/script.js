const pokemonList = document.querySelector("#pokemonList");
const headerButtons = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then(async (response) => await response.json())
        .then(async (data) => await mostrarPokemon(data))
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString().padStart(3, '0');

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <div class="pokemonImg">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemonInfo">
            <div class="nameContainer">
                <p class="pokemonID">#${pokeId}</p>
                <h2 class="pokemonName">${poke.name}</h2>
            </div>
            <div class="pokemonTypes">
                ${tipos}
            </div>
            <div class="pokemonStatistics">
                <p class="stat">${poke.height / 10}m</p>
                <p class="stat">${poke.weight / 10}kg</p>
            </div>
        </div>
    `;
    
    pokemonList.append(div);
}

headerButtons.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    pokemonList.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                const tipos = data.types.map(type => type.type.name);

                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    if (tipos.includes(botonId)) {
                        mostrarPokemon(data);
                    }
                }
            })
    }
}));

// O codigo por motivo espontaneo tende a disordem, e eu nao sei o motivo.