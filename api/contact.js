import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Валидация
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }

    // Настройте транспортер для отправки почты
    // Вариант A: Использование SMTP (например, Gmail)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Вариант B: Использование SendGrid (рекомендуется для Vercel)
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.sendgrid.net',
    //   port: 587,
    //   auth: {
    //     user: 'apikey',
    //     pass: process.env.SENDGRID_API_KEY,
    //   },
    // });

    // Настройка письма
    const mailOptions = {
      from: `"4002Bizarre" <noreply@4002bizarre.com>`,
      to: process.env.TO_EMAIL, // Ваш email для уведомлений
      replyTo: email,
      subject: `📨 Новое сообщение от ${name}`,
      html: `
        <div style="font-family: monospace; border: 3px solid #000; padding: 20px; background: #fff;">
          <h1 style="margin: 0; color: #000;">4002BIZARRE</h1>
          <p style="font-style: italic; color: #666;">абсурдное сообщение с сайта</p>
          
          <div style="margin-top: 20px;">
            <p><strong>👤 Имя:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>💬 Сообщение:</strong></p>
            <div style="border: 2px dashed #000; padding: 15px; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <p><strong>🕐 Время:</strong> ${new Date().toLocaleString('ru-RU')}</p>
          </div>
          
          <hr style="border: 1px dashed #000; margin: 20px 0;">
          <p style="font-size: 12px; color: #999;">
            Это сообщение отправлено через форму обратной связи сайта 4002Bizarre.
            <br>Если это не вы, просто проигнорируйте это письмо (или поговорите с зеркалом).
          </p>
        </div>
      `,
    };

    // Отправка письма
    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Сообщение улетело в космос! (на почту)' 
    });
  } catch (error) {
    console.error('Ошибка отправки:', error);
    res.status(500).json({ 
      error: 'Сообщение потерялось в пути. Попробуйте снова или крикните в окно.' 
    });
  }
}