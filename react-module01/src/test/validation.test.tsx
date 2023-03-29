import { validateForm, validateImageFile } from '../actions/validation';

describe('Validation', () => {
  const name = 'Test';
  const date = '02-02-2022';
  const falseDate = new Date('02-02-2045').toString();
  const country = 'gonduras';
  const isGender = true;
  const isFile = true;
  const isAgree = true;
  const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
  test('validate correct form', () => {
    expect(validateForm(name, date, country, isGender, isFile, isAgree)).toEqual({
      isAgree: true,
      isCountrySelected: true,
      isDateCorrect: true,
      isFileUploaded: true,
      isGenderSelected: true,
      isNameCorrect: true,
    });
  });
  test('validate incorrect form - incorrect name', () => {
    expect(validateForm('name', date, country, isGender, isFile, isAgree)).toEqual({
      isAgree: true,
      isCountrySelected: true,
      isDateCorrect: true,
      isFileUploaded: true,
      isGenderSelected: true,
      isNameCorrect: false,
    });
  });
  test('validate incorrect form - incorrect date', () => {
    expect(validateForm(name, falseDate, country, isGender, isFile, isAgree)).toEqual({
      isAgree: true,
      isCountrySelected: true,
      isDateCorrect: false,
      isFileUploaded: true,
      isGenderSelected: true,
      isNameCorrect: true,
    });
  });
  test('validate incorrect form - incorrect country, agreement, file ', () => {
    expect(validateForm(name, date, 'unselect', isGender, false, false)).toEqual({
      isAgree: false,
      isCountrySelected: false,
      isDateCorrect: true,
      isFileUploaded: false,
      isGenderSelected: true,
      isNameCorrect: true,
    });
  });
  test('validate true image file', () => {
    expect(validateImageFile(testFile)).toEqual(true);
  });
  test('validate false image file', () => {
    expect(validateImageFile(new File([''], '', { type: '' }))).toEqual(false);
  });
  test('validate undefined image file', () => {
    expect(validateImageFile(undefined)).toEqual(false);
  });
});
