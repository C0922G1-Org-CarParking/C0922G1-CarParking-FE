export interface Updateticket {
  id: number;
  floorId: number;
  sectionId: number;
  locationId: number;
  expiryDate: Date;
  ticketTypeId: number;
  customerName: string;
  plateNumber: string;
  phoneNumber: string;
  effectiveDate: string;
  totalPrice: string
}

