import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Check, X } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { MOCK_GRIEVANCES } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

const statusColors = {
  Pending: "bg-amber-500",
  Reviewed: "bg-blue-500",
  Resolved: "bg-green-500",
};

export default function GrievancesPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader
        title="Grievances & Complaints"
        description="Review and respond to student-submitted grievances."
      />
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead>Grievance Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_GRIEVANCES.map((grievance) => (
                <TableRow key={grievance.id}>
                  <TableCell className="font-medium">{grievance.studentName}</TableCell>
                  <TableCell>{grievance.examTitle}</TableCell>
                  <TableCell>{grievance.grievanceType}</TableCell>
                  <TableCell>{grievance.dateSubmitted}</TableCell>
                  <TableCell>
                    <Badge variant={grievance.status === 'Pending' ? 'secondary' : grievance.status === 'Resolved' ? 'default' : 'outline'}>
                       {grievance.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Check className="mr-2 h-4 w-4" />
                          Mark as Resolved
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <X className="mr-2 h-4 w-4" />
                          Dismiss
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
