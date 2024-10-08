import { User } from '@prisma/client'
import { ActionFunction } from '@remix-run/node'
import { AuthenticationServer } from '~/core/authentication/server'
import { Utility } from '~/core/helpers/utility'
import { PaymentService } from './payment.service'

import { Organization } from '@prisma/client'

export const webhookStripeAction: ActionFunction = async ({ request }) => {
  const ctx = await AuthenticationServer.getHttpContextPublic({ request })

  try {
    console.log('Stripe webhook received')

    if (!PaymentService.isActive()) {
      return new Response(`Stripe not activated`, {
        status: 400,
      })
    }

    const sig = request.headers.get('Stripe-Signature') as string

    const text = await request.text()

    const buffer = Buffer.from(text)

    const data = await PaymentService.onPayment(buffer, sig)

    if (Utility.isNull(data)) {
      return new Response(`Could not parse request body`, {
        status: 400,
      })
    }

    const {
      userId,
      stripeCustomerId,

      organizationId,
    } = data

    let user: User

    let organization: Organization

    if (organizationId && stripeCustomerId) {
      organization =
        await ctx.databaseUnprotected.organization.findFirstOrThrow({
          where: { id: organizationId, stripeCustomerId },
        })
    } else if (organizationId) {
      organization =
        await ctx.databaseUnprotected.organization.findFirstOrThrow({
          where: { id: organizationId },
        })
    } else if (stripeCustomerId) {
      organization =
        await ctx.databaseUnprotected.organization.findFirstOrThrow({
          where: { stripeCustomerId },
        })
    }

    if (userId && stripeCustomerId && !organizationId) {
      user = await ctx.databaseUnprotected.user.findFirstOrThrow({
        where: { id: userId, stripeCustomerId },
      })
    } else if (userId) {
      user = await ctx.databaseUnprotected.user.findFirstOrThrow({
        where: { id: userId },
      })
    } else if (stripeCustomerId && !organizationId) {
      user = await ctx.databaseUnprotected.user.findFirstOrThrow({
        where: { stripeCustomerId },
      })
    }

    if (!user) {
      return new Response(
        `Could find any user with userId (${userId}) and customerId (${stripeCustomerId})`,
        {
          status: 404,
        },
      )
    }

    if (!organization && organizationId) {
      return new Response(
        `Could find any organization with organizationId (${organizationId}) and customerId (${stripeCustomerId})`,
        {
          status: 404,
        },
      )
    }

    if (!user.stripeCustomerId && !organization) {
      user = await ctx.databaseUnprotected.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: stripeCustomerId },
      })

      console.log(
        `Stripe customer id "${stripeCustomerId}" saved on user "${user.id}"`,
      )
    }

    if (organization && !organization.stripeCustomerId) {
      organization = await ctx.databaseUnprotected.organization.update({
        where: { id: organization.id },
        data: { stripeCustomerId: stripeCustomerId },
      })

      console.log(
        `Stripe customer id "${stripeCustomerId}" saved on organization "${organization.id}"`,
      )
    }

    // Add your custom logic here

    return new Response(`Webhook successful`)
  } catch (error) {
    console.log(error)
    return new Response(`Could not upload file`, { status: 500 })
  }
}
