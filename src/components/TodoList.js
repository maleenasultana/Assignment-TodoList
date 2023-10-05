
import "../App.css"

// function Todolist(props) {
//   return (
//     <li className="list-item">
//         {props.item}
//         <span className='icons'>
       
//         <i className="fa-solid fa-trash-can icon-delete" 
//         onClick={e=>{
//             props.deleteItem(props.index)
//         }}></i>
//         </span>
//     </li>
//   )
// }

// export default Todolist
import React,{useState,useEffect} from 'react';


const getLocalData =()=>{
    const lists= localStorage.getItem("mytodolist");

    if(lists){
        return JSON.parse(lists);
    }else{
        return[];
    }
};

 const Todo = () => {

   const [inputdata,setInputData]=useState("");
   const [items , setItems]= useState(getLocalData());
   const [isEditItem, setIsEditItem]= useState("");
   const[ toggleButton, setToggleButton]=useState(false);

   //add Item function

   const addItem =()=>{

    if(!inputdata){
        alert("please fill the data");
    }else if(inputdata && toggleButton){
        setItems(
            items.map((curElem)=>{
                if(curElem.id === isEditItem){
                    return{...curElem, name:inputdata};
                }
                return curElem;
            })
        );
        setInputData("");
        setIsEditItem(null);
        setToggleButton(false);
    }else{
        const myNewInputData ={
            id: new Date().getTime().toString(),
            name: inputdata,
        };
        setItems([...items, myNewInputData]);
        setInputData("");
    }
   };

   //edit the item

   const editItem =(index)=>{
    const item_todo_edited = items.find((curElem)=>{
        return curElem.id ===index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
   };

   //how to delete item section

   const deleteItem =(index)=>{
    const updatedItems = items.filter((curElem)=>{
        return curElem.id !==index;
    });
    setItems(updatedItems);
   };

   //remove all the elements

   const removeAll= ()=>{
    setItems([]);
   };

   //adding local storage

   useEffect(()=>{
    localStorage.setItem("mytodolist", JSON.stringify(items));
   },[items]);


  return (
    <>
    <div className='main-div'>
        <div className='child-div'>
    
                
                <h1 className="head"> Your Todo List🪶</h1>
        
            <div className='addItem'>
                <input type="text" placeholder=' Add todo here...'
                className='form-control' 
                value={inputdata} 
                onChange={(event)=> setInputData(event.target.value)}
                /> 
                
                { toggleButton ? (
                   <button className="btn btn-success" onClick={addItem} >Add Todo</button>
                    ):(
                        <i className='fa fa-plus-square' onClick={addItem}></i>
                    )}

                
            </div>
            <div className='showItems'>
                {items.map((curElem)=>{
                    return(
                        <div className='eachItem' key={curElem.id}>
                            <h3>{curElem.name}</h3>
                            <div className='todo-btn'>
                                <i className='fas fa-edit add-btn'
                                onClick={()=>editItem(curElem.id)}></i>
                               <i className='fa-solid fa-trash-can icon-delete' onClick={()=>deleteItem(curElem.id)}></i>
                    
            </div>
        </div>
                    );
                })}

    </div>
    <div className='showItems'>
        <button className='btn effect04' data-sm-link-text="Remove All"
        onClick = {removeAll}>
            <span>CHECK LIST </span>
        </button>
    </div>
    </div>
    </div>
    </>
  )
}
export default Todo;