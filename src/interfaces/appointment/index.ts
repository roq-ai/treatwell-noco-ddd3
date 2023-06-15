import { CustomerInterface } from 'interfaces/customer';
import { UserInterface } from 'interfaces/user';
import { SalonInterface } from 'interfaces/salon';
import { GetQueryInterface } from 'interfaces';

export interface AppointmentInterface {
  id?: string;
  date_time: any;
  customer_id: string;
  stylist_id: string;
  salon_id: string;
  created_at?: any;
  updated_at?: any;

  customer?: CustomerInterface;
  user?: UserInterface;
  salon?: SalonInterface;
  _count?: {};
}

export interface AppointmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_id?: string;
  stylist_id?: string;
  salon_id?: string;
}
