// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirige automáticamente a la ruta de tu restaurante
  redirect('/mantas');
}