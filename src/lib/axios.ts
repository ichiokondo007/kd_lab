import axios from 'axios';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
	withCredentials: true, // セッションCookieを含めるために必要
});

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
	login: async (id: string, password: string) => {
		try {
			const response = await api.post('/login', { id, password });
			return response;
		} catch (error) {
			throw error;
		}
	},

	// ログアウト（CSRFトークン関連の処理を削除）
	logout: async () => {
		try {
			return await api.post('/logout');
		} catch (error) {
			throw error;
		}
	},

	// トップページデータ取得
	getTopPageData: async () => {
		try {
			return await api.get('/top');
		} catch (error) {
			throw error;
		}
	}
};

export default api;
