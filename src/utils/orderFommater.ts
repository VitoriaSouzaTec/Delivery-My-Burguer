import { CheckoutForm } from "@/schemas/checkoutSchema"; // Importar a tipagem
import { CartItem } from "@/contexts/CartContext"; // Assumindo que CartItem está exportado

const WHATSAPP_NUMBER = "5511999999999"; // Mantenha aqui ou em um arquivo de constantes/env

export function buildWhatsAppOrder(data: CheckoutForm, items: CartItem[], total: number) {
  let orderText = `*NOVO PEDIDO*%0A%0A`;
  orderText += `*Cliente:* ${data.name}%0A`;
  orderText += `*Telefone:* ${data.phone}%0A%0A`;

  orderText += `*Itens do Pedido:*%0A`;
  items.forEach((item) => {
    orderText += `• ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}%0A`;
  });

  orderText += `%0A*Total:* R$ ${total.toFixed(2)}%0A%0A`;

  if (data.deliveryType === "delivery") {
    orderText += `*Tipo:* Entrega%0A`;
    orderText += `*Endereço:* ${data.address}, ${data.number}%0A`;
    orderText += `*Bairro:* ${data.neighborhood}%0A`;
    orderText += `*Cidade:* ${data.city} - ${data.state}%0A`;
    orderText += `*CEP:* ${data.zipCode}%0A%0A`;
  } else {
    orderText += `*Tipo:* Retirada no Local%0A%0A`;
  }

  const paymentLabels = {
    card: "Cartão na Entrega",
    cash: "Dinheiro na Entrega",
    pix: "PIX",
  };
  orderText += `*Forma de Pagamento:* ${paymentLabels[data.paymentMethod]}%0A`;

  if (data.paymentMethod === "cash" && data.changeFor) {
    orderText += `*Troco para:* R$ ${data.changeFor}%0A`;
  }

  if (data.observations) {
    orderText += `%0A*Observações:* ${data.observations}%0A`;
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${orderText}`;
  return whatsappUrl;
}