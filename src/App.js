import   './App.css';
import Table from 'react-bootstrap/Table'
import { Component } from 'react'
import tableStore from './storage/store'
import { addData, deleteData } from './storage/action'

class App extends Component {

  state = {
    list: [],
    data: {}
  }

  componentDidMount() {
    this.updateListData()
    tableStore.addChangeListener(this.updateListData)
  }

  componentWillUnmount() {
    tableStore.removeChangeListener(this.updateListData)
  }

  updateListData = () => {
    let list = tableStore.getTableData()
    console.log(list)
    this.setState({
      list
    })
  }

  updateData = (event) => {
    const { name, value } = event.target
    let data = this.state.data
    data[name] = value
    this.setState({
      data
    })
    console.log(data)
  }

  sentDataToStore = () => {
    let { data } = this.state
    console.log('Hello', data)
    addData(data)
    this.setState({
      data: {}
    })
  }

  checkValidStatus = () => {
    let { data } = this.state
    if (data && data.name && data.designation && data.company && data.location) {
      return false
    } else {
      return true
    }
  }

  clearData = () => {
    this.setState({
      data: {}
    })
  }

  delete = (index) => {
    console.log(index)
    deleteData(index)
  }

  render() {
    const { data } = this.state
    return (
      <div className="App App-header">
        <div className="mt-5 mb-5">
        <h1  className="ui-sans-serif">Welcome to Data entry</h1>
        </div>
          <p className="mb-5 ui-sans-serif" style={{color:'#d3d3d3',alignSelf:'flex-start',marginLeft:'70px'}}>Please enter the following detail:</p>
        <form  onSubmit={event => {event.preventDefault(); this.sentDataToStore() }}  style={{width:'60%', alignSelf:'flex-start',marginLeft:'70px'}}>
          <div class="form-group row">
            <label  class="col-sm-2 col-form-label ui-sans-serif">Name:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control"  onChange={this.updateData} name='name'
              value={data && data.name ? data.name : ''} />
            </div>
          </div>
          <div class="form-group row mt-3 ">
            <label  class="col-sm-2 col-form-label  ui-sans-serif">Designation:</label>
            <div class="col-sm-10">
              <input type="text" name='designation'  onChange={this.updateData}
              value={data && data.designation ? data.designation : ''} class="form-control"/>
            </div>
          </div>
          <div class="form-group row mt-3">
            <label  class="col-sm-2 col-form-label  ui-sans-serif">Company:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" onChange={this.updateData} value={data && data.company ? data.company : ''}  name ='company'/>
            </div>
          </div>
          <div class="form-group row mt-3 ">
            <label  class="col-sm-2 col-form-label  ui-sans-serif">Location:</label>
            <div class="col-sm-10">
              <input  name='location'  onChange={this.updateData} value={data && data.location ? data.location : ''}  type="text" class="form-control" />
            </div>
          </div>
          <div className="d-flex-row mt-4">
            <input type='reset' className="btn btn-primary ui-sans-serif" onClick={this.clearData} name='clear' style={{ marginLeft: '50px',width:'15%',fontWeight:'400',fontSize:18,
              color: '#fff' }} />
            <button  className="btn btn-secondary ui-sans-serif" style={{ marginLeft: '50px', width:'15%',fontWeight:'400',fontSize:18, backgroundColor:!this.checkValidStatus()? '#000' : '#a3a3a3'  , color: !this.checkValidStatus()? '#fff' : '#000' }}>Submit</button>
          </div> 
        </form>
        { this.state.list && this.state.list.length > 0 &&
          <div style={{ width: '100%', }}>
            <label className=' ui-sans-serif' style={{ alignSelf: 'flex-start', marginTop: '40px', marginLeft: '10px', fontSize: '35px' }}>
              Data entered
                </label>
            <Table striped bordered hover variant="dark" style={{ marginTop: '20px' }}>
              <thead>
                <tr>
                  <th className=' ui-sans-serif'>Id</th>
                  <th className=' ui-sans-serif'>Name</th>
                  <th className=' ui-sans-serif'>Designation</th>
                  <th className=' ui-sans-serif'>Company</th>
                  <th className=' ui-sans-serif' >Location</th>
                  <th className=' ui-sans-serif' >Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.list.map((item, index) => (
                    <tr key={index}>
                      <td className=' ui-sans-serif'>{index + 1}</td>
                      <td className=' ui-sans-serif'>{item.name}</td>
                      <td className=' ui-sans-serif'>{item.designation}</td>
                      <td className=' ui-sans-serif'>{item.company}</td>
                      <td className=' ui-sans-serif'>{item.location}</td>
                      <td onClick={() => this.delete(index)} style={{ textDecoration: 'underline', color: 'red', fontFamily: 'WorkSans-Regular' }}>Delete</td>
                    </tr>
                  ))
                }

              </tbody>
            </Table>
          </div>
        }

      </div>
    );
  }
}

export default App;