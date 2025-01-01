'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiClient } from '@/lib/axios';

interface UserData {
  userName: string;
  userId: string;
}

export default function TopPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.getTopPageData();
        setUserData({
          userName: response.data.userName,
          userId: response.data.userId
        });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout currentPath="/top">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome to KD Lab</h1>

        {/* ユーザー情報 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">ユーザー情報</h2>
          <div className="bg-gray-50 p-4 rounded">
            <p>ユーザー名: {userData?.userName}</p>
            <p>ユーザーID: {userData?.userId}</p>
          </div>
        </div>

        {/* お知らせセクション */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">お知らせ</h2>
          <div className="bg-gray-50 p-4 rounded">
            <ul className="list-disc pl-5 space-y-2">
              <li>新機能のお知らせ: ホワイトボード機能がリリースされました</li>
              <li>システムメンテナンス: 3/30 AM2:00-5:00にメンテナンスを実施予定</li>
              <li>アップデート情報: バージョン1.2.0がリリースされました</li>
            </ul>
          </div>
        </div>

        {/* クイックアクセス */}
        <div>
          <h2 className="text-xl font-semibold mb-2">クイックアクセス</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded hover:bg-gray-100 cursor-pointer transition-colors">
              <h3 className="font-semibold">Whiteboard (YSJ)</h3>
              <p className="text-sm text-gray-600">YSJベースのホワイトボード</p>
            </div>
            <div className="bg-gray-50 p-4 rounded hover:bg-gray-100 cursor-pointer transition-colors">
              <h3 className="font-semibold">Whiteboard (Automerge)</h3>
              <p className="text-sm text-gray-600">Automergeベースのホワイトボード</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
