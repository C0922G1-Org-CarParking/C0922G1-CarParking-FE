export interface EditTicket {
  id?: number;
  customerName?: string;
  plateNumber?: string;
  phoneNumber?: string;
  effectiveDate?: string;
  expiryDate?: string;
  floorId?: number;
  locationId?: number;
  sectionId?: number;
  totalPrice?: string;
  ticketTypeId?: number;
  rate?: number;
}
