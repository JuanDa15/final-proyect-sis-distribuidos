export interface ReservationInterface{
  id?:number,
  date: string,
  document:string,
  table: number,
  security_code?:string,
  owner?:string
}