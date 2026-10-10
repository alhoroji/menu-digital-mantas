// src/core/utils/whatsapp_formatter.ts

// Usaremos un tipo temporal simple para el ítem del carrito
export interface CartItem {
    name: string;
    quantity: number;
    price: number;
    notes?: string;
}

export interface OrderData {
    restaurantPhone: string;
    customerName: string;
    deliveryAddress?: string; // Opcional, si es para llevar a casa
    tableNumber?: string;     // Opcional, si está en el restaurante
    items: CartItem[];
    total: number;
}

export function generateWhatsAppLink(order: OrderData): string {
    let message = `🍽️ *NUEVO PEDIDO*\n`;
    message += `👤 Cliente: ${order.customerName}\n`;
    
    if (order.tableNumber) {
        message += `📍 Mesa: ${order.tableNumber}\n`;
    } else if (order.deliveryAddress) {
        message += `🏠 Delivery: ${order.deliveryAddress}\n`;
    }

    message += `\n📝 *DETALLE DEL PEDIDO:*\n`;

    order.items.forEach(item => {
        message += `▪️ ${item.quantity}x ${item.name} (S/ ${(item.price * item.quantity).toFixed(2)})\n`;
        if (item.notes) {
            message += `   _Nota: ${item.notes}_\n`;
        }
    });

    message += `\n💰 *TOTAL:* S/ ${order.total.toFixed(2)}`;

    // Codificamos el mensaje para que sea una URL válida
    const encodedMessage = encodeURIComponent(message);
    
    // Limpiamos el número de teléfono (quitamos espacios o caracteres raros)
    const cleanPhone = order.restaurantPhone.replace(/\D/g, '');

    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}