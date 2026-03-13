export enum TwentyDealValue {
    UNDER_1K = "UNDER_1K",
    OPT1K_5K = "OPT1K_5K",
    OPT5K_10K = "OPT5K_10K",
    OPT10K = "OPT10K",
}

export enum TwentyTimeline {
    ASAP = "ASAP",
    OPT2_4_WEEKS = "OPT2_4_WEEKS",
    OPT1_3_MONTHS = "OPT1_3_MONTHS",
    RESEARCHING = "RESEARCHING",
}

export enum TwentyCrm {
    SALESFORCE = "SALESFORCE",
    HUBSPOT = "HUBSPOT",
    PIPEDRIVE = "PIPEDRIVE",
    ZOHO = "ZOHO",
    NONE = "NONE",
    OTHER = "OTHER",
}

export enum TwentyLeadSource {
    AUTONOMAAI = "AUTONOMAAI",
    PROTOLYLAT = "PROTOLYLAT",
    WEB_CONTACT = "WEB_CONTACT"
}

export interface TwentyLink {
    primaryLinkLabel: string
    primaryLinkUrl: string
    secondaryLinks: any[]
}

export interface TwentyPersonDto {
    leadSource: TwentyLeadSource
    leadScore?: number
    name: {
        firstName: string
        lastName: string
    }
    emails: {
        primaryEmail: string
        additionalEmails: string[] | null
    }
    phones: {
        primaryPhoneNumber: string
        primaryPhoneCallingCode?: string
        primaryPhoneCountryCode?: string
        additionalPhones: string[] | null
    }
    jobTitle?: string
    city?: string
    companyId?: string
    xLink?: TwentyLink
    linkedinLink?: TwentyLink
}

export interface TwentyCompanyDto {
    name: string
    domainName: TwentyLink
    employees?: number
    currentCrm?: TwentyCrm
    crmdetail?: string
    monthlyLeads?: string
    avgDealValue?: TwentyDealValue
    timeline?: TwentyTimeline
    address?: {
        addressStreet1?: string
        addressCity?: string
        addressCountry?: string
    }
    xLink?: TwentyLink
    linkedinLink?: TwentyLink
    annualRecurringRevenue?: {
        amountMicros: number
        currencyCode: string
    }
}

export interface TwentyRestPayload {
    company: TwentyCompanyDto
    person: TwentyPersonDto
}
