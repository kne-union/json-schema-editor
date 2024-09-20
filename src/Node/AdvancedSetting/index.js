import React, {useState} from 'react';
import {Segmented, Flex, Select, Switch, Typography, Row, Col, InputNumber, Divider, Input, AutoComplete} from 'antd';
import typeOptions from '../typeOptions';
import CodeEditor from '@monaco-editor/react';
import style from '../style.module.scss';
import typeOnChange from "../typeOnChange";
import {editNode} from '../../treeUtil';
import nodeDataToSchema from '../nodeDataToSchema';
import ObjectSetting from './ObjectSetting';
import ArraySetting from './ArraySetting';
import StringSetting from './StringSetting';
import NumberSetting from './NumberSetting';
import BooleanSetting from './BooleanSetting';

const AdvancedSetting = (props) => {
    const {id, type, isSystem, description, setting, cname, onChange, children} = Object.assign({}, props);
    const [current, setCurrent] = useState('0');

    return <Flex className={style['advanced-setting']} vertical align="center" gap={8}>
        <Segmented value={current} options={[{label: '数据类型', value: '0'}, {label: 'JSON Schema', value: '1'}]}
                   onChange={setCurrent}/>
        {current === '0' && <Flex className={style['advanced-setting-panel']} vertical gap={8}>
            <Select className={style['advanced-setting-type']} value={type} options={typeOptions}
                    labelRender={({value}) => value} onChange={(targetValue) => {
                onChange(typeOnChange({type: targetValue, id}));
            }}/>
            <Flex className={style['advanced-setting-panel']} gap={8} justify="flex-start">
                {id !== 'root' ? <Flex align="center" gap={8}>
                    <Typography>必须:</Typography>
                    <Switch disabled={isSystem} size="small" checked={setting?.required} onChange={(checked) => {
                        onChange((value) => editNode(value, {
                            id, setting: Object.assign({}, setting, {
                                required: checked
                            })
                        }));
                    }}/>
                </Flex> : null}
                <Flex align="center" gap={8}>
                    <Typography>允许为NULL:</Typography>
                    <Switch disabled={['any', 'null', 'allOf', 'oneOf', 'anyOf'].indexOf(type) > -1} size="small"
                            checked={setting?.allowNull}
                            onChange={(checked) => {
                                onChange((value) => editNode(value, {
                                    id, setting: Object.assign({}, setting, {
                                        allowNull: checked
                                    })
                                }));
                            }}/>
                </Flex>
                <Flex align="center" gap={8}>
                    <Typography>废弃:</Typography>
                    <Switch size="small" checked={setting?.deprecated} onChange={(checked) => {
                        onChange((value) => editNode(value, {
                            id, setting: Object.assign({}, setting, {
                                deprecated: checked
                            })
                        }));
                    }}/>
                </Flex>
            </Flex>
            <Divider style={{margin: '0'}}/>
            {type === 'object' && <ObjectSetting {...props}/>}
            {type === 'array' && <ArraySetting {...props}/>}
            {type === 'string' && <StringSetting {...props}/>}
            {['number', 'integer'].indexOf(type) > -1 && <NumberSetting {...props}/>}
            {type === 'boolean' && <BooleanSetting {...props}/>}
        </Flex>}
        {current === '1' && <Flex vertical gap={8} className={style['advanced-setting-panel']}>
            <CodeEditor height="350px" defaultLanguage="json"
                        defaultValue={JSON.stringify(nodeDataToSchema(props), null, 2)} options={{
                lineNumbers: 'off', minimap: {
                    enabled: false
                }
            }}/>
        </Flex>}
    </Flex>
};

export default AdvancedSetting;
