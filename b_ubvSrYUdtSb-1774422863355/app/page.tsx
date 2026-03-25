import { GameProvider } from '@/lib/game-context';
import { UmmikiApp } from '@/components/ummiki-app';

export default function Home() {
  return (
    <GameProvider>
      <UmmikiApp />
    </GameProvider>
  );
}
