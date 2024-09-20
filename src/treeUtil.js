import {v4 as uuid} from "uuid";

export const appendNode = (tree, targetNode) => {
    const core = (node) => {
        if (targetNode.id === 'root' && !node.id || node.id === targetNode.id) {
            const children = Array.isArray(node.children) ? node.children.slice(0) : [];
            children.push(Object.assign({}, {type: 'string'}, targetNode, {
                id: uuid(), level: (node.level || 0) + 1
            }));
            return Object.assign({}, node, {children});
        }

        if (Array.isArray(node.children)) {
            return Object.assign({}, node, {
                children: node.children.map((node) => {
                    return core(node);
                })
            });
        }

        return Object.assign({}, node);
    };
    return core(tree);
};

export const removeNode = (tree, targetId) => {
    const core = (node) => {
        if (Array.isArray(node.children)) {
            const index = node.children.findIndex((node) => node.id === targetId);
            return Object.assign({}, node, {
                children: index > -1 ? (() => {
                    const children = node.children.slice(0);
                    children.splice(index, 1);
                    return children;
                })() : node.children.map((node) => core(node))
            });
        }

        return Object.assign({}, node);
    };

    return core(tree);
};

export const editNode = (tree, targetNode) => {
    const core = (node) => {
        if (targetNode.id === 'root' && !node.id || node.id === targetNode.id) {
            return Object.assign({}, node, Array.isArray(node.children) ? {children: node.children.slice(0)} : {}, targetNode);
        }
        if (Array.isArray(node.children)) {
            return Object.assign({}, node, {children: node.children.map((node) => core(node))});
        }
        return Object.assign({}, node);
    };

    return core(tree);
};
