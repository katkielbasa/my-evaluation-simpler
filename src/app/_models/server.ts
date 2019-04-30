import { Time } from '@angular/common';

export class Customer{
    name: string;
    nic_id: string;
    cpu_count: number;
    memoryGb: number;
    createTime: Time;
    deployed: boolean = false;
    started: boolean = false;

}