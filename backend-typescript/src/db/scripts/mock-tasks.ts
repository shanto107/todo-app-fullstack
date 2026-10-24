export const MOCK_TASK_MARKER = "[MOCK-DATA]";

export type MockTask = {
    title: string;
    description: string;
};

export const mockTasks: MockTask[] = [
    {
        title: "Draft monthly administrative letter",
        description: `
            <p>Prepare the monthly administrative letter summarizing important office activities, pending matters, and upcoming administrative deadlines.</p>
            <p>The letter should use a formal tone and clearly identify any items that require action from department heads.</p>
        `
    },
    {
        title: "Prepare meeting follow-up note",
        description: `
            <p>Prepare a detailed follow-up note for the department meeting.</p>
            <p>Include the main discussion points, decisions that were reached, responsible personnel, and deadlines agreed upon during the meeting.</p>
        `
    },
    {
        title: "Prepare monthly office budget",
        description: `
            <p>Prepare the monthly office budget covering stationery, utilities, maintenance, transportation, and other recurring administrative expenses.</p>
            <p>Compare the proposed figures with the previous month's expenditure and highlight significant changes.</p>
        `
    },
    {
        title: "Generate monthly expenditure report",
        description: `
            <p>Compile the month's expenditure records into a consolidated financial report.</p>
            <p>Group expenses by category, verify supporting documents, and identify any unusual or unexpected expenditure that requires management attention.</p>
        `
    },
    {
        title: "Prepare staff attendance report",
        description: `
            <p>Generate the monthly staff attendance report using the available attendance records.</p>
            <p>Include working days, absences, late arrivals, approved leave, and other relevant attendance information for each employee.</p>
        `
    },
    {
        title: "Review incoming correspondence",
        description: `
            <p>Review all incoming official correspondence received during the current week.</p>
            <p>Classify each letter according to subject and urgency, identify the responsible department, and prepare a list of items requiring follow-up.</p>
        `
    },
    {
        title: "Write response to service request",
        description: `
            <p>Draft a formal response to the recently received service request.</p>
            <p>Clearly explain the current status of the request, any action already taken, and the expected next steps while maintaining a professional and courteous tone.</p>
        `
    },
    {
        title: "Prepare office supplies requisition",
        description: `
            <p>Prepare a requisition for commonly used office supplies including paper, folders, printer consumables, pens, notebooks, and other stationery.</p>
            <p>Review current stock levels before finalizing the requested quantities.</p>
        `
    },
    {
        title: "Prepare quarterly performance report",
        description: `
            <p>Compile the quarterly performance report for the department.</p>
            <p>Summarize completed activities, outstanding work, major achievements, operational challenges, and items that should receive attention during the next quarter.</p>
        `
    },
    {
        title: "Prepare departmental activity summary",
        description: `
            <p>Create a detailed summary of departmental activities completed during the reporting period.</p>
            <p>The report should organize activities by project or work category and include relevant dates, responsible teams, and current status.</p>
        `
    },
    {
        title: "Review office maintenance expenses",
        description: `
            <p>Review invoices and payment records related to office maintenance.</p>
            <p>Compare the current expenditure with the approved budget and identify recurring maintenance costs that could potentially be reduced.</p>
        `
    },
    {
        title: "Prepare annual stationery requirement",
        description: `
            <p>Estimate the stationery requirements for the upcoming financial year.</p>
            <p>Use previous consumption records to estimate quantities and include reasonable allowances for changes in staff numbers and operational requirements.</p>
        `
    },
    {
        title: "Write notice for office meeting",
        description: `
            <p>Draft an official notice announcing the upcoming departmental meeting.</p>
            <p>Include the meeting date, time, location, agenda, participants, and any documents that attendees should review before the meeting.</p>
        `
    },
    {
        title: "Prepare meeting agenda",
        description: `
            <p>Prepare the agenda for the next management meeting.</p>
            <p>Review pending decisions from the previous meeting and include new discussion items submitted by the participating departments.</p>
        `
    },
    {
        title: "Document meeting decisions",
        description: `
            <p>Record and organize the decisions made during the latest office meeting.</p>
            <p>Each decision should include the responsible person or department, expected completion date, and any dependencies that need to be addressed.</p>
        `
    },
    {
        title: "Prepare procurement comparison report",
        description: `
            <p>Prepare a comparison report for the recently collected supplier quotations.</p>
            <p>Compare quoted prices, delivery schedules, warranty conditions, payment terms, and other relevant procurement considerations before making a recommendation.</p>
        `
    },
    {
        title: "Review vendor invoices",
        description: `
            <p>Review invoices submitted by office vendors during the current billing cycle.</p>
            <p>Verify invoice amounts against purchase orders and delivery records and flag discrepancies for further investigation.</p>
        `
    },
    {
        title: "Prepare utility cost report",
        description: `
            <p>Compile electricity, water, internet, and other utility expenses into a monthly utility cost report.</p>
            <p>Compare current costs with previous months and identify significant increases or decreases.</p>
        `
    },
    {
        title: "Prepare travel expense summary",
        description: `
            <p>Compile travel-related expenses submitted by staff members during the reporting period.</p>
            <p>Separate transportation, accommodation, meals, and other approved expenses and verify that supporting documentation is available.</p>
        `
    },
    {
        title: "Draft staff circular",
        description: `
            <p>Draft a staff circular communicating the latest office procedures and administrative instructions.</p>
            <p>Use clear headings and concise language so that the instructions can be easily understood and followed by all employees.</p>
        `
    },
    {
        title: "Prepare technical support summary",
        description: `
            <p>Prepare a summary of technical support requests received by the office during the month.</p>
            <p>Group incidents by category, document resolution status, and identify recurring technical problems that may require a permanent solution.</p>
        `
    },
    {
        title: "Review unresolved IT support tickets",
        description: `
            <p>Review all currently unresolved IT support tickets.</p>
            <p>Identify tickets that have exceeded their expected resolution time and coordinate with the technical support team to establish updated completion dates.</p>
        `
    },
    {
        title: "Prepare computer inventory report",
        description: `
            <p>Prepare an updated inventory report for office computers and related equipment.</p>
            <p>Record asset identifiers, assigned users, locations, operating condition, and any outstanding maintenance requirements.</p>
        `
    },
    {
        title: "Document network connectivity issue",
        description: `
            <p>Document the recent network connectivity issue reported by several users.</p>
            <p>Record affected locations, approximate incident time, troubleshooting performed, observed symptoms, and the final resolution.</p>
        `
    },
    {
        title: "Prepare printer maintenance report",
        description: `
            <p>Compile maintenance information for office printers and multifunction devices.</p>
            <p>Include service dates, reported problems, replaced components, consumable usage, and recommendations for devices requiring frequent maintenance.</p>
        `
    },
    {
        title: "Prepare software license report",
        description: `
            <p>Review the software licenses currently assigned to office computers.</p>
            <p>Identify licenses approaching expiration, unused licenses, duplicate subscriptions, and applications that require renewal approval.</p>
        `
    },
    {
        title: "Review backup status report",
        description: `
            <p>Review the latest backup status for important office systems and shared files.</p>
            <p>Identify failed or incomplete backups and document the corrective actions required to restore reliable backup coverage.</p>
        `
    },
    {
        title: "Prepare technical equipment budget",
        description: `
            <p>Prepare a budget proposal for technical equipment required during the next budget cycle.</p>
            <p>Include computers, networking equipment, printers, backup devices, replacement components, and estimated maintenance costs.</p>
        `
    },
    {
        title: "Draft technical incident report",
        description: `
            <p>Prepare a formal incident report for the recent technical service interruption.</p>
            <p>Document the incident timeline, affected services, root cause if known, recovery actions, business impact, and recommendations to prevent recurrence.</p>
        `
    },
    {
        title: "Prepare helpdesk activity report",
        description: `
            <p>Generate the monthly helpdesk activity report.</p>
            <p>Include the number of requests received, resolved incidents, pending requests, average resolution time, and the most common categories of technical support.</p>
        `
    },
    {
        title: "Review office internet usage",
        description: `
            <p>Review office internet usage and identify unusually high consumption during the reporting period.</p>
            <p>Compare usage patterns across departments and document any technical or operational issues that may explain significant differences.</p>
        `
    },
    {
        title: "Prepare asset maintenance schedule",
        description: `
            <p>Prepare a maintenance schedule for office assets and equipment.</p>
            <p>Include computers, printers, air-conditioning equipment, networking devices, and other assets requiring periodic inspection or servicing.</p>
        `
    },
    {
        title: "Write request for equipment replacement",
        description: `
            <p>Draft a formal request for replacement of outdated office equipment.</p>
            <p>Explain the operational problems caused by the existing equipment and provide a justification for replacing it with suitable alternatives.</p>
        `
    },
    {
        title: "Prepare project status report",
        description: `
            <p>Prepare the current status report for ongoing office projects.</p>
            <p>For each project, include completed milestones, current activities, upcoming milestones, risks, dependencies, and expected completion dates.</p>
        `
    },
    {
        title: "Review pending administrative actions",
        description: `
            <p>Review all pending administrative actions assigned to the department.</p>
            <p>Identify overdue actions, confirm current ownership, and prepare a follow-up list for items requiring immediate attention.</p>
        `
    },
    {
        title: "Prepare management briefing note",
        description: `
            <p>Prepare a concise briefing note for management covering the department's current operational situation.</p>
            <p>Highlight important developments, pending decisions, financial considerations, operational risks, and recommended actions.</p>
        `
    },
    {
        title: "Prepare monthly procurement report",
        description: `
            <p>Compile the monthly procurement report covering completed and ongoing purchases.</p>
            <p>Include purchase categories, suppliers, approved amounts, actual expenditure, delivery status, and outstanding procurement activities.</p>
        `
    },
    {
        title: "Review departmental budget variance",
        description: `
            <p>Compare the approved departmental budget with actual expenditure for the reporting period.</p>
            <p>Calculate significant variances, identify their causes, and provide notes explaining expenditure that differs materially from the approved plan.</p>
        `
    },
    {
        title: "Prepare employee training report",
        description: `
            <p>Prepare a report summarizing employee training activities completed during the current period.</p>
            <p>Include training topics, participants, training dates, providers, costs, and any follow-up activities required.</p>
        `
    },
    {
        title: "Draft office procedure update",
        description: `
            <p>Draft updates to the existing office procedure document.</p>
            <p>Review the current workflow, identify outdated instructions, and propose clearer procedures for handling recurring administrative tasks.</p>
        `
    },
    {
        title: "Prepare document archive inventory",
        description: `
            <p>Prepare an inventory of documents currently stored in the office archive.</p>
            <p>Organize records by department, document type, reporting year, and retention requirement while identifying records that need further review.</p>
        `
    },
    {
        title: "Review monthly cash requirements",
        description: `
            <p>Estimate the cash requirements for routine office expenses during the upcoming month.</p>
            <p>Consider recurring payments, expected procurement activities, maintenance requirements, and other foreseeable administrative expenses.</p>
        `
    },
    {
        title: "Prepare overtime expenditure report",
        description: `
            <p>Compile overtime-related expenditure for the current reporting period.</p>
            <p>Review overtime records, verify approvals, calculate department-level expenditure, and highlight unusual increases compared with previous periods.</p>
        `
    },
    {
        title: "Prepare office risk register update",
        description: `
            <p>Review and update the department's operational risk register.</p>
            <p>Record newly identified risks, changes in existing risks, mitigation activities, responsible personnel, and outstanding actions.</p>
        `
    },
    {
        title: "Write supplier communication letter",
        description: `
            <p>Draft a formal communication letter to an office supplier regarding a pending delivery.</p>
            <p>Clearly reference the purchase order, expected delivery date, outstanding items, and required corrective action.</p>
        `
    },
    {
        title: "Prepare annual activity report",
        description: `
            <p>Compile the department's annual activity report covering major activities and achievements throughout the year.</p>
            <p>Include performance highlights, completed projects, operational challenges, expenditure information, and priorities for the next year.</p>
        `
    },
    {
        title: "Review office communication records",
        description: `
            <p>Review outgoing and incoming communication records to ensure important correspondence has been properly documented.</p>
            <p>Identify missing references, incomplete records, and correspondence requiring additional follow-up.</p>
        `
    },
    {
        title: "Prepare technical maintenance budget",
        description: `
            <p>Estimate technical maintenance costs for the upcoming budget period.</p>
            <p>Consider hardware servicing, network maintenance, software support, replacement components, and emergency technical support requirements.</p>
        `
    },
    {
        title: "Prepare office productivity report",
        description: `
            <p>Prepare a productivity report summarizing the department's major work activities.</p>
            <p>Use available task and project records to identify completed work, pending activities, recurring workload, and areas where processes could be improved.</p>
        `
    },
    {
        title: "Review outstanding purchase orders",
        description: `
            <p>Review all outstanding purchase orders and compare them with expected delivery schedules.</p>
            <p>Contact responsible personnel regarding delayed orders and document any revised delivery commitments.</p>
        `
    },
    {
        title: "Prepare year-end budget summary",
        description: `
            <p>Prepare the year-end budget summary for management review.</p>
            <p>Compare approved budgets with actual expenditure, identify major variances, summarize unused allocations, and provide recommendations for the next budget cycle.</p>
        `
    }
];