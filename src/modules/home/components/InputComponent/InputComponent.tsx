import React from 'react';

import './style.scss';

interface Props {
    type: string,
    icon: string,
    placeholder: string,
    disabled?: boolean,
    value?: any,
    min?: any,
    max?: any,
    search?: boolean,
    onChange: (e: any, type: any) => void
}

const InputComponent = (props: Props) => {
    const { type, icon, placeholder, disabled, min, max, value, search, onChange } = props;

    let time;

    if (value && (min || max)) {
        time = new Date(value).toISOString().slice(0, 10); 
    }
    
    

    return (
        <div className='wrapper'>
            <input
                className='input'
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                min={min}
                max={max}
                value={(min || max) ? time : value}
                onChange={(e) => onChange(e, placeholder)}
            />
            
            <span className='icon'>{icon}</span>
        </div>
    );
}

export default InputComponent;