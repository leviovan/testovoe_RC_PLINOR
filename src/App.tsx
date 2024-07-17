import './App.css'
import TreeView from './widgets/treeView/ui'
import { useInitialTreeForm, UseTreeForm } from './widgets/treeView/model'
import { data } from './shared/assets'

function App() {
  
  useInitialTreeForm(data)

  const [$tree]=UseTreeForm()

  return (
    <div className=' max-w-[1280px] mx-auto flex flex-col p-5'>
      <TreeView tree={$tree!} />
    </div>)
}

export default App
