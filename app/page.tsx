import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Database, FileSpreadsheet, Settings } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Project Management",
      description: "Create and manage field data collection projects",
      icon: <ClipboardList className="h-6 w-6" />,
      href: "/projects"
    },
    {
      title: "Data Collection",
      description: "Record forage, injection, and tension data",
      icon: <Database className="h-6 w-6" />,
      href: "/data-collection"
    },
    {
      title: "Reports",
      description: "Generate and export PDF reports",
      icon: <FileSpreadsheet className="h-6 w-6" />,
      href: "/reports"
    },
    {
      title: "Settings",
      description: "Configure workflow rules and preferences",
      icon: <Settings className="h-6 w-6" />,
      href: "/settings"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter">
          Field Data Collection System
        </h1>
        <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
          Professional solution for managing field data collection projects, 
          workflows, and generating comprehensive reports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="hover:shadow-lg transition-shadow">
            <Link href={feature.href}>
              <CardHeader>
                <div className="mb-4 w-fit p-2 rounded-lg bg-primary/10">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button asChild size="lg">
          <Link href="/projects">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}