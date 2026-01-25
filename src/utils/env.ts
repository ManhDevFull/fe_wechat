const getEnv = (key: string, required = true): string => {
  const value = process.env[key]
  if (!value && required) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value ?? ''
}
export const restApiBase = getEnv('NEXT_PUBLIC_BASE_API')
