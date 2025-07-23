import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/page-header";
import { MOCK_EXAMS } from "@/lib/mock-data";
import { Send, UploadCloud } from "lucide-react";

export default function StudentGrievancePage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader
        title="Submit a Grievance"
        description="If you believe there is an error in your grading, please fill out this form."
      />

      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="exam-selection">Select Exam</Label>
                <Select>
                  <SelectTrigger id="exam-selection">
                    <SelectValue placeholder="Choose the relevant exam..." />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_EXAMS.map(exam => (
                      <SelectItem key={exam.id} value={exam.id}>
                        {exam.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="grievance-type">Grievance Type</Label>
                <Select>
                  <SelectTrigger id="grievance-type">
                    <SelectValue placeholder="Select the type of issue..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score-disagreement">Score Disagreement</SelectItem>
                    <SelectItem value="incorrect-feedback">Incorrect Feedback</SelectItem>
                    <SelectItem value="missing-answer">Missing Answer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="question-number">Question Number (Optional)</Label>
              <Input id="question-number" type="number" placeholder="e.g., 5" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grievance-text">Describe your grievance</Label>
              <Textarea
                id="grievance-text"
                placeholder="Please provide a detailed explanation of the issue (min. 50 characters)."
                className="min-h-[150px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Upload Supporting Files (Optional)</Label>
              <div className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed hover:border-primary">
                <div className="text-center">
                  <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Drag & drop or click to upload files.
                  </p>
                </div>
                <Input type="file" className="sr-only" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button size="lg">
                <Send className="mr-2 h-4 w-4" />
                Submit Grievance
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
