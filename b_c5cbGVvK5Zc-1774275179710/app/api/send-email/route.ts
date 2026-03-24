import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { publishToTwenty } from '@/lib/twenty-client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'


export async function POST(req: Request) {
  try {
    const body = await req.json()

    // 1. Sync to Twenty CRM
    // We don't await this to block the email sending, strictly speaking, 
    // but usually it's better to ensure data integrity. Let's await it to be safe.
    await publishToTwenty(body);

    // 2. Extract fields for Email Template from the Unified Model
    const companyData = body.company
    const personData = body.person

    const firstName = personData?.name?.firstName || "Unknown"
    const lastName = personData?.name?.lastName || ""
    const name = `${firstName} ${lastName}`.trim()

    const email = personData?.emails?.primaryEmail || ""
    const phone = personData?.phones?.primaryPhoneNumber || body.phone || ""
    const company = companyData?.name || ""

    const crm = companyData?.currentCrm || ""
    const leads = companyData?.monthlyLeads
    const dealValue = companyData?.avgDealValue
    const timeline = companyData?.timeline
    const leadScore = personData?.leadScore

    // Flattened structure for the template logic
    const flattenedData = {
      name, email, phone, company, crm, leads, dealValue, timeline, leadScore
    }


    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'Missing RESEND_API_KEY' }, { status: 500 })
    }

    const resend = new Resend(apiKey)

    /* const envEmails = process.env.TO_EMAIL || process.env.ADMIN_EMAIL || '';
    const recipients = envEmails.split(',').map(e => e.trim()).filter(Boolean); */

    const mailPrimero = process.env.MAILPRIMERO || '';
    const mailSegundo = process.env.MAILSEGUNDO || '';

    const recipients = [mailPrimero, mailSegundo].filter(Boolean);

    if (recipients.length === 0) {
      return NextResponse.json({ success: false, error: 'Missing TO_EMAIL' }, { status: 500 })
    }

    const currentDate = new Date().toLocaleDateString('es-ES', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    })

    // --- TABLA DE DATOS RESPONSIVE ---
    // Usamos estilos en línea para máxima compatibilidad con clientes de correo móviles (Gmail, Outlook app, iOS Mail)
    const dataTableHtml = `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: separate; border-spacing: 0 12px; width: 100%;">
    <tr>
      <td width="35%" style="vertical-align: top; padding-right: 10px; font-size: 14px; font-weight: 600; color: #00D2AA; white-space: nowrap;">Nombre:</td>
      <td style="vertical-align: top; font-size: 15px; font-weight: 500; color: #EFF6FF; padding-bottom: 5px; border-bottom: 1px solid #1F2937; width: 100%;">${body.name || '-'}</td>
    </tr>
    <tr>
      <td width="35%" style="vertical-align: top; padding-right: 10px; font-size: 14px; font-weight: 600; color: #00D2AA; white-space: nowrap;">Email:</td>
      <td style="vertical-align: top; font-size: 15px; font-weight: 500; color: #EFF6FF; padding-bottom: 5px; border-bottom: 1px solid #1F2937; width: 100%;">
        <a href="mailto:${body.email}" style="text-decoration: none; color: #00D2AA;">${body.email || '-'}</a>
      </td>
    </tr>
    <tr>
      <td width="35%" style="vertical-align: top; padding-right: 10px; font-size: 14px; font-weight: 600; color: #00D2AA; white-space: nowrap;">Teléfono:</td>
      <td style="vertical-align: top; font-size: 15px; font-weight: 500; color: #EFF6FF; padding-bottom: 5px; border-bottom: 1px solid #1F2937; width: 100%;">${body.phone || '-'}</td>
    </tr>
    <tr>
      <td width="35%" style="vertical-align: top; padding-right: 10px; font-size: 14px; font-weight: 600; color: #00D2AA; white-space: nowrap;">Empresa:</td>
      <td style="vertical-align: top; font-size: 15px; font-weight: 500; color: #EFF6FF; padding-bottom: 5px; border-bottom: 1px solid #1F2937; width: 100%;">${body.business || '-'}</td>
    </tr>
  </table>
`


    // --- 1. EMAIL PARA EL ADMIN (MedSpas) ---
    const adminContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Lead - MedSpas</title>
