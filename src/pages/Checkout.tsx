import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

const checkoutSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100),
  phone: z.string().min(10, "Telefone inválido").max(15),
  deliveryType: z.enum(["delivery", "pickup"]),
  address: z.string().optional(),
  number: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  paymentMethod: z.enum(["card", "cash", "pix"]),
  changeFor: z.string().optional(),
  observations: z.string().max(500).optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

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
  const paymentMethod = form.watch("paymentMethod");

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const onSubmit = (data: CheckoutForm) => {
    setIsSubmitting(true);

    // Build order summary
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

    // Redirect to WhatsApp
    const whatsappNumber = "5511999999999"; // Replace with actual number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${orderText}`;
    
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
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input placeholder="(11) 99999-9999" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tipo de Entrega</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="deliveryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="delivery" id="delivery" />
                                <label htmlFor="delivery" className="cursor-pointer">
                                  Entrega
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="pickup" id="pickup" />
                                <label htmlFor="pickup" className="cursor-pointer">
                                  Retirada no Local
                                </label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {deliveryType === "delivery" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Endereço de Entrega</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel>Rua</FormLabel>
                              <FormControl>
                                <Input placeholder="Nome da rua" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="neighborhood"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bairro</FormLabel>
                              <FormControl>
                                <Input placeholder="Bairro" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cidade</FormLabel>
                              <FormControl>
                                <Input placeholder="Cidade" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estado</FormLabel>
                              <FormControl>
                                <Input placeholder="SP" maxLength={2} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CEP</FormLabel>
                              <FormControl>
                                <Input placeholder="00000-000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Forma de Pagamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="card" id="card" />
                                <label htmlFor="card" className="cursor-pointer">
                                  Cartão na Entrega
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cash" id="cash" />
                                <label htmlFor="cash" className="cursor-pointer">
                                  Dinheiro na Entrega
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="pix" id="pix" />
                                <label htmlFor="pix" className="cursor-pointer">
                                  PIX
                                </label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {paymentMethod === "cash" && (
                      <FormField
                        control={form.control}
                        name="changeFor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Troco para quanto?</FormLabel>
                            <FormControl>
                              <Input placeholder="R$ 50,00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {paymentMethod === "pix" && (
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm mb-2">
                          <strong>Chave PIX:</strong> seuemail@exemplo.com
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Após o pagamento, envie o comprovante via WhatsApp
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Observações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="observations"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Alguma observação sobre o pedido?"
                              className="min-h-24"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

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
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-lg pt-3 border-t">
                    <span>Total</span>
                    <span className="text-primary">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
