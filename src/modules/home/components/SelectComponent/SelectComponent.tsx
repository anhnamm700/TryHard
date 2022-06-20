import React, { memo } from 'react';

interface Props {
    title: string,
    data: any[],
    type: string,
    search?: boolean,
    id?: any,
    selected?: boolean,
    onChange: (e: any, type: string) => any
}

const SelecComponent = (props: Props) => {
    const { id, title, data, type, selected, onChange } = props;
    
    return (
        <select name="" id={id} onChange={(e) => onChange(e, type)}>
            <option selected={selected ? false : true} disabled>{title}</option>

            {
                data?.map((item: any, index: number) => (
                    <option key={index} value={item}>{item}</option>
                ))
            }
        </select>
    );
}

export default memo(SelecComponent);