'use client'

import { motion } from 'framer-motion'

interface ContentCoverProps {
  type: 'lantern' | 'mosque' | 'books' | 'moon' | 'garden' | 'desert' | 'olive' | 'stars' | 'prayer' | 'calligraphy'
  className?: string
}

export function ContentCover({ type, className = '' }: ContentCoverProps) {
  const covers: Record<string, { bg: string; elements: React.ReactNode }> = {
    lantern: {
      bg: 'bg-gradient-to-br from-[#A66CFF] to-[#7B3FF2]',
      elements: (
        <>
          {/* Lantern silhouette */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="60" height="80" viewBox="0 0 60 80" fill="none" className="opacity-90">
              <path d="M25 5 h10 v8 h-10 z" fill="white" opacity="0.8" />
              <path d="M30 0 v5" stroke="white" strokeWidth="2" opacity="0.6" />
              <rect x="15" y="13" width="30" height="50" rx="8" fill="white" opacity="0.3" />
              <rect x="20" y="18" width="20" height="40" rx="4" fill="white" opacity="0.2" />
              <ellipse cx="30" cy="68" rx="12" ry="4" fill="white" opacity="0.2" />
            </svg>
          </motion.div>
          {/* Stars */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/60 rounded-full"
              style={{
                top: `${15 + i * 12}%`,
                left: `${10 + i * 20}%`,
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </>
      ),
    },
    mosque: {
      bg: 'bg-gradient-to-br from-[#7B3FF2] to-[#5B2BD1]',
      elements: (
        <>
          {/* Mosque silhouette */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-80">
            <svg width="120" height="70" viewBox="0 0 120 70" fill="none">
              <path d="M60 5 Q75 20 75 35 L75 70 L45 70 L45 35 Q45 20 60 5" fill="white" opacity="0.3" />
              <rect x="20" y="35" width="15" height="35" fill="white" opacity="0.25" />
              <rect x="85" y="35" width="15" height="35" fill="white" opacity="0.25" />
              <circle cx="60" cy="25" r="3" fill="white" opacity="0.5" />
            </svg>
          </div>
          {/* Crescent moon */}
          <motion.div 
            className="absolute top-6 right-6"
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" opacity="0.7">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </motion.div>
        </>
      ),
    },
    books: {
      bg: 'bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED]',
      elements: (
        <>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-80">
            <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
              <rect x="10" y="20" width="25" height="35" rx="2" fill="white" opacity="0.3" transform="rotate(-10 10 20)" />
              <rect x="35" y="15" width="30" height="40" rx="2" fill="white" opacity="0.35" />
              <rect x="65" y="18" width="25" height="37" rx="2" fill="white" opacity="0.25" transform="rotate(8 65 18)" />
            </svg>
          </div>
          {/* Reading light */}
          <motion.div
            className="absolute top-8 left-8 w-3 h-3 bg-white/40 rounded-full blur-sm"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </>
      ),
    },
    moon: {
      bg: 'bg-gradient-to-br from-[#6D28D9] to-[#4C1D95]',
      elements: (
        <>
          {/* Large moon */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
              <circle cx="35" cy="35" r="30" fill="white" opacity="0.2" />
              <path d="M50 35 A15 15 0 1 1 35 20 A12 12 0 0 0 50 35" fill="white" opacity="0.4" />
            </svg>
          </motion.div>
          {/* Stars */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 80 + 5}%`,
                left: `${Math.random() * 80 + 10}%`,
              }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </>
      ),
    },
    garden: {
      bg: 'bg-gradient-to-br from-[#9333EA] to-[#7C3AED]',
      elements: (
        <>
          {/* Trees/plants silhouette */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-70">
            <svg width="100" height="50" viewBox="0 0 100 50" fill="none">
              <ellipse cx="20" cy="40" rx="15" ry="20" fill="white" opacity="0.25" />
              <ellipse cx="50" cy="35" rx="20" ry="25" fill="white" opacity="0.3" />
              <ellipse cx="80" cy="40" rx="15" ry="20" fill="white" opacity="0.25" />
            </svg>
          </div>
          {/* Floating elements */}
          <motion.div
            className="absolute top-10 right-10 w-2 h-2 bg-white/40 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </>
      ),
    },
    desert: {
      bg: 'bg-gradient-to-br from-[#D97706] to-[#A66CFF]',
      elements: (
        <>
          {/* Dunes */}
          <div className="absolute bottom-0 left-0 right-0 opacity-80">
            <svg width="100%" height="40" viewBox="0 0 200 40" fill="none" preserveAspectRatio="none">
              <path d="M0 40 Q50 10 100 30 Q150 50 200 20 L200 40 Z" fill="white" opacity="0.2" />
              <path d="M0 40 Q30 20 80 35 Q130 50 200 25 L200 40 Z" fill="white" opacity="0.15" />
            </svg>
          </div>
          {/* Sun */}
          <motion.div
            className="absolute top-8 right-10"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-10 h-10 rounded-full bg-white/30" />
          </motion.div>
        </>
      ),
    },
    olive: {
      bg: 'bg-gradient-to-br from-[#7B3FF2] to-[#5B2BD1]',
      elements: (
        <>
          {/* Olive tree silhouette */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-70">
            <svg width="80" height="70" viewBox="0 0 80 70" fill="none">
              <rect x="35" y="45" width="10" height="25" fill="white" opacity="0.3" />
              <ellipse cx="40" cy="30" rx="30" ry="25" fill="white" opacity="0.25" />
              <ellipse cx="25" cy="35" rx="15" ry="12" fill="white" opacity="0.2" />
              <ellipse cx="55" cy="35" rx="15" ry="12" fill="white" opacity="0.2" />
            </svg>
          </div>
          {/* Leaves */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-1 bg-white/30 rounded-full"
              style={{ top: `${30 + i * 15}%`, left: `${20 + i * 25}%` }}
              animate={{ rotate: [0, 10, 0], y: [0, 3, 0] }}
              transition={{ duration: 2 + i, repeat: Infinity }}
            />
          ))}
        </>
      ),
    },
    stars: {
      bg: 'bg-gradient-to-br from-[#4C1D95] to-[#7B3FF2]',
      elements: (
        <>
          {/* Many stars */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 90}%`,
                left: `${Math.random() * 90}%`,
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
          {/* Large star */}
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="white" opacity="0.5">
              <path d="M15 0 L18 12 L30 15 L18 18 L15 30 L12 18 L0 15 L12 12 Z" />
            </svg>
          </motion.div>
        </>
      ),
    },
    prayer: {
      bg: 'bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9]',
      elements: (
        <>
          {/* Prayer mat pattern */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-60">
            <svg width="80" height="50" viewBox="0 0 80 50" fill="none">
              <rect x="5" y="5" width="70" height="40" rx="4" fill="white" opacity="0.2" />
              <rect x="15" y="12" width="50" height="8" rx="2" fill="white" opacity="0.15" />
              <rect x="15" y="25" width="50" height="8" rx="2" fill="white" opacity="0.15" />
            </svg>
          </div>
          {/* Light rays */}
          <motion.div
            className="absolute top-6 left-1/2 -translate-x-1/2"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
              <path d="M30 30 L15 0 L20 0 L30 25 L40 0 L45 0 Z" fill="white" opacity="0.3" />
            </svg>
          </motion.div>
        </>
      ),
    },
    calligraphy: {
      bg: 'bg-gradient-to-br from-[#7C3AED] to-[#5B21B6]',
      elements: (
        <>
          {/* Calligraphy strokes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60">
            <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
              <path d="M10 30 Q30 10 50 30 Q70 50 90 30" stroke="white" strokeWidth="3" fill="none" opacity="0.4" />
              <path d="M20 40 Q40 20 60 40 Q80 60 90 45" stroke="white" strokeWidth="2" fill="none" opacity="0.3" />
            </svg>
          </div>
          {/* Pen tip */}
          <motion.div
            className="absolute bottom-10 right-10"
            animate={{ rotate: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg width="20" height="30" viewBox="0 0 20 30" fill="white" opacity="0.4">
              <path d="M10 0 L15 25 L10 30 L5 25 Z" />
            </svg>
          </motion.div>
        </>
      ),
    },
  }

  const cover = covers[type] || covers.lantern

  return (
    <div className={`relative w-full h-40 rounded-2xl overflow-hidden ${cover.bg} ${className}`}>
      {cover.elements}
    </div>
  )
}
