export interface Meal {
    _id: string
    recipeID: string
    numberOfLunchPlanned: number
}

export interface PrettyMeal {
    _id: string,
    title: string,
    numberOfLunch: number,
    imagePath: string,
    state: boolean,
    background: string
}