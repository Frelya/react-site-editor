const ERRORS: Record<Errors, string> = {
    //400
    INVALID_TEMPLATE: 'Invalid template',

    // 401
    WRONG_CONFIRM_PASSWORD: 'Passwords not match',
    TOKEN_REQUIRED: 'Access token required',
    TOKEN_INVALID: 'Invalid authorization token',
    TOKEN_EXPIRED: 'Access token expired',
    TOKEN_PAYLOAD_REQUIRED: 'Access token payload required',

    // 402
    SUBSCRIPTION_REQUIRED: 'Subscription required',
    SUBSCRIPTION_EXPIRED: 'Subscription expired',
    SUBSCRIPTION_CANCELED: 'Subscription canceled',

    // 403
    WRONG_PASSWORD: 'Wrong password',
    RESOURCE_NOT_ALLOWED: 'Resource not allowed',
    USER_NOT_ALLOWED: 'User not allowed',

    // 404
    USER_NOT_FOUND: 'User not found',
    WEBSITE_NOT_FOUND: 'Website not found',
    TEMPLATE_NOT_FOUND: 'Template not found',

    // 409
    USER_EXISTS: 'User already exists',

    // 417
    EXPECTATION_FAILED: 'Expectation failed',

    // 422
    VALIDATION_ERROR: 'Payload validation error',

    // 500
    INTERNAL_SERVER_ERROR: 'Something went wrong'
};

// For auto-completion
// Remember to update this type when you add a new custom error
type Errors =
    | 'INVALID_TEMPLATE'
    | 'WRONG_CONFIRM_PASSWORD'
    | 'TOKEN_REQUIRED'
    | 'TOKEN_INVALID'
    | 'TOKEN_EXPIRED'
    | 'TOKEN_PAYLOAD_REQUIRED'
    | 'SUBSCRIPTION_REQUIRED'
    | 'SUBSCRIPTION_EXPIRED'
    | 'SUBSCRIPTION_CANCELED'
    | 'WRONG_PASSWORD'
    | 'RESOURCE_NOT_ALLOWED'
    | 'USER_NOT_ALLOWED'
    | 'USER_NOT_FOUND'
    | 'WEBSITE_NOT_FOUND'
    | 'TEMPLATE_NOT_FOUND'
    | 'USER_EXISTS'
    | 'EXPECTATION_FAILED'
    | 'VALIDATION_ERROR'
    | 'INTERNAL_SERVER_ERROR';

export default ERRORS;
