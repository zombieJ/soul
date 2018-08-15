import React from 'react';
import { Input, InputNumber, Select } from 'antd';

export interface BasicProps {
  name: string;
  onChange: (name: string, value: any) => void;
}

export interface numberType {
  type: 'number';
  value: number;
  list?: Array<number>;
}

export interface stringType {
  type: 'string';
  value: string;
  list?: Array<string>;
}

export type FieldProps = BasicProps & (numberType | stringType);

class Field extends React.Component<FieldProps, any> {
  onChange = ({ target: { value } }: { target: { value: any } }) => {
    this.onValueChange(value);
  };

  onValueChange = (value: any) => {
    const { name, onChange } = this.props;
    onChange(name, value);
  };

  getInput = () => {
    const { type, value, list }: FieldProps = this.props;

    if (type === 'number') {
      return (
        <InputNumber
          value={value as number}
          onChange={this.onValueChange}
        />
      );
    }

    if (type === 'string' && list) {
      return (
        <Select
          value={value}
          onChange={this.onValueChange}
        >
          {(list as Array<string>).map(item => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      );
    }

    return (
      <Input
        value={value}
        onChange={this.onChange}
      />
    );
  };

  render() {
    const { name } = this.props;

    return (
      <label>
        {name}:
        {this.getInput()}
      </label>
    );
  }
}

export default Field;