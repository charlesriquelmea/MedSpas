type ModalField = {
  label: string
  type: string
  hint: string
}

type ModalContent = {
  stepIndicator?: (s: number, total: number) => string
  welcome: { title: string; sub: string; cta: string }
  fields: {
    name: ModalField
    business: ModalField
    phone: ModalField
    email: ModalField
  }
  back: string
  next: string
  submit: string
  success: { title: string; sub: string; close: string }
}
