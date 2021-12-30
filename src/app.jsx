import { useCallback, useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoDetail from './components/video_detail/video_detail';
import VideoList from './components/video_list/video_list';

function App({ youtube }) {
	const [videos, setVideos] = useState([]);
	const [selectedVideo, setSelectedVideo] = useState(null);

	const setPopular = () => {
		youtube
			.mostPopular() //
			.then((videos) => setVideos(videos));
	};

	// 메인페이지 설정
	const setMainPage = () => {
		youtube
			.playlist() //
			.then((videos) => {
				setVideos(videos);
			});
	};

	const selectVideo = useCallback((video) => {
		setSelectedVideo(video);
	});

	const search = useCallback(
		(query) => {
			youtube
				.search(query) //
				.then((videos) => {
					setVideos(videos);
					setSelectedVideo(null);
				});
		},
		[youtube]
	);

	// when logo clicked
	const backToList = useCallback(() => {
		setSelectedVideo(null);
		setMainPage();
	}, [youtube]);

	useEffect(() => {
		setMainPage();
	}, [youtube]);
	// []는 mount가 되었을때 한번만 호출하겠다는것
	return (
		<div className={styles.app}>
			<SearchHeader onSearch={search} onReturn={backToList} />
			<section className={styles.content}>
				{selectedVideo && (
					<div className={styles.detail}>
						<VideoDetail video={selectedVideo} />
					</div>
				)}
				<div className={styles.list}>
					<VideoList
						videos={videos}
						onVideoClick={selectVideo}
						display={selectedVideo ? 'list' : 'grid'}
					/>
				</div>
			</section>
		</div>
	);
}

export default App;
