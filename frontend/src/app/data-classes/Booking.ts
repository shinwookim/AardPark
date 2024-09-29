export class Booking {
    constructor(
      public parking_spot: string,
      public start_time: string,
      public end_time: string,
      public purchaser: string,
      public seller: string,
    ) {}
  }