import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';

import SelectComponent from '../SelectComponent';
import ButtonComponent from '../ButtonComponent';


interface Props {   
    id: any,
    index: any,
    status: string,
    date: number,
    client: string,
    currency: string,
    total: number,
    invoice: string,
    selected?: boolean,
    onDeleteClick: (id: string) => void,
    onChange: (e: any, id: any) => void
}

const TableComponent = (props: Props) => {
    const { id, status, index, date, client, currency, total, invoice, selected, onDeleteClick, onChange } = props;


    return (
        <tr>
            <td className={index}>{status}</td>
            <td>
                <Moment format='MMMM Do YYYY'>{date}</Moment>
            </td>
            <td>{client}</td>
            <td>{currency}</td>
            <td>{total}</td>
            <td>{invoice}</td>
            <td>
                <SelectComponent
                    title='View Detail'
                    data={['Xem chi tiết', 'Khác']}
                    selected={selected}
                    type=''
                    id={id}
                    onChange={(e) => onChange(e, id)}
                />
            </td>

            <td>
                <ButtonComponent
                    className=''
                    title=''
                    icon=''
                    onClick={() => onDeleteClick(index)}
                >
                    <FontAwesomeIcon icon={faTrash}/>
                </ButtonComponent>
            </td>
        </tr>
    );
}

export default TableComponent;