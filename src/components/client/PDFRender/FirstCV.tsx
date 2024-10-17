import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		backgroundColor: '#ffff',
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
	},
	header: {
		fontSize: 24,
		textAlign: 'center',
		margin: 20,
	},
	subheader: {
		fontSize: 18,
		margin: 10,
	},
	text: {
		fontSize: 14,
		margin: 5,
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 20,
	},
	button: {
		padding: 10,
		backgroundColor: '#007BFF',
		color: 'white',
		borderRadius: 5,
		textAlign: 'center',
	},
});

export const FirstCV = () => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.header}>
				<Text>Nguyen Tien Anh</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.subheader}>Thông tin cá nhân</Text>
				<Text style={styles.text}>Email: johndoe@example.com</Text>
				<Text style={styles.text}>Phone: 0123456789</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.subheader}>Kỹ năng</Text>
				<Text style={styles.text}>- ReactJS</Text>
				<Text style={styles.text}>- TypeScript</Text>
				<Text style={styles.text}>- NodeJS</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.subheader}>Học vấn</Text>
				<Text style={styles.text}>Đại học ABC - Công nghệ thông tin</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.subheader}>Dự án</Text>
				<Text style={styles.text}>Dự án 1: Mô tả chi tiết dự án 1</Text>
				<Text style={styles.text}>Dự án 2: Mô tả chi tiết dự án 2</Text>
			</View>
		</Page>
	</Document>
);
