import { useState } from 'react';

import { Button } from '@/components/ui/button';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-500">Test de Calidad</h1>
      <p>Contador: {count}</p>
      <Button onClick={() => setCount(count + 1)} variant="destructive">
        Haz click aquí
      </Button>
    </div>
  );
}
