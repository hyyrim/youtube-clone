import { useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoList from './components/video_list/video_list';

function App({ youtube }) {
	const [videos, setVideos] = useState([]);
	const search = (query) => {
		youtube
			.search(query) //
			.then((videos) => setVideos(videos));
	};

	useEffect(() => {
		youtube
			.mostPopular() //
			.then((videos) => setVideos(videos));
	}, []);
	// []는 mount가 되었을때 한번만 호출하겠다는것
	return (
		<div className={styles.app}>
			<SearchHeader onSearch={search} />
			<VideoList videos={videos} />
		</div>
	);
}

export default App;