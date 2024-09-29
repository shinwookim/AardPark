import { Booking } from "./Booking";

export class BookingCollection {
	constructor(
		public purchaser: Booking[],
		public seller: Booking[]
	) {}
}