// src/app/[restaurante_slug]/checkout/page.tsx
'use client';

import { useState } from 'react';
import { ArrowLeft, Trash2, MapPin, Utensils } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/features/cart/store/useCartStore';

export default function CheckoutView({ params }: { params: { restaurante_slug: string } }) {
  const router = useRouter();
  
  const items = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.getTotalAmount());
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'table' | 'delivery'>('table');
  const [tableNumber, setTableNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');

  const isFormValid = customerName.trim().length > 2 && (
    (orderType === 'table' && tableNumber.trim() !== '') || 
    (orderType === 'delivery' && deliveryAddress.trim() !== '')
  );

  const handleSendOrder = () => {
    if (!isFormValid) return;

    // Cambia este número por el WhatsApp del restaurante (Incluye el 39 de Italia, sin el +)
    const restaurantPhone = "393000000000"; 

    let message = `*NUEVO PEDIDO - MANTAS* 🍽️\n\n`;
    message += `*Cliente:* ${customerName}\n`;
    
    if (orderType === 'table') {
      message += `*Modalidad:* En el Local 📍\n`;
      message += `*Mesa:* ${tableNumber}\n`;
    } else {
      message += `*Modalidad:* Para Llevar / Delivery 🛵\n`;
      message += `*Dirección:* ${deliveryAddress}\n`;
    }
    
    message += `\n*RESUMEN DEL PEDIDO:*\n`;
    message += `-------------------------\n`;

    items.forEach((item) => {
      const price = item.dish.price.table || item.dish.price.standard;
      const totalItemPrice = price * item.quantity;
      
      message += `▪️ ${item.quantity}x ${item.dish.name} (€${totalItemPrice.toFixed(2)})\n`;
      
      if (item.notes) {
         message += `   _Nota: ${item.notes}_\n`;
      }
    });

    message += `-------------------------\n`;
    message += `*TOTAL A PAGAR: €${totalAmount.toFixed(2)}*\n\n`;

    if (generalNotes.trim() !== '') {
      message += `*Notas Adicionales:*\n_${generalNotes}_\n\n`;
    }

    message += `¡Gracias por tu compra!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${restaurantPhone}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen font-sans w-full sm:max-w-md mx-auto flex flex-col items-center justify-center p-6" style={{ backgroundColor: "#09090B" }}>
        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
          <Utensils size={32} className="text-zinc-500" />
        </div>
        <h2 className="text-2xl font-medium mb-2 text-white">Tu pedido está vacío</h2>
        <p className="text-zinc-500 text-center mb-8">Agrega platos deliciosos para continuar.</p>
        <button 
          onClick={() => router.back()}
          className="bg-[#E4B363] text-black px-8 py-3 rounded-full font-bold w-full max-w-[200px] active:scale-95 transition-transform"
        >
          Volver al Menú
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen font-sans w-full sm:max-w-md mx-auto overflow-x-hidden text-zinc-100 pb-32 relative" style={{ backgroundColor: "#09090B" }}>
      
      <header className="sticky top-0 z-40 bg-[#09090B]/90 backdrop-blur-md border-b border-zinc-800/50">
        <div className="flex items-center px-4 py-4 gap-4">
          <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full active:bg-zinc-800 transition-colors">
            <ArrowLeft size={24} className="text-zinc-300" />
          </button>
          <h1 className="text-lg font-bold tracking-wide uppercase text-white">Tu Pedido</h1>
        </div>
      </header>

      <section className="px-5 py-6">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Platos Seleccionados</h3>
        
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.dish.id} className="flex gap-4 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-4">
              <div className="flex-1">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-semibold text-white leading-tight">{item.dish.name}</h4>
                  <span className="font-bold text-white shrink-0">
                     € {((item.dish.price.table || item.dish.price.standard) * item.quantity).toFixed(2)}
                  </span>
                </div>
                {item.notes && (
                  <p className="text-xs text-[#E4B363] mt-1 italic">"{item.notes}"</p>
                )}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-3 bg-black/40 border border-zinc-700 rounded-full px-1 py-1">
                    <button 
                      onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 active:bg-zinc-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-medium text-sm w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 active:bg-zinc-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeItem(item.dish.id)}
                    className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-2">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 mt-6">Datos de Envío</h3>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-5">
          
          <div className="flex bg-black/40 rounded-xl p-1 border border-zinc-800">
             <button 
                onClick={() => setOrderType('table')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${orderType === 'table' ? 'bg-[#E4B363] text-black shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
                <Utensils size={16} />
                En el Local
             </button>
             <button 
                onClick={() => setOrderType('delivery')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${orderType === 'delivery' ? 'bg-[#E4B363] text-black shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
                <MapPin size={16} />
                Para Llevar
             </button>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 font-medium ml-1">Tu Nombre</label>
            <input 
              type="text" 
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Ej: Ale"
              className="w-full bg-black/40 border border-zinc-800 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E4B363] transition-colors"
            />
          </div>

          {orderType === 'table' ? (
            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 font-medium ml-1">Número de Mesa</label>
              <input 
                type="number" 
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="Ej: 4"
                className="w-full bg-black/40 border border-zinc-800 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E4B363] transition-colors"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 font-medium ml-1">Dirección de Entrega</label>
              <input 
                type="text" 
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Ej: Via Roma 123..."
                className="w-full bg-black/40 border border-zinc-800 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E4B363] transition-colors"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 font-medium ml-1">Notas del Pedido (Opcional)</label>
            <textarea 
              value={generalNotes}
              onChange={(e) => setGeneralNotes(e.target.value)}
              placeholder="Ej: Enviar cubiertos, pagaré en efectivo..."
              className="w-full bg-black/40 border border-zinc-800 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E4B363] resize-none h-20 transition-colors"
            />
          </div>

        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 sm:max-w-md mx-auto p-4 bg-gradient-to-t from-[#09090B] via-[#09090B]/95 to-transparent backdrop-blur-md z-50">
        <button 
          onClick={handleSendOrder}
          disabled={!isFormValid}
          className={`w-full py-4 rounded-[2rem] font-black flex items-center justify-between px-6 transition-all ${
            isFormValid 
              ? 'bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.3)] active:scale-95 cursor-pointer' 
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
          }`}
        >
          <span className="uppercase tracking-widest text-sm">Invia Ordine</span>
          <span className="text-lg">€ {totalAmount.toFixed(2)}</span>
        </button>
      </div>

    </main>
  );
}