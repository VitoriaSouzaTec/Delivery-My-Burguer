import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { CheckoutForm } from "@/schemas/checkoutSchema";

interface PaymentMethodProps {
  form: UseFormReturn<CheckoutForm>;
}

export function PaymentMethod({ form }: PaymentMethodProps) {
  const paymentMethod = form.watch("paymentMethod");

  return (
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
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Lógica condicional de troco */}
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

        {/* Informações do PIX */}
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
  );
}