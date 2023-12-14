import React,{Component} from 'react';

class App extends Component{
  state={name:'',pass:'',bol:false,arr:[],editVal:null}


onChangeName=(e)=>{
  this.setState({name:e.target.value})
}
onChangePass=(e)=>{
  this.setState({pass:e.target.value})
}
handlesubmit = (e) => {
  e.preventDefault()

  const{name,pass}=this.state

  let obj = {
      name: name,
      pass: pass
  }
  let adata = []
  adata.push(obj)
  let data = [...adata]
  
  this.setState((preArr)=>({arr:[...preArr.arr,...data]}))
  this.setState({name:''})
  this.setState({pass:''})
}
handledel = (e) => {
  const{arr}=this.state
  arr.map((data,ind)=>{
      if(ind===e){
          arr.splice(e,1)     
      }
      this.setState({arr:[...arr]})
      
  })
}
handlededit=(e,name,pass)=>{
  const{arr}=this.state

  arr.map((item,index)=>{
      
      let obj = {
          name: name,
          pass: pass
      }
      if(index===e){
        this.setState({name:name})
        this.setState({pass:pass})
           
      }
      this.setState({arr:[...arr]})
  })
  this.setState((prev)=>({bol:!prev.bol}))
  this.setState({editVal:e})
}
handleeditsubmit=(e)=>{
  const{arr,editVal,name,pass}=this.state
  arr.map((item,index)=>{
      
    let obj = {
      name: name,
      pass: pass
   }
    
      if(index===editVal){
           item.name=name
           item.pass=pass
          
      }
      this.setState({arr:[...arr]})
      
  })
  this.setState({name:''})
  this.setState({pass:''})
  this.setState((prev)=>({bol:!prev.bol}))
}


  render(){
    const{name,pass,bol,arr,editVal}=this.state
    
    return(
      <div>
        <form>
                name
                <input onChange={this.onChangeName} value={name}/>
                pass
                <input onChange={this.onChangePass} value={pass} />
                <button onClick={this.handlesubmit}>submit</button> 
        </form>
        <table>
                <tbody>
                    {arr.map((data, ind) => (
                        <tr key={ind}>
                            <td>{data.id}</td>
                            <td >{bol?ind===editVal?<input onChange={this.onChangeName} value={name}/>:data.name:data.name}</td>
                            <td >{bol?ind===editVal?<input onChange={this.onChangePass} value={pass} />:data.pass:data.pass}</td>
                            <button onClick={(e) => { this.handledel(ind) }}>del</button>
                            {bol?ind===editVal?<button type="submit" onClick={(e) => { this.handleeditsubmit(ind,data.name,data.pass)}}>Submit</button>:<button type="submit" onClick={(e) => { this.handlededit(ind,data.name,data.pass)}}>Edit</button>:<button type="submit" onClick={(e) => { this.handlededit(ind,data.name,data.pass)}}>Edit</button>}
                        </tr>
                    ))}
                </tbody>
            </table>

        
      </div>
    )
  }
}

export default App