export interface Instruction {
    _id: string
    text: string
    ingredientsID: string[]
    quantity: number[],
    order: number,
    cookingTime: number
}