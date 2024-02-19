class RecipeCard {
    constructor(name, image, time, recipe, ingredient, appliance) {
        this.name = name;
        this.image = image;
        this.time = time;
        this.recipe = recipe;
        this.ingredient = ingredient;
        // this.appliance = appliance;
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

        let descDiv = this.createElement("div", null, `${this.recipe}`);
        let descTitle = this.createElement("span", "span-title", "Recette");
        descDiv.prepend(descTitle);

        let ingDiv = this.createElement("div");
        let ingTitle = this.createElement("span", "span-title", "Ingrédients");
        ingDiv.prepend(ingTitle);
        let ingList = this.createElement("div", "ing-list")
        this.ingredient.forEach(({ ingredient, quantity, unit }) => {
            let ingSpan = this.createElement("span", "ing-span", `${ingredient}`);
            let ingSpanQU = this.createElement("span", "ing-qu", `${quantity}${unit ? " " + unit : ""}`);
            ingSpan.appendChild(ingSpanQU);
            ingList.appendChild(ingSpan);
        });
        ingDiv.appendChild(ingList);

        // let appliDiv = this.createElement("div", null, `${this.appliance}`);
        // let appliTitle = this.createElement("span", "span-title", "Appareil");
        // appliDiv.prepend(appliTitle);

        parentDiv.appendChild(descDiv);
        parentDiv.appendChild(ingDiv);
        // parentDiv.appendChild(appliDiv);

        contentDiv.appendChild(titleDiv);
        contentDiv.appendChild(parentDiv);

        cardDiv.appendChild(imgDiv);
        cardDiv.appendChild(contentDiv);

        return cardDiv;
    }
}

export default RecipeCard;
