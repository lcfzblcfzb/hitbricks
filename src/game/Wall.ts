class Wall extends RebounceObj {
	onHitted(): void {
		throw new Error("Method not implemented.");
	}
	
	getName():string{
		return WALL;
	}
	
}