import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Input from '../components/Input';
import Select from '../components/Select';


function User() {

  const BASE_URL_USER = "http://localhost:8081/api/users";

  const[getAllUsers,setAllUsers] = useState([]);
  const[getCurrentPage,setCurrentPage]=useState("1");
  const[getPageItems,setPageItems] = useState([]);
  const[getErrorMessage,setErrorMessage] = useState(null);
  const[getSelectedUser,setSelectedUser]=useState(
    {
      identityNo: '',
      name: '',
      surName: '',
      gender: '',
      role:''
    }
  )

  useEffect(() => {
      loadData();
  },[getCurrentPage])

  const loadData= async() => {
    const getData = await axios.get(`${BASE_URL_USER}?page=${getCurrentPage-1}`)
    setAllUsers(getData.data.content);

      //Page işlemleri
      let items = [];
      for(let index=1 ; index <= getData.data.totalPages  ; index++){
        items.push(
             <li key={index} 
                  onClick={()=> setCurrentPage(index)}  
                  className={`page-item ${getCurrentPage === index ? "active" : ""}`}>
                   <a className="page-link" href="">{index}</a>
              </li>
        );
      }
        setPageItems(items);
  }

  const saveUser= async() => {
    const response = axios.post(BASE_URL_USER,getSelectedUser, {
      headers:{'Content-Type': 'application/json'},
      mode:'cors',
    }).then((response) => {
      const result = response.data;// auto parse
      if (result.errorMessage) {
        setErrorMessage(result.errorMessage);
        } else {
             loadUsers();
              clearForm();
              setErrorMessage(null);
            }         
    })

  
      
     
  }

  //event funcs
  const handleInputChange = (e) => {
    const {name,value} = e.target
    console.log(e.target)
    setSelectedUser((prev) => ({...prev,[name]:value})); // { identityNo : value }
  }


  // Clear funcs
  const clearForm = () => {
    setSelectedUser( {
      identityNo: '',
      name: '',
      surname: '',
      gender: '',
      role: ''
    });
  }

  const isClear = () => {
    return (
      getSelectedUser.identityNo =='' || getSelectedUser.name =='' || getSelectedUser.surname =='' || getSelectedUser.gender =='' || getSelectedUser.gender ==''
    );
  }
  

  //console.log(getAllUsers)


  return (
     <div className='container'>
        <div className='row'>
             <div className='col-sm-8 '>
                   <table class="table table-striped mt-4 table-bordered">
               <thead>
                      <tr>
                              <th scope="col">Identity No</th>
                              <th scope="col">Name</th>
                              <th scope="col">Surname</th>
                              <th scope="col">Gender</th>
                              <th scope="col">Role</th>
                              </tr>
                  </thead>
               <tbody>
                      {
                        getAllUsers.map((data,index) => (
                          <tr  key={index} onClick={() => {setSelectedUser(data)}} >
                                <th scope="row">{data.identityNo}</th>
                                <th>{data.name}</th>
                                <th>{data.surName}</th>
                                <th>{data.gender}</th>
                                <th>{data.role}</th>
                              </tr>
                        ))
                      }
                </tbody>
                    </table>
               <nav aria-label="Page navigation example"> 
                 <ul className="pagination">
                         {getPageItems}
                  </ul>
               </nav>
        </div>
          <div className='col-sm-4 mt-4'>
            {getErrorMessage}
                <form>
                    <div className="mb-3">
                            <Input text={'Identity No :'} name={'identityNo'} type={'text'} placeholder={'enter the Identity No'} maxLength={11} minLength={11} value={getSelectedUser.identityNo} onChange={(e)=> handleInputChange(e)}/>
                            <Input text={'Name :'} name={'name'} type={'text'} placeholder={'enter the Name'} maxLength={30} minLength={3} value={getSelectedUser.name} onChange={(e)=> handleInputChange(e)} />
                            <Input text={'Surname :'} name={'surName'} type={'text'} placeholder={'enter the Surname'} maxLength={30} minLength={3} value={getSelectedUser.surName} onChange={(e)=> handleInputChange(e)} />
                            <Select text={'Gender :'} name={'gender'} value={getSelectedUser.gender} onChange={(e)=> handleInputChange(e)} option1={'MALE'} option2={'FEMALE'}/>
                            <Select text={'Role :'} name={'role'} value={getSelectedUser.role} onChange={(e)=> handleInputChange(e)} option1={'STUDENT'} option2={'TEACHER'}/>
                    </div>
                    <button className='btn btn-primary py-1 px-4'  onClick={saveUser}>
                      {
                        getSelectedUser.id ? ('Update') : ('Create')
                      }
                     </button>
                      {
                        isClear() ? (
                          ('')
                        ) : (
                          <>
                          <button className='btn btn-danger ms-2 py-1 px-4' onClick={()=> {}}> Delete</button>
                          <button className='btn btn-success ms-2 py-1 px-4' onClick={clearForm}> Clear </button>
                          </>
                        )
                      }
                    

                 
                </form>
            </div>
        </div>
     </div>
  )
}

export default User