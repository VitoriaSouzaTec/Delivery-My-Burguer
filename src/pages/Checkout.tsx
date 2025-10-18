import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Header from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";


import { checkoutSchema, CheckoutForm } from "@/schemas/checkoutSchema";

import { buildWhatsAppOrder } from "@/utils/orderFommater";


import { PersonalDetails } from "@/components/checkout/PersonalDetails";
import { DeliveryType } from "@/components/checkout/DeliveryType";
import { DeliveryAddress } from "@/components/checkout/DeliveryAddress";
import { PaymentMethod } from "@/components/checkout/PaymentMethod";
import { Observations } from "@/components/checkout/Observations";
import { OrderSummary } from "@/components/checkout/OrderSummary"; 

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryType: "delivery",
      paymentMethod: "card",
    },
  });

  const deliveryType = form.watch("deliveryType"); 


  if (items.length === 0) {
    navigate("/cart");
    return null;
  }


  const onSubmit = (data: CheckoutForm) => {
    setIsSubmitting(true);
    
    // função utilitaria URL do WhatsApp
    const whatsappUrl = buildWhatsAppOrder(data, items, total);
    
    window.open(whatsappUrl, "_blank");
    
    toast({
      title: "Pedido enviado!",
      description: "Você será redirecionado para o WhatsApp",
    });

    clearCart();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };


  return (
    <div className="min-h-screen">
      <Header />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Finalizar Pedido</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <PersonalDetails form={form} />
                <DeliveryType form={form} />
                
                
                {deliveryType === "delivery" && <DeliveryAddress form={form} />}
                
                <PaymentMethod form={form} />
                <Observations form={form} />

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Finalizar Pedido via WhatsApp"}
                </Button>
              </form>
            </Form>
          </div>

          <div>
            <OrderSummary items={items} total={total} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;