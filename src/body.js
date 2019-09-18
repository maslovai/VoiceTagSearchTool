import React from 'react';
const file = 'src/source.txt'
class Body extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           currentCategory:'', 
           active:[],
           categories:[],
           commands:[],
           placeholder:'enter command here'
           }, 
        this.findCategory = this.findCategory.bind(this);
        this.findVoiceCommand = this.findVoiceCommand.bind(this);
    }
    componentDidMount(){
        let rawArr =[];
        fetch(file)
        .then(response => {return response.text()})
        .then(data => {
            rawArr = data.split('\n');
            let temp=[];
            for (let i=0,l =rawArr.length;i<l;i++){
                let innerTemp = rawArr[i].split('\|');
                temp.push({'voice':innerTemp[0], 'written':innerTemp[1]})
                if (temp[i].written==='ShowCrossGroupLinks')console.log(temp[i])
            }
            let tempOptions =[];
                tempOptions=temp.map(item=>{let tempItem = item.written.split('.');
                 return tempItem[0]
            })
            let final=['All'];
            tempOptions.map(item=>{if(final.indexOf(item)===-1){final.push(item)}})
            this.setState({
                commands: temp,
                categories:final,
                active:temp
            })
            
        })  
    }
    findCategory(e){
        inputBox.value = '';
        if (e.target.value==="All") {
            this.setState({
                currentCategory: e.target.value,
                active:this.state.commands
            })
        }
        else{
            this.setState({
                currentCategory: e.target.value,
                active : this.state.commands.filter((item)=> {return(item.written.includes(e.target.value+'.'))})    
            })
        }
       
    }
    findVoiceCommand(inputCommand){
        // console.log(this.input.current.value.toUpperCase(), this.state.commands)
            this.setState({
                active : this.state.commands.filter((item)=> 
                { if (this.state.currentCategory==="All") return (item.voice.toUpperCase().includes(inputCommand.toUpperCase()));
                  else return(item.voice.toUpperCase().includes(inputCommand.toUpperCase()))}).filter((command)=>{
                                                    return(command.written.includes(this.state.currentCategory+"."))
                })    
            }) 

    }
    render(){

        return(
            <div>
                <form autoComplete="off">
                    <select name="category" onChange={this.findCategory} value ={this.state.currentCategory}>
                        {
                            this.state.categories.map((opt,i) => 
                            { return(<option id = {i+'choice'} value = {opt} key={i} >{opt}</option>)})
                        }
                    </select>
                    <input type = 'text' id='inputBox' placeholder={this.state.placeholder} onSubmit = {()=>this.findVoiceCommand(inputBox.value)} onChange={()=>this.findVoiceCommand(inputBox.value)}></input>
                </form>
                <table>
                   
                    <thead>
                        <tr> 
                            <td>#</td><td>Written Command</td><td>Voice Command</td>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.active.map((command,i)=>
                     {return (<tr key={i}><td>{i}</td><td>{command.written}</td><td>{command.voice}</td></tr>)})
                    }
                    </tbody>
                </table>
                {/* {
                    this.state.active.map((command,i)=>
                     {return (<div key={i}>{command.written}+ "  " + {command.voice}}</div>)})
                } */}
                {/* <button onClick={this.findVoiceCommand}>Go!</button> */}
            </div>
            

        )
    }
}
export default Body;