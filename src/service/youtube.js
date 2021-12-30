class Youtube {
	constructor(httpClient) {
		this.youtube = httpClient;
		/* key 를 매개변수로 받아올 경우
		this.youtube = axios.create({
			baseURL: 'https://youtube.googleapis.com/youtube/v3',
			params: { key: key },
		});
		*/
	}

	async mostPopular() {
		const response = await this.youtube.get('videos', {
			params: {
				part: 'snippet',
				chart: 'mostPopular',
				maxResults: 25,
			},
		});
		return response.data.items;
		// 라이브러리 자체에서 json으로 변환
	}

	// 메인페이지 - 플레이리스트 검색
	async playlist() {
		const response = await this.youtube.get('search', {
			params: {
				part: 'snippet',
				maxResults: 25,
				q: 'playlist',
				type: 'video',
			},
		});

		return response.data.items.map((item) => ({
			...item,
			id: item.id.videoId,
		}));
	}

	async search(query) {
		const response = await this.youtube.get('search', {
			params: {
				part: 'snippet',
				maxResults: 25,
				q: query,
				type: 'video',
			},
		});

		return response.data.items.map((item) => ({
			...item,
			id: item.id.videoId,
		}));
	}
}

export default Youtube;
