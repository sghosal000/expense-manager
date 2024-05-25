const passwordValidation = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialCharacter: true,
};

export const validatePassword = (password, setPasswordMessage) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+-=\[\]{};':"|\\,.<>/ ?]/.test(password);

    let valid = true;
    let messages = [];

    if (password.length < passwordValidation.minLength) {
        valid = false;
        messages.push(`Password must be at least ${passwordValidation.minLength} characters long`);
    }
    if (!hasUppercase && passwordValidation.requireUppercase) {
        valid = false;
        messages.push("Password must include at least one uppercase letter (A-Z)");
    }
    if (!hasLowercase && passwordValidation.requireLowercase) {
        valid = false;
        messages.push("Password must include at least one lowercase letter (a-z)");
    }
    if (!hasNumber && passwordValidation.requireNumber) {
        valid = false;
        messages.push("Password must include at least one number (0-9)");
    }
    if (!hasSpecialCharacter && passwordValidation.requireSpecialCharacter) {
        valid = false;
        messages.push("Password must include at least one special character (!@#$%^&*)");
    }

    setPasswordMessage(valid ? "" : messages.join("\n"));
    return valid;
}