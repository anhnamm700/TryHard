import React from 'react';

interface Props {
    title: string,
    data: any[],
    type: string,
    search?: boolean,
    onChange: (e: any, type: string) => any
}

const SelecComponent = (props: Props) => {
    const { title, data, type, search, onChange } = props;


    return (
        <select name="" id="" onChange={(e) => onChange(e, type)}>
            <option selected={!search ? true : false} disabled>{title}</option>

            {
                data?.map((item: any, index: number) => (
                    <option key={index} value={item}>{item}</option>
                ))
            }
        </select>
    );
}

export default SelecComponent;