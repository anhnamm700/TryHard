import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import { searchData, addRow } from '../../../../redux/slice';
import InputComponent from "../InputComponent";
import SelecComponent from "../SelectComponent";
import ButtonComponent from "../ButtonComponent";
import './style.scss';

interface Props {
    data: any,
    search: boolean,
    getDataSearch: (status: string, client: string, from: number, to: number, invoice: string) => void,
    getClearData: () => void
}

const FilterComponent = (props: Props) => {
    const { data, search, getDataSearch, getClearData } = props;
    const [from, setFrom] = React.useState<any>(0);
    const [to, setTo] = React.useState<any>(0);
    const [invoice, setInvoice] = React.useState<any>('');
    const [status, setStatus] = React.useState<any>(null);
    const [client, setClient] = React.useState<any>(null);
    const [input, setInput] = React.useState<any>(0);
    // const [max, setMax] = React.useState<any>(0);
    const [disabled, setDisabled] = React.useState<boolean>(false);

    const { statuss, clients } = data;
    
    const handleChange = (e: any, type: string) => {
        const date = new Date(e.target.value);

        switch (type) {
            case 'From':
                setFrom(date.getTime());
                break;

            case 'To':
                setTo(date.getTime());
                break;

            case 'Invoice':
                setInvoice(e.target.value);
                break;
        }
    }

    

    React.useEffect(() => {
        if (from !== 0 || to !== 0) {
            if (from) {
                setInput(new Date(from + (3600 * 1000 * 24)).toISOString().slice(0, 10));
            } 
            
            if (to) {
                setInput(new Date(to - (3600 * 1000 * 24)).toISOString().slice(0, 10));
            }
        }
    }, [to, from]);


    React.useEffect(() => {
        if (!status && !client && !from && !to && !invoice && !search) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [status, client, from, to, invoice, search]);

    const handleSelectChange = (e: any, type: string) => {
        const value = e.target.value;

        switch (type) {
            case 'status': 
                setStatus(value);
                break;

            case 'client':
                setClient(value);
                break;
        }
    }

    React.useEffect(() => {
        if (!search) {
            setFrom('');
            setTo('');
            setInvoice('');
            setDisabled(true);
            setClient('');
            setStatus('');
        }
    }, [search]);


    return (
        <div className="wrapper">
            <SelecComponent
                title="Status"
                data={statuss}
                type="status"
                search={search}
                selected={!!status}
                onChange={handleSelectChange}
            />

            <SelecComponent
                title="Client"
                data={clients}
                type="client"
                search={search}
                selected={!!client}
                onChange={handleSelectChange}
            />

            <InputComponent
                type="date"
                placeholder="From"
                icon=""
                search={search}
                value={from}
                onChange={handleChange}
                max={input}
            />

            <InputComponent
                type="date"
                placeholder="To"
                icon=""
                value={to}
                onChange={handleChange}
                min={input}
            />

            <InputComponent
                type="text"
                placeholder="Invoice"
                icon=""
                value={invoice}
                onChange={handleChange}
            />

            <ButtonComponent
                className="apply"
                title="Apply"
                icon=""
                disabled={disabled}
                onClick={() => getDataSearch(status, client, from, to, invoice)}
            />

            <ButtonComponent
                className="clear"
                title="Clear"
                icon=""
                onClick={getClearData}
            />
        </div>
    );
}

export default FilterComponent;