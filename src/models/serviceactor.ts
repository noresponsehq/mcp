import * as z from "zod";

export type ServiceActor = { type?: "service" | undefined; name: string };

export const ServiceActor$zodSchema: z.ZodType<ServiceActor> = z.object({
  name: z.string().describe(
    "The NoResponse service that made the change with no person acting, such as replenisher, which replaces dead platform sessions in NoResponse's own workspace.",
  ),
  type: z.literal("service").default("service").optional(),
});
