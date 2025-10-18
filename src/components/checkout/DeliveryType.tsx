import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckoutForm } from "@/schemas/checkoutSchema";

interface DeliveryTypeProps {
  form: UseFormReturn<CheckoutForm>;
}

export function DeliveryType({ form }: DeliveryTypeProps) {
  return (
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
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}