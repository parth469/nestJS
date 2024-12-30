import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform((val) => parseInt(val, 10)),
  DATABASE_URL: z.string(),
});

type EnvConfig = z.infer<typeof envSchema>;

class Config {
  private static instance: Config;
  private readonly env: EnvConfig;

  constructor() {
    const result = envSchema.safeParse(process.env);

    if (!result.success) {
      const { errors } = result.error;
      const errorMessages = errors
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join('\n');

      throw new Error(
        `Invalid environment variables:\n${errorMessages}\n\nEnsure you have a valid .env file with all required variables.`,
      );
    }

    this.env = result.data;
  }

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  get port(): number {
    return this.env.PORT ?? 3000;
  }

  get datbaseUrl(): string {
    return this.env.DATABASE_URL;
  }
}

const config = Config.getInstance();
export { config };
