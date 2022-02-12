export interface Instruction {
    _id: string
    text: string
    ingredientsID: string[]
    quantity: number[]
    order: number
    cookingTime: number
}

export interface Composition {
    name: string
    imagePath: string
    quantity: number
}

export interface PrettyInstruction {
    _id: string
    text: string
    composition: Composition[]
    order: number
    cookingTime: number
}