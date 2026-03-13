import { TwentyRestPayload } from "../types/twenty";

export async function publishToTwenty(payload: TwentyRestPayload) {
    const apiUrl = process.env.TWENTY_API_URL; // Base URL e.g. https://crm.protolylat.com
    const apiKey = process.env.TWENTY_API_KEY;

    if (!apiUrl) {
        console.warn("Skipping Twenty CRM sync: TWENTY_API_URL not defined");
        return;
    }

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey || ""}`
    };

    try {
        // 1. Create Company
        console.log("Creating Company in Twenty CRM...");
        const companyRes = await fetch(`${apiUrl}/rest/companies`, {
            method: "POST",
            headers,
            body: JSON.stringify(payload.company)
        });

        if (!companyRes.ok) {
            const err = await companyRes.text();
            console.error(`Twenty CRM Company Creation Failed: ${companyRes.status}`, err);
            // We continue? Or stop? If company fails, person creation might fail if we needed ID, 
            // but we can try creating person without company link if necessary.
            // For now, let's treat it as critical.
            return;
        }

        const companyData = await companyRes.json();
        const companyId = companyData?.data?.createCompany?.id || companyData?.id;
        // Note: Check response structure. Standard REST usually returns object. 
        // User example 'curl' doesn't show response, but typical Twenty REST returns { data: { ... } } or flat.
        // I will assume { data: { ... } } based on previous schema, or just check both.

        console.log(`Company Created. ID: ${companyId}`);

        // 2. Create Person (Linked to Company)
        // We inject companyId into the person payload
        const personPayload = {
            ...payload.person,
            companyId: companyId
        };

        console.log("Creating Person in Twenty CRM...");
        const personRes = await fetch(`${apiUrl}/rest/people`, {
            method: "POST",
            headers,
            body: JSON.stringify(personPayload)
        });

        if (!personRes.ok) {
            const err = await personRes.text();
            console.error(`Twenty CRM Person Creation Failed: ${personRes.status}`, err);
        } else {
            console.log("Person Created successfully.");
        }

    } catch (error) {
        console.error("Error syncing to Twenty CRM:", error);
    }
}
