import React from 'react';

import style from './style.module.scss';

interface Props {
    totalPage: number,
    perPage: number,
    totalRow: number,
    onClick:(e: any) => void
}

const PanigationComponent = (props: Props) => {
    const { totalPage, perPage, totalRow, onClick } = props;

    const number: number[] = [];

    for (let i = 1; i <= totalPage; i++) {
        number.push(i);
    }

    return (
        <div className={style.wrapper}>
            {number?.map((item: number) => (
                <span className={style.number} onClick={onClick}>{item}</span>
            ))}
        </div>
    );
}

export default PanigationComponent;