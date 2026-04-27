import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, BrickWall, Rocket, Lightbulb, User, Briefcase } from 'lucide-react';

const LegoCard = ({ children, color = "bg-white", className = "" }: any) => (
  <motion.div
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    whileHover={{ y: -4 }}
    whileTap={{ x: 4, y: 4 }}
    className={`relative ${color} border-4 border-black p-6 shadow-lego active:shadow-lego-active transition-all ${className}`}
  >
    <div className="absolute -top-[14px] left-6 flex gap-2">
      {[1, 2].map(i => (
        <div key={i} className="w-8 h-4 bg-inherit border-x-4 border-t-4 border-black rounded-t-lg" />
      ))}
    </div>
    {children}
  </motion.div>
);

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen lego-baseplate p-6 md:p-12 font-mono transition-colors">
        <div className="max-w-6xl mx-auto mb-10 flex justify-between items-center">
          <LegoCard color="bg-lego-yellow" className="py-2">
            <h1 className="font-black text-xl flex items-center gap-2"><BrickWall /> MY LEGO HUB</h1>
          </LegoCard>
          <button onClick={() => setIsDark(!isDark)} className="p-4 bg-white border-4 border-black shadow-lego active:shadow-none translate-y-0 active:translate-y-1 transition-all">
            {isDark ? <Sun /> : <Moon />}
          </button>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <LegoCard color="bg-white dark:bg-gray-800 dark:text-white" className="md:col-span-2">
            <User className="mb-4 w-12 h-12 text-lego-blue" />
            <h2 className="text-3xl font-black mb-2">你好，我是[陈三合]</h2>
            <p>这里展示我的创意作品、人生想法和最近动态。</p>
          </LegoCard>

          <LegoCard color="bg-lego-red text-white">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Rocket size={18} /> 人生进度</h3>
            <div className="w-full bg-black/20 h-8 border-2 border-black flex mb-2">
              <div className="bg-white w-[65%] h-full" />
            </div>
            <p className="text-xs text-right">65% COMPLETED</p>
          </LegoCard>

          <LegoCard color="bg-lego-blue text-white">
            <h3 className="font-bold mb-2 flex items-center gap-2"><Lightbulb size={18} /> 最近在干嘛</h3>
            <ul className="text-sm space-y-2">
              <li>🛠️ 正在搭建个人乐高主页</li>
              <li>📚 成功战胜了 Tailwind v4 报错</li>

            </ul>
          </LegoCard>

          <LegoCard color="bg-white dark:bg-gray-800 dark:text-white" className="md:col-span-2">
            <h3 className="font-bold mb-2 flex items-center gap-2"><Briefcase size={18} /> 个人作品集</h3>
            <p className="text-sm">在这里放你的 Github 链接或作品图片...</p>
          </LegoCard>
        </div>
      </div>
    </div>
  );
}