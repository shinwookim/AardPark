export class ParkingSpot {
  constructor(
    public parking_spot: string,
	public owner_name: string,
    public start_time: string,
    public end_time: string,
    public price: number,
    public name: string,
		public description: string,
    public location: {
      type: string;
      coordinates: [number, number];
    }
  ) {}
}
