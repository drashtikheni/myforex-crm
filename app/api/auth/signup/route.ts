import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabaseServer'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const supabase = await createServerSupabase()

  // 1️⃣ CREATE USER (SUPABASE)
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  const user = data.user
  console.log("user==========", user);


  if (!user) {
    return NextResponse.json({ error: 'User not created' }, { status: 400 })
  }

  // ===============================
  // 2️⃣ CREATE CTRADER USER
  // ===============================
  let ctraderUserId: string | null = null
  let accountLogin: string | null = null
  const ctraderURL = `${process.env.CTRADER_BASE_URL}:${process.env.CTRADER_PORT}`

  console.log("ctraderURL=====", ctraderURL);


  try {
    // 🔹 CREATE TRADER
    const traderRes = await fetch(
      `${ctraderURL}/cid/ctid/create?token=${process.env.CTRADER_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    )

    const traderData = await traderRes.json()

    console.log("traderData==========", traderData);

    if (traderRes.ok) {
      ctraderUserId = traderData.userId // adjust based on API response
    } else {
      console.error('cTrader create trader error:', traderData)
    }

    // 🔹 CREATE TRADING ACCOUNT (ONLY IF USER CREATED)
    if (ctraderUserId) {
      console.log("Creating trading account...==========");
      
      const accountRes = await fetch(
        `${ctraderURL}/v2/webserv/traders?token=${process.env.CTRADER_TOKEN}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            accessRights: "FULL_ACCESS",
            accountType: "HEDGED",
            balance: 0,
            brokerName: process.env.CTRADER_BROKER_NAME,
            depositCurrency: "USD",
            groupName: process.env.CTRADER_GROUP_NAME,
            leverageInCents: 1000,
            hashedPassword: process.env.CTRADER_HASH_PASSWORD,
            totalMarginCalculationType: "MAX"
          }),
        })

        console.log("1========",accountRes);
        

      const accountData = await accountRes.json()

      console.log("accountData==========", accountData);

      if (accountRes.ok) {
        accountLogin = accountData.login // account number
      } else {
        console.error('cTrader create account error:', accountData)
      }

      // 3. link account
      const linkRes = await fetch(`${ctraderURL}/cid/ctid/link?token=${process.env.CTRADER_TOKEN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ctidUserId: ctraderUserId,
          tradingAccountLogin: accountLogin,
        }),
      })

      const linkData = await linkRes.json()
      console.log("linkData==========", linkData);
    }
  } catch (err) {
    console.error('cTrader API failed:', err)
  }

  // ===============================
  // 3️⃣ SAVE USER PROFILE
  // ===============================
  // const { error: profileError } = await supabase
  //   .from('user_profiles')
  //   .insert([
  //     {
  //       id: user.id,
  //       email: user.email,
  //       ctrader_user_id: ctraderUserId,
  //       account_login: accountLogin,
  //     },
  //   ])

  // if (profileError) {
  //   console.error('Profile Insert Error:', profileError)
  // }

  // ===============================
  // 4️⃣ FINAL RESPONSE
  // ===============================
  return NextResponse.json({
    user,
    ctrader_user_id: ctraderUserId,
    account_login: accountLogin,
  })
}