// @ts-ignore - Mailchimp package doesn't have type declarations
import mailchimp from "@mailchimp/mailchimp_marketing";

let isConfigured = false;

function configureMailchimp() {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!apiKey || !serverPrefix) {
    console.warn("Mailchimp not configured: Missing API key or server prefix");
    return false;
  }

  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  isConfigured = true;
  return true;
}

export interface SubscriberData {
  email: string;
  firstName?: string;
  lastName?: string;
  source?: string;
}

export async function addSubscriberToMailchimp(data: SubscriberData): Promise<boolean> {
  if (!isConfigured && !configureMailchimp()) {
    console.warn("Skipping Mailchimp subscription: not configured");
    return false;
  }

  const listId = process.env.MAILCHIMP_AUDIENCE_ID;
  
  if (!listId) {
    console.warn("Mailchimp audience ID not configured");
    return false;
  }

  try {
    const mergeFields: Record<string, string> = {};
    
    if (data.firstName) {
      mergeFields.FNAME = data.firstName;
    }
    if (data.lastName) {
      mergeFields.LNAME = data.lastName;
    }
    if (data.source) {
      mergeFields.SOURCE = data.source;
    }

    await mailchimp.lists.addListMember(listId, {
      email_address: data.email,
      status: "subscribed",
      merge_fields: Object.keys(mergeFields).length > 0 ? mergeFields : undefined,
    });

    console.log(`Successfully added ${data.email} to Mailchimp`);
    return true;
  } catch (error: any) {
    if (error.status === 400 && error.response?.body?.title === "Member Exists") {
      console.log(`Email ${data.email} already exists in Mailchimp`);
      return true;
    }
    
    console.error("Mailchimp error:", error.response?.body || error.message);
    return false;
  }
}
