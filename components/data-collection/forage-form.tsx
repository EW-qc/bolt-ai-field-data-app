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

const forageFormSchema = z.object({
  date: z.string(),
  depth: z.string().transform(Number),
  diameter: z.string().transform(Number),
  machineNumber: z.string(),
});

type ForageFormValues = z.infer<typeof forageFormSchema>;

export function ForageForm() {
  const form = useForm<ForageFormValues>({
    resolver: zodResolver(forageFormSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      depth: "",
      diameter: "",
      machineNumber: "",
    },
  });

  async function onSubmit(data: ForageFormValues) {
    try {
      const response = await fetch("/api/data-collection/forage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit forage data");

      toast({
        title: "Success",
        description: "Forage data has been recorded.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit forage data. Please try again.",
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
          name="depth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Depth (m)</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="diameter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diameter (mm)</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="machineNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Machine Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Forage Data</Button>
      </form>
    </Form>
  );
}