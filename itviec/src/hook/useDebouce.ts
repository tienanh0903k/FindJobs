import { useEffect, useState } from 'react';


const useDebounce = <T>(value: T, delay = 500): T => {
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedValue(value);
		});

		return () => {
			clearTimeout(timeoutId);
		};
	}, [value, delay]);

	return debouncedValue;
};

export default useDebounce;
