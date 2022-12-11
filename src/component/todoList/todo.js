import React, { useState , useEffect} from 'react'
import "../todoList/style.css";
import img1 from '../todoList/images/image.png'

// Adding data to a local storage 
const getLocalData=()=>{
    const lists=localStorage.getItem("todoList")
    if(lists){
        return JSON.parse(lists) 
    }
    else{
        return []
    }
}


const Todo = () => {
    const [inputData,setInputData]=useState("")
    const [items,setItems]=useState(getLocalData())
    const [editItems, setEditItems]=useState("")
    const [toggleButton , setToggleButton]=useState(false)
    
    
    // Add any item in the list 
    const addItem = ()=>{
        if(!inputData){
            alert("Please enter the data 😁")
        }
        else if(inputData && toggleButton){
            setItems(
                items.map((curElem)=>{
                    if (curElem.id=== editItems){
                        return {...curElem,name:inputData}
                    }
                    return curElem
                })
            )
            setInputData("")
            setEditItems(null)
            setToggleButton(false)
        }
        else {
            const myNewInputData={
                id:new Date().getTime().toString(),
                name : inputData
            }
            setItems([...items,myNewInputData])
            setInputData("")
        }   
    }


    const editItem=(index)=>{
        const items_edit=items.find((curElem)=>{
            return curElem.id === index 
        })
        setInputData(items_edit.name)
        setEditItems(index)
        setToggleButton(true)
    }




    // Delete any item in the list
    const deleteItem =(index)=>{
        const udatedItems=items.filter((curElem)=>{
            return curElem.id !==index;
        })
        setItems(udatedItems)
    }

    // Remove all the element for list
    const deletAllItems =()=>{
        setItems([])
    }

    // adding data to local strorage 
    useEffect(()=>{
        localStorage.setItem("todoList",JSON.stringify(items));
    },[items])

  return (
    <>
        <div className="main-div">
            <div className='child-div'>
                <figure>
                    <img src={img1} alt='todo-logo'></img>
                    <figcaption className='figCap'>Add Items  In Your List</figcaption>
                </figure>
                <div className='addItems'>
                    <input type="text" placeholder="✍🏿Add Items..." className='form-control' value={inputData} onChange={ (e)=>{setInputData(e.target.value)} }></input>
                    {toggleButton ?(<i className="far fa-edit add-btn" onClick={addItem}></i>) : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
                    
                </div>

                {/* show Our Items */}
                <div className='showItems'>
                    {items.map((curElem)=>{
                        return(
                            <div className='eachItem' key={curElem.id}>
                                <h3>{curElem.name}</h3>
                                <div className='todo-btn'>
                                    <i class="far fa-edit add-btn" onClick={()=> editItem(curElem.id) }></i>
                                    <i class="far fa-trash-alt add-btn " onClick={()=>deleteItem(curElem.id)}></i>
                                </div>
                            </div>
                        )
                    })}   
                </div>

                {/* remove all buttons */}
                <div className='showItems'>
                    <button tupe="" className='btn effect04' data-sm-link-text="Remove All" onClick={deletAllItems}>
                        <span>Check List</span>
                    </button>
                </div>

            </div>
        </div>
    </>
  )
}

export default Todo
