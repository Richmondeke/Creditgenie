export type UserRole = "USER" | "STAFF" | "TEAM_LEAD" | "CREDIT" | "LEGAL" | "ADMIN";

export type ApplicationStatus =
    | "DRAFT"
    | "PENDING_TEAM_LEAD"
    | "PENDING_CREDIT"
    | "PENDING_LEGAL"
    | "APPROVED"
    | "NEEDS_CHANGES"
    | "REJECTED";

export interface ReviewAction {
    role: Exclude<UserRole, "USER">;
    approved: boolean;
    comment?: string;
    date: string;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    creditLimit: number;
    availableLimit: number;
}

export interface LoanApplication {
    id: string;
    userId: string;
    applicantName: string;
    rcNumber?: string;
    companyAddress?: string;
    directors?: Array<{ name: string; role: string }>;
    amount: number;
    purpose: string;
    industry?: string;
    tenure?: number;
    status: ApplicationStatus;
    createdAt: string;
    updatedAt: string;
    documents: Array<{ name: string; url: string }>;
    reviews: Array<ReviewAction>;
}
