
export interface ITree{
    name:string,
    children?: ITree[]|null
    id?:number,
    viewed?:boolean
} 

export interface ITreeView{
    tree:ITree[]
} 