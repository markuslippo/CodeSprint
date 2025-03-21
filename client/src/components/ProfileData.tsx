import { useState } from "react";
import Skeleton from "react-loading-skeleton";

const ProfileData = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState("Initial data");

    if(loading) { 
        return <Skeleton height={30} width={200} />;
    }
  
    if(!data) {
        return <div>No data found.</div>;

    }

    return(
        <div>
            <h1>{data}</h1>
        </div>
    )
    
  };
  
  export default ProfileData;