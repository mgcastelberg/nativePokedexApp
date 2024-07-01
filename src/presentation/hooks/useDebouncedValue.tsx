import { useEffect, useState } from "react"

// 500 milesimas de seg
export const useDebouncedValue = ( input: string = '', time: number = 1000 ) => {
    
    const [debouncedValue, setDebouncedValue] = useState(input);

    useEffect(() => {

        const timeout = setTimeout(() => {
            setDebouncedValue(input);
        }, time );
        
        return () => {
            clearTimeout(timeout);
        };

    }, [input]);

    return debouncedValue;
}