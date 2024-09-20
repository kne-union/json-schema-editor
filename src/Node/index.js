import React from 'react';
import {Input, Button, Select, Popover} from 'antd';
import {appendNode, removeNode, editNode} from '../treeUtil';
import classnames from 'classnames';
import {PlusCircleOutlined, MinusCircleOutlined, SettingOutlined, HolderOutlined} from '@ant-design/icons';
import typeOptions from './typeOptions';
import AdvancedSetting from './AdvancedSetting';
import typeOnChange from './typeOnChange';
import style from './style.module.scss';

const Node = (props) => {
    const {id, name, type, mock, hasMock, isSystem, cname, description, level, onChange} = Object.assign({}, {
        hasMock: false, isSystem: false, level: 0
    }, props);
    return <div className={style['node']}>
        <div className={style['node-field-input']}>
            <div className={classnames(style['node-row-name'])}>
                <p style={{width: `${(level + 1) * 16}px`}}></p>
                <HolderOutlined className={style['node-move-handler']}/>
                <div className={style['node-expand-icon']}></div>
                <div className={classnames(style['node-field'], style['node-name-outer'])}>
                    <div className={classnames(style['node-name'], style['node-field'])}>
                        {isSystem ? <span className={style['node-name-system']}>{name}</span> :
                            <Input size="small" type="text" value={name} onChange={(e) => {
                                onChange((value) => editNode(value, {id, name: e.target.value}));
                            }} placeholder="字段名"/>}
                    </div>
                </div>
            </div>
            <div className={classnames(style['node-type'], style['node-field'])}>
                <Select size="small" variant="borderless" popupMatchSelectWidth={false} value={type}
                        onChange={(targetValue) => {
                            onChange(typeOnChange({type: targetValue, id}));
                        }} options={typeOptions} labelRender={({value}) => value}/>
                <Popover content={<AdvancedSetting {...props}/>} trigger="click" placement="right">
                    <Button icon={<SettingOutlined/>} size="small" type="text" shape="circle" title="高级设置"/>
                </Popover>
            </div>
            {hasMock && <div className={classnames(style['node-mock'], style['node-field'])}>
                <Input size="small" type="text" disabled={['object', 'array', 'null', 'any'].indexOf(type) > -1}
                       value={mock}
                       onChange={() => {
                       }} placeholder="Mock"/>
            </div>}
            <div className={classnames(style['node-cname'], style['node-field'])}>
                <Input size="small" type="text" value={cname} placeholder="中文名" onChange={(e) => {
                    onChange((value) => editNode(value, {id, cname: e.target.value}));
                }}/>
            </div>
            <div className={classnames(style['node-description'], style['node-field'])}>
                <Input.TextArea size="small" placeholder="说明" rows={1} autoSize onChange={(e) => {
                    onChange((value) => editNode(value, {id, description: e.target.value}));
                }}>{description}</Input.TextArea>
            </div>
        </div>
        <div className={classnames(style['node-options'], style['node-field'])}>
            {type === 'object' ? <>
                <Button size="small" type="text" icon={<PlusCircleOutlined/>} shape="circle" onClick={() => {
                    onChange((value) => appendNode(value, {id}));
                }}/>
                {id !== 'root' ?
                    <Button size="small" type="text" icon={<MinusCircleOutlined/>} shape="circle" onClick={() => {
                        onChange((value) => removeNode(value, id));
                    }}/> : null}
            </> : null}
        </div>
    </div>
};

export default Node;
