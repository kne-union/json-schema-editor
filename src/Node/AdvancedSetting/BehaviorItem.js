import {Select, Typography} from "antd";
import {editNode} from "../../treeUtil";
import React from "react";

const BehaviorItem = (props) => {
    const {id, setting, onChange} = props;
    return <>
        <Typography>行为</Typography>
        <Select size="small" value={(() => {
            if (setting?.readOnly) {
                return 'readOnly';
            }
            if (setting?.writeOnly) {
                return 'writeOnly';
            }
            return '';
        })()} onChange={(targetValue) => {
            onChange((value) => editNode(value, {
                id, setting: (() => {
                    const output = Object.assign({}, setting);
                    if (targetValue === 'readOnly') {
                        output.readOnly = true;
                        delete output.writeOnly;
                        return output;
                    }
                    if (targetValue === 'writeOnly') {
                        output.writeOnly = true;
                        delete output.readOnly;
                        return output;
                    }
                    delete output.writeOnly;
                    delete output.readOnly;
                    return output;
                })()
            }));
        }} options={[{label: 'Read/Write', value: ''}, {
            label: 'Read Only', value: 'readOnly'
        }, {label: 'Write Only', value: 'writeOnly'}]}/>
    </>
};

export default BehaviorItem;
