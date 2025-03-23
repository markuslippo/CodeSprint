import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import api from "../api/axios";

const CodeEditor = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [codingTask, setCodingTask] = useState(null);

    useEffect(() => {
        fetchCodingTask();
    }, []);

    const fetchCodingTask = async () => {
        setIsLoading(true);
        try {
            const response = await api.get("/coding-task?lang=python&difficulty=easy");
            setCodingTask(response.data.coding_task.content);
        } catch (error) {
            console.log("Error fetching coding task");
        } finally {
            console.log(codingTask);
            setIsLoading(false);
        }
    }

    if(isLoading) { 
        return <Skeleton height={30} width={200} />;
    }
  
    if(!codingTask) {
        return <div>No coding tasks found.</div>;

    }

    return(
        <div>
            <p>{codingTask}</p>
        </div>
    )
    
  };
  
  export default CodeEditor;