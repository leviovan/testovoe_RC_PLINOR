import { createEvent, createStore, sample } from "effector";
import { ITree} from "../../../entity/types";
import { useEffect } from "react";
import { useUnit } from "effector-react";

const $tree = createStore<ITree[] | null>(null)
const toggled = createEvent<{ id: number, view: boolean }>()
const init = createEvent<ITree[]>();

sample({
	clock: init,
	fn: (c) => c,
	target: $tree
})

sample({
	clock: toggled,
	source: $tree,
	fn: (s, c) => {		
		const tree = JSON.stringify(s)
		const currentValue = `"id":${c.id},"viewed":${c.view}`
		const newValue = `"id":${c.id},"viewed":${!c.view}`
		const newTree = tree.replace(currentValue, newValue);
		console.log(JSON.parse(newTree));
		return JSON.parse(newTree)
	},
	target: $tree
})
const useInitialTreeForm = (initialState: ITree[]) => {
	useEffect(() => {
		if (initialState) {
			let i = 0
			const newTreeFunc = (tree: ITree[]) => {
				const newTree = tree.map((el): ITree => {
					if (el.children) {
						const b = newTreeFunc(el.children)
						return ({ name: el.name, children: b ? b : null, id: i++, viewed: true })
					}
					else return ({ name: el.name, children: el.children ? el.children : null, id: i++, viewed: true })
				})
				return newTree
			}
			init(newTreeFunc(initialState))
		}
	}, [])
	return { $tree, toggled }
}

const UseTreeForm = () => useUnit([$tree, toggled])
export {toggled, $tree, UseTreeForm, useInitialTreeForm }