import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import FilterComponent from '../components/FilterComponent';
import TableComponent from '../components/TableComponent';
import PanigationComponent from '../components/PanigationComponent';
import { DeleteComponent, InfoComponent } from '../components/ModalComponent';
import { addRow, searchData, deleteRow } from '../../../redux/slice';
import './style.scss';

const HomePage = () => {
 

  const [loading, setLoading] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<boolean>(false);
  const [modal, setModal] = React.useState<boolean>(false);
  const [info, setInfo] = React.useState<boolean>(false);
  const [id, setId] = React.useState<string>('');
  const [target, setTarget] = React.useState<any>('');
  const [value, setValue] = React.useState<object>({});
  const paniRef = React.useRef<any>(null);

  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const data = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const { transactions, searchs } = data;

  
  const perPage = 6;
  const totalRow = search ? searchs.length : transactions.length;
  paniRef.current = {
    page: 1
  }
  
  const totalPage = Math.ceil(totalRow / perPage);

  const currentPageNumber = (currentPage * perPage) - perPage;



  const panigationSearchPosts = [...searchs]?.splice(currentPageNumber, perPage);
  const panigationAllPosts = [...transactions].splice(currentPageNumber, perPage)
  
  // console.log(currentPageNumber + ' == ' + perPage);
  // console.log([...transactions].splice(0, 6));
  
  

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

  const handleChange = React.useCallback((e: any, id: any) => {
    if (e.target.value === 'Xem chi tiết') {
      setInfo(true);
      setId(id);
      setTarget(id);
    }
  }, []);

  React.useEffect(() => {
    if (id) {
      setLoading(true);

      transactions?.forEach((item: any) => {
        if (item.id === id) {
          setValue(item)
        }
      })

      // setValue(transactions[id]);1

      setLoading(false);
    }
  }, [id]);


  const handleConfirmDelete = () => {
    if (id) {
      dispatch(deleteRow(id));
      setModal(false);
    }
  }

  const handlePanigate = (e: any) => {
    setCurrentPage(Number(e.target.textContent));
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
            (search ? panigationSearchPosts : panigationAllPosts)?.map((item: any, index: number) => (
              <TableComponent
                key={index}
                id={item.id}
                status={item.status}
                date={item.createdAt}
                client={item.client}
                currency={item.currentcy}
                selected={(target === item.id) ? true : false}
                total={item.total}
                invoice={item.invoice}
                onDeleteClick={handleDeleteClick}
                onChange={handleChange}
              />
            ))
          }
        </tbody>
      </table>

      <PanigationComponent
        totalPage={totalPage}
        perPage={perPage}
        totalRow={totalRow}
        onClick={handlePanigate}
      />

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
          onClose={() => {
            setInfo(false)
            setTarget('');
          }}
        />
      }
      
    </div>
  );
};

export default HomePage;
