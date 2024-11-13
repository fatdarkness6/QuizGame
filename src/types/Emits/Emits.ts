export interface Emit {
  (e: 'indexOf', index: number): void
}
export interface AnswerEmit {
  (e: 'selectedAnswer', data: string): void
}
