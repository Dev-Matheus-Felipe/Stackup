export interface Tag {
    id: number,
    name: string
}

export interface TopTag extends Tag {
    total: number
}

export interface TagProfile extends Tag {
    count: number
}