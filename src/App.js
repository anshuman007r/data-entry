import './App.css';
import Table from 'react-bootstrap/Table'
import { Component } from 'react'
import tableStore from './storage/store'
import { addData, deleteData } from './storage/action'

class App extends Component{

  state={
    list:[],
    data:{}
  }

  componentDidMount(){
    this.updateListData()
    tableStore.addChangeListener(this.updateListData)
  }

  componentWillUnmount(){
    tableStore.removeChangeListener(this.updateListData)
  }

  updateListData=()=>{
    let list = tableStore.getTableData()
    console.log(list)
    this.setState({
      list
    })
  }

  updateData =(event)=>{
    const { name, value } = event.target
    let data = this.state.data
    data[name] = value
    this.setState({
      data
    })
    console.log(data)
  }

  sentDataToStore = () =>{
    let { data } = this.state
    console.log('Hello',data)
    addData(data)
    this.setState({
      data : {}
    })
  }

  checkValidStatus = () =>{
    let { data } = this.state
    if(data && data.name && data.designation && data.company && data.location){
      return false
    }else{
      return true
    }
  }

  clearData =() =>{
      this.setState({
        data:{}
      })
  }

  delete = (index) =>{
    console.log(index)
    deleteData(index)
  }

  render(){
    const { data } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Data entry</h1>
          <form onSubmit={event => {event.preventDefault(); this.sentDataToStore() }} style={{marginLeft:'20px',paddingLeft:'20px', marginTop:'10vh', alignSelf:'flex-start'}}>
          <legend style={{color:'#d3d3d3',marginBottom :'20px'}}>Please enter the following detail:</legend>
          <div style={{marginTop:'20px'}}>
            Name :<input name='name' onChange={this.updateData} type='text' style={{marginLeft:'170px'}} value={data && data.name ? data.name : ''}/>
          </div>
          <div style={{marginTop:'20px'}}>
            Designation :<input name='designation' onChange={this.updateData} type='text' value={data && data.designation ? data.designation : ''} style={{marginLeft:'110px'}}/>
          </div>
          <div style={{marginTop:'20px'}}>
            Organisation Name : <input type='text' name ='company' onChange={this.updateData} value={data && data.company ? data.company : ''} style={{marginLeft:'30px'}}/>
          </div>
          <div style={{marginTop:'20px'}}>
            Location : <input type='text' name='location' onChange={this.updateData} value={data && data.location ? data.location : ''} style={{marginLeft:'135px'}}/>
          </div>
          <div style={{marginTop:"20px"}}>
            <input type='reset' onClick={this.clearData} name='clear' style={{marginLeft:'50px',  backgroundColor:'black',color:'GrayText'}}/>
            <button   style={{marginLeft:'50px',  backgroundColor:'black',color:'GrayText'}}>Submit</button>
          </div>  
        </form>
        { this.state.list && this.state.list.length > 0 && 
              <div style={{width : '100%'}}>
                <label style={{alignSelf:'flex-start', marginTop : '40px', marginLeft:'10px', fontSize : '35px'}}>
                  Data entered
                </label>
                <Table striped bordered hover variant="dark" style={{marginTop :'20px'}}>
                  <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Company</th>
                        <th>Location</th>             
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.list.map((item, index)=>(
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.designation}</td>
                          <td>{item.company}</td>
                          <td>{item.location}</td>
                          <td onClick={()=>this.delete(index)} style={{textDecoration:'underline', color :'red', fontFamily:'WorkSans-Regular'}}>Delete</td>
                        </tr>
                        ))
                      }
          
                    </tbody>
                  </Table>
              </div>
        }

          {/* <Alert/> */}
        </header>
      </div>
    );
  }
}

export default App;
