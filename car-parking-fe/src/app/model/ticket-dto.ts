export interface TicketDto {
  ticketId?: number;
  plateNumber?: string;
  customerName?: string;
  customerCode?: string;
  customerPhoneNumber?: string;
  employeeName?: string;
  employeeCode?: string;
  employeePhoneNumber?: string;
  ticketType?: string;
  totalPrice?: number;
  floor?: number;
  section?: string;
  location?: number;
  effectiveDate?: string;
  expiryDate?: string;
}
