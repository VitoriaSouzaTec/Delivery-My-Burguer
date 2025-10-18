import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormControl, FormMessage, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CheckoutForm } from "@/schemas/checkoutSchema";

interface ObservationsProps {
  form: UseFormReturn<CheckoutForm>;
}

export function Observations({ form }: ObservationsProps) {
  return (
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
  );
}