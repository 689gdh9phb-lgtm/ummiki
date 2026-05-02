'use client';

import Image from 'next/image';
import { useGame } from '@/lib/game-context';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function WelcomeScreen() {
  const { setScreen } = useGame();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-lavender via-background to-soft-purple/20 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-6xl opacity-20"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ⭐
        </motion.div>
        <motion.div
          className="absolute top-40 right-8 text-5xl opacity-20"
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          🌙
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-16 text-4xl opacity-20"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🕌
        </motion.div>
        <motion.div
          className="absolute bottom-60 right-12 text-5xl opacity-20"
          animate={{ y: [0, 8, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity }}
        >
          ✨
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div
        className="flex flex-col items-center text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-soft-purple/30 blur-3xl rounded-full scale-150" />
          <Image
            src="/logo.svg"
            alt="Уммики"
            width={260}
            height={222}
            priority
            className="relative drop-shadow-xl"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg text-muted-foreground mb-12 max-w-xs text-pretty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Вперёд за новыми знаниями
        </motion.p>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Button
            onClick={() => setScreen('menu')}
            className="bg-deep-purple hover:bg-deep-purple/90 text-white text-xl font-semibold px-12 py-7 rounded-2xl shadow-xl shadow-deep-purple/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-deep-purple/40"
          >
            Начать
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-soft-purple/30 to-transparent pointer-events-none" />
    </div>
  );
}
