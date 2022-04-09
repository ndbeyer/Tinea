import { format } from 'date-fns';

export const formatSQLDate = (date: string): string => {
	return format(new Date(date), 'dd.MM.yyyy');
};
