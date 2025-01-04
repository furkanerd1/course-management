import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Input from '../components/Input';
import NewSelect from '../components/NewSelect'

function Course() {

  const BASE_URL_COURSE = "http://localhost:8081/api/courses";
  const BASE_URL_USER = "http://localhost:8081/api/users";

    const [getCourses,setCourses] = useState([])
    const [getCurrentPage,setCurrentPage] = useState(1)
    const [getPageItems,setPageItems] = useState([])
    const [getTeachers,setTeachers] = useState([])
    const [getCourseStudents,setCourseStudents] = useState([])
    const [getSelectedCourse,setSelectedCourse] = useState(
      {
        name:"",
        teacherId:0,
        teacher:{},
        students:[]
      }
    );

    useEffect(() => {
        loadCourses();
        loadTeachers();
    },[getCurrentPage])


    const loadCourses= async () => {
      const getData = await axios.get(`${BASE_URL_COURSE}?page=${getCurrentPage - 1}`);
      //console.log(getData.data.content)
      setCourses(getData.data.content);

      //Page işlemleri
      let items = [];
      for (let index = 1; index <= getData.data.totalPages; index++) {
        items.push(
          <li
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`page-item ${getCurrentPage === index ? "active" : ""}`}
          >
            <a className="page-link" href="#">
              {index}
            </a>
          </li>
        );
      }
      setPageItems(items);
    }

    const loadTeachers= async () => {
      const getData = await axios.get(`${BASE_URL_USER}/by-role?role=TEACHER`);
      setTeachers(getData.data);
    }

    const loadCourseStudents = async (course) =>{
       const response = await axios.post(BASE_URL_COURSE, getCourses.map((st) => st.id), {
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
      });
        setCourseStudents(response)
      }

      const addStudent = async(student)  => {
        getSelectedCourse.students.push(student);
        const response = await axios.post(BASE_URL_COURSE,getSelectedCourse,{
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
        });
        loadCourses();
        clearForm();
    }

    const setCourse = (course) => {
      if(course.id == getSelectedCourse.id){
        clearForm();
      }else{
        course.teacherId=course.teacher.id;
        setSelectedCourse(course)
        loadCourseStudents(course);
      }
    }

    const removeStudent = async(studentId) => {
      getSelectedCourse.students = getSelectedCourse.students.filter(
          (student) => student.id !== studentId
      );
      const response = await axios.delete(BASE_URL_COURSE,getSelectedCourse,{
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
      });
      loadCourses();
      clearForm();
  }
  

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setSelectedCourse((prev) => ({ ...prev, [name]: value }));
      setCourseStudents([]);
    };

    const saveCourse = async() => {
      const courseToSave = {
        name: getSelectedCourse.name,
        teacher: {
            id: Number(getSelectedCourse.teacherId)
        }
      }
       await axios.post(BASE_URL_COURSE, courseToSave , {
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
      });
        loadTeachers();
        clearForm(); // Clear form data
      }
    

    const clearForm = () => {
      setSelectedCourse ({
        name:"",
        teacherId:0,
        teacher:{},
        students:[]
      })
    }

      return (
        <>
    <div className="container">
        <div className="row">
            <div className="col-sm-9">
              <table className="table table-striped mt-4 table-bordered">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Course Name</th>
                <th scope="col">Teacher</th>
              </tr>
            </thead>
            <tbody>
              {getCourses.map((data,index) => (
                <React.Fragment key={index}>
                <tr key={data.id} onClick={() => { setSelectedCourse(data); }}>
                  <td scope="row">{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.teacher.name + " " + data.teacher.surName}</td>
                </tr>
                {getSelectedCourse.id && data.id === getSelectedCourse.id ? 
                  getSelectedCourse.students.map((student) => (
                    <tr key={student.identityNo}>
                      <td></td>
                      <td>{student.identityNo}</td>
                      <td>{student.name + " " + student.surName}</td>
                      <td>
                        <button className='btn btn-danger' onClick={removeStudent(student.id) }>Delete</button>
                      </td>
                    </tr>
                  )) : ''}
                  </React.Fragment>
                ))}
            </tbody>
               </table>
            </div>
          <div className='col-sm-3 mt-4'>
            <form>
            <div className="mb-3">
              <Input
                text="Name"
                name="name"
                type="text"
                placeholder="enter name"
                maxLength={30}
                minLength={3}
                value={getSelectedCourse.name}
                onChange={handleInputChange}
              />
               <NewSelect
                text="Teacher"
                name="teacherId"
                value={getSelectedCourse.teacherId}
                onChange={handleInputChange}
                list={getTeachers}
               />
            </div>
            <button className="btn btn-primary py-1 px-4" onClick={saveCourse}  type="submit">
               Create
            </button>
            {getSelectedCourse.name == '' ? ' ' : 
             <button className="btn btn-success py-1 px-4 mx-2" onClick={clearForm}  type="submit">
               Clear
          </button>
          
            }
          </form>
            <ul className="list-group">
              {getCourseStudents.map((student) => (
                <div key={student.id} className='d-flex justify-content-between align-items-start'>
                  <li className="list-group-item ms-2 me-auto">
                    {student.name} {student.surName}
                  </li>
                  <button className='btn btn-close-white' onClick={() => addStudent(student)}> Add </button>
              </div>
              ))}

             </ul>
            
            </div>
        </div>
    </div>
        </>
      )
}


export default Course