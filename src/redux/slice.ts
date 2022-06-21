import { createSlice } from '@reduxjs/toolkit';

const initState = {
    statuss: [],
    clients: [],
    transactions: [],
    searchs: []
}


const tableSlice = createSlice({
    name: 'table',
    initialState: initState,
    reducers: {
        addRow: (state: any, action: any) => {
            action.payload.forEach((item: any, index: number) => {
                if (!state.statuss.includes(item.status)) {
                    state.statuss.push(item.status);
                }

                if (!state.clients.includes(item.client)) {
                    state.clients.push(item.client);
                }
            })


            state.transactions = [...state.transactions, ...action.payload]
        },
        searchData: (state: any, action: any) => {
            const { status, client, from, to, invoice } = action.payload;
            
            const data: any = state.transactions.filter((item: any) => {
                
                if (status || client || from || to || invoice) {
                    if (status && client && from && to && invoice) {
                        return (
                            item.status === status
                            && item.client === client
                            && item.invoice === invoice
                            && item.createdAt >= from
                            && item.createdAt <= to
                        );
                    }

                    if (status && client && from && to) {
                        return (
                            item.status === status
                            && item.client === client
                            && item.createdAt >= from
                            && item.createdAt <= to
                        );
                    }

                    if (status && client && from && invoice) {
                        return (
                            item.status === status
                            && item.client === client
                            && item.createdAt >= from
                            && item.invoice === invoice
                        );
                    }

                    if (status && client && to && invoice) {
                        return (
                            item.status === status
                            && item.client === client
                            && item.createdAt <= to
                            && item.invoice === invoice
                        );
                    }

                    if (status && from && to && invoice) {
                        return (
                            item.status === status
                            && item.createdAt >= from
                            && item.createdAt <= to
                            && item.invoice === invoice
                        );
                    }

                    if (status && client && from && invoice) {
                        return (
                            item.status === status
                            && item.createdAt >= from
                            && item.client === client
                            && item.invoice === invoice
                        );
                    }

                    // if (status && client && to && invoice) {
                    //     return (
                    //         item.status === status
                    //         && item.createdAt <= to
                    //         && item.client === client
                    //         && item.invoice === invoice
                    //     );
                    // }

                    if (status && client && from) {
                        return (
                            item.status === status
                            && item.createdAt >= from
                            && item.client === client
                        );
                    }

                    if (status && client && to) {
                        return (
                            item.status === status
                            && item.createdAt <= to
                            && item.client === client
                        );
                    }

                    if (status && client && invoice) {
                        return (
                            item.status === status
                            && item.invoice === invoice
                            && item.client === client
                        );
                    }

                    if (status && from && to) {
                        return (
                            item.status === status
                            && item.createdAt >= from
                            && item.client <= to
                        );
                    }

                    if (status && from && invoice) {
                        return (
                            item.status === status
                            && item.createdAt >= from
                            && item.invoice === invoice
                        );
                    }

                    if (status && to && invoice) {
                        return (
                            item.status === status
                            && item.createdAt <= to
                            && item.invoice === invoice
                        );
                    }

                    if (status && client) {
                        return (
                            item.status === status
                            && item.client === client
                        );
                    }

                    if (status && from) {
                        return (
                            item.status === status
                            && item.createdAt <= from
                        );
                    }

                    if (status && to) {
                        return (
                            item.status === status
                            && item.createdAt >= to
                        );
                    }

                    if (status && invoice) {
                        return (
                            item.status === status
                            && item.invoice === invoice
                        );
                    }

                    if (status) {
                        return (
                            item.status === status
                        )
                    }

                    if (client && from && to && invoice) {
                        return (
                            item.invoice === invoice
                            && item.client === client
                            && item.createdAt >= from 
                            && item.createdAt <= to
                        );
                    }

                    if (client && from && to) {
                        return (
                            item.client === client
                            && item.createdAt >= from 
                            && item.createdAt <= to
                        );
                    }

                    if (client && from && invoice) {
                        return (
                            item.client === client
                            && item.createdAt >= from 
                            && item.invoice === invoice
                        );
                    }

                    if (client && to && invoice) {
                        return (
                            item.client === client
                            && item.createdAt <= to
                            && item.invoice === invoice
                        );
                    }

                    if (client) {
                        return (
                            item.client === client
                        );
                    }

                    if (from && to && invoice) {
                        return (
                            item.createdAt >= from
                            && item.createdAt <= to
                            && item.invoice === invoice
                        );
                    }

                    if (from && invoice) {
                        return (
                            item.createdAt >= from
                            && item.invoice === invoice
                        );
                    }

                    if (from && to) {
                        return (
                            item.createdAt >= from
                            && item.createdAt <= to
                        );
                    }

                    if (from) {
                        return item.createdAt >= from;
                    }

                    if (to && invoice) {
                        return (
                            item.invoice === invoice
                            && item.createdAt <= to
                        );
                    }

                    if (to) {
                        return item.createdAt <= to
                    }

                    if (invoice) {
                        return item.invoice === invoice
                    }
                }
            })

            state.searchs = [...data];
            
        },
        deleteRow: (state: any, action: any) => {
            const indexTrans = Number(action.payload);
            
            state.transactions.splice(indexTrans, 1);
            
            state.transactions = [...state.transactions];
        }
    }
});

const { actions, reducer } = tableSlice;

export const { addRow, searchData, deleteRow } = actions;

export default reducer;