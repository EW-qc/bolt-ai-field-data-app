import { DataCollectionTabs } from "@/components/data-collection/tabs";
import { Card } from "@/components/ui/card";

export default function DataCollectionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Collection</h1>
        <p className="text-muted-foreground">
          Record and manage field data for your projects
        </p>
      </div>

      <Card className="p-6">
        <DataCollectionTabs />
      </Card>
    </div>
  );
}