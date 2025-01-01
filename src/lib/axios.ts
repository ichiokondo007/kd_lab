import axios from 'axios';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
	withCredentials: true, // セッションCookieを含めるために必要
	headers: {
		'Content-Type': 'application/json',
	},
});
// CSRFトークンを取得する関数
const getCsrfToken = async () => {
	try {
		const response = await api.get('/csrf-token');
		return response.data.csrfToken;
	} catch (error) {
		console.error('Failed to fetch CSRF token:', error);
		return null;
	}
};

// レスポンスインターセプター
api.interceptors.response.use(
	(response) => response,
	(error) => {
		// 認証エラー時の処理
		if (error.response?.status === 401 || error.response?.status === 403) {
			// ログインページへリダイレクト
			window.location.href = '/';
		}
		return Promise.reject(error);
	}
);

// 型定義
export interface ApiResponse<T = any> {
	data: T;
	status: number;
	statusText: string;
}

// API関連の型定義
export interface LoginResponse {
	message: string;
	redirectTo: string;
}

export interface TopPageResponse {
	message: string;
	userId: string;
	userName: string;
}

// APIメソッド
export const apiClient = {
	// ログイン
	login: async (id: string, password: string) => {
		return api.post<LoginResponse>('/login', { id, password });
	},
	// ログアウト
	logout: async () => {
		const csrfToken = await getCsrfToken();
		return api.post('/logout', {}, {
			headers: {
				'X-CSRF-Token': csrfToken
			}
		});
	},

	// トップページデータ取得
	getTopPageData: async () => {
		return api.get<TopPageResponse>('/top');
	}
};

export default api;
