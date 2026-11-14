import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * What a finding is about: a direct threat to the principal or the group, intent to harm without a named target, fixation on the principal, a grievance against the host, research into the venue, route or security, weapons tied to any of these, disruption or protest planning toward this group, violent extremist content or identification, prior harassment or stalking of staff or principals, or posting the principal's addresses or movements.
 */
export const FindingCategory = {
  DirectThreat: "direct_threat",
  HarmIntent: "harm_intent",
  Fixation: "fixation",
  Grievance: "grievance",
  SecurityResearch: "security_research",
  Weapons: "weapons",
  Disruption: "disruption",
  ViolentExtremism: "violent_extremism",
  Harassment: "harassment",
  MovementExposure: "movement_exposure",
} as const;
/**
 * What a finding is about: a direct threat to the principal or the group, intent to harm without a named target, fixation on the principal, a grievance against the host, research into the venue, route or security, weapons tied to any of these, disruption or protest planning toward this group, violent extremist content or identification, prior harassment or stalking of staff or principals, or posting the principal's addresses or movements.
 */
export type FindingCategory = ClosedEnum<typeof FindingCategory>;

export const FindingCategory$zodSchema = z.enum([
  "direct_threat",
  "harm_intent",
  "fixation",
  "grievance",
  "security_research",
  "weapons",
  "disruption",
  "violent_extremism",
  "harassment",
  "movement_exposure",
]).describe(
  "What a finding is about: a direct threat to the principal or the group, intent to harm without a named target, fixation on the principal, a grievance against the host, research into the venue, route or security, weapons tied to any of these, disruption or protest planning toward this group, violent extremist content or identification, prior harassment or stalking of staff or principals, or posting the principal's addresses or movements.",
);
