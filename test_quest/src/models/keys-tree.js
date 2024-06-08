let keysTree = {
    treeData : {
        lastKey: 0,
        AddNewNodeCallback: AddNewNode,
        ResetTreeCallback: ResetTree
    }
}

function AddNewNode()
{
    keysTree.treeData.lastKey++;
}

function ResetTree()
{
    keysTree.treeData.lastKey = 0;
}

export default keysTree;