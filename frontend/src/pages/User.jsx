import axios from 'axios';
import React, { useEffect, useState } from 'react'

function User() {

  const BASE_URL_USER = "http://localhost:8081/api/users";

  const[getAllUsers,setAllUsers] = useState([]);
  const[getCurrentPage,setCurrentPage]=useState("1");
  const[getPageItems,setPageItems] = useState([]);

  useEffect(() => {
      loadData();

  },getCurrentPage)

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
  
  console.log(getAllUsers)

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
                          <tr  key={index}>
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
                <form>
                    <div className="mb-3 ">
                        <label className="form-label fw-bold">Identity No</label>
                        <input  className="form-control" placeholder='enter the Identity no'/>             
                    </div>
                </form>
            </div>
        </div>
     </div>
  )
}

export default User