import React, { memo, useRef } from 'react';
import styles from './search_header.module.css';

const SearchHeader = memo(({ onSearch, onReturn }) => {
	const inputRef = useRef();
	const handleSearch = () => {
		const value = inputRef.current.value;
		onSearch(value);
	};

	const onClick = () => {
		handleSearch();
	};

	const onKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	const backToList = () => {
		onReturn();
	};

	return (
		<header className={styles.header}>
			<div className={styles.logo} onClick={backToList}>
				<img className={styles.img} src="/images/logo.png" alt="logo" />
				<h1 className={styles.title}>Youtube</h1>
			</div>
			<input
				ref={inputRef}
				className={styles.input}
				type="text"
				placeholder="search"
				onKeyPress={onKeyPress}
			/>
			<button className={styles.button} type="submit" onClick={onClick}>
				<img
					className={styles.buttonImg}
					src="/images/search.png"
					alt="search"
				/>
			</button>
		</header>
	);
});

export default SearchHeader;
