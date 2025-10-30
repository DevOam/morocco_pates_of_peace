import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, travelDate, travelers, destination } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    // Configuration du transporteur email (Gmail SMTP)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      // Bypass local self-signed corporate proxies during development
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Email à envoyer à l'équipe Morocco Plant Peace
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `Nouveau message de contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706; border-bottom: 2px solid #d97706; padding-bottom: 10px;">
            Nouveau message de Morocco Plant Peace
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Informations du contact</h3>
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Téléphone:</strong> ${phone || 'Non fourni'}</p>
            <p><strong>Sujet:</strong> ${subject}</p>
          </div>

          ${travelDate || travelers || destination ? `
          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Détails du voyage</h3>
            ${travelDate ? `<p><strong>Date de voyage:</strong> ${travelDate}</p>` : ''}
            ${travelers ? `<p><strong>Nombre de voyageurs:</strong> ${travelers}</p>` : ''}
            ${destination ? `<p><strong>Destination:</strong> ${destination}</p>` : ''}
          </div>
          ` : ''}

          <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Message reçu via le site Morocco Plant Peace<br>
              ${new Date().toLocaleString('fr-FR')}
            </p>
          </div>
        </div>
      `,
    };

    // Email de confirmation automatique au client
    const confirmationEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmation de réception - Morocco Plant Peace',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626, #d97706); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Morocco Plant Peace</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Votre message a été reçu !</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #374151; margin-top: 0;">Bonjour ${name},</h2>
            
            <p style="color: #6b7280; line-height: 1.6;">
              Merci de nous avoir contactés ! Nous avons bien reçu votre message concernant 
              <strong>"${subject}"</strong> et notre équipe vous répondra dans les plus brefs délais.
            </p>

            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Récapitulatif de votre demande</h3>
              <p><strong>Sujet:</strong> ${subject}</p>
              ${destination ? `<p><strong>Destination:</strong> ${destination}</p>` : ''}
              ${travelDate ? `<p><strong>Date souhaitée:</strong> ${travelDate}</p>` : ''}
              ${travelers ? `<p><strong>Voyageurs:</strong> ${travelers}</p>` : ''}
            </div>

            <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #065f46; margin-top: 0;">⏱️ Temps de réponse</h3>
              <p style="color: #047857; margin: 0;">Notre équipe vous répondra sous <strong>2 heures maximum</strong> pendant nos heures d'ouverture.</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #6b7280;">En attendant, suivez-nous sur nos réseaux sociaux :</p>
              <a href="https://www.instagram.com/morocco_plant_peace" style="display: inline-block; margin: 0 10px; color: #d97706; text-decoration: none;">
                📱 Instagram
              </a>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 14px; margin: 0;">
                Morocco Plant Peace - Votre partenaire pour découvrir le Maroc authentique<br>
                📞 +212 772321613 | 📧 contact@moroccoplantpeace.com
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Envoyer les emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(confirmationEmail);

    return NextResponse.json(
      { message: 'Email envoyé avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}
