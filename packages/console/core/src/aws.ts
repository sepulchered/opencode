import { z } from "zod"
import { Resource } from "@opencode-ai/console-resource"
import { AwsClient } from "aws4fetch"
import { fn } from "./util/fn"

export namespace AWS {
  let client: AwsClient

  const createClient = () => {
    if (!client) {
      const region = process.env.AWS_SES_REGION
      if (!region) throw new Error("AWS_SES_REGION is required")
      const sesEndpoint = process.env.AWS_SES_ENDPOINT
      if (!sesEndpoint) throw new Error("AWS_SES_ENDPOINT is required")
      client = new AwsClient({
        accessKeyId: Resource.AWS_SES_ACCESS_KEY_ID.value,
        secretAccessKey: Resource.AWS_SES_SECRET_ACCESS_KEY.value,
        region,
      })
      ;(client as any).sesEndpoint = sesEndpoint
    }
    return client
  }

  export const sendEmail = fn(
    z.object({
      to: z.string(),
      subject: z.string(),
      body: z.string(),
      replyTo: z.string().optional(),
    }),
    async (input) => {
      const client = createClient()
      const sesEndpoint = (client as any).sesEndpoint
      const res = await client.fetch(`${sesEndpoint}/v2/email/outbound-emails`, {
        method: "POST",
        headers: {
          "X-Amz-Target": "SES.SendEmail",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FromEmailAddress: `OpenCode Zen <contact@anoma.ly>`,
          Destination: {
            ToAddresses: [input.to],
          },
          ...(input.replyTo && { ReplyToAddresses: [input.replyTo] }),
          Content: {
            Simple: {
              Subject: {
                Charset: "UTF-8",
                Data: input.subject,
              },
              Body: {
                Text: {
                  Charset: "UTF-8",
                  Data: input.body,
                },
                Html: {
                  Charset: "UTF-8",
                  Data: input.body,
                },
              },
            },
          },
        }),
      })
      if (!res.ok) {
        throw new Error(`Failed to send email: ${res.statusText}`)
      }
    },
  )
}
