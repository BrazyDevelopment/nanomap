export interface Category {
  id: string
  name: string
  color: string
}

export interface CategoryNode {
  categoryId: string
  x: number
  y: number
}

export interface Node {
  id: string
  name: string
  categoryId: string
  description: string
  url: string
  logo: string
  x: number
  y: number
  shape?: "circle" | "rectangle"
}

export interface EcosystemData {
  categories: Category[]
  categoryNodes: CategoryNode[]
  nodes: Node[]
}