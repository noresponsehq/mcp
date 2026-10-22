import * as z from "zod";

export type AlternateName = {};

export const AlternateName$zodSchema: z.ZodType<AlternateName> = z.object({});

export type AlternateNameUnion =
  | string
  | number
  | boolean
  | AlternateName
  | Array<any>;

export const AlternateNameUnion$zodSchema: z.ZodType<AlternateNameUnion> = z
  .union([
    z.string(),
    z.number(),
    z.boolean(),
    z.lazy(() => AlternateName$zodSchema),
    z.array(z.any()),
  ]);

export type NameCandidate = {};

export const NameCandidate$zodSchema: z.ZodType<NameCandidate> = z.object({});

export type NameCandidateUnion =
  | string
  | number
  | boolean
  | NameCandidate
  | Array<any>;

export const NameCandidateUnion$zodSchema: z.ZodType<NameCandidateUnion> = z
  .union([
    z.string(),
    z.number(),
    z.boolean(),
    z.lazy(() => NameCandidate$zodSchema),
    z.array(z.any()),
  ]);

export type Timezone = {};

export const Timezone$zodSchema: z.ZodType<Timezone> = z.object({});

export type TimezoneUnion = string | number | boolean | Timezone | Array<any>;

export const TimezoneUnion$zodSchema: z.ZodType<TimezoneUnion> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => Timezone$zodSchema),
  z.array(z.any()),
]);

export type Email = {};

export const Email$zodSchema: z.ZodType<Email> = z.object({});

export type EmailUnion = string | number | boolean | Email | Array<any>;

export const EmailUnion$zodSchema: z.ZodType<EmailUnion> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => Email$zodSchema),
  z.array(z.any()),
]);

export type Website = {};

export const Website$zodSchema: z.ZodType<Website> = z.object({});

export type WebsiteUnion = string | number | boolean | Website | Array<any>;

export const WebsiteUnion$zodSchema: z.ZodType<WebsiteUnion> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => Website$zodSchema),
  z.array(z.any()),
]);

export type Location = {};

export const Location$zodSchema: z.ZodType<Location> = z.object({});

export type LocationUnion = string | number | boolean | Location | Array<any>;

export const LocationUnion$zodSchema: z.ZodType<LocationUnion> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => Location$zodSchema),
  z.array(z.any()),
]);

export type SocialProfile = {};

export const SocialProfile$zodSchema: z.ZodType<SocialProfile> = z.object({});

export type SocialProfileUnion =
  | string
  | number
  | boolean
  | SocialProfile
  | Array<any>;

export const SocialProfileUnion$zodSchema: z.ZodType<SocialProfileUnion> = z
  .union([
    z.string(),
    z.number(),
    z.boolean(),
    z.lazy(() => SocialProfile$zodSchema),
    z.array(z.any()),
  ]);

export type PhoneEnrichmentFields = {
  phone?: string | undefined;
  name?: string | undefined;
  carrier?: string | undefined;
  line_type?: string | undefined;
  entity_type?: string | undefined;
  country_code?: string | undefined;
  country?: string | undefined;
  state?: string | undefined;
  city?: string | undefined;
  location?: string | undefined;
  national_format?: string | undefined;
  job_title?: string | undefined;
  company_name?: string | undefined;
  email?: string | undefined;
  website?: string | undefined;
  first_call_at?: string | undefined;
  last_call_at?: string | undefined;
  matched_name?: string | undefined;
  alternate_names?:
    | Array<string | number | boolean | AlternateName | Array<any>>
    | undefined;
  name_candidates?:
    | Array<string | number | boolean | NameCandidate | Array<any>>
    | undefined;
  timezones?:
    | Array<string | number | boolean | Timezone | Array<any>>
    | undefined;
  emails?: Array<string | number | boolean | Email | Array<any>> | undefined;
  websites?:
    | Array<string | number | boolean | Website | Array<any>>
    | undefined;
  locations?:
    | Array<string | number | boolean | Location | Array<any>>
    | undefined;
  social_profiles?:
    | Array<string | number | boolean | SocialProfile | Array<any>>
    | undefined;
  report_count?: number | undefined;
  tag_count?: number | undefined;
  total_calls?: number | undefined;
  calls_60_days?: number | undefined;
  reports_60_days?: number | undefined;
  searches_60_days?: number | undefined;
  comment_count?: number | undefined;
  names_count?: number | undefined;
  spam_report_count?: number | undefined;
};

export const PhoneEnrichmentFields$zodSchema: z.ZodType<PhoneEnrichmentFields> =
  z.object({
    alternate_names: z.array(z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.lazy(() => AlternateName$zodSchema),
      z.array(z.any()),
    ])).optional(),
    calls_60_days: z.int().optional(),
    carrier: z.string().optional(),
    city: z.string().optional(),
    comment_count: z.int().optional(),
    company_name: z.string().optional(),
    country: z.string().optional(),
    country_code: z.string().optional(),
    email: z.string().optional(),
    emails: z.array(z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.lazy(() => Email$zodSchema),
      z.array(z.any()),
    ])).optional(),
    entity_type: z.string().optional(),
    first_call_at: z.string().optional(),
    job_title: z.string().optional(),
    last_call_at: z.string().optional(),
    line_type: z.string().optional(),
    location: z.string().optional(),
    locations: z.array(z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.lazy(() => Location$zodSchema),
      z.array(z.any()),
    ])).optional(),
    matched_name: z.string().optional(),
    name: z.string().optional(),
    name_candidates: z.array(z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.lazy(() => NameCandidate$zodSchema),
      z.array(z.any()),
    ])).optional(),
    names_count: z.int().optional(),
    national_format: z.string().optional(),
    phone: z.string().optional(),
    report_count: z.int().optional(),
    reports_60_days: z.int().optional(),
    searches_60_days: z.int().optional(),
    social_profiles: z.array(z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.lazy(() => SocialProfile$zodSchema),
      z.array(z.any()),
    ])).optional(),
    spam_report_count: z.int().optional(),
    state: z.string().optional(),
    tag_count: z.int().optional(),
    timezones: z.array(z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.lazy(() => Timezone$zodSchema),
      z.array(z.any()),
    ])).optional(),
    total_calls: z.int().optional(),
    website: z.string().optional(),
    websites: z.array(z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.lazy(() => Website$zodSchema),
      z.array(z.any()),
    ])).optional(),
  });
