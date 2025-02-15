export class ValidationService {
  private _invalidEmails = [
    'lorem@ipsum.com',
    'username@domain.con',
    'commanderbigpants@hotmail.com',
    'loves2sp00ge69@gmail.com',
  ];

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && !this._invalidEmails.includes(email);
  }

  isStrongPassword(password: string): boolean {
    const isMinLength = password.length >= 8;
    const hasNumber = /[0-9]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasPunctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(password);

    return (
      isMinLength && hasNumber && hasUpperCase && hasLowerCase && hasPunctuation
    );
  }
}
