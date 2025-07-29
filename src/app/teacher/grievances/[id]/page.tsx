import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { MOCK_GRIEVANCES, MOCK_EXAMS } from "@/lib/mock-data";
import { Separator } from "@/components/ui/separator";
import { Check, X, Send, User, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

export default function GrievanceDetailPage({ params }: { params: { id: string } }) {
  const grievance = MOCK_GRIEVANCES.find(g => g.id === params.id);

  if (!grievance) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <PageHeader title="Grievance not found" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader
        title="Grievance Details"
        description={`Reviewing grievance from ${grievance.studentName}`}
      >
        <div className="flex items-center gap-2">
            <Button variant="outline">
                <X className="mr-2 h-4 w-4" />
                Dismiss
            </Button>
            <Button>
                <Check className="mr-2 h-4 w-4" />
                Mark as Resolved
            </Button>
        </div>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Grievance from {grievance.studentName}</CardTitle>
                    <CardDescription>
                        Regarding the exam: <strong>{grievance.examTitle}</strong>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{grievance.details}</p>
                </CardContent>
            </Card>
            
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="font-headline">Your Response</CardTitle>
                    <CardDescription>Compose a reply to the student.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea 
                        placeholder="Type your detailed response here..."
                        className="min-h-[150px]"
                    />
                    <div className="flex justify-end">
                        <Button>
                            <Send className="mr-2 h-4 w-4" />
                            Send Reply
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>

        <Card className="lg:sticky lg:top-6">
            <CardHeader>
                <CardTitle className="font-headline">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{grievance.studentName}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Submitted on: {grievance.dateSubmitted}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span>Type: {grievance.grievanceType}</span>
                </div>
                 {grievance.questionNumber && (
                    <div className="flex items-center gap-2">
                        <span className="ml-6 font-semibold">Question: {grievance.questionNumber}</span>
                    </div>
                )}
                <Separator />
                 <div className="flex items-center justify-between">
                    <span>Status</span>
                    <Badge variant={grievance.status === 'Pending' ? 'secondary' : grievance.status === 'Resolved' ? 'default' : 'outline'}>
                       {grievance.status}
                    </Badge>
                 </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
