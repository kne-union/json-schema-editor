import transform from 'lodash/transform';

const nodeDataToSchema = (nodeData) => {
    const core = (nodeData) => {
        const {type, cname, description, setting, children} = nodeData;
        const output = {};

        const computedType = (() => {
            //计算type;
            if (type === 'null') {
                return type;
            }
            if (type === 'any') {
                return ["string", "integer", "boolean", "array", "object", "number", "null"];
            }

            if (['string', 'integer', 'array', 'object', 'number'].indexOf(type) > -1) {
                return setting?.allowNull ? [type, 'null'] : type;
            }
        })();

        if (computedType) {
            output.type = computedType;
        }

        if (type === 'object' && Array.isArray(children) && children.length > 0) {
            const properties = transform(children, (result, value) => {
                if (value && value['name']) {
                    result[value['name']] = core(value);
                }
            }, {});
            if (Object.keys(properties).length > 0) {
                output.properties = properties;
                const required = Object.keys(properties).filter((name) => {
                    return properties[name].setting?.required;
                });
                if (required.length > 0) {
                    output.required = required;
                }
            }

            ['minProperties', 'maxProperties', 'readOnly', 'writeOnly', 'additionalProperties'].forEach((propName) => {
                if (setting && setting.hasOwnProperty(propName)) {
                    output[propName] = setting[propName];
                }
            });
        }
        if (type === 'array' && Array.isArray(children) && children[0]) {
            output.items = core(children[0]);
            ['minItems', 'maxItems', 'uniqueItems', 'readOnly', 'writeOnly'].forEach((propName) => {
                if (setting && setting.hasOwnProperty(propName)) {
                    output[propName] = setting[propName];
                }
            });
        }

        if (cname) {
            output.title = cname;
        }

        if (description) {
            output.description = description;
        }

        if (setting?.deprecated) {
            output.deprecated = true;
        }

        return output;
    }
    return core(nodeData);
};

export default nodeDataToSchema;
