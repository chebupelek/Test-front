import TreeRoot from './models/tree_root'

function App(props) {
  return (
    <TreeRoot data={props.data.treeData} />
  );
}

export default App;
