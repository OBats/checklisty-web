import React, {Component} from 'react'
import checkListData from './simpleData'
class ShowCheckList extends Component{
    state={checkList: null, loading: true}

    componentDidMount(){
        setTimeout(() => {
            const getId = parseInt(this.props.match.params.id, 10);
            const found = checkListData.find(checkListType => checkListType.id === getId);
            this.setState({
                checkList: found,
                loading: false
            })
          }, 2000);
    }
    render(){
        const {checkList, loading} = this.state;
       if(loading){
           return(
               <h1>Loading</h1>
           )
       }else if(!checkList){
           return(
               <div>Check list not found</div>
           )
       }else {
       return(
           <div>
               <h1>Here will be {checkList.title} check list</h1>
           </div>
       )
    }
    }
}


export default ShowCheckList;
