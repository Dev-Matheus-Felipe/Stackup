export interface Tag {
    id: number,
    name: string,
    description: string,
    css_color: string,
    css_bg: string
}

export interface TopTag extends Tag {
    total: number
}

export interface TagProfile extends Tag {
    count: number
}