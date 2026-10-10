import { Sparkles } from 'lucide-react';

interface SpotlightBannerProps {
  status: { showMenuDia: boolean; showPromo: boolean };
  primaryColor: string;
}

export function SpotlightBanner({ status, primaryColor }: SpotlightBannerProps) {
  const isMenu = status.showMenuDia;
  const isPromo = status.showPromo;

  return (
    <section className="px-6 mb-10 mt-2">
      <div className="relative w-full h-[220px] rounded-[2rem] overflow-hidden bg-zinc-900 border border-zinc-800/50 p-6 flex flex-col justify-end shadow-2xl">
         
         <div 
           className="absolute -top-24 -right-24 w-64 h-64 blur-[80px] rounded-full opacity-40 mix-blend-screen"
           style={{ backgroundColor: primaryColor }}
         />
         
         <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-white/5 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1.5">
                <Sparkles size={12} style={{ color: primaryColor }} />
                {isMenu ? "Horario de Almuerzo" : isPromo ? "Oferta Especial" : "Recomendación del Chef"}
              </span>
            </div>
            
            <h2 className="text-3xl font-medium tracking-tight leading-none mb-2 text-white">
              {isMenu ? "Menú Ejecutivo" : isPromo ? "2x1 en Cócteles" : "Ceviche Misto"}
            </h2>
            <p className="text-sm text-zinc-400 font-light">
              {isMenu ? "Incluye entrada, fondo y bebida." : isPromo ? "Perfecto para terminar el día." : "Pesca del día con leche de tigre."}
            </p>
         </div>
      </div>
    </section>
  );
}