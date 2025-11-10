export type VesselType = "Container" | "BulkCarrier" | "Tanker" | "RoRo";
export type FuelType = "HFO" | "LNG" | "MGO";

export interface RouteProps {
  route_id: string;
  vessel_type: VesselType;
  fuel_type: FuelType;
  year: number;
  ghg_intensity: number;      // gCO2e/MJ
  fuel_consumption: number;   // t
  distance: number;          // km
  total_emissions: number;    // t
  is_baseline?: boolean;
}

export class Route {
  routeId: string;
  vesselType: VesselType;
  fuelType: FuelType;
  year: number;
  ghgIntensity: number;
  fuelConsumption: number;
  distance: number;
  totalEmissions: number;
  isBaseline: boolean;

  constructor(props: RouteProps) {
    this.routeId = props.route_id;
    this.vesselType = props.vessel_type;
    this.fuelType = props.fuel_type;
    this.year = props.year;
    this.ghgIntensity = props.ghg_intensity;
    this.fuelConsumption = props.fuel_consumption;
    this.distance = props.distance;
    this.totalEmissions = props.total_emissions;
    this.isBaseline = props.is_baseline || false;
  }
}
