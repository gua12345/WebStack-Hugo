export function getTemplate({
  redirectPath,
  withError,
  backgroundImageUrl
}: {
  redirectPath: string;
  withError: boolean;
  backgroundImageUrl: string;
}): string {
  return `
  <!doctype html>
  <html lang="en" data-theme="dark">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Password Protected Site</title>
      <meta name="description" content="This site is password protected.">
      <link rel="shortcut icon" href="https://picocss.com/favicon.ico">

      <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">

      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: url('${backgroundImageUrl}') no-repeat center top, linear-gradient(to bottom, #ffffff, #f0f0f0);
          background-size: cover;
        }

        main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 10px;
          padding: 2rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .error {
          background: white;
          border-radius: 10px;
          color: var(--del-color);
          padding: 0.5em 1em;
        }

        h2 { color: var(--color-h2); }

        .keypad {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1rem;
        }

        .keypad button {
          padding: 1rem;
          font-size: 1.5rem;
          border: none;
          border-radius: 5px;
          background: var(--color-primary);
          color: white;
          cursor: pointer;
        }

        .keypad button:active {
          background: var(--color-primary-dark);
        }

        input[type="password"] {
          display: none;
        }
      </style>
    </head>

    <body>
      <main>
        <article>
          <hgroup>
            <h1>Password</h1>
            <h2>Please enter your password for this site.</h2>
          </hgroup>
          ${withError ? `<p class="error">Incorrect password, please try again.</p>` : ''}
          <form method="post" action="/cfp_login">
            <input type="hidden" name="redirect" value="${redirectPath}" />
            <input type="password" name="password" id="password" required>
            <div class="keypad">
              ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0].map(num => `
                <button type="button" onclick="document.getElementById('password').value += '${num}'">${num}</button>
              `).join('')}
            </div>
            <button type="submit" class="contrast">Login</button>
          </form>
        </article>
      </main>
    </body>

  </html>
  `;
}
