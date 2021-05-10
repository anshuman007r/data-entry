import AppDispatcher from './dispatcher'

export const addData = (data)=>{
    AppDispatcher.handleAction({
        actionType : 'ADD_DATA_TO_TABLE',
        data
    })   
}

export const deleteData = (index) =>{
    AppDispatcher.handleAction({
        actionType : 'DELETE_DATA_FROM_TABLE',
        index 
    })
}