</head>
<body style="margin:0; padding:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; background-color:#0A0A0B; color:#ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding:20px 10px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px; width:100%; background-color:#111113; border-radius:12px; box-shadow:0 4px 6px rgba(0,0,0,0.3); overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="padding:30px 20px; text-align:center; background:linear-gradient(135deg,#00D2AA 0%,#0f766e 100%); color:#000;">
              <div style="font-size:24px; font-weight:800; letter-spacing:-0.5px;">MedSpas</div>
              <div style="font-size:14px; margin-top:5px; opacity:0.9;">Nuevo Lead de Onboarding</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px 20px;">
              <h1 style="margin:0 0 20px 0; font-size:20px; color:#00D2AA; text-align:center;">🚀 Lead Calificado</h1>
              <p style="color:#A1A1AA; font-size:15px; margin-bottom:30px; text-align:center; line-height:1.5;">
                Un nuevo cliente ha completado el formulario de inicio.
              </p>

              <!-- Tabla de datos -->
              <div style="background-color:#0C1018; border-radius:8px; padding:20px; margin-bottom:30px; border:1px solid #00D2AA33;">
                ${dataTableHtml}
              </div>

              <!-- Botón CTA -->
              <div style="text-align:center;">
                <a href="mailto:${email}" style="display:inline-block; background-color:#00D2AA; color:#000; font-size:16px; font-weight:bold; text-decoration:none; padding:14px 30px; border-radius:50px; box-shadow:0 4px 6px rgba(0,210,170,0.3);">
                  Contactar al Cliente
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px; background-color:#0A0A0B; text-align:center; color:#A1A1AA; font-size:12px; border-top:1px solid #1F2937;">
              Lead Score: <strong>${leadScore || 'N/A'}</strong> • ${currentDate}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

    //const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'


    const fromEmail = 'business@business.protolylat.com'
    //'The protolylat.com domain is not verified. 
    // Please, add and verify your domain on https://resend.com/domains',


    /* const fromEmail = 'onboarding@resend.dev' */ // solo para pruebas
    // 'You can only send testing emails to your own email address (business@protolylat.com).
    // To send emails to other recipients, please verify a domain at resend.com/domains,
    // and change the `from` address to an email using this domain.'


    // Enviar al ADMIN
    const { data, error } = await resend.emails.send({
      from: `MedSpas <${fromEmail}>`,
      to: [mailPrimero],
      cc: [mailSegundo],
      subject: `🚀 Nuevo Lead: ${name} - ${company}`,
      html: adminContent,
      replyTo: email
    })

    if (error) {
      console.error('Error enviando al admin:', error)
      return NextResponse.json({ success: false, error }, { status: 500 })
    }

    // --- 2. EMAIL PARA EL CLIENTE (CONFIRMACIÓN) ---
    // COMENTADO: Solo se envía correo a la empresa, no al cliente
    /*
    if (email) {
      const clientContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmación - MedSpas</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9fc; color: #333333;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td align="center" style="padding: 20px 10px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
                  <!-- Header MedSpas -->
                  <tr>
                    <td style="padding: 30px 20px; text-align: center; background: linear-gradient(135deg, #06b6d4 0%, #0f766e 100%); color: #fff;">
                      <div style="font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">MedSpas</div>
                      <div style="font-size: 14px; margin-top: 5px; opacity: 0.9;">Confirmación de recepción</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 30px 20px;">
                      <h1 style="margin: 0 0 15px 0; font-size: 22px; color: #1e293b; text-align: center;">¡Gracias, ${name}!</h1>
                      <p style="color: #64748b; font-size: 16px; margin-bottom: 25px; line-height: 1.6; text-align: center;">
                        Hemos recibido la información de tu proyecto. Nuestro equipo analizará tus requerimientos de automatización y te contactará a la brevedad.
                      </p>
                      
                      <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
                        <p style="margin: 0 0 15px 0; font-size: 14px; font-weight: bold; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Resumen enviado:</p>
                        ${dataTableHtml}
                      </div>

                      <div style="text-align: center;">
                        <a href="https://MedSpas.ai" style="display: inline-block; background-color: #06b6d4; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; padding: 14px 30px; border-radius: 50px; box-shadow: 0 4px 6px rgba(6, 182, 212, 0.2);">
                          Visitar nuestro sitio
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px; background-color: #f1f5f9; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0;">
                      &copy; ${new Date().getFullYear()} MedSpas. Todos los derechos reservados.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `

      await resend.emails.send({
        from: `MedSpas <${fromEmail}>`,
        to: [email],
        subject: '✅ Hemos recibido la información de tu proyecto',
        html: clientContent,
      })
    }
    */

    return NextResponse.json({ success: true, id: data?.id })

  } catch (error) {
    console.error('Error general:', error)
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}