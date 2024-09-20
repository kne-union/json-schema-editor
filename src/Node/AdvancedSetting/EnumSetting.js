import {Col, Flex, Row, Switch, Typography} from "antd";
import React from "react";

const EnumSetting = (props) => {
    return <Row gutter={8}>
        <Col>
            <Flex align="center" gap={8}>
                <Typography>枚举</Typography>
                <Switch size="small"/>
            </Flex>
        </Col>
        <Col flex={1}>
            <Flex align="center" gap={8}>
                <Typography>常量</Typography>
                <Switch size="small"/>
            </Flex>
        </Col>
    </Row>
};

export default EnumSetting;
