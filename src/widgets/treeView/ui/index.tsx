import { ITreeView } from "../../../entity/types"
import { UseTreeForm } from "../model"
import AnimateHeight from "react-animate-height";

const TreeView = ({ tree }: ITreeView) => {
  const [_, toggled] = UseTreeForm();

  return (
    <>
      {tree && tree.map(({ name, children, id, viewed }) => <div key={name} className={`ml-5 border-l border-slate-500 pl-1 text-left text-lg `}>
        <p className=" w-min text-nowrap  rounded-md"> {name}</p>
        <span onClick={() => { toggled({ id: id!, view: viewed! }) }} className={`${children && 'cursor-pointer'}   rounded-md }`} >
          {"children{"}
        </span>
        <AnimateHeight duration={300} height={viewed ? 'auto' : 0} className={`ml-5 text-left text-lg}`}>
          <TreeView tree={children!} />
        </AnimateHeight> <span className={` rounded-md `}>{"}"}</span>
      </div>)
      }
    </>
  )
}
export default TreeView
