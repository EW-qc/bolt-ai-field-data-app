"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const injectionFormSchema = z.object({
  date: z.string(),
  groutQuantity: z.string().transform(Number),
  type: z.string(),
  unitNumber: z.string(),
});

type InjectionFormValues = z.infer<typeof injectionFormSchema>;

export function InjectionForm() {
  const form = useForm<InjectionFormValues>({
    resolver: zodResolver(injectionFormSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      groutQuantity: "",
      type: "",
      unitNumber: "",
    },
  });

  async function onSubmit(data: InjectionFormValues) {
    try {
      const response = await fetch("/api/data-collection/injection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit injection data");

      toast({
        title: "Success",
        description: "Injection data has been recorded.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit injection data. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="groutQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grout Quantity (kg)</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unitNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Injection Data</Button>
      </form>
    </Form>
  );
}