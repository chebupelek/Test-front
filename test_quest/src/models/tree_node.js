import React from "react";

class TreeNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name || "Root",
            isRenaming: false,
            newName: "",
            childKeys: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.rename = this.rename.bind(this);
        this.createChildName = this.createChildName.bind(this);
        this.deleteFromParentList = this.deleteFromParentList.bind(this);
        this.saveNewName = this.saveNewName.bind(this);
    }

    handleInputChange(event) {
        this.setState({ newName: event.target.value });
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

    saveNewName() {
        var newname = this.state.newName;
        this.setState({ name: newname,  isRenaming: false });
    }

    add() {
        this.props.data.AddNewNodeCallback();
        this.setState(this.createChildName);  
    }

    delete() {
        this.props.deleteFromParentList(this.props.nodeId);
    }

    rename() {
        this.setState({ isRenaming: true });
    }

    render() {
        return (
            <div style={{ marginLeft: 20, marginTop: 20, border: "1px solid #ccc", padding: 10 }}>
                {this.state.isRenaming ? (
                    <div>
                        <input 
                            type="text" 
                            value={this.state.newName} 
                            onChange={this.handleInputChange} 
                            placeholder="Enter new name"
                        />
                        <button className="btn" style={{ marginLeft: 20}} onClick={this.saveNewName}>Save</button>
                    </div>
                ) : (
                    <div>
                        <span>{this.state.name}</span>
                        <button className="btn" style={{ marginLeft: 20}} onClick={this.add}>Add</button>
                        <button className="btn" style={{ marginLeft: 20}} onClick={this.delete}>Delete</button>
                        <button className="btn" style={{ marginLeft: 20}} onClick={this.rename}>Rename</button>
                    </div>
                )}
                <div className="list-group">
                    {this.state.childKeys.map((value) => (
                        <TreeNode 
                            data={this.props.data}
                            name={"Node " + value.toString()} 
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

export default TreeNode;