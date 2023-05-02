import { validateImageFile } from '../actions/validation';

describe('Validation', () => {
  const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

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
