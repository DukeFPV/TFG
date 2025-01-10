export function detectNextStepIntent(message: string): boolean {
  const keywords = ["siguiente", "continuar", "ok", "sigue", "ya está", "listo"]
  const lowerMessage = message.toLowerCase()

  return keywords.some((keyword) => lowerMessage.includes(keyword))
}
