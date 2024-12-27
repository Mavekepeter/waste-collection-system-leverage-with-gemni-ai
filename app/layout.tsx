"use client"
import { useState, useEffect } from "react";
import { Inter } from 'next/font/google';
import './globals.css';

import { Toaster } from 'react-hot-toast';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { getAvailableRewards, getUserByEmail } from "@/utils/db/actions";

const inter = Inter({ subsets: ['latin'] });

interface User {
  id: string;
  email: string;
  // Add more fields as needed based on the structure of your user object
}

interface RewardData {
  totalEarnings: number;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const fetchTotalEarnings = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
          const user: User | null = await getUserByEmail(userEmail);
          if (user) {
            const availableRewards: RewardData = await getAvailableRewards(user.id);
            setTotalEarnings(availableRewards.totalEarnings);
          }
        }
      } catch (error) {
        console.error('Error fetching total earnings:', error);
      }
    };
    fetchTotalEarnings();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          {/* Header */}
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} totalEarnings={totalEarnings} />
          <div className="flex flex-1">
            {/* Sidebar */}
            <Sidebar open={sidebarOpen} />
            <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
