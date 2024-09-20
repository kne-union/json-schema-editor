import {Col, Row, Select, Typography} from "antd";
import React from "react";

const BooleanSetting = () => {
    return <Row gutter={[8, 8]}>
        <Col span={12}>
            <Typography>默认值</Typography>
            <Select size="small" placeholder="默认值"
                    options={[{label: 'true', value: true}, {label: 'false', value: false}]}/>
        </Col>
        <Col span={12}>
            <Typography>行为</Typography>
            <Select size="small" value="" options={[{label: 'Read/Write', value: ''}, {
                label: 'Read Only', value: 'readOnly'
            }, {label: 'Write Only', value: 'writeOnly'}]}/>
        </Col>
    </Row>
};

export default BooleanSetting;
