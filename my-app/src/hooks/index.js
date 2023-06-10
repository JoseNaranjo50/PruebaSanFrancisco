import { useState, useEffect } from "react";
import { getAllCourse, getAllRecord, getAllStudent, getSession } from "../services";

export const useGetAllCourse = () => {
    const [course, setCourse] = useState(null);
    const [errorCourse, setErrorCourse] = useState(null);
    const [isLoadingCourse, setIsLoadingCourse] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coreResponse = await getAllCourse();
                
                if (coreResponse.state) {
                    setCourse(coreResponse.data);
                } else {
                    setCourse([]);
                }
                setIsLoadingCourse(false);
            } catch (error) {
                setErrorCourse(error);
                setIsLoadingCourse(false);
            }
        };
        fetchData();
    }, []);
    return { course, errorCourse, isLoadingCourse };
};

export const useGetAllStudent = () => {
    const [student, setStudent] = useState(null);
    const [errorStudent, setErrorStudent] = useState(null);
    const [isLoadingStudent, setIsLoadingStudent] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coreResponse = await getAllStudent();
                if (coreResponse.state) {
                    setStudent(coreResponse.data);
                } else {
                    setStudent([]);
                }
                setIsLoadingStudent(false);
            } catch (error) {
                setErrorStudent(error);
                setIsLoadingStudent(false);
            }
        };
        fetchData();
    }, []);
    return { student, errorStudent, isLoadingStudent };
};

export const useGetAllRecord = () => {
    const [record, setRecord] = useState(null);
    const [errorRecord, setErrorRecord] = useState(null);
    const [isLoadingRecord, setIsLoadingRecord] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coreResponse = await getAllRecord();
                if (coreResponse.state) {
                    setRecord(coreResponse.data);
                } else {
                    setRecord([]);
                }
                setIsLoadingRecord(false);
            } catch (error) {
                setErrorRecord(error);
                setIsLoadingRecord(false);
            }
        };
        fetchData();
    }, []);
    return { record, setRecord, errorRecord, isLoadingRecord };
};

export const useGetSession = () => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coreResponse = await getSession();
                if (coreResponse.state) {
                    setSession(coreResponse.data);
					sessionStorage.setItem('jwtToken', coreResponse.data.jwt.accessToken);
                } else {
                    setSession(null);
                }
               
            } catch (error) {
          window.alert(error)
            }
        };
        fetchData();
    }, []);
    return { session };
};

// export const useAddRecord = (entity) => {
//     const [newRecord, setNewRecord] = useState(null);
//     const [errorNewRecord , setErrorNewRecord ] = useState(null);
//     const [isLoadingNewRecord , setLoadingNewRecord ] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const coreResponse = addRecord (entity)
//                 if (coreResponse.data) {
//                     setNewRecord(coreResponse.data);
//                 } else {
//                     setNewRecord([])
//                 };
//                 setLoadingNewRecord (false);
//             } catch (error) {
//                 setErrorNewRecord(error);
//                 setLoadingNewRecord (false);
//             }
//         };
//         fetchData();
//     }, []);
//     return { newRecord, errorNewRecord , isLoadingNewRecord  };
// };





