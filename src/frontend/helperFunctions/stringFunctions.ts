export const noSpaceLowerCase = (name: string) => {
  return name.replace(/\s+/g, "").toLowerCase()
}
