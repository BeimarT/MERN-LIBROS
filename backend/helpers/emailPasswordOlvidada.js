import nodemailer from 'nodemailer'

const emailPasswordOlvidada = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const { email, nombre, token } = datos
  // Enviar el email

  const info = await transport.sendMail({
    from: 'Administrador de Libros',
    to: email,
    subject: 'Restablece tu contraseña',
    text: 'Restablece tu contraseña',
    html: `<p>Hola: ${nombre}, has solicitado reestablecer tu contraseña.</p>
        <p>Entra en el siguiente enlace para generar uan nueva contraseña:
        <a href="${process.env.FRONTEND_URL}/password-olvidada/${token}">Reestablecer contraseña</a>
        </p>
        <p>Si no has sido el creador de la cuenta, puedes ignorar este mensaje.</p>
    `
  })

  console.log('Mensaje enviado: %s', info.messageId)
}

export default emailPasswordOlvidada
