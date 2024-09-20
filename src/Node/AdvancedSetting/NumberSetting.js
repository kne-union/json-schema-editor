import {AutoComplete, Col, Flex, Input, InputNumber, Row, Select, Typography} from "antd";
import style from "../style.module.scss";
import EnumSetting from "./EnumSetting";
import React from "react";

const NumberSetting = () => {
    return <Flex className={style['advanced-setting-panel']} vertical gap={8}>
        <EnumSetting/>
        <Row gutter={[8, 8]}>
            <Col span={12}>
                <Typography>format</Typography>
                <AutoComplete size="small" options={[]}/>
            </Col>
            <Col span={12}>
                <Typography>行为</Typography>
                <Select size="small" value="" options={[{label: 'Read/Write', value: ''}, {
                    label: 'Read Only', value: 'readOnly'
                }, {label: 'Write Only', value: 'writeOnly'}]}/>
            </Col>
            <Col span={24}>
                <Typography>默认值</Typography>
                <Input size="small" placeholder="默认值"/>
            </Col>
            <Col span={24}>
                <Typography>示例值</Typography>
                <Input size="small" placeholder="示例值"/>
            </Col>
            <Col span={8}>
                <Typography>最小值</Typography>
                <InputNumber size="small" placeholder=">=0"/>
            </Col>
            <Col span={8}>
                <Typography>最大值</Typography>
                <InputNumber size="small" placeholder=">=0"/>
            </Col>
            <Col span={8}>
                <Typography>倍数</Typography>
                <InputNumber size="small" placeholder=">=0"/>
            </Col>
        </Row>
    </Flex>
};

export default NumberSetting;
