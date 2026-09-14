'use server'
import nodemailer from "nodemailer";

export async function sendEmail(prevState, formData) {
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const company = formData.get("companyName");
    const message = formData.get("message");
    const phone = formData.get("phoneNumber");
    const projectType = formData.get("projectType"); // From hidden input
    const budget = formData.get("budgetRange");     // From hidden input
    const details = formData.get("projectDetails");

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `Maison Sillage ${fullName} ${email}`,
            to: 'sales@cosmeticchemist.com', // Where you want to receive the contact form info
            // replyTo: email,
            subject: `New Contact Form Submission from ${fullName}`,
            text: message,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Project:</strong> ${projectType}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Details:</strong> ${details}</p>
      `,
        })
        return { success: true, message: "Message sent! We'll be in touch." };

    } catch (error) {
        console.error("Nodemailer error:", error);
        return { success: false, message: "Failed to send email." };
    }
}
