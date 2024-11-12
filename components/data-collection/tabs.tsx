"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ForageForm } from "./forage-form";
import { InjectionForm } from "./injection-form";
import { TensionForm } from "./tension-form";

export function DataCollectionTabs() {
  return (
    <Tabs defaultValue="forage" className="space-y-4">
      <TabsList>
        <TabsTrigger value="forage">Forage Data</TabsTrigger>
        <TabsTrigger value="injection">Injection Data</TabsTrigger>
        <TabsTrigger value="tension">Tension Data</TabsTrigger>
      </TabsList>
      <TabsContent value="forage">
        <ForageForm />
      </TabsContent>
      <TabsContent value="injection">
        <InjectionForm />
      </TabsContent>
      <TabsContent value="tension">
        <TensionForm />
      </TabsContent>
    </Tabs>
  );
}