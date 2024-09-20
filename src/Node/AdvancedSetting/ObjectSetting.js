import {Col, Divider, Flex, InputNumber, Row, Select, Typography} from "antd";
import style from "../style.module.scss";
import {basicOptions} from "../typeOptions";
import React from "react";
import {editNode} from '../../treeUtil';
import BehaviorItem from './BehaviorItem';

const ObjectSetting = (props) => {
    const {id, setting, onChange} = props;
    return <Flex className={style['advanced-setting-panel']} vertical gap={8}>
        <Row gutter={[8, 8]}>
            <Col span={12}>
                <Typography>最小属性数量</Typography>
                <InputNumber size="small" placeholder=">=0" value={setting?.minProperties} onChange={(targetValue) => {
                    onChange((value) => editNode(value, {
                        id, setting: Object.assign({}, setting, {minProperties: targetValue})
                    }));
                }}/>
            </Col>
            <Col span={12}>
                <Typography>最大属性数量</Typography>
                <InputNumber size="small" placeholder=">=0" value={setting?.maxProperties} onChange={(targetValue) => {
                    onChange((value) => editNode(value, {
                        id, setting: Object.assign({}, setting, {maxProperties: targetValue})
                    }));
                }}/>
            </Col>
            <Col span={12}>
                <BehaviorItem {...props}/>
            </Col>
        </Row>
        <Divider style={{margin: '0'}}/>
        <Row gutter={[8, 8]}>
            <Col span={12}>
                <Typography>额外字段 (HashMap)</Typography>
                <Select size="small" value={(() => {
                    if (setting?.additionalProperties === false) {
                        return 'notAllow';
                    }
                    if (setting?.additionalProperties) {
                        return 'allow';
                    }
                    return '';
                })()} options={[{label: '未配置', value: ''}, {label: '允许', value: 'allow'}, {
                    label: '禁止', value: 'notAllow'
                }]} onChange={(targetValue) => {
                    onChange((value) => editNode(value, {
                        id, setting: (() => {
                            const output = Object.assign({}, setting);
                            if (targetValue === 'allow') {
                                output.additionalProperties = true;
                                return output;
                            }
                            if (targetValue === 'notAllow') {
                                output.additionalProperties = false;
                                return output;
                            }
                            delete output.additionalProperties;
                            return output;
                        })()
                    }));
                }}/>
            </Col>
            {!!setting?.additionalProperties && <Col span={12}>
                <Typography>字段值得类型</Typography>
                <Select size="small" options={basicOptions} value={(() => {
                    if (typeof setting?.additionalProperties === 'object' && setting?.additionalProperties?.type) {
                        return setting?.additionalProperties?.type;
                    }

                    return 'any';
                })()} onChange={(targetValue) => {
                    onChange((value) => editNode(value, {
                        id, setting: Object.assign({}, setting, {additionalProperties: {type: targetValue}})
                    }));
                }}/>
            </Col>}
        </Row>
    </Flex>
};

export default ObjectSetting;
