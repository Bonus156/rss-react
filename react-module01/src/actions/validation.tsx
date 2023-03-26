export function validateForm(name: string | undefined, date: string | undefined, country: string) {
  return {
    isNameCorrect: !!name && /^[A-Z]/.test(name) && name.length > 3,
    isDateCorrect: !!date && Date.parse(date) < Date.now(),
    isCountrySelected: country !== 'unselect',
  };
}
