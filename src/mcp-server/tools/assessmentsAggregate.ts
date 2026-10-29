import { assessmentsAggregate } from "../../funcs/assessmentsAggregate.js";
import { AssessmentAggregateRequest$zodSchema } from "../../models/assessmentaggregaterequest.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: AssessmentAggregateRequest$zodSchema,
};

export const tool$assessmentsAggregate: ToolDefinition<typeof args> = {
  name: "aggregate_assessments",
  description: `Count assessments by time, decision and reason

Count this environment's assessments created in [from,to) by UTC hour, or by day or week from local midnight in time_zone (an IANA name, UTC by default; at most 92 days in a zone other than UTC), grouped by up to two of decision, flow, recommendation, band, reason, lane, country, asn and list_match. Each assessment counts once, by its first answer; late results do not count it again and appear in late_flips. Optional metrics add a score histogram per flow, that histogram by the latest reported outcome, and late account decision changes. from and to start a bucket and cover at most 366 days (31 for hour buckets) inside the retention period. The filters are search's and describe the first answer: send them to search with revision first to list a cell's assessments. Counts hold no identifier, stay when an assessment or account is deleted, and report reasons by code and impact band. No Idempotency-Key.`,
  annotations: {
    "title": "Count assessments by time, decision and reason",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await assessmentsAggregate(
      client,
      args.request,
      { fetchOptions: { signal: ctx.mcpReq.signal } },
    ).$inspect();

    if (!result.ok) {
      return {
        content: [{ type: "text", text: result.error.message }],
        isError: true,
      };
    }

    return formatResult(result.value);
  },
};
