import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import FilterComponent from '../components/FilterComponent';
import TableComponent from '../components/TableComponent';
import { DeleteComponent, InfoComponent } from '../components/ModalComponent';
import { addRow, searchData, deleteRow } from '../../../redux/slice';
import './style.scss';

const HomePage = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<boolean>(false);
  const [modal, setModal] = React.useState<boolean>(false);
  const [info, setInfo] = React.useState<boolean>(false);
  const [id, setId] = React.useState<string>('');
  const [value, setValue] = React.useState<object>({});

  const data = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const { transactions, searchs } = data;
  

  React.useEffect(() => {
    setLoading(true);

      axios
      .get('https://62ad1db69fa81d00a7bd4d8d.mockapi.io/api/v1/transactions')
      .then(res => dispatch(addRow(res.data)))

    setLoading(false);
  }, [dispatch]);

  const handleDataSearch = (status: string, client: string, from: number, to: number, invoice: string) => {
    if (status || client || from || to || invoice) {
      const searchDatas = {
        status,
        client,
        from,
        to,
        invoice
      }
      
  
      dispatch(searchData(searchDatas));
      setSearch(true);
    }
  }

  const handleClearData = () => {
    setSearch(false);
  }

  const handleDeleteClick = (id: string) => {
    setId(id);
    setModal(true);
  }

//   transactions.forEach((item: any) => {
//     console.log(item.id)
//     console.log('---')
    
// })

  const handleChange = (e: any, id: any) => {
    if (e.target.value === 'Xem chi tiết') {
        setInfo(true);
        setId(id);
          
    }
  }

  React.useEffect(() => {
    if (id) {
      setLoading(true);

      transactions?.forEach((item: any) => (
        setValue(item)
      ))

      setLoading(false);
    }
  }, [id]);

  const handleConfirmDelete = () => {
    if (id) {
      dispatch(deleteRow(id));
      setModal(false);
    }
  }

  return (
    <div>
      <FilterComponent 
        data={data} 
        getDataSearch={handleDataSearch}
        getClearData={handleClearData}
        search={search}
      />

      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Date</th>
            <th>Client</th>
            <th>Currency</th>
            <th>Total</th>
            <th>Invoice</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {
            (search ? searchs : transactions)?.map((item: any, index: number) => (
              <TableComponent
                key={index}
                id={item.id}
                status={item.status}
                date={item.createdAt}
                client={item.client}
                currency={item.currentcy}
                total={item.total}
                invoice={item.invoice}
                onDeleteClick={handleDeleteClick}
                onChange={handleChange}
              />
            ))
          }
        </tbody>
      </table>

      {
        modal && 
        
        <DeleteComponent
          show={modal}
          onClose={() => setModal(false)}
          onConfirm={handleConfirmDelete}
        />
      }

      {
        info && 

        <InfoComponent
          show={info}
          data={value}
          onClose={() => setInfo(false)}
        />
      }
      
    </div>
  );
};

export default HomePage;
