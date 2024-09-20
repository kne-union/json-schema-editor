import {Col, Flex, InputNumber, Row, Select, Switch, Typography} from "antd";
import style from "../style.module.scss";
import React from "react";
import {editNode} from "../../treeUtil";
import BehaviorItem from './BehaviorItem';

const ArraySetting = (props) => {
    const {id, setting, onChange} = props;
    return <Flex className={style['advanced-setting-panel']} vertical gap={8}>
        <Row gutter={[8, 8]}>
            <Col span={12}>
                <Typography>最小元素个数</Typography>
                <InputNumber size="small" placeholder=">=0" value={setting?.minItems} onChange={(targetValue) => {
                    onChange((value) => editNode(value, {
                        id, setting: Object.assign({}, setting, {minItems: targetValue})
                    }));
                }}/>
            </Col>
            <Col span={12}>
                <Typography>最大元素个数</Typography>
                <InputNumber size="small" placeholder=">=0" value={setting?.maxItems} onChange={(targetValue) => {
                    onChange((value) => editNode(value, {
                        id, setting: Object.assign({}, setting, {maxItems: targetValue})
                    }));
                }}/>
            </Col>
            <Col span={12}>
                <Typography>所有元素必须唯一</Typography>
                <Switch size="small" checked={setting?.uniqueItems} onChange={(targetValue) => {
                    onChange((value) => editNode(value, {
                        id, setting: (() => {
                            const output = Object.assign({}, setting);
                            if (targetValue) {
                                output.uniqueItems = true;
                            } else {
                                delete output.uniqueItems;
                            }
                            return output;
                        })()
                    }));
                }}/>
            </Col>
            <Col span={12}>
                <BehaviorItem {...props}/>
            </Col>
        </Row>
    </Flex>
};

export default ArraySetting;
