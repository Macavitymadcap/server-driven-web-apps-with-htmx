import { expect, test, describe } from 'bun:test';
import { ValidationService } from './validation-service';

describe('ValidationService', () => {
  const validationService = new ValidationService();

  describe('isValidEmail', () => {
    test('should return true for valid emails', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co',
        'user_name@domain.com',
      ];

      validEmails.forEach(email => {
        expect(validationService.isValidEmail(email)).toBe(true);
      });
    });

    test('should return false for invalid emails', () => {
      const invalidEmails = ['invalid-email', 'user@domain', 'user@domain,com'];

      invalidEmails.forEach(email => {
        console.log(email);
        expect(validationService.isValidEmail(email)).toBe(false);
      });
    });

    test('should return false for emails in the invalid emails list', () => {
      const invalidEmails = [
        'lorem@ipsum.com',
        'username@domain.con',
        'commanderbigpants@hotmail.com',
        'loves2sp00ge69@gmail.com',
      ];

      invalidEmails.forEach(email => {
        expect(validationService.isValidEmail(email)).toBe(false);
      });
    });
  });

  describe('isStrongPassword', () => {
    test('should return true for strong passwords', () => {
      const strongPasswords = [
        'Str0ngP@ssword!',
        'An0ther$trong1',
        'Y3tAn0ther@1',
      ];

      strongPasswords.forEach(password => {
        expect(validationService.isStrongPassword(password)).toBe(true);
      });
    });

    test('should return false for weak passwords', () => {
      const weakPasswords = [
        'weak',
        '12345678',
        'password',
        'NoNumber!',
        'nonumber!',
        'NOLOWERCASE1!',
        'nouppercase1!',
        'NoPunctuation1',
      ];

      weakPasswords.forEach(password => {
        expect(validationService.isStrongPassword(password)).toBe(false);
      });
    });
  });
});
