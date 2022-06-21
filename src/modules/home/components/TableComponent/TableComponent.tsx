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

    function timeConverter(UNIX_timestamp: number){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + ' ' + month + ' ' + year;

        return time;
      }

      const fomatMoney = (currency: number, type: string) => {
        return (currency).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        }); 
      }

    return (
        <tr>
            <td className={index}>{status}</td>
            <td>
                <Moment format='MMMM Do YYYY'>{timeConverter(date)}</Moment>
            </td>
            <td>{client}</td>
            <td>{currency}</td>
            <td>{fomatMoney(total, currency).slice(1, fomatMoney(total, currency).length)}</td>
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