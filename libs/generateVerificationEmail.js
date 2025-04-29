export function generateVerificationEmail(verificationLink) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verifica tu correo electrónico - TradingPro</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
                background: linear-gradient(to right, #17498a, #54bcaf);
                color: #ffffff;
                text-align: center;
                padding: 20px;
            }
            .logo {
                max-width: 200px;
                height: auto;
            }
            .content {
                padding: 30px;
            }
            .button {
                display: inline-block;
                background-color: #54bcaf;
                color: #ffffff;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 5px;
                font-weight: bold;
                margin-top: 20px;
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #3da396;
            }
            .footer {
                background-color: #f8f8f8;
                text-align: center;
                padding: 15px;
                font-size: 12px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://supabase.drumstock.dev/storage/v1/object/public/TradingPro/LOGO%20TRADINGPRO.png" alt="TradingPro Logo" class="logo">
            </div>
            <div class="content">
                <h1 style="color: #17498a; font-size: 24px; margin-bottom: 20px;">Verifica tu correo electrónico</h1>
                <p>Hola,</p>
                <p>Gracias por registrarte en TradingPro. Para completar tu registro y acceder a todas nuestras funcionalidades, por favor verifica tu correo electrónico haciendo clic en el botón de abajo:</p>
                <a style="color: #ffffff;" href="${verificationLink}" class="button">Verificar correo electrónico</a>
                <p style="margin-top: 20px;">Si no has solicitado esta verificación, puedes ignorar este mensaje.</p>
                <p>¡Gracias por unirte a nuestra comunidad!</p>
            </div>
            <div class="footer">
                <p>&copy; 2025 TradingPro. Todos los derechos reservados.</p>
                <p>Si tienes alguna pregunta, contáctanos en <a href="info@tradingpro.app" style="color: #54bcaf;">info@tradingpro.app</a></p>
            </div>
        </div>
    </body>
    </html>
  `;
}
