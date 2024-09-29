export class ParkingSpot {
  constructor(
    public parking_spot: string,
	public owner_name: string,
    public start_time: string,
    public end_time: string,
		public price: string,
		public title: string,
		public description: string,
		public taken: boolean,
    public location: { 
			type: string; 
			coordinates: [
				number, 
				number
			] 
		}
  ) {}
}