export class VideoListDTO {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly alias: string,
    readonly name: string,
    readonly url: string,
    readonly votes: number,
    readonly description: string,
    readonly category: string,
  ) {}
}
