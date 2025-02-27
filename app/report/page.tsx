"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function ReportPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Report submitted",
      description: "Thank you for your environmental report!",
    });
  };

  return (
    <MainLayout requireAuth>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Report Environmental Activity</h1>
        <p className="text-muted-foreground">
          Submit details about environmental issues or your sustainable activities
        </p>

        <Card className="max-w-2xl">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>New Report</CardTitle>
              <CardDescription>
                Fill out the form below to submit your environmental report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select defaultValue="activity">
                  <SelectTrigger id="report-type">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activity">Sustainable Activity</SelectItem>
                    <SelectItem value="issue">Environmental Issue</SelectItem>
                    <SelectItem value="suggestion">Improvement Suggestion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Brief title for your report" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide details about your environmental report"
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Upload Image (Optional)</Label>
                <Input id="image" type="file" accept="image/*" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Submit Report</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
}