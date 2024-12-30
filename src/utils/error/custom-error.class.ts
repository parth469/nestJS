import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomError extends HttpException {
  constructor(ErrorInput: ErrorInputTS) {
    const errorResponse = {
      status: ErrorInput.status,
      title: ErrorInput.title,
      description: ErrorInput.description,
      timestamp: new Date().toISOString(),
      metadata: ErrorInput.metadata,
    };
    super(errorResponse, ErrorInput.status);
  }

  static NOTFOUND(message: string) {
    return new CustomError({
      status: HttpStatus.NOT_FOUND,
      title: 'Resource Not Found',
      description: `Unable to find the requested ${message} resource in the database. Please verify the ID or parameters and try again.`,
    });
  }

  static UNAUTHORIZED() {
    return new CustomError({
      status: HttpStatus.UNAUTHORIZED,
      title: 'Unauthorized',
      description: 'Please provide valid credentials to access this resource.',
    });
  }

  static FORBIDDEN() {
    return new CustomError({
      status: HttpStatus.FORBIDDEN,
      title: 'Forbidden',
      description: 'You are not allowed to access this resource.',
    });
  }
}

interface ErrorInputTS {
  status: HttpStatus | number;
  title: string;
  description: string;
  metadata?: Record<string, any>;
}
