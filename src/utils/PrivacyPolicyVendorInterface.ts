export interface PrivacyPolicyVendorInterface {
    name: string;
    company?: string;
    country?: string;
    description?: string | VNode;
    manages?: string[];
    privacyPolicyUrl?: string;
    otherLinks?: Record<string, string>;
}
