import { AppointmentInterface } from 'interfaces/appointment';
import { SalonInterface } from 'interfaces/salon';
import { GetQueryInterface } from 'interfaces';

export interface CustomerInterface {
  id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  salon_id: string;
  created_at?: any;
  updated_at?: any;
  appointment?: AppointmentInterface[];
  salon?: SalonInterface;
  _count?: {
    appointment?: number;
  };
}

export interface CustomerGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  salon_id?: string;
}
