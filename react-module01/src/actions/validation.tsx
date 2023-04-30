export function validateImageFile(file: File | undefined) {
  if (!file) {
    return false;
  }
  return ['image/jpeg', 'image/png'].some((type) => file.type === type);
}
