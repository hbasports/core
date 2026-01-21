export type ApiErrorResponse = {
  errorCode: number;
  message: string;
  issues?: Record<string, string>;
  timestamp: Date;
};

// Prisma error handling utilities

const fieldErrorMessages: Record<string, string> = {
  slug: 'This username already exists.',
  username: 'This username is taken. Please try another.',
  email: 'This email is already registered.',
};

const defaultFieldMessage = 'This value is already in use.';

function extractFieldFromConstraint(constraint: string): string | null {
  const parts = constraint.split('_');

  if (parts.length < 3) return null;

  return parts.slice(1, -1).join('_');
}

export function normalizeConflictFields(
  target: string | string[],
): Record<string, string> {
  const conflicts: Record<string, string> = {};

  if (Array.isArray(target)) {
    for (let field of target) {
      field = extractFieldFromConstraint(field);
      conflicts[field] = fieldErrorMessages[field] || defaultFieldMessage;
    }
    return conflicts;
  }

  target = extractFieldFromConstraint(target);
  conflicts[target] = fieldErrorMessages[target] || defaultFieldMessage;
  return conflicts;
}
