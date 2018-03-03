export class Review {
  constructor(public userName: string, rating: number,
              public commentContent: string, public imagePath?: string) {
  }
}
