export function validateForm(
  name: string | undefined,
  date: string | undefined,
  country: string,
  isGender: boolean,
  isFile: boolean,
  isAgree: boolean
) {
  return {
    isNameCorrect: !!name && /^[A-Z]/.test(name) && name.length > 3,
    isDateCorrect: !!date && Date.parse(date) < Date.now(),
    isCountrySelected: country !== 'unselect',
    isGenderSelected: isGender,
    isFileUploaded: isFile,
    isAgree: isAgree,
  };
}

export function validateImageFile(file: File) {
  return ['image/jpeg', 'image/png'].some((type) => file.type === type);
}
