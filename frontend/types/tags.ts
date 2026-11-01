export interface Tag {
    id: number,
    name: string
}

export interface TopTag extends Tag {
    total: number
}