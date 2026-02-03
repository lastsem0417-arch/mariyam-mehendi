export const sendToWhatsApp = (formData, cart, total) => {
  const phoneNumber = "919409347705"; // Yahan Mariyam ka original WhatsApp number dalo
  
  // Cart items ko text mein convert karo
  const itemsText = cart.map(item => 
    `• ${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`
  ).join('\n');

  const message = `*Naya Order - Mariyam Mehendi*%0A
--------------------------%0A
*Customer Details:*%0A
Name: ${formData.name}%0A
Phone: ${formData.phone}%0A
Address: ${formData.address}, ${formData.city} - ${formData.pincode}%0A
--------------------------%0A
*Order Summary:*%0A
${itemsText}%0A
--------------------------%0A
*Total Amount: ₹${total}*%0A
--------------------------%0A
Placed from: Mariyam Mehendi Website (Vapi)`;

  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
};