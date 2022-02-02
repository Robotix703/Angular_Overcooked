export interface Recipe {
    _id: string
    title: string
    numberOfLunch: number
    imagePath: string
    category: string,
    duration: number,
    score: number,
    lastCooked: Date
}

export const categoriesRecipe = [
    "Entrée",
    "Plat",
    "Dessert"
]