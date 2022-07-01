import nodemailer from 'nodemailer'

const emailVerificar = async (datos) => {
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
    subject: 'Verifica tu cuenta en Administrador de Libros',
    text: 'Verifica tu cuenta en Administrador de Libros',
    html: `<p>Hola: ${nombre}, verifica tu cuenta en Administrador de Libros.</p>
        <p>Tu cuenta esta lista, solo debes entrar en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Verificar Cuenta</a>
        </p>
        <p>Si no has sido el creador de la cuenta, puedes ignorar este mensaje.</p>
    `
  })

  console.log('Mensaje enviado: %s', info.messageId)
}

export default emailVerificar
