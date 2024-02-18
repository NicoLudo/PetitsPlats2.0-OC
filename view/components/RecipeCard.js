class RecipeCard {
    constructor(name, image, time, recipe, ingredient, appliance) {
        this.name = name;
        this.image = image;
        this.time = time;
        this.recipe = recipe;
        this.ingredient = ingredient;
        this.appliance = appliance;
        this.DOMElement = this.createCard(); // Crée l'élément DOM de la carte
    }

    // Fonction pour créer un élément HTML avec des options spécifiques
    createElement(tag, className, content) {
        let element = document.createElement(tag);
        if (className) element.classList.add(className);
        if (content) element.textContent = content;
        return element;
    }

    // Fonction pour créer et retourner la carte recette complète
    createCard() {
        let cardDiv = this.createElement("div", "recipe-card");

        let imgDiv = this.createElement("div", "card-image");
        let img = this.createElement("img");
        img.src = `./src/images/${this.image}`;
        let timeDiv = this.createElement("div", null, `${this.time} min`);

        imgDiv.appendChild(img);
        imgDiv.appendChild(timeDiv);

        let contentDiv = this.createElement("div", "card-content");
        let titleDiv = this.createElement("h3", null, this.name);

        let parentDiv = document.createElement("div");

        let descDiv = this.createElement("div");
        descDiv.innerHTML = `<span class="span-title">Recette</span> ${this.recipe}`;

        let ingDiv = this.createElement("div");
        ingDiv.innerHTML = '<span class="span-title">Ingrédients</span>';
        this.ingredient.forEach(({ ingredient, quantity, unit }) => {
            ingDiv.innerHTML += `<div>${ingredient} (${quantity}${unit ? " " + unit : ""})</div>`;
        });

        let appliDiv = this.createElement("div");
        appliDiv.innerHTML = `<span class="span-title">Appareil</span><div>${this.appliance}</div>`;

        parentDiv.appendChild(descDiv);
        parentDiv.appendChild(ingDiv);
        parentDiv.appendChild(appliDiv);

        contentDiv.appendChild(titleDiv);
        contentDiv.appendChild(parentDiv);

        cardDiv.appendChild(imgDiv);
        cardDiv.appendChild(contentDiv);

        return cardDiv;
    }
}

export default RecipeCard;
