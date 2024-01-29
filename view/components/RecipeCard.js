class RecipeCard {
    constructor(name, image, time, recipe, ingredient) {
        this.name = name
        this.image = image
        this.time = time
        this.recipe = recipe
        this.ingredient = ingredient
        this.DOMElement = this.createCard()
    }

    createCard() {
        // Création de la div principale de la carte
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("recipe-card");

        // Création de la div de l'image et du temps
        let imgDiv = document.createElement("div");
        imgDiv.classList.add("card-image");

        // Ajout de l'image
        let img = document.createElement("img");
        img.src = `./src/images/${this.image}`;

        // Ajout du temps
        let timeDiv = document.createElement("div");
        timeDiv.textContent = `${this.time} min`;

        // Création de la div pour le contenu
        let contentDiv = document.createElement("div");
        contentDiv.classList.add("card-content");

        // Ajout du titre
        let titleDiv = document.createElement("h3");
        titleDiv.textContent = this.name;

        // Création de la div pour la desc et ing
        let descIngDiv = document.createElement("div");

        // Ajout de la description
        let descDiv = document.createElement("div");
        let descTitle = document.createElement("span")
        descTitle.classList.add("span-title");
        descTitle.innerHTML = "Recette";
        descDiv.appendChild(descTitle);

        descDiv.innerHTML += `${this.recipe}`;

        // Ajout des ingrédients
        let ingDiv = document.createElement("div");
        let ingTitle = document.createElement("span");
        ingTitle.classList.add("span-title");
        ingTitle.textContent = "Ingrédients";
        ingDiv.appendChild(ingTitle);

        this.ingredient.forEach(ingredient => {
            let ingItem = document.createElement("div");
            ingItem.textContent = `${ingredient.ingredient} (${ingredient.quantity}${ingredient.unit ? ' ' + ingredient.unit : ''})`
            ingDiv.appendChild(ingItem);
        })

        imgDiv.appendChild(img);
        imgDiv.appendChild(timeDiv);

        descIngDiv.appendChild(descDiv);
        descIngDiv.appendChild(ingDiv);

        contentDiv.appendChild(titleDiv);
        contentDiv.appendChild(descIngDiv);

        cardDiv.appendChild(imgDiv);
        cardDiv.appendChild(contentDiv);

        return cardDiv;
    }
}

export default RecipeCard