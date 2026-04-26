export type ApplicationStatus =
    | "DRAFT"
    | "PENDING_TEAM_LEAD"
    | "PENDING_CREDIT"
    | "PENDING_LEGAL"
    | "APPROVED"
    | "NEEDS_CHANGES"
    | "REJECTED";

export interface ReviewAction {
    role: "STAFF" | "TEAM_LEAD" | "CREDIT" | "LEGAL";
    approved: boolean;
    comment?: string;
    date: string;
}

export interface LoanApplication {
    id: string;
    applicantName: string;
    rcNumber?: string;
    companyAddress?: string;
    directors?: Array<{ name: string; role: string }>;
    amount: number;
    purpose: string;
    status: ApplicationStatus;
    createdAt: string;
    updatedAt: string;
    documents: Array<{ name: string; url: string }>;
    reviews: Array<ReviewAction>;
}
