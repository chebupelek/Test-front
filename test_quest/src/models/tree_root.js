import React from "react";
import TreeNode from "./tree_node";

class TreeRoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            childKeys: []
        };
        this.add = this.add.bind(this);
        this.reset = this.reset.bind(this);
        this.deleteFromParentList = this.deleteFromParentList.bind(this);
    }

    createChildName(prevState, props) {
        return {
            childKeys: [...prevState.childKeys, this.props.data.lastKey]
        };
    }

    deleteFromParentList(nodeId) {
        var newList = this.state.childKeys.filter((element) => element !== nodeId);
        this.setState({childKeys: newList});
    }

    add() {
        this.props.data.AddNewNodeCallback();
        this.setState(this.createChildName);  
    }

    reset() {
        this.props.data.ResetTreeCallback();
        this.setState({childKeys: []}); 
    }

    render() {
        return (
            <div style={{ marginLeft: 20, marginTop: 20, padding: 10 }}>
                <button className="btn" onClick={this.add}>Add</button>
                <button className="btn" style={{ marginLeft: 20}} onClick={this.reset}>Reset</button>
                <div className="list-group">
                    {this.state.childKeys.map((value) => (
                        <TreeNode 
                            data={this.props.data}
                            name={"Root " + value.toString()} 
                            key={value}
                            nodeId={value}
                            deleteFromParentList={this.deleteFromParentList}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default TreeRoot;