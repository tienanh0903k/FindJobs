import { jwtVerify, JWTVerifyResult } from 'jose';
import { formatDistanceToNow } from 'date-fns';
/**
 * Decodes a JSON Web Token (JWT) with the given secret key.
 *
 * @param token - The JWT token to be decoded.
 * @returns The decoded payload of the JWT, or null if the token is invalid.
 */

export async function decodeToken(token: string) {
	const SECRET_KEY = process.env.SECRET_KEY || 'NTASPORT';

	try {
		const key = new TextEncoder().encode(SECRET_KEY);
		const { payload }: JWTVerifyResult = await jwtVerify(token, key);

		return payload;
	} catch (error) {
		console.error(error);
		return null;
	}
}


/**
 * 
 * @param date 
 * @param locale 
 * @param options 
 * @returns 
 */
export function formatDate(date: any, locale = 'en-US', options: any) {
	return new Date(date).toLocaleDateString(locale, options);
}







/**
 * Returns a color string based on the given HTTP method.
 * @param {string} method
 * @returns {string} A color string.
 * @example
 */
export const getMethodColor = (method: string) => {
	switch (method.toUpperCase()) {
		case 'GET':
			return 'green';
		case 'POST':
			return 'orange';
		case 'DELETE':
			return 'red';
		default:
			return 'gray';
	}
};


/**
 * Returns a modal title string based on the given modal type.
 * @param {string} modalType The type of the modal.
 * @returns {string} A title string.
 * @example
 */
export const getModalTitle = (modalType: any) => {
	switch (modalType) {
		case 'PERSONAL':
			return 'Chỉnh sửa thông tin cá nhân';
		case 'EXPERIENCE':
			return 'Chỉnh sửa kinh nghiệm';
		case 'INTRODUCE':
			return 'Chỉnh sửa giới thiệu';
		case 'EDUCATION':
			return 'CHỈNH SỬA TRƯỜNG HỌC';
		default:
			return '';
	}
};



/**
 * Truncates a given string to a certain length.
 * @param {string} str The string to be truncated.
 * @param {number} num The maximum length of the string.
 * @returns {string} The truncated string.
 * @example
 */
export const truncateString = (str: any, num: any) => {
    if (!str) return '';
    return str.length > num ? str.slice(0, num) + '...' : str;
};







export const TimeAgo = ({date}: {
	date: Date
}) => {
	const timeAgo = formatDistanceToNow(new Date(date), {
		addSuffix: true,
	})

	return timeAgo;
}