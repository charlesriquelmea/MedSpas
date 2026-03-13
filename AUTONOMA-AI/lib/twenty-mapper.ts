import {
    TwentyRestPayload,
    TwentyLeadSource,
    TwentyDealValue,
    TwentyTimeline,
    TwentyCrm
} from "../types/twenty";

const CRM_MAP: Record<string, TwentyCrm> = {
    'salesforce': TwentyCrm.SALESFORCE,
    'hubspot': TwentyCrm.HUBSPOT,
    'pipedrive': TwentyCrm.PIPEDRIVE,
    'zoho': TwentyCrm.ZOHO,
    'none': TwentyCrm.NONE,
    'other': TwentyCrm.OTHER
};

const DEAL_VALUE_MAP: Record<string, TwentyDealValue> = {
    'under-1k': TwentyDealValue.UNDER_1K,
    '1k-5k': TwentyDealValue.OPT1K_5K,
    '5k-20k': TwentyDealValue.OPT5K_10K,
    '20k-plus': TwentyDealValue.OPT10K,
};

const TIMELINE_MAP: Record<string, TwentyTimeline> = {
    'asap': TwentyTimeline.ASAP,
    '2-4-weeks': TwentyTimeline.OPT2_4_WEEKS,
    '1-3-months': TwentyTimeline.OPT1_3_MONTHS,
    'researching': TwentyTimeline.RESEARCHING,
};

export function mapWizardToTwenty(formData: any, leadScore: number): TwentyRestPayload {
    // Extract domain from email
    const emailDomain = formData.email?.split('@')[1] || "unknown.com";

    // Split Name
    const fullName = formData.fullName || "";
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "Unknown";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    // Combine Details
    const painPoints = Array.isArray(formData.painPoints) ? formData.painPoints.join(", ") : formData.painPoints;
    const crmDetail = `Pain Points: ${painPoints || 'None'}. Other CRM: ${formData.otherCrm || 'N/A'}.`;

    return {
        company: {
            name: formData.company || "Unknown Company",
            domainName: {
                primaryLinkUrl: `https://${emailDomain}`,
                primaryLinkLabel: emailDomain,
                secondaryLinks: []
            },
            employees: 0,
            currentCrm: CRM_MAP[formData.crm] || TwentyCrm.OTHER,
            crmdetail: crmDetail,
            monthlyLeads: String(formData.leadsPerMonth || "0"),
            avgDealValue: DEAL_VALUE_MAP[formData.dealValue] || TwentyDealValue.UNDER_1K,
            timeline: TIMELINE_MAP[formData.timeline] || TwentyTimeline.RESEARCHING,
            annualRecurringRevenue: {
                amountMicros: 0,
                currencyCode: "EUR"
            }
        },
        person: {
            leadSource: TwentyLeadSource.AUTONOMAAI,
            leadScore: leadScore,
            name: {
                firstName: firstName,
                lastName: lastName
            },
            emails: {
                primaryEmail: formData.email || "",
                additionalEmails: null
            },
            phones: {
                primaryPhoneNumber: formData.phone || "",
                additionalPhones: null
            }
        }
    };
}
