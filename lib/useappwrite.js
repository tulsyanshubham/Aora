import { useEffect, useState } from "react";
import { Alert } from "react-native";


const useAppWrite = (fn) => {
    const [data, setdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fn();
            setdata(response);
        } catch (error) {
            console.log(error.message);
            Alert.alert("Error", error.message)
        } finally {
            () => {
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const refetch = () => fetchData();
    return { data, isLoading, refetch };
}
export default useAppWrite;