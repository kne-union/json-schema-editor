export const basicOptions = [{
    value: 'string', label: 'string'
}, {
    value: 'integer', label: 'integer'
}, {
    value: 'boolean', label: 'boolean'
}, {
    value: 'array', label: 'array'
}, {
    value: 'object', label: 'object'
}, {
    value: 'number', label: 'number'
}, {
    value: 'null', label: 'null'
}, {
    value: 'any', label: 'any'
}];

const typeOptions = [...basicOptions, {
    title: '组合模式',
    label: '组合模式',
    options: [{value: 'allOf', label: 'AND(与)'}, {value: 'anyOf', label: 'OR(或)'}, {
        value: 'oneOf', label: 'XOR(异或)'
    }]
}];

export default typeOptions;
