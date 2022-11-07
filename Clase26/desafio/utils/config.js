import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const config = {
    dbSQL3: {
        client: 'better-sqlite3',
        connection: {
            filename: path.join(__dirname, '../DB/dbchat.db3')
        },
        useNullAsDefault: true
    },
    dbMDB: {
        client: 'mysql2',
        connection: {
            host: 'localhost',
            port: 3307,
            user: 'root',
            password: '',
            database: 'clase16'
        }
    },
    atlas: {
        strConn: `mongodb+srv://jgarcia:jgarcia@cluster0.t4p7xrg.mongodb.net/clase20?retryWrites=true&w=majority`
    },
    firebase: {
        "type": "service_account",
        "project_id": "clase20-1e45a",
        "private_key_id": "af279d586067295379997df655e94f5cc2452191",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDzREfe9bfBGnyh\nH88Pgemmdu35Gx1/PUkGlJ31Ofbx8tomICDWdekqu4/3VruPxXDOo87hJplOYFAl\n1QA9hfmwf9NP2hgiwAVVlboAsOwrKX4QUjldBHZw8WUQygVlv2OsLg/7syqFjH7x\nsqZjI2uQaowYFiX6lsEr6dQRf1gHkPVXMhF50PlMxDGZ7RyFlb7sm5CCWh2dpV3E\nyyZyaGSLgOVB3Whn8iKWsNP5YrtEDCuPZ27FCXrmmUg7KFVDSMLKbmmdJpMQas6U\nN4WuFrI6RLriA9n2BoOGcbEq0Ty1gkAAqdTRjT8kTy5viO5ctHzNNxiddUvbyHNn\nhA/R4zMvAgMBAAECggEAD11ir2G/B21QLdpqeO+a/a6ep+XfM71/3UXfFtwLDYu/\nMjqZQwe+KxAfBF+asnalV101Szc65kkNsYtbMTJDFl4ceftWcZYbQCVC0u8EcP11\nPuan74jBSlo/feikn/aPVGgHDmi/PiF6QHMo2zN42cLrskxufaiumW1yvYrY2TFe\nfKXvwQwgpNQGE32YQXC24hWRu0RyRB4ng4tZ5i80dE1BLPZ3OMbvrLKTfoLa85FT\nek9Fu50CSiY6Ba2pmRd2af607ipBh7sktYwSNYbQUtykAVhmJq6Ey77N5KjKkDpZ\nW2NWOivnT/xczQMW3FMlElaJlx5jEGAAGg5gUOSs4QKBgQD7CULx3iWmAIcKenD8\nbguKiTvTjFEHtbOMKxlPALGuvx03RTQtnIxxzT0EwHgHQOnruvaYq0YSQEpvhEm1\ndSHOkvQnLwdaRElhDqc3l9QfgP9vwSTnf3sSW9CNfxMigaLIne/wtxGvAx6OCxTH\nm1LvqeVYzGxxiL4+Xn7TogbJJwKBgQD4E7DCE+eVCuN2O6pm0hbH0fekgDqh2T2U\n+A8ZHKDRiSkVDLjNqb5O4x+a3/YIl0yHQ3ghqZyd7iQJ6H1IWZxJBSX36fzFpDgT\nzYD7fGg5z0Tzg7dwML3Gidr3gUYrdNZBoyrtc7KDj6qevZnNfIadFbzJu6244Wzi\nKJLMKu86uQKBgQC7fTBNmp+9urkg/0+xiLL/9f0Dw9GlE3UU4/+T/K24GK7GX95X\njotqV2ISUXmT2UycLdgNMCY2bWPqo/+1EdV9Bk5pkXtJVKUFYz9Kiw/3s42TtspM\nR+7wSDib5WOyKuYcNbFFtET11DuW1PnhFsW7j8VmK892gC2uQT8x6tpskwKBgBoZ\ngDw6+d9dYOb8igX9TnZBaet9ri1+/JKisnvy3hyNcKwNRZglpqcIEDgsHedze5Kz\nj30DKj4XYuVD94JYIzAvgXoevQBSMbArq8lJonGKk/eGwRLlneG4eTgW+rnxteT7\n9LU8uehLgijnS7opwsPeGJmkzDcqSFlW6XLfhYHJAoGARH5h6VvN1jJlrjZPEFMB\nh0Odn6CA6Egl5jLecgUGGK7C0tm26AZFeAd17goaBDPka8EOYmJgAMo+2cy58gmg\n86m5wlSVuwcdVgCZhcYZhD6KlmGUPwt/CIoNyFMhjPFWu+xjKV6y6YxkEUonBDX8\nwdsF26KR0df17lvH/dprhaQ=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-6i7cc@clase20-1e45a.iam.gserviceaccount.com",
        "client_id": "101950642846550713868",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6i7cc%40clase20-1e45a.iam.gserviceaccount.com"
      }
}
