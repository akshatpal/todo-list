import React ,{useState , useEffect}from 'react'
import "./style.css"

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if(lists){
        return JSON.parse(lists);
    }else{
        return [];
    }
}
const Todo = () => {

    const [inputData,setInputData] = useState("");
    const [items,setItems] = useState(getLocalData());
    const [isEditItem,setIsEditItem] = useState("");
    const [toggleButton , setToggleButton] = useState(false);

    const additems = ()=>{
        if(!inputData){
            alert("please fill the data!!");
        }
        else if(inputData && toggleButton){
            setItems(
                items.map((currElem)=>{
                    if(currElem.id === isEditItem){
                        return { ...currElem , name:inputData};
                    }
                    return currElem;
                })
            )
            setIsEditItem(null);
            setInputData("");
            setToggleButton(false);
        }
        else{
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name : inputData,
            };
            setItems([ ... items, myNewInputData]);
            setInputData("");
        }
    };

    const editItem = (index) =>{
        const item_todo_edited = items.find((currElem) => {
            return currElem.id === index;
        })
        setIsEditItem(index);
        setInputData(item_todo_edited.name);
        setToggleButton(true);
    }

    const deleteItem = (index) => {
        const updatedItems = items.filter((currElem) => {
            return currElem.id !== index;
        })
        setItems(updatedItems);
    };

    const removeAll = () =>{
        setItems([]);
    };

    useEffect(() => {
      localStorage.setItem("mytodolist",JSON.stringify(items));
    }, [items])
    

  return (
    <>
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src="./images/todo.svg" alt="" />
                    <figcaption>Add your list here ✌️</figcaption>
                </figure>
                <div className="addItems">
                    <input type="text" placeholder="✍️ Add items..." className='form-control' value={inputData} onChange={(event) => setInputData(event.target.value)}/>
                    {toggleButton ? (<i className="far fa-edit add-btn" onClick={additems}></i>):(<i className="fa fa-plus add-btn" onClick={additems}></i>)}
                    
                </div>

                {/* show our items */}
                <div className="showItems">
                    {items.map((currElem)=>{
                        return(
                            <div className="eachItem" key={currElem.id}>
                                <h3>{currElem.name}</h3>
                                <div className="todo-btn">
                                    <i className="far fa-edit add-btn" onClick={()=> editItem(currElem.id)}></i>
                                    <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(currElem.id)}></i>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="REMOVE ALL" onClick={removeAll}>
                        <span>CHECK LIST</span>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo;