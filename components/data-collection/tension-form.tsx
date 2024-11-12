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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const tensionFormSchema = z.object({
  date: z.string(),
  forceApplied: z.string().transform(Number),
  measurements: z.string().transform((val) => {
    try {
      return JSON.parse(val);
    } catch {
      return {};
    }
  }),
});

type TensionFormValues = z.infer<typeof tensionFormSchema>;

export function TensionForm() {
  const form = useForm<TensionFormValues>({
    resolver: zodResolver(tensionFormSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      forceApplied: "",
      measurements: "{}",
    },
  });

  async function onSubmit(data: TensionFormValues) {
    try {
      const response = await fetch("/api/data-collection/tension", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit tension data");

      toast({
        title: "Success",
        description: "Tension data has been recorded.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit tension data. Please try again.",
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
          name="forceApplied"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Force Applied (kN)</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="measurements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Measurements (JSON)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='{"reading1": 100, "reading2": 200}'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Tension Data</Button>
      </form>
    </Form>
  );
}