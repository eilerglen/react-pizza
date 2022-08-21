export interface IPizzaItem {
  id: string,
  title: string,
  type: string,
  size: number,
  price: number,
  count: number,
  imageUrl: string,
 
}

export interface IPizzaExtra extends IPizzaItem {
  types: number[],
  sizes: number[]
}

