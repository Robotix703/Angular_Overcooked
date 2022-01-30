export interface Ingredient {
  _id: string
  name: string
  imagePath: string
  consumable: boolean,
  category: string,
  unitOfMeasure: string,
  shelfLife: number
}

export const categories = [
  "Viande",
  "Légumes",
  "Céréaliers",
  "Autres"
]

export const unitOfMeasures = [
  "pc",
  "g",
  "L"
]