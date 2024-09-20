import {appendNode, editNode} from "../treeUtil";

const typeOnChange = ({type: targetValue, id}) => {
    return (value) => {
        const output = editNode(value, {id, type: targetValue, children: null});
        if (targetValue === 'array') {
            return appendNode(output, {id, isSystem: true, name: 'ITEMS'});
        }
        if (targetValue === 'object') {
            return appendNode(output, {id});
        }
        return output;
    };
};

export default typeOnChange;
