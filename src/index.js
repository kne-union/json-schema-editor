import React from 'react';
import classnames from 'classnames';
import useControlValue from '@kne/use-control-value';
import {ReactSortable} from "react-sortablejs";
import Node from './Node';
import style from './style.module.scss';

const JsonSchemaEditor = (props) => {
    const {className, hasMock, ...others} = Object.assign({}, {
        hasMock: true, defaultValue: {}
    }, props);
    const [value, onChange] = useControlValue(others);

    console.log(value);

    const renderNode = (node) => {
        return <>
            <Node {...Object.assign({}, node)} hasMock={hasMock} onChange={onChange}/>
            {Array.isArray(node.children) && node.children.length > 0 ? <ReactSortable className={style['sort-list']}
                                                                                       list={node.children.map((item) => Object.assign({}, item))}
                                                                                       setList={() => {
                                                                                       }}>{node.children.map((item, index) =>
                <div className={style['sort-item']} key={index}>
                    {renderNode(item)}
                </div>)}</ReactSortable> : null}
        </>
    };

    return <div className={classnames(className, style['json-schema-editor'], 'json-schema-editor')}>
        {renderNode(Object.assign({}, {
            type: 'object', children: []
        }, value, {id: 'root', name: '根节点', isSystem: true, level: 0}))}
    </div>
};

export default JsonSchemaEditor;
