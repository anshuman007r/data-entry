import { EventEmitter } from 'events'
import AppDispatcher from './dispatcher'
import merge from 'merge'

let tableList = []

function addData (data){
    tableList.push(data)
}

function deleteData(index){
    tableList.splice(index,1)
}

var tableStore = merge(EventEmitter.prototype, {

  getTableData: function() {
    return tableList;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

AppDispatcher.register((payload)=>{
    let action = payload.action
    switch(action.actionType){
        case 'ADD_DATA_TO_TABLE':
            addData(action.data)
            tableStore.emitChange()
            break;
        case 'DELETE_DATA_FROM_TABLE':  
            deleteData(action.index)
            tableStore.emitChange()
            break;
        default :
            return true
    }
})

export default tableStore