// src/features/menu/components/SpotlightBanner.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Sparkles, Utensils, Moon, Coffee, ChevronRight } from 'lucide-react';
import { 
  DAILY_MENUS, 
  NIGHT_PROMOS, 
  CHEF_RECOMMENDATION, 
  SUNDAY_BREAKFAST_PROMO,
  DailyMenuItem,
  PromoNightItem
} from '../config/spotlight.config';
import { SpotlightDetailModal, SpotlightModalData } from './SpotlightDetailModal';
import { useSpotlightBanner } from '../hooks/useSpotlightBanner';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

interface BannerSlide {
  id: 'menu' | 'promo' | 'chef' | 'desayuno';
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  accentColor: string;
  icon: 'menu' | 'promo' | 'chef' | 'desayuno';
  dailyData?: DailyMenuItem;
  promoData?: PromoNightItem;
  endTime?: Date;
}

export function SpotlightBanner() {
  const router = useRouter();
  const spotlightConfig = useSpotlightBanner(); 

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<SpotlightModalData | null>(null);

  useEffect(() => {
    const now = new Date();
    const day = now.getDay();
    const currentDayKey = [0,1,6].includes(day) ? 'jueves' : ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'][day] as any;
    const menuData = DAILY_MENUS[currentDayKey] || DAILY_MENUS['jueves'];
    const nightPromo = NIGHT_PROMOS[day] || NIGHT_PROMOS[4];

    const generatedSlides: BannerSlide[] = [
      {
        id: 'menu',
        badge: `✦ MENÚ DEL DÍA • ${menuData.dayName.toUpperCase()}`,
        title: `Menú ${menuData.dayName} — €${menuData.price.toFixed(2)}`,
        subtitle: `${menuData.destacado}. Toca para ver la carta.`,
        image: menuData.image,
        accentColor: '#f59e0b',
        icon: 'menu',
        dailyData: menuData,
        endTime: spotlightConfig.mode === 'menu_del_dia' ? spotlightConfig.endTime : undefined
      },
      {
        id: 'promo',
        badge: `🌙 ${nightPromo.badge}`,
        title: nightPromo.title,
        subtitle: nightPromo.subtitle,
        image: nightPromo.image,
        accentColor: '#e040fb',
        icon: 'promo',
        promoData: nightPromo,
        endTime: spotlightConfig.mode === 'promo_noche' ? spotlightConfig.endTime : undefined
      },
      {
        id: 'chef',
        badge: CHEF_RECOMMENDATION.badge,
        title: CHEF_RECOMMENDATION.title,
        subtitle: CHEF_RECOMMENDATION.subtitle,
        image: `${BUCKET_URL}/cevichemixto.jpg?v=3`,
        accentColor: '#00e5ff',
        icon: 'chef'
      },
      {
        id: 'desayuno',
        badge: SUNDAY_BREAKFAST_PROMO.badge,
        title: SUNDAY_BREAKFAST_PROMO.title,
        subtitle: SUNDAY_BREAKFAST_PROMO.subtitle,
        image: SUNDAY_BREAKFAST_PROMO.image,
        accentColor: '#f59e0b',
        icon: 'desayuno',
        endTime: spotlightConfig.mode === 'desayuno_domingo' ? spotlightConfig.endTime : undefined
      }
    ];
    setSlides(generatedSlides);

    if (spotlightConfig.shouldAutoOpen && !hasAutoOpened && generatedSlides.length > 0) {
      let targetIndex = generatedSlides.findIndex(s => s.id === (spotlightConfig.mode === 'menu_del_dia' ? 'menu' : spotlightConfig.mode === 'promo_noche' ? 'promo' : 'desayuno'));
      if (targetIndex === -1) targetIndex = 0;

      setCurrentSlideIndex(targetIndex);
      setModalData({
        type: generatedSlides[targetIndex].id,
        title: generatedSlides[targetIndex].title,
        badge: generatedSlides[targetIndex].badge,
        image: generatedSlides[targetIndex].image,
        dailyData: generatedSlides[targetIndex].dailyData,
        promoData: generatedSlides[targetIndex].promoData,
        endTime: generatedSlides[targetIndex].endTime
      });

      const timer = setTimeout(() => {
        setIsModalOpen(true);
        setHasAutoOpened(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [spotlightConfig.shouldAutoOpen, spotlightConfig.mode, spotlightConfig.endTime, hasAutoOpened]);

  useEffect(() => {
    if (slides.length === 0 || isModalOpen) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length, isModalOpen]);

  // --- ESCUCHADOR DE LA CAMPANA (NUEVO) ---
  useEffect(() => {
    const handleOpenModal = () => {
      if (slides.length > 0) {
        setModalData({
          type: slides[currentSlideIndex].id,
          title: slides[currentSlideIndex].title,
          badge: slides[currentSlideIndex].badge,
          image: slides[currentSlideIndex].image,
          dailyData: slides[currentSlideIndex].dailyData,
          promoData: slides[currentSlideIndex].promoData,
          endTime: slides[currentSlideIndex].endTime
        });
        setIsModalOpen(true);
      }
    };

    window.addEventListener('abrirOfertaCampana', handleOpenModal);
    return () => window.removeEventListener('abrirOfertaCampana', handleOpenModal);
  }, [slides, currentSlideIndex]);

  const handleBannerClick = () => {
    setModalData({
      type: slides[currentSlideIndex].id,
      title: slides[currentSlideIndex].title,
      badge: slides[currentSlideIndex].badge,
      image: slides[currentSlideIndex].image,
      dailyData: slides[currentSlideIndex].dailyData,
      promoData: slides[currentSlideIndex].promoData,
      endTime: slides[currentSlideIndex].endTime
    });
    setIsModalOpen(true);
  };

  if (slides.length === 0) return null;
  const currentSlide = slides[currentSlideIndex];

  const renderIcon = () => {
    switch (currentSlide.icon) {
      case 'menu': return <Utensils size={11} className="text-amber-400" />;
      case 'promo': return <Moon size={11} className="text-fuchsia-400" />;
      case 'desayuno': return <Coffee size={11} className="text-amber-400" />;
      default: return <Sparkles size={11} className="text-cyan-400 fill-cyan-400" />;
    }
  };

  return (
    <>
      <article
        onClick={handleBannerClick}
        className="relative p-[1.5px] rounded-[1.8rem] overflow-hidden group shadow-lg transition-all duration-500 cursor-pointer active:scale-[0.98]"
        style={{ boxShadow: `0 0 14px ${currentSlide.accentColor}55` }}
      >
        <div className="absolute inset-0 pointer-events-none rounded-[1.8rem] overflow-hidden">
          <Image src={`${BUCKET_URL}/tiramaestra.png`} alt="Borde" fill className="object-cover" unoptimized />
        </div>

        <div className="relative bg-[#0d0d12] rounded-[1.7rem] overflow-hidden h-[14.5rem] flex flex-col justify-end p-5">
          {slides.map((slide, index) => (
            <div key={slide.id} className={`absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none ${index === currentSlideIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
              <Image src={slide.image} alt={slide.title} fill className="object-cover" unoptimized priority={index === 0} />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
            {slides.map((_, idx) => (
              <button key={idx} type="button" onClick={(e) => { e.stopPropagation(); setCurrentSlideIndex(idx); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlideIndex ? 'w-5 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'w-1.5 bg-white/30 hover:bg-white/60'}`}
              />
            ))}
          </div>
          <div className="relative z-20 flex flex-col items-start select-none transition-all duration-300">
            <div className="flex items-center gap-1.5 bg-[#0a0a0f]/90 border border-white/15 backdrop-blur-md rounded-full px-2.5 py-1 mb-2 shadow-md">
              {renderIcon()}
              <span className="text-[9px] font-black uppercase tracking-wider text-zinc-200">{currentSlide.badge}</span>
              <span className="text-[9px] bg-amber-400 text-black px-1.5 py-0.2 rounded-full font-black animate-pulse">VER DETALLES</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-serif tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] flex items-center gap-1">
              {currentSlide.title} <ChevronRight size={18} className="text-amber-400" />
            </h3>
            <p className="text-xs text-zinc-200 mt-1 font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] line-clamp-2">{currentSlide.subtitle}</p>
          </div>
        </div>
      </article>

      <SpotlightDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
        onNavigateToCategory={(catSlug) => router.push(`/mantas/categoria/${catSlug}`)}
      />
    </>
  );
